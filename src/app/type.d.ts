export type ReducerHandler = (state: any, action: any) => any;

export interface ModelApi {
  key: string;
  subKeys?: Array<string>;
  action?: string;
  initialState?: any;
  method?: string;
  url?: (payload: any) => string;
  single?: boolean;
  headers?: object;
  body?: () => any;
  payload?: any;
  loading?: ReducerHandler;
  success?: ReducerHandler;
  failure?: ReducerHandler;
  reducer?: ReducerHandler;
  type?: string;
}
