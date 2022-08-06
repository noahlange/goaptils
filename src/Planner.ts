import type { Action, ActionID, StateData } from './types';

import { Calc } from './utils';

interface ActionData {
  id: ActionID;
  before: StateData;
  after: StateData;
  cost: number;
}

interface State {
  id: string;
  r: number;
  data: StateData;
}

export class Planner {
  protected actions: Action[] = [];
  protected rules: Partial<StateData> = {};

  public compute(start: StateData, end: StateData): ActionID[] | null {
    const visited = new Map<string, number>();
    const options: State[] = [];

    options.push({ id: 'START', r: 0, data: start });
    visited.set('START', 0);

    while (options.length > 0) {
      const current = options.shift()!;

      // if we've reached our desired goal state, return.
      if (Calc.areEqual(end, current.data)) {
        return current.id.split(':').slice(1) as ActionID[];
      }

      // determine the list of viable actions
      for (const action of this.getNeighbors(current)) {
        const range =
          // current total distance
          current.r +
          // action cost
          action.cost +
          // the 'after' state may violate the rules
          Calc.getDiff(this.rules, action.after);

        // If neighbor range is infinity, we can't get there
        if (range === Infinity) {
          continue;
        }

        const id = current.id + ':' + action.id;
        if (!visited.has(id) || range < visited.get(id)!) {
          visited.set(id, range);
          options.push({ id, data: action.after, r: range });
        }
      }

      // resort options
      options.sort((a, b) => a.r - b.r);
    }

    return null;
  }

  private getNeighbors(state: State): ActionData[] {
    // note: `for` loop here purely for performance reasons
    const res: ActionData[] = [];
    for (const act of this.actions) {
      if (act.id !== state.id && Calc.getDiff(act.before, state.data) < 2) {
        const cost =
          typeof act.cost === 'function' ? act.cost(state.data) : act.cost;

        res.push({
          id: act.id,
          cost: cost ?? 0,
          before: Object.assign({}, state.data, act.before),
          after: Object.assign({}, state.data, act.after)
        });
      }
    }
    return res;
  }

  public constructor(actions: Action[], rules: Partial<StateData> = {}) {
    this.actions = actions;
    this.rules = rules;
  }
}
