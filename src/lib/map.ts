interface Iterator<key, value, result> {
  (value: value, key: key, map: Map<key, value>): result
}

export const merge = <key, value>(mapA: Map<key, value>, mapB: Map<key, value>) => {
  const result = new Map<key, value>();
  mapA.forEach((value, key) => result.set(key, value));
  mapB.forEach((value, key) => result.set(key, value));
  return result;
}

export const map =
  <key, value, result>(map: Map<key, value>, iterator: Iterator<key, value, result>): Map<key, result> => {
    const result = new Map<key, result>();
    map.forEach((value, key, map) => result.set(key, iterator(value, key, map)));
    return result;
  };

export const filter =
  <key, value>(map: Map<key, value>, filter: Iterator<key, value, boolean>): Map<key, value> => {
    const result = new Map();
    map.forEach((value, key, map) => filter(value, key, map) ? result.set(key, value) : null);
    return result;
  };