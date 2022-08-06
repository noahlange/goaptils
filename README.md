# GOAPtils

A basic, dependency-less GOAP planner in TypeScript based on [Malwoden's](https://malwoden.com) [AStar](https://github.com/Aedalus/malwoden/blob/develop/src/pathfinding/astar.ts) implementation.

The only notable implementation detail is support for "rules" that automatically
modify action costs based on a static preference set.

> Example: Bob is hungry, tired and wants to go to bed. Bob could walk to the
> store and buy food or order pizza. Ordering pizza will take more time, but
> won't require him to go outside. Even if Bob dislikes going outside, he'll
> walk to the store if it's significantly faster than waiting for pizza. But if
> Bob hates going outside, he'll wait for the pizza no matter how long it takes.

Rules are primarily useful to differentiate actors without having to manually
adjust action costs.

```ts
import { Planner, TRUTHY, NEUTRAL, FALSY, FALSE } from 'goaptils';
import { actions } from './wherever';

// stored in JSON, for example. Conditions range from -2/+2.
const ai = {
  coward: { IN_DANGER: FALSE },
  normal: { IN_DANGER: FALSY },
  brave: { IN_DANGER: NEUTRAL },
  suicidal: { IN_DANGER: TRUTHY }
};

// will never put self in danger
const plannerA = new Planner(actions, ai.coward);
// will avoid putting self in danger
const plannerB = new Planner(actions, ai.normal);
// will not avoid putting self in danger
const plannerC = new Planner(actions, ai.brave);
// will prefer dangerous actions
const plannerD = new Planner(actions, ai.suicidal);
```
