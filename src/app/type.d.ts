export type Handler<T> = (state: T, action: any) => T;

export type AxiosMethods = 'get' | 'put' | 'post' | 'delete';

export type PluginType = (params: any) => Function | Function;

export interface ModelApi {
  key: string;
  subKeys?: Array<string>;
  action?: string;
  initialState?: any;
  method?: AxiosMethods;
  url?: (payload: any) => string;
  headers?: object;
  body?: () => any;
  payload?: any;
  loading?: Handler<any>;
  success?: Handler<any>;
  failure?: Handler<any>;
  reducer?: Handler<any>;
  type?: string;
}

interface IState {
  [field: string]: {
    [field: string]: IState;
  };
}
