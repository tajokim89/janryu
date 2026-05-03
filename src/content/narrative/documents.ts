// 잔류 — 메모, 안내문, 낙서.

export interface DocumentEntry {
  id: string;
  title: string;
  body: string;
  unlocksCodex?: string;
}

export const documents: DocumentEntry[] = [
  // 0구역
  {
    id: 'doc-station-office-empty',
    title: '역무실 창 너머',
    body: '창문 안쪽이 어둡다.\n명패는 그대로지만 의자만 비어 있다. 모니터에는 아무 것도 띄워져 있지 않다.\n부재중 알림은 켜져 있지 않다.',
  },
  {
    id: 'doc-lost-and-found',
    title: '분실물 안내',
    body: '우산 분실물은 마감 후 보관실로 이동.\n음식물 반입 흔적 발견 시 바로 폐기.',
  },

  // 1구역 — 긴 안내문
  {
    id: 'doc-flood-warning',
    title: '침수 시 승객 대피 안내',
    body: '현재 역사 내 일부 구간에 누수 및 침수 위험이 발생하였으므로, 아래 안내를 끝까지 확인하신 뒤 이동해 주시기 바랍니다.\n\n1. 안내가 끝나기 전까지 이동하지 마십시오.\n2. 선로 방향의 소리를 확인하기 위해 몸을 숙이지 마십시오.\n3. 물에 젖은 승객이 먼저 말을 걸 경우 응답하지 마십시오.\n4. 본 역은 승객의 성명을 안내하지 않습니다.\n5. 마지막 ███ 안내 이후에 역에 ████ 승객은',
    unlocksCodex: 'codex-mismatched-rules',
  },

  // 메모 조각들
  {
    id: 'doc-second-warning',
    title: '메모 조각',
    body: '두 번째 안내부터는 믿지 마.',
  },
  {
    id: 'doc-no-staff',
    title: '메모 조각',
    body: '직원이 안 오면 다시 누르지 마.',
  },
  {
    id: 'doc-do-not-look',
    title: '메모 조각',
    body: '불빛 없으면 보지 마.\n소리는 없었는데 전광판이 먼저 떴음.\n보고 있으면 오는 것 같아.\n벽 쪽으로 붙어야 함.',
  },
  {
    id: 'doc-board-no',
    title: '메모 조각',
    body: '두 번째 표지판부터는 보지 말 것.',
  },
  {
    id: 'doc-three-times',
    title: '메모 조각',
    body: '같은 광고를 세 번 보면 돌아간 게 아님.',
    unlocksCodex: 'codex-loop-structure',
  },
  {
    id: 'doc-name-call',
    title: '메모 조각',
    body: '이름 부르면 뛰지 말고 벽 쪽으로.\n뒤돌아보면 더 가까워짐.',
    unlocksCodex: 'codex-name-calling',
  },
  {
    id: 'doc-cant-go-up',
    title: '영수증 뒷면',
    body: '여기서부터는 위로 못 감.',
  },

  // 4구역
  {
    id: 'doc-classification-procedure',
    title: '분류 절차 안내문 조각',
    body: '잔류 승객 확인 절차\n1. 중앙선 안에서 대기\n2. 호명 전 이동 금지\n3. 귀가 대상 외 ███',
    unlocksCodex: 'codex-classification',
  },
  {
    id: 'doc-final-graffiti',
    title: '낙서',
    body: '여기가 출구면 왜 아무도 없지.\n끝까지 남으면 세어진다.\n귀가 대상 외.',
  },
];

export function findDocument(id: string): DocumentEntry | undefined {
  return documents.find((d) => d.id === id);
}
