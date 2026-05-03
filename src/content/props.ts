// 잔류 — 소품 (환경 서사 매개체).
// 무기 없음. props 는 정보 수집·잠금 해제·시야 도구.

export type PropEffect =
  | { kind: 'light'; radius: number; battery?: number }
  | { kind: 'unlock'; doorId: string }
  | { kind: 'broadcast'; broadcastId: string }
  | { kind: 'document'; documentId: string }
  | { kind: 'sign'; signId: string }
  | { kind: 'tool'; action: string };

export type PropKind = 'pickup' | 'fixed';

export interface PropDef {
  id: string;
  name: string;
  sprite: string;
  kind: PropKind;
  effect: PropEffect;
}

export const props: PropDef[] = [
  // 0구역 — 역사 입구 / 개찰구
  {
    id: 'info-board-end-of-service',
    name: '운행 종료 안내 전광판',
    sprite: 'prop-info-board',
    kind: 'fixed',
    effect: { kind: 'sign', signId: 'sign-end-of-service' },
  },
  {
    id: 'station-office-window',
    name: '역무실 창',
    sprite: 'prop-station-office-window',
    kind: 'fixed',
    effect: { kind: 'document', documentId: 'doc-station-office-empty' },
  },
  {
    id: 'exit-shutter',
    name: '출구 통제문',
    sprite: 'prop-exit-shutter',
    kind: 'fixed',
    effect: { kind: 'sign', signId: 'sign-exit-shutter-down' },
  },
  {
    id: 'lost-and-found-note',
    name: '분실물 안내',
    sprite: 'prop-note',
    kind: 'fixed',
    effect: { kind: 'document', documentId: 'doc-lost-and-found' },
  },
  {
    id: 'wet-footprint-trail',
    name: '젖은 발자국',
    sprite: 'prop-wet-footprint',
    kind: 'fixed',
    effect: { kind: 'sign', signId: 'sign-wet-footprint' },
  },

  // 1구역 — 대합실
  {
    id: 'flood-warning-poster',
    name: '침수 안내문',
    sprite: 'prop-poster',
    kind: 'fixed',
    effect: { kind: 'document', documentId: 'doc-flood-warning' },
  },

  // 2구역 — 승강장
  {
    id: 'platform-info-board',
    name: '승강장 전광판',
    sprite: 'prop-info-board',
    kind: 'fixed',
    effect: { kind: 'sign', signId: 'sign-train-incoming' },
  },
  {
    id: 'platform-warning-sign',
    name: '선로 접근 금지',
    sprite: 'prop-sign',
    kind: 'fixed',
    effect: { kind: 'sign', signId: 'sign-platform-control' },
  },

  // 3구역 — 환승 통로
  {
    id: 'transfer-current-location-sign',
    name: '현재 위치 표지',
    sprite: 'prop-sign',
    kind: 'fixed',
    effect: { kind: 'sign', signId: 'sign-current-location' },
  },
  {
    id: 'transfer-current-location-warped',
    name: '현재 위치 표지(2)',
    sprite: 'prop-sign',
    kind: 'fixed',
    effect: { kind: 'sign', signId: 'sign-current-location-warped' },
  },

  // 메모 조각 (구역 어디서나)
  {
    id: 'note-second-warning',
    name: '메모 조각',
    sprite: 'prop-note',
    kind: 'fixed',
    effect: { kind: 'document', documentId: 'doc-second-warning' },
  },
  {
    id: 'note-no-staff',
    name: '메모 조각',
    sprite: 'prop-note',
    kind: 'fixed',
    effect: { kind: 'document', documentId: 'doc-no-staff' },
  },
  {
    id: 'note-do-not-look',
    name: '메모 조각',
    sprite: 'prop-note',
    kind: 'fixed',
    effect: { kind: 'document', documentId: 'doc-do-not-look' },
  },
  {
    id: 'note-board-no',
    name: '메모 조각',
    sprite: 'prop-note',
    kind: 'fixed',
    effect: { kind: 'document', documentId: 'doc-board-no' },
  },
  {
    id: 'note-three-times',
    name: '메모 조각',
    sprite: 'prop-note',
    kind: 'fixed',
    effect: { kind: 'document', documentId: 'doc-three-times' },
  },
  {
    id: 'note-name-call',
    name: '메모 조각',
    sprite: 'prop-note',
    kind: 'fixed',
    effect: { kind: 'document', documentId: 'doc-name-call' },
  },
  {
    id: 'note-cant-go-up',
    name: '영수증 뒷면',
    sprite: 'prop-note',
    kind: 'fixed',
    effect: { kind: 'document', documentId: 'doc-cant-go-up' },
  },

  // 4구역 — 폐쇄 선로 아래
  {
    id: 'classification-warning',
    name: '관리용 경고문',
    sprite: 'prop-poster',
    kind: 'fixed',
    effect: { kind: 'sign', signId: 'sign-no-trespass' },
  },
  {
    id: 'classification-procedure',
    name: '분류 절차 안내문',
    sprite: 'prop-poster',
    kind: 'fixed',
    effect: { kind: 'document', documentId: 'doc-classification-procedure' },
  },
  {
    id: 'final-info-board',
    name: '최종 전광판',
    sprite: 'prop-info-board',
    kind: 'fixed',
    effect: { kind: 'sign', signId: 'sign-final-board' },
  },
  {
    id: 'final-graffiti',
    name: '낙서',
    sprite: 'prop-note',
    kind: 'fixed',
    effect: { kind: 'document', documentId: 'doc-final-graffiti' },
  },

  // 픽업
  {
    id: 'flashlight',
    name: '손전등',
    sprite: 'prop-flashlight',
    kind: 'pickup',
    effect: { kind: 'light', radius: 5, battery: 100 },
  },
];
