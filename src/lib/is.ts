import { identity } from './func';
import { find } from './array';


/* General Type Discovery */

export const ifIs = <type>(unknown: type | null | undefined | false): unknown is type => !!unknown;

export const isEither = <type, otherType>(
  unknown: type | otherType,
  compare: (val: type | otherType) => boolean = identity
): unknown is type => !!compare(unknown);



/* Type Testing */

export const isNull = (x: any): x is null => x === null;

export const isUndefined = (x: any): x is undefined => typeof x === 'undefined';

export const isNullOrUndefined = (x: any): x is (null | undefined) => isNull(x) || isUndefined(x);

export const isString = (x: any): x is string => typeof x === 'string';

export const isNumber = (x: any): x is number => typeof x === 'number';

export const isBoolean = (x: any): x is boolean => typeof x === 'boolean';

export const isDate = (x: any): x is Date => Object.prototype.toString.call(x) === '[object Date]';

export const isArray = (x: any): x is Array<any> => Array.isArray(x);

export const isFunction = (x: any): x is Function => ({}).toString.call(x) === '[object Function]';

export const isMap = (x: any): x is Map<any, any> => !!x.__isMap__ && !x.__isObservable__;

export const isObjectLiteral = (x: any): x is { [propertyName: string]: any } => {

  let test = x;

  if (typeof x !== 'object' || x === null) {
    return false;
  }

  while (!false) {
    test = Object.getPrototypeOf(test);
    if (Object.getPrototypeOf(test) === null) {
      break;
    }
  }

  return Object.getPrototypeOf(x) === test;

}

export const isComparable = (x: any): x is (number | boolean | string | symbol | Function) =>
  typeof x === 'number' ||
  typeof x === 'boolean' ||
  typeof x === 'string' ||
  typeof x === 'symbol' ||
  typeof x === 'function';

export const isFalsey = (x: any): x is (null | undefined | false | '') =>
  isNullOrUndefined(x) ||
  (isBoolean(x) && !x) ||
  (isString(x) && x === '');

/* Comparison */

export function isEqual<type>(valueA: type, valueB: type, comparator?: (a: any, b: any) => boolean): boolean {

  if (!!comparator) {
    return comparator(valueA, valueB);
  }

  if ((isFalsey(valueA) && isFalsey(valueB)) || (isComparable(valueA) && isComparable(valueB))) {
    return valueA === valueB;
  } else if (isArray(valueA) && isArray(valueB)) {
    return valueA.length === valueB.length && !find(valueA, (value: any, index: number) => !isEqual(value, valueB[index]));
  } else if ((isMap(valueA) && isMap(valueB))) {
    return valueA.size === valueB.size && !find([...valueA.keys()], (key: any) => !isEqual(valueA.get(key), valueB.get(key)));
  }

  return false;

}
