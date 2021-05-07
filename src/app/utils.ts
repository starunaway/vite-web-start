export function isEmptyObject(o: any) {
  return !Object.keys(o).length;
}

export function isObject(o: any) {
  return Object.prototype.toString.call(o).includes('Object');
}

export function isFunction(f: any) {
  return Object.prototype.toString.call(f).includes('Function');
}

export function isString(f: any) {
  return Object.prototype.toString.call(f).includes('String');
}

export function isNumber(f: any) {
  return Object.prototype.toString.call(f).includes('Number');
}
