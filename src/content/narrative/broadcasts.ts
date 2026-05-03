// 잔류 — 자동 안내방송.
// 잔류는 대부분 시각적 안내(전광판/포스터)로 풀지만, 결정적 순간엔 PA 음성으로도 흘러나온다.

export interface BroadcastEntry {
  id: string;
  source: string;
  lines: string[];
  loop?: boolean;
  unlocksCodex?: string;
}

export const broadcasts: BroadcastEntry[] = [
  {
    id: 'bc-end-of-service',
    source: '안내방송',
    lines: [
      '— 지지직 —',
      '오늘 열차 운행이 종료되었습니다.',
      '다음 열차는 운행하지 않습니다.',
      '역사 내 장시간 체류를 삼가 주십시오.',
    ],
    loop: false,
  },
  {
    id: 'bc-flood-warning',
    source: '안내방송',
    lines: [
      '— 안내방송 —',
      '현재 역사 내 일부 구간에 누수 및 침수 위험이 발생하였습니다.',
      '안내가 끝나기 전까지 이동하지 마십시오.',
      '선로 방향의 소리를 확인하기 위해 몸을 숙이지 마십시오.',
      '본 역은 승객의 성명을 안내하지 않습니다.',
    ],
    loop: false,
    unlocksCodex: 'codex-mismatched-rules',
  },
  {
    id: 'bc-classification',
    source: '분류 안내',
    lines: [
      '— 안내 —',
      '귀가 대상 확인 중.',
      '잔류 승객 확인 중.',
      '확인되지 않은 귀가는 허용되지 않습니다.',
      '호명되지 않은 승객은 응답하지 마십시오.',
    ],
    loop: true,
    unlocksCodex: 'codex-classification',
  },
];

export function findBroadcast(id: string): BroadcastEntry | undefined {
  return broadcasts.find((b) => b.id === id);
}
