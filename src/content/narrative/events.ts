// 잔류 — 환경 트리거 이벤트.
// 각 구역의 핵심 연출과 분기 발화점을 데이터로 묶음.
// 4축(규칙·오염·조사도·유인반응)은 이후 카운터로 확장 예정 — 현재는 setFlag 으로 표시만.

export type Condition =
  | { kind: 'enterTile'; tileId: string }
  | { kind: 'enterZone'; zoneId: string }
  | { kind: 'pickup'; propId: string }
  | { kind: 'documentRead'; documentId: string }
  | { kind: 'broadcastHeard'; broadcastId: string }
  | { kind: 'detected' }
  | { kind: 'caught' }
  | { kind: 'flag'; id: string; value?: boolean }
  | { kind: 'turnGte'; value: number }
  | { kind: 'and'; all: Condition[] }
  | { kind: 'or'; any: Condition[] }
  | { kind: 'not'; cond: Condition };

export type Effect =
  | { kind: 'message'; text: string; tone?: 'info' | 'warn' | 'danger' }
  | { kind: 'lightsOut'; turns: number }
  | { kind: 'noise'; x: number; y: number; loudness: number }
  | { kind: 'spawnStalker'; stalkerId: string; x: number; y: number }
  | { kind: 'openDocument'; documentId: string }
  | { kind: 'playBroadcast'; broadcastId: string }
  | { kind: 'unlockCodex'; entryId: string }
  | { kind: 'setFlag'; id: string; value: boolean }
  | { kind: 'goEnding'; endingId: string };

export interface NarrativeEvent {
  id: string;
  trigger: Condition;
  then: Effect[];
  once?: boolean;
}

