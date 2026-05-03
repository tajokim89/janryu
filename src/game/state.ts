// Save/Load payload 타입.
// localStorage 슬롯에 JSON 직렬화되어 들어감 — 직렬화 가능 자료형만 사용.
//
// version: 호환성 깨질 변경이 생기면 올림. 로더가 모르는 버전이면 무시.

export interface GameSnapshot {
  version: 1;
  chapterId: string;
  zoneId: string;
  player: {
    x: number;
    y: number;
    facing: 'down' | 'up' | 'left' | 'right';
  };
  stalker: {
    id: string;
    x: number;
    y: number;
  };
  state: 'safe' | 'spotted' | 'hidden';
  flashlight: {
    acquired: boolean;
    on: boolean;
    battery: number;
    capacity: number;
  };
  stalkerAggressive?: boolean;
  inventory: string[];
  narrative: {
    facts: string[];
    flags: Record<string, boolean>;
    fired: string[];
    unlockedCodex: string[];
    turnCount?: number;
  };
  fov: {
    explored: string[];
  };
  savedAtIso: string;
  label: string;
}

// zone 간 이동 시 다음 GameScene 으로 넘기는 carry-over.
// player/stalker/fov 는 새 zone 의 default 를 사용 — 아이템·손전등·내러티브만 유지.
export interface ZoneCarry {
  inventory: string[];
  flashlight: GameSnapshot['flashlight'];
  narrative: GameSnapshot['narrative'];
}
