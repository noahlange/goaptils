import type { StateData } from './types';

export type Identifiable<T> = T & { id: string };

export const _ = {
  keys: <T extends {}>(value: T): (keyof T)[] =>
    Object.keys(value) as (keyof T)[],
  entries: <T extends {}>(value: T) =>
    Object.entries(value) as [keyof T, T[keyof T]][]
};

export const Calc = {
  getDiff: (start: StateData, end: StateData): number => {
    let total = 0;
    for (const [key, value] of _.entries(start)) {
      if (key in end) {
        const diff = Math.abs(end[key]! - value!);
        if (diff > 3) {
          return Infinity;
        } else {
          total += diff;
        }
      }
    }
    return total;
  },
  areEqual: (a: StateData, b: StateData): boolean => Calc.getDiff(b, a) === 0,
  getDistance: (start: StateData, end: StateData): number =>
    _.keys(start).filter(key => start[key] !== end[key]).length + 1
};
