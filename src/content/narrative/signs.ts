// 잔류 — 환경 표지판/전광판 텍스트.

export interface SignEntry {
  id: string;
  body: string;
}

export const signs: SignEntry[] = [
  // 0구역
  {
    id: 'sign-end-of-service',
    body: '오늘 운행 종료\n다음 열차는 운행하지 않습니다.\n역사 내 장시간 체류를 삼가 주십시오.',
  },
  {
    id: 'sign-exit-shutter-down',
    body: '출구 통제 중\n안내가 끝나기 전까지 통제문을 무리하게 들어 올리지 마십시오.',
  },
  {
    id: 'sign-wet-footprint',
    body: '안쪽에서 바깥쪽으로 향한 젖은 발자국이 길게 이어진다.\n발자국은 출구 직전에서 끊긴다.',
  },

  // 2구역
  {
    id: 'sign-train-incoming',
    body: '열차 진입 중\n선로 안쪽으로 물러나 주십시오.',
  },
  {
    id: 'sign-platform-control',
    body: '선로 접근 금지\n임의로 끝선 밖으로 나가지 마십시오.',
  },

  // 3구역
  {
    id: 'sign-current-location',
    body: '현재 위치 — 환승 통로\n외부 출구는 위 방향으로 두 층.',
  },
  {
    id: 'sign-current-location-warped',
    body: '현재 위치 — 환승 통로\n외부 출구는 ████ 방향으로 ██층.',
  },
  {
    id: 'sign-do-not-respond',
    body: '호명되지 않은 승객은 응답하지 마십시오.',
  },

  // 4구역
  {
    id: 'sign-no-trespass',
    body: '무단 진입 금지\n지정 인원 외 출입 불가.\n확인 절차 없이 개방하지 마십시오.',
  },
  {
    id: 'sign-final-board',
    body: '귀가 대상 확인 중\n잔류 승객 확인 중\n호명되지 않은 승객은 응답하지 마십시오.',
  },
];

export function findSign(id: string): SignEntry | undefined {
  return signs.find((s) => s.id === id);
}
