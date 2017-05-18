import { reduce, times, flatten } from './array';

/* Math */

export type Vector2d = {
  x: number,
  y: number,
}

export type Vector3d = {
  x: number,
  y: number,
  z: number,
}

export const clamp = (num: number, lower: number, upper: number): number =>
  num > upper ?
    upper :
    (num < lower ?
      lower :
      num);

export const sum = (...nums: number[]) => reduce(nums, (s, n) => s + n, 0);

export const inRange = (num: number, lower: number = 0, upper: number = 1): boolean => !(num < lower || num > upper);

export const sign = (num: number): number => num > 0 ? 1 : (num < 0 ? -1 : 0);

export const clampPerc = (num: number, lower: number, upper: number): number => (num - lower) / (upper - lower);

export const random = (max: number = 1, min: number = 0): number => Math.random() * (max - min) + min;

export const lerp = (a: number, b: number, dt: number): number => a + (b - a) * dt;

export const lerp3d = (vecA: Vector3d, vecB: Vector3d, dt: number): Vector3d => ({
  x: lerp(vecA.x, vecB.x, dt),
  y: lerp(vecA.y, vecB.y, dt),
  z: lerp(vecA.z, vecB.z, dt),
});

export const uniqueId = (): string => `id_${Date.now()}_${Math.floor(Math.random() * 100000000000)}`;

export const sqr = (x: number): number => x * x;

export function round(num: number, places: number = 8): number {
  const base = Math.pow(10, places);
  return Math.round(num * base) / base;
}

export function smoothStep(low: number, high: number, x: number): number {

  x = clamp((x - low) / (high - low), 0, 1);

  return x * x * x * (x * (x * 6 - 15) + 10);

}

function getGridNeighbors(grid: number[][], x: number, y: number, radius: number = 1): number[] {

  const results = [];

  for (let yOffset = radius * -1; yOffset < radius + 1; ++yOffset) {
    for (let xOffset = radius * -1; xOffset < radius + 1; ++xOffset) {
      const
        newY = y + yOffset,
        newX = x + xOffset;

      if (!!grid[newY] && !!grid[newY][newX]) {
        results.push(grid[newY][newX]);
      }
    }
  }

  return results;

}

export function noise(width: number = 10, height: number = 10, iterations: number = 3): number[][] {

  const noise: any = times(height, () => times(width, () => Math.random()));

  for (let i = iterations; i >= 0; --i) {
    for (let y = noise.length - 1; y >= 0; --y) {
      for (let x = noise[y].length - 1; x >= 0; --x) {
        const
          center = noise[y][x],
          neighbors = getGridNeighbors(noise, x, y);

        noise[y][x] = ((reduce(neighbors, (total: number, value: number): number => total + value, 0) / neighbors.length) + center) / 2;

      }
    }
  }

  const
    allValues = flatten<number>(flatten<number[]>(noise)),
    min = Math.min.apply(null, allValues),
    max = Math.max.apply(null, allValues);

  for (let y = noise.length - 1; y >= 0; --y) {
    for (let x = noise[y].length - 1; x >= 0; --x) {
      noise[y][x] = clampPerc(noise[y][x], min, max);
    }
  }


  return noise;

}
