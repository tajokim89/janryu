// 잔류 — 추적자/소품/타일 한 줄 플레이버.

export const flavor: Record<string, string | string[]> = {
  // 추적자
  'wet-silhouette': [
    '맞은편 승강장에서, 물에 젖은 형체가 가만히 서 있다.',
    '발자국 소리는 없는데 그림자만 천천히 다가온다.',
  ],
  'dark-figure': [
    '복도 끝, 전등이 꺼진 자리에서 형체가 길어진다.',
    '광고판이 한 장 넘어가는 사이 자세가 바뀐다.',
  ],
  'classification-signal': '전광판이 한 글자 한 글자 천천히 호명한다.',

  // 소품
  flashlight: '비어 있는 분실물 보관함에서 꺼낸 손전등.',
  'info-board-end-of-service': '운행 종료 안내 전광판. 글자가 한참 멈춰 있다.',
  'station-office-window': '역무실 창. 안쪽이 어둡다.',
  'exit-shutter': '출구 위로 통제문이 천천히 내려와 있다.',
  'lost-and-found-note': '분실물 보관함 옆 작은 메모.',
  'wet-footprint-trail': '안쪽에서 바깥쪽으로 향한 젖은 발자국.',
  'flood-warning-poster': '구깃거리는 안내문. 글자가 번져 있다.',
  'platform-info-board': '승강장 전광판. 열차 진입을 알린다.',
  'platform-warning-sign': '선로 접근 금지 표지.',
  'transfer-current-location-sign': '현재 위치를 알리는 표지.',
  'transfer-current-location-warped': '같은 표지 — 글자가 군데군데 가려져 있다.',
  'classification-warning': '관리용 경고문. 글자가 또렷하다.',
  'classification-procedure': '분류 절차 안내문 조각. 끝부분이 찢겨 있다.',
  'final-info-board': '중앙 전광판. 두 가지 안내가 번갈아 흐른다.',
  'final-graffiti': '벽에 휘갈긴 손글씨.',

  // 타일
  'station-room': '역무실 안. 안쪽으로 몸을 들이면 시야가 좁아진다.',
  'pillar-corner': '기둥 뒤. 빛 그늘 속에 들어가면 보이지 않는다.',
  'wet-floor': '바닥이 살짝 젖어 있다.',
  'shallow-water': '발목까지 차오른 물.',
  flooded: '물이 가득 차 더 이상 들어갈 수 없다.',
};

export function getFlavor(id: string): string | null {
  const v = flavor[id];
  if (!v) return null;
  if (Array.isArray(v)) {
    if (v.length === 0) return null;
    return v[Math.floor(Math.random() * v.length)] ?? null;
  }
  return v;
}
