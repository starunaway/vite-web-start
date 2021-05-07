import {ModelApi} from '../type';
import {isEmptyObject, isObject} from '../utils';

/**
 * 创建state的子级时，判断是否可以创建
 * @param state
 * @param model
 */
export function isStateLegal(state: any, model: ModelApi) {
  const modelKey = model.key.split('.');

  const modelStateKeys = isEmptyObject(model.initialState || {})
    ? [modelKey.join('.')]
    : Object.keys(model.initialState || {}).map((key) => `${modelKey.join('.')}.${key}`);

  const stateKeys = getDeepStateKey(state).flat();

  const hasKey = modelStateKeys.some((key) =>
    stateKeys.some((statekey) => {
      if (key && statekey && (statekey.startsWith(key) || key.startsWith(statekey))) {
        let str = key.length < statekey.length ? key : statekey;
        return str.includes('.') || key === statekey;
      }
      return false;
    })
  );
  return !hasKey;
}

/**
 * 递归变量state对象，获取所有可访问的最深层路径
 * @param state
 * @param initialKey
 */
function getDeepStateKey(state: any, initialKey?: string): Array<Array<string> | string> {
  if (isEmptyObject(state)) {
    return [initialKey as string];
  }

  if (!isObject(state)) {
    return [initialKey as string];
  }

  const initialKeys = Object.keys(state).map((key) => getKey(key, initialKey));
  return initialKeys.map((initKey) => {
    const cur = initKey.split('.').pop();
    const deepKeys = getDeepStateKey(state[cur as string], initKey);
    return deepKeys.flat();
  });
}
function getKey(key: string, initialKey?: string): string {
  return initialKey ? `${initialKey}.${key}` : key;
}
