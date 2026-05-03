// 잔류 — 챕터 정의.
// 5구역(0~4)을 한 챕터로 묶음. 챕터 진행 = zone 단위 descend.

export interface ChapterDef {
  id: string;
  title: string;
  intro: string;
  outro: string;
  zoneIds: string[];
}

export const chapters: ChapterDef[] = [
  {
    id: 'janryu',
    title: '잔류',
    intro: '폭우는 멈추지 않는다. 객실에는 아무도 없다. 역에 내렸지만 출구 위로 통제문이 내려오고 있다.',
    outro: '안내가 끝났다.',
    zoneIds: [
      'zone-station-0',
      'zone-station-1',
      'zone-station-2',
      'zone-station-3',
      'zone-station-4',
    ],
  },
];
