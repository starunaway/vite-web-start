interface EventBridgeEvent {
  cb: Function;
  isOnce?: Boolean;
}

interface ProxyPayload {
  event: string;
  params?: any;
  sameProcess?: boolean;
}

class NameSpace {
  path: string;
  Fn: Function;
  proxy: any;
  constructor(Fn: Function, namespace = '') {
    this.path = namespace;
    this.Fn = Fn;
    this.proxy = new Proxy(this.Fn, {
      get: (target, key) => this.setPath(key as string),
      apply: (target, obj, args) => {
        const callerPath = this.path;
        this.path = namespace;
        return this.Fn.call(obj, callerPath, ...args);
      },
    });

    return this.proxy;
  }

  setPath(path: string) {
    if (!this.path) {
      this.path = path;
    } else {
      this.path += `.${path}`;
    }
    return this.proxy;
  }
}

class EventBridge {
  listeners: Map<String, Set<EventBridgeEvent>> = new Map();
  callproxy = () => {};
  constructor() {
    if (!EventBridge.instance) {
      this.listeners = new Map();
      this.callproxy = async () => {};
      EventBridge.instance = this;
    }
    return EventBridge.instance;
  }

  static instance: EventBridge;

  get proxy() {
    return new NameSpace(this.callproxy);
  }

  on(eventname: string = 'defaulteventname', callback: Function, isOnce = false) {
    if (!this.listeners.has(eventname)) {
      this.listeners.set(eventname, new Set());
    }

    const events = this.listeners.get(eventname);
    let hasCallback = false;
    events?.forEach((e) => {
      e.cb === callback && (hasCallback = true);
    });

    !hasCallback && events?.add({cb: callback, isOnce});
  }

  emit(eventname: string, payload: any) {
    // if (this.listeners.has(eventname)) {
    const events = this.listeners.get(eventname);
    events?.forEach((e) => {
      e.cb(payload);
      if (e.isOnce) {
        this.remove(eventname, e.cb);
      }
    });

    if (!events || !events.size) {
      console.warn(`[${eventname}] has no listeners`);
    }

    // }
  }

  remove(eventname: string, callback: Function) {
    const events = this.listeners.get(eventname);
    if (events && callback) {
      events.forEach((e) => {
        e.cb === callback && events.delete(e);
      });
    }
  }

  removeAll(eventname: string) {
    const events = this.listeners.get(eventname);
    events && this.listeners.delete(eventname);
  }

  registerProxy(eventname: string, fn: Function) {
    this.unRegisterProxy(eventname);
    this.on(`_proxy.${eventname}`, async (payload: ProxyPayload) => {
      const {event, params} = payload;
      try {
        const result = await fn(...params);
        this.emit(event, {
          payload: result,
        });
      } catch (error) {
        this.emit(event, {
          payload: {},
          error,
        });
      }
    });
  }

  unRegisterProxy(eventname: string) {
    this.removeAll(`_proxy.${eventname}`);
  }
}

export default new EventBridge();
