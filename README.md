# Vue 3 + Typescript + Vite

项目启动 `npm start`  
项目构建 `npm run build`

已经配置支持`jsx`语法,需要注意在不同的 `reactive` 数据使用场景下，是否需要通过 _REACTIVE_DATA_`.value` 的形成才能获取数据

可以通过修改 `vite.config.ts` 更新配置,具体配置项和插件可以参考 [vite 官网](https://vitejs.dev/config/)

## 目录结构

```bash
config
   |--- dev.config.js   // 开发环境CI会读取此文件
   |--- prd.config.js
public  公共资源， 访问 / 会加载此目录下的文件
   |--- ...
src
   |-- app  脚手架能力相关，和具体业务无关的代码
        |-- hooks
        |-- store
        |-- EventBridge
   |-- assets
   |-- components
   |-- constants
   |-- models vuex相关的model，
   |-- pages
   |-- routers
   |-- types  ts types
   |-- utils  公共函数
   |-- main.js 入口
index.html
package.json
tsconfig.json
vite.config.ts
.gitlab-ci.yml
```

具体可切换到 `quick-chat` 分支查看 demo

## EventBridge

插件端的消息中心，额外增加了 `vuex` `store` 的 `dispatch` 和 `commit` 事件  
EventBridge.dispatch = store.dispatch  
EventBridge.commit = store.commit

## vuex model

```js
type Handler<T> = (state: T, action: any) => T;

interface ModelApi {
  key: string;
  initialState?: any;
  method?: AxiosMethods;
  url?: (payload: any) => string;
  headers?: object;
  body?: () => any;
  loading?: Handler<any>;
  success?: Handler<any>;
  failure?: Handler<any>;
}
```

`action` 会依次经过 `loading`,`success`/`failure`,`mutation` 只会触发 `success`

推荐使用 `业务.功能点` 作为 key

## hook.usePolling

```js
interface PollingParameters {
  key: string;
  payload?: any;
  timeInterval?: number;
  useLoading?: Boolean;
}
```

使用方法：

```js
const startPolling = usePolling({key: 对应的model.key});

//用户事件或者onMount
startPolling(id, payload);

// 使用Polling data
const pollingData = computed(() => store.state[model.key]);
watch(pollingData, (cur, old) => {
  // 相应的逻辑
});
```

## 插件获取 qm store

需要做监听，将需要的数据 `commit` 到插件的 `vuex` 中,可参考 `quick-chat` 分支 `src/main.js`

## NEXT TODO

1. （和具体业务有关，不同插件的逻辑可能不同，需要有多个版本）usePolling 做一层前端缓存，每次调用 startPolling 时，返回不同 id 的 最后一次 polling 结果
