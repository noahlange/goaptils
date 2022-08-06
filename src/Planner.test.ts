import { Planner } from './Planner';
import { Condition } from './types';

const { TRUE, FALSE } = Condition;

const actions = [
  {
    id: 'SLEEP',
    before: { IS_SLEEPY: TRUE, IN_BEDROOM: TRUE, IS_HUNGRY: FALSE },
    after: { IS_SLEEPY: FALSE }
  },
  {
    id: 'EAT',
    before: { IS_HUNGRY: TRUE, IN_KITCHEN: TRUE },
    after: { IS_HUNGRY: FALSE }
  },
  {
    id: 'TO_KITCHEN',
    before: { IN_KITCHEN: FALSE },
    after: { IN_KITCHEN: TRUE, IN_BEDROOM: FALSE }
  },
  {
    id: 'TO_BEDROOM',
    before: { IN_BEDROOM: FALSE },
    after: { IN_BEDROOM: TRUE, IN_KITCHEN: FALSE }
  }
];

const start = {
  IS_SLEEPY: TRUE,
  IS_HUNGRY: TRUE,
  IN_KITCHEN: FALSE,
  IN_BEDROOM: FALSE
};

describe('???', () => {
  test('foo', () => {
    const planner = new Planner(actions);
    const plan = planner.compute(start, { IS_SLEEPY: FALSE });
    expect(plan).toStrictEqual(['TO_KITCHEN', 'EAT', 'TO_BEDROOM', 'SLEEP']);
  });
});
