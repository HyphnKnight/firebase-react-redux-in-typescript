
/* Array */

const identity = <T>(x: T): T => x;

interface iterator<T, V> {
  (value: T, index: number, array: T[]): V
}

interface reduceIterator<T, R> {
  (base: R, value: T, index: number, array: T[]): R
}

interface timesIterator<T> {
  (index: number, length: number): T
}

export function forEach<T>(array: T[], func: iterator<T, any> = identity): T[] {

  for (let i = 0, len = array.length; i < len; ++i) {

    func(array[i], i, array);

  }

  return array;

}

export function map<T, V>(array: T[], func: iterator<T, V> = identity): V[] {

  const results = [];

  for (let i = 0, len = array.length; i < len; ++i) {

    results.push(func(array[i], i, array));

  }

  return results;

}

export function mapToObject<T>(array: T[], func: iterator<T, string> = identity): { [name: string]: T } {

  const results: { [name: string]: T } = Object.create(null);

  for (let i = 0, len = array.length; i < len; ++i) {

    results[func(array[i], i, array)] = array[i];

  }

  return results;

}

export const mapToMap =
  <src, key, value>(array: src[], func: iterator<src, [key, value]> = identity): Map<key, value> =>
    new Map<key, value>(map<src, [key, value]>(array, func));

export function filter<T>(array: T[], func: iterator<T, boolean> = identity): T[] {

  const results = [];

  for (let i = 0, len = array.length; i < len; ++i) {

    if (!!func(array[i], i, array)) {

      results.push(array[i]);

    }

  }

  return results;

}

export function reduce<T, R>(array: T[], func: reduceIterator<T, R> = identity, base: R): R {

  for (let i = 0, len = array.length; i < len; ++i) {

    base = func(base, array[i], i, array);

  }

  return base;

}

export function reduceRight<T, R>(array: T[], func: reduceIterator<T, R> = identity, base: R): R {

  for (let i = array.length - 1; i > 0; --i) {

    base = func(base, array[i], i, array);

  }

  return base;

}

export function find<T>(array: T[], func: iterator<T, boolean> = identity): T | null {

  for (let i = 0, len = array.length; i < len; ++i) {

    if (!!func(array[i], i, array)) {
      return array[i];
    }

  }

  return null;

}

export function times<T>(length: number, func: timesIterator<T> = identity): T[] {
  const result: T[] = [];
  for (let i = 0; i < length; ++i) {
    result.push(func(i, length));
  }
  return result;
}

export const difference = <T>(array: T[], targetArray: T[]): T[] => filter(array, (val: T) => targetArray.indexOf(val) === -1);

export const intersection = <T>(array: T[], targetArray: T[]): T[] => filter(array, (val: T) => targetArray.indexOf(val) !== -1);

export const flatten = <T>(array: T[][]): T[] => [].concat.apply([], array);

export const unique = <T>(array: T[]): T[] => filter(array, (value: T, index: number, self: T[]) => self.indexOf(value) === index);

export function uniqueBy<T>(array: T[], func: iterator<T, any> = identity): T[] {

  const
    result = [],
    resultKeys = [];

  for (let i = 0, len = array.length; i < len; ++i) {

    const key = func(array[i], i, array);

    if (!find(resultKeys, (resultKey: any) => resultKey === key)) {
      result.push(array[i]);
      resultKeys.push(key);
    }

  }

  return result;

}

export const countBy = <T>(array: T[], iterator: iterator<T, string>): { [key: string]: number } => {

  const result = Object.create(null);

  for (let i = 0, len = array.length; i < len; ++i) {

    const key = iterator(array[i], i, array);

    if (!result[key]) {
      result[key] = 0;
    }

    ++result[key];

  }

  return result;

}

export const invoke = (array: Function[]): Function[] => forEach(array, (func: Function) => func());

export const concat = <T>(...arrays: T[][]): T[] => flatten(arrays);

export const union = <T>(...arrays: T[][]): T[] => unique(concat(...arrays));

function quickSortSwap<T>(arr: T[], el1: number, el2: number) {
  let swapedElem = arr[el1];
  arr[el1] = arr[el2];
  arr[el2] = swapedElem;
}