export const narrativeEvents: NarrativeEvent[] = [
  // 0구역
  {
    id: 'enter-station-0',
    trigger: { kind: 'enterZone', zoneId: 'zone-station-0' },
    then: [{ kind: 'message', text: '23:42. 출구 위 통제문이 내려오고 있다.', tone: 'warn' }],
    once: true,
  },
  // 0구역 — 5턴 이상 머무르면 운행 종료 안내방송이 자동 흘러나옴.
  {
    id: 'auto-bc-end-of-service',
    trigger: { kind: 'and', all: [
      { kind: 'enterZone', zoneId: 'zone-station-0' },
      { kind: 'turnGte', value: 5 },
    ]},
    then: [{ kind: 'playBroadcast', broadcastId: 'bc-end-of-service' }],
    once: true,
  },
  // 0구역 — 젖은 바닥 첫 진입 시 ambient 메시지.
  {
    id: 'wet-floor-first-touch',
    trigger: { kind: 'and', all: [
      { kind: 'enterZone', zoneId: 'zone-station-0' },
      { kind: 'enterTile', tileId: 'wet-floor' },
    ]},
    then: [{ kind: 'message', text: '바닥이 젖어 있다. 안쪽에서 발자국이 지나간 자국.', tone: 'info' }],
    once: true,
  },
  // 0구역 — 통제문(sealed-door) 가까이 가면 간접 메시지 (실제 sealed-door 위엔 못 서므로 인접한 floor 트리거 대용은 향후).
  {
    id: 'shutter-noticed',
    trigger: { kind: 'documentRead', documentId: 'doc-station-office-empty' },
    then: [{ kind: 'message', text: '뒤에서 통제문이 한 단계 더 내려오는 소리가 들린다.', tone: 'warn' }],
    once: true,
  },
  {
    id: 'station-office-empty-read',
    trigger: { kind: 'documentRead', documentId: 'doc-station-office-empty' },
    then: [
      { kind: 'message', text: '역무원은 부재중 알림조차 켜 두지 않았다.', tone: 'info' },
      { kind: 'setFlag', id: 'investigation-saw-empty-office', value: true },
    ],
    once: true,
  },
  {
    id: 'lost-and-found-read',
    trigger: { kind: 'documentRead', documentId: 'doc-lost-and-found' },
    then: [{ kind: 'setFlag', id: 'investigation-read-lost-and-found', value: true }],
    once: true,
  },

  // 1구역
  {
    id: 'enter-station-1',
    trigger: { kind: 'enterZone', zoneId: 'zone-station-1' },
    then: [{ kind: 'message', text: '대합실. 안내문이 벽 한 면을 채우고 있다.', tone: 'warn' }],
    once: true,
  },
  // 1구역 — 진입 직후 침수 안내방송 자동 재생.
  {
    id: 'auto-bc-flood-warning',
    trigger: { kind: 'and', all: [
      { kind: 'enterZone', zoneId: 'zone-station-1' },
      { kind: 'turnGte', value: 3 },
    ]},
    then: [{ kind: 'playBroadcast', broadcastId: 'bc-flood-warning' }],
    once: true,
  },
  {
    id: 'flood-warning-read',
    trigger: { kind: 'documentRead', documentId: 'doc-flood-warning' },
    then: [
      { kind: 'unlockCodex', entryId: 'codex-mismatched-rules' },
      { kind: 'setFlag', id: 'investigation-read-flood-warning', value: true },
    ],
    once: true,
  },
  {
    id: 'flood-broadcast-heard',
    trigger: { kind: 'broadcastHeard', broadcastId: 'bc-flood-warning' },
    then: [{ kind: 'unlockCodex', entryId: 'codex-mismatched-rules' }],
    once: true,
  },
  {
    id: 'classification-broadcast-heard',
    trigger: { kind: 'broadcastHeard', broadcastId: 'bc-classification' },
    then: [{ kind: 'unlockCodex', entryId: 'codex-classification' }],
    once: true,
  },
  {
    id: 'second-warning-read',
    trigger: { kind: 'documentRead', documentId: 'doc-second-warning' },
    then: [
      { kind: 'message', text: '두 번째 안내부터는 믿지 말라고 적혀 있다.', tone: 'info' },
      { kind: 'setFlag', id: 'rule-knew-second-warning', value: true },
    ],
    once: true,
  },

  // 2구역
  {
    id: 'enter-station-2',
    trigger: { kind: 'enterZone', zoneId: 'zone-station-2' },
    then: [{ kind: 'message', text: '승강장. 마른 바닥이 점점 줄어든다.', tone: 'warn' }],
    once: true,
  },
  {
    id: 'first-detection',
    trigger: { kind: 'detected' },
    then: [{ kind: 'message', text: '들켰다. 발걸음이 멈췄다.', tone: 'danger' }],
    once: true,
  },

  // 3구역
  {
    id: 'enter-station-3',
    trigger: { kind: 'enterZone', zoneId: 'zone-station-3' },
    then: [{ kind: 'message', text: '환승 통로. 같은 광고판이 또 보인다.', tone: 'warn' }],
    once: true,
  },
  {
    id: 'three-times-read',
    trigger: { kind: 'documentRead', documentId: 'doc-three-times' },
    then: [{ kind: 'unlockCodex', entryId: 'codex-loop-structure' }],
    once: true,
  },
  {
    id: 'name-call-read',
    trigger: { kind: 'documentRead', documentId: 'doc-name-call' },
    then: [{ kind: 'unlockCodex', entryId: 'codex-name-calling' }],
    once: true,
  },

  // 4구역
  {
    id: 'enter-station-4',
    trigger: { kind: 'enterZone', zoneId: 'zone-station-4' },
    then: [{ kind: 'message', text: '폐쇄 선로 아래. 중앙 전광판이 두 가지 안내를 번갈아 띄운다.', tone: 'danger' }],
    once: true,
  },
  // 4구역 — 진입 직후 분류 안내방송 자동 재생.
  {
    id: 'auto-bc-classification',
    trigger: { kind: 'and', all: [
      { kind: 'enterZone', zoneId: 'zone-station-4' },
      { kind: 'turnGte', value: 2 },
    ]},
    then: [{ kind: 'playBroadcast', broadcastId: 'bc-classification' }],
    once: true,
  },
  {
    id: 'classification-procedure-read',
    trigger: { kind: 'documentRead', documentId: 'doc-classification-procedure' },
    then: [
      { kind: 'unlockCodex', entryId: 'codex-classification' },
      { kind: 'setFlag', id: 'investigation-classified', value: true },
    ],
    once: true,
  },

  // 잡힘 — 4구역 도달 전이라면 잔류 엔딩.
  {
    id: 'caught-anywhere',
    trigger: { kind: 'caught' },
    then: [{ kind: 'goEnding', endingId: 'caught' }],
    once: true,
  },
];
