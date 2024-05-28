import { test, expect } from 'vitest';
import { Planner } from '../Planner';
import { Condition } from '../types';

const { TRUE, FALSE, FALSY } = Condition;

const actions = [
  {
    id: 'SLEEP',
    before: { IS_SLEEPY: TRUE, IN_BEDROOM: TRUE, IS_HUNGRY: FALSE },
    after: { IS_SLEEPY: FALSE }
  },
  {
    id: 'EAT',
    before: { IS_HUNGRY: TRUE, IN_KITCHEN: TRUE, HAS_FOOD: TRUE },
    after: { IS_HUNGRY: FALSE, HAS_FOOD: FALSE }
  },
  {
    id: 'ORDER_PIZZA',
    before: { AT_HOME: TRUE, HAS_FOOD: FALSE },
    after: { AT_HOME: TRUE, HAS_FOOD: TRUE },
    cost: 10
  },
  {
    id: 'TO_KITCHEN',
    before: { IN_KITCHEN: FALSE, AT_HOME: TRUE },
    after: { IN_KITCHEN: TRUE, IN_BEDROOM: FALSE }
  },
  {
    id: 'TO_BEDROOM',
    before: { IN_BEDROOM: FALSE, AT_HOME: TRUE },
    after: { IN_BEDROOM: TRUE, IN_KITCHEN: FALSE }
  },
  {
    id: 'GO_OUTSIDE',
    before: { IS_OUTSIDE: FALSE },
    after: {
      IS_OUTSIDE: TRUE,
      IN_KITCHEN: FALSE,
      IN_BEDROOM: FALSE,
      AT_HOME: FALSE,
      AT_STORE: FALSE
    }
  },
  {
    id: 'BUY_FOOD',
    before: { AT_STORE: TRUE, HAS_FOOD: FALSE },
    after: { HAS_FOOD: TRUE }
  },
  {
    id: 'TO_STORE',
    before: { IS_OUTSIDE: TRUE, AT_STORE: FALSE },
    after: { IS_OUTSIDE: FALSE, AT_STORE: TRUE }
  },
  {
    id: 'TO_HOME',
    before: { IS_OUTSIDE: TRUE, AT_HOME: FALSE, AT_STORE: FALSE },
    after: { IS_OUTSIDE: FALSE, AT_HOME: TRUE, AT_STORE: FALSE }
  }
];

const start = {
  IS_SLEEPY: TRUE,
  IS_HUNGRY: TRUE,
  IS_OUTSIDE: FALSE,
  IN_KITCHEN: FALSE,
  IN_BEDROOM: FALSE,
  HAS_FOOD: FALSE,
  AT_STORE: FALSE,
  AT_HOME: TRUE
};

console.time('plan');
const planner = new Planner(actions, { IS_OUTSIDE: FALSY });
const plan = planner.compute(start, { IS_SLEEPY: FALSE });
console.log(plan);
console.timeEnd('plan');

test('no-op', () => expect(true).toBeTruthy());