function quickSort<T>(array: T[], func: iterator<T, number>, leftPos: number = 0, rightPos?: number, length?: number) {

  length = !length ? array.length : length;
  rightPos = !rightPos ? array.length - 1 : rightPos;

  let
    initialLeftPos = leftPos,
    initialRightPos = rightPos,
    direction = true,
    pivot = rightPos;

  while ((leftPos - rightPos) < 0) {
    if (direction) {
      if (func(array[pivot], pivot, array) < func(array[leftPos], leftPos, array)) {
        quickSortSwap(array, pivot, leftPos);
        pivot = leftPos;
        rightPos--;
        direction = !direction;
      } else {
        leftPos++;
      }
    } else {
      if (func(array[pivot], pivot, array) <= func(array[rightPos], rightPos, array)) {
        rightPos--;
      } else {
        quickSortSwap(array, pivot, rightPos);
        leftPos++;
        pivot = rightPos;
        direction = !direction;
      }
    }
  }
  if (pivot - 1 > initialLeftPos) {
    quickSort(array, func, initialLeftPos, pivot - 1, length);
  }
  if (pivot + 1 < initialRightPos) {
    quickSort(array, func, pivot + 1, initialRightPos, length);
  }
}

export function sort<T>(array: T[], func: iterator<T, number> = identity, ascending: boolean = true): T[] {

  const sortedArray = copy(array);

  quickSort(sortedArray, func);

  return !ascending ? reverse(sortedArray) : sortedArray;

}

export function reverse<T>(array: T[]): T[] {
  const result = [];
  for (let i = array.length - 1; i >= 0; i--) {
    result.push(array[i]);
  }
  return result;
}

export const heuristicFind = <T>(array: T[], func: iterator<T, number> = identity): T => sort(array, func, false)[0];

export const contains = <T>(array: T[], value: T): boolean => array.indexOf(value) !== -1;

export const copy = <T>(array: T[]): T[] => array.slice(0);

export const toggle = <T>(array: T[], value: T): T[] => contains(array, value) ? remove(array, value) : add(array, value);

export const remove = <T>(array: T[], value: T): T[] => {
  const result = copy(array);
  if (array.indexOf(value) !== -1) {
    result.splice(array.indexOf(value), 1);
  }
  return result;
};

export const add = <T>(array: T[], value: T, index: number = 0): T[] => {
  const result = copy(array);
  result.splice(index, 0, value)
  return result;
};

export const insert = <T>(array: T[], index: number, ...values: T[]): T[] => copy(array).splice(index, 0, ...values);

export const chunk = <T>(array: T[], chunkSize: number = 10): T[][] => times<T[]>(
  Math.ceil(array.length / chunkSize),
  (index) => array.slice(index * chunkSize, index * chunkSize + chunkSize)
);

export const last = <T>(array: T[], pos: number = 0): T => array[array.length - 1 - pos];

export function lastValues<T>(array: T[], num: number = 1): T[] {

  const result = [];

  for (let i = array.length - 1; i > array.length - 1 - num; --i) {
    result.push(array[i]);
  }

  return result;

}

export const first = <T>(array: T[], pos: number = 0): T => array[0 + pos];

export function firstValues<T>(array: T[], num: number = 1): T[] {

  const result = [];

  for (let i = 0; i < num; ++i) {
    result.push(array[i]);
  }

  return result;

}

export class Chain<T> {

  value: T[]

  constructor(array: T[]) {

    this.value = array;

  }

  forEach(func: iterator<T, any>) {
    forEach(this.value, func);
    return this;
  }

  map(func: iterator<T, T>) {
    this.value = map<T, T>(this.value, func);
    return this;
  }

  filter(func: iterator<T, boolean>) {
    this.value = filter(this.value, func);
    return this;
  }

  reduce<R>(func: reduceIterator<T, R>, init: R) {
    return reduce(this.value, func, init);
  }

  reduceRight<R>(func: reduceIterator<T, R>, init: R) {
    return reduceRight(this.value, func, init);
  }

  find(func: iterator<T, boolean>) {
    return find(this.value, func);
  }

  difference(array: T[]) {
    this.value = difference(this.value, array);
    return this;
  }

  unique() {
    this.value = unique(this.value);
    return this;
  }

  uniqueBy(func: iterator<T, any>) {
    this.value = uniqueBy(this.value, func);
    return this;
  }

  concat(array: T[]) {
    this.value = concat(this.value, array);
    return this;
  }

  sort(func: iterator<T, number>, ascending: boolean = true) {
    this.value = sort(this.value, func, ascending);
    return this;
  }

  heuristicFind(func: iterator<T, number>) {
    return heuristicFind(this.value, func);
  }

  copy() {
    return copy(this.value);
  }

  insert(index: number, ...values: T[]) {
    this.value = insert(this.value, index, ...values);
    return this;
  }

  chunk(chunkSize: number) {
    return chunk<T>(this.value, chunkSize);
  }

  first(num: number) {
    return first(this.value, num);
  }

  firstValues(num: number) {
    return firstValues(this.value, num);
  }

  last(num: number) {
    return last(this.value, num);
  }

  lastValues(num: number) {
    return lastValues(this.value, num);
  }

  remove(value: T) {
    this.value = remove(this.value, value);
    return this;
  }

}

export const chain = (array: any[]) => new Chain(array);

export default chain;
