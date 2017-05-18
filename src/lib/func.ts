
/* Function */

import { reduce } from './array';

export const identity = <T>(x: T): T => x;



export const curry =
  <R>(func: (...args: any[]) => R, ...args: any[]) =>
    (...insideArgs: any[]) =>
      func(...args.concat(insideArgs));

export const compose =
  (...functions: Function[]) =>
    (arg: any) =>
      reduce(
        functions,
        (result: Function[], func: Function) => func(result),
        arg
      );

export function debounce(func: Function, wait: number, leading: boolean = true, maxWait: number = Number.MAX_VALUE) {

  let invokeTime = 0;

  if (leading) {

    return function debounceLeadingInside(...args: any[]) {

      const time = Date.now();

      if (time - invokeTime > wait) {
        invokeTime = Date.now();
        return func(...args);
      } else {
        return undefined;
      }

    };

  } else {

    let
      attemptedInvoke = 0,
      delay: number;

    return function debounceTrailingInside(...args: any[]) {

      const time = Date.now();

      if (attemptedInvoke === 0) {
        attemptedInvoke = time;
      }

      if (!!delay && time - attemptedInvoke < maxWait) {
        window.clearTimeout(delay);
      }

      if (time - attemptedInvoke < maxWait) {
        delay = setTimeout(() => {
          attemptedInvoke = 0;
          func(...args);
        }, wait);
      }

    };

  }

}

export const throttle = (func: Function, wait: number = 1000) => {

  let invokeTime: number = 0;
  let timeout: number | null = null;

  return (...args: any[]) => {

    const now = Date.now();

    timeout && clearTimeout(timeout);

    if (now - invokeTime > wait) {

      invokeTime = now;

      func(...args);

    } else {
      timeout = setTimeout(() => {
        func(...args);
      }, wait - (now - invokeTime));
    }

  }

};
