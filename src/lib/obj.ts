
/* Object */

import { reduce, map } from './array';
import { identity } from './func';

export const mapValues = <Value, Result>(
  obj: { [prop: string]: Value },
  func: (value: Value, key: string, obj: { [prop: string]: Value }) => Result = identity
): Result[] => map(
  Object.keys(obj),
  key => func(obj[key], key, obj)
);


