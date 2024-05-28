import { describe, test, expect } from 'vitest';
import { Planner } from '../Planner';
import { Condition } from '../types';

const { TRUE, FALSE, TRUTHY, NEUTRAL } = Condition;

const actions = [
  {
    id: 'TAKE_COVER',
    before: { IN_COVER: FALSE },
    after: { IN_COVER: TRUE }
  },
  {
    id: 'LEAVE_COVER',
    before: { IN_COVER: TRUE },
    after: { IN_COVER: FALSE }
  },
  {
    id: 'FIND_AMMO',
    before: { HAS_AMMO: FALSE, IN_COVER: FALSE },
    after: { HAS_AMMO: TRUE }
  },
  {
    id: 'ATTACK',
    before: { HAS_AMMO: TRUE, IN_COVER: FALSE, HAS_ENEMY: TRUE },
    after: { HAS_ENEMY: FALSE }
  },
  {
    id: 'WAIT_FOR_BACKUP',
    before: { IN_COVER: TRUE, HAS_ENEMY: TRUE },
    after: { HAS_ENEMY: FALSE },
    cost: 6
  }
];

describe('combat example', () => {
  test('can take more expensive actions if personal preferences are violated', () => {
    const planner = new Planner(actions, { IN_COVER: TRUTHY });
    const plan = planner.compute(
      { HAS_ENEMY: TRUE, HAS_AMMO: FALSE, IN_COVER: TRUE },
      { HAS_ENEMY: FALSE }
    );
    expect(plan).toStrictEqual(['WAIT_FOR_BACKUP']);
  });

  test('can take more expensive actions if personal preferences are violated', () => {
    const planner = new Planner(actions, { IN_COVER: NEUTRAL });
    const plan = planner.compute(
      { HAS_ENEMY: TRUE, HAS_AMMO: FALSE, IN_COVER: TRUE },
      { HAS_ENEMY: FALSE }
    );
    expect(plan).toStrictEqual(['LEAVE_COVER', 'FIND_AMMO', 'ATTACK']);
  });
});
