export type ReducerHandler = (state: any, action: any) => any;

export type AxiosMethods = 'get' | 'put' | 'post' | 'delete';

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
  loading?: ReducerHandler;
  success?: ReducerHandler;
  failure?: ReducerHandler;
  reducer?: ReducerHandler;
  type?: string;
}
