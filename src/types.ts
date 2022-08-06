export type Identifier = string | number;

export type ActionID = string;
export type StateKey = string | number;
export type Identifiable<T> = T & { id: string };

export type StateData<T extends StateKey = StateKey> = {
  [key in T]?: Condition | null;
};

export type CostOrCostFn<T extends StateKey = StateKey> =
  | number
  | ((state: StateData<T>) => number);

export interface Action<T extends StateKey = StateKey> {
  id: ActionID;
  cost?: CostOrCostFn<T>;
  before: StateData;
  after: StateData;
}

export enum Condition {
  FALSE = -2,
  FALSY = -1,
  NEUTRAL = 0,
  TRUTHY = 1,
  TRUE = 2
}
