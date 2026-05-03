// 잔류 — 침수된 지하철역 타일.
// 핵심: 물은 수위 상승보다 공간 잠식. flooded 는 못 지나감, shallow-water 는 지나갈 수 있다.
// hidesPlayer 는 추적이 시작되는 2구역 이후에서만 의미가 있다.

export interface TileDef {
  id: string;
  walkable: boolean;
  transparent: boolean; // 시야 차단 여부 — 적·플레이어 시야 모두에 영향
  hidesPlayer: boolean; // 이 타일에서 hide 토글 가능 여부
  trigger?: string;     // 진입 시 트리거할 환경 이벤트 id
  sprite: string;
}

export const tiles: TileDef[] = [
  { id: 'floor',         walkable: true,  transparent: true,  hidesPlayer: false, sprite: 'tile-floor' },
  { id: 'wall',          walkable: false, transparent: false, hidesPlayer: false, sprite: 'tile-wall' },
  { id: 'pillar',        walkable: false, transparent: false, hidesPlayer: false, sprite: 'tile-pillar' },
  { id: 'ticket-gate',   walkable: true,  transparent: true,  hidesPlayer: false, sprite: 'tile-ticket-gate' },
  { id: 'sealed-door',   walkable: false, transparent: false, hidesPlayer: false, sprite: 'tile-sealed-door' },
  { id: 'wet-floor',     walkable: true,  transparent: true,  hidesPlayer: false, sprite: 'tile-wet-floor' },
  { id: 'shallow-water', walkable: true,  transparent: true,  hidesPlayer: false, sprite: 'tile-shallow-water' },
  { id: 'flooded',       walkable: false, transparent: true,  hidesPlayer: false, sprite: 'tile-flooded' },
  { id: 'station-room',  walkable: true,  transparent: true,  hidesPlayer: true,  sprite: 'tile-station-room' },
  { id: 'pillar-corner', walkable: true,  transparent: true,  hidesPlayer: true,  sprite: 'tile-pillar-corner' },
  { id: 'platform-edge', walkable: false, transparent: true,  hidesPlayer: false, sprite: 'tile-platform-edge' },
  { id: 'stairs-down',   walkable: true,  transparent: true,  hidesPlayer: false, sprite: 'tile-stairs-down' },
  { id: 'exit',          walkable: true,  transparent: true,  hidesPlayer: false, sprite: 'tile-exit' },
];
