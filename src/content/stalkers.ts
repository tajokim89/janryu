// 잔류 — 추적자.
// 0~1구역: 없음. 위화감과 안내만.
// 2구역: 첫 추적 (젖은 실루엣 — 맞은편 승강장에서 다가옴).
// 3구역: 검은 형체 (반복 통로에서 출현).
// 4구역: 분류 신호 자체가 추적자처럼 작동.

export type StalkerBehavior =
  | 'idle'
  | 'patrol'
  | 'wander'
  | 'sound-driven';

export type CatchEffect =
  | { kind: 'death' }
  | { kind: 'restart-zone' }
  | { kind: 'sanity'; amount: number }
  | { kind: 'teleport'; targetTile: string }
  | { kind: 'flag'; id: string };

export interface StalkerDef {
  id: string;
  name: string;
  sprite: string;
  speed: number;
  detectionRange: number;
  loseInterestRange: number;
  hearing: number;
  behavior: StalkerBehavior;
  catchEffect: CatchEffect;
  spawnWeight: number;
}

export const stalkers: StalkerDef[] = [
  {
    id: 'wet-silhouette',
    name: '젖은 실루엣',
    sprite: 'stalker-wet-silhouette',
    speed: 60,
    detectionRange: 4,
    loseInterestRange: 10,
    hearing: 3,
    behavior: 'wander',
    catchEffect: { kind: 'flag', id: 'contamination-caught-by-silhouette' },
    spawnWeight: 5,
  },
  {
    id: 'dark-figure',
    name: '검은 형체',
    sprite: 'stalker-dark-figure',
    speed: 80,
    detectionRange: 5,
    loseInterestRange: 9,
    hearing: 4,
    behavior: 'sound-driven',
    catchEffect: { kind: 'flag', id: 'contamination-caught-by-figure' },
    spawnWeight: 5,
  },
  {
    id: 'classification-signal',
    name: '분류 신호',
    sprite: 'stalker-classification-signal',
    speed: 40,
    detectionRange: 8,
    loseInterestRange: 0,
    hearing: 0,
    behavior: 'idle',
    catchEffect: { kind: 'flag', id: 'classification-completed' },
    spawnWeight: 0,
  },
];
