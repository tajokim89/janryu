// 키보드 → 추상화된 의도(Intent) 매핑.
// 게임 로직은 raw 키 코드 절대 안 본다. Intent 만 본다.
// 새 키바인딩: KEY_TO_INTENT 에 한 줄.
//
// 호러 탐험 컨셉 보일러플레이트 — 전투 의도 없음.
// 핵심 의도: move, wait, confirm, cancel, interact, hide, use, pickup, descend.

export type Intent =
  | { kind: 'move'; dx: number; dy: number }
  | { kind: 'wait' }
  | { kind: 'confirm' }
  | { kind: 'cancel' }
  | { kind: 'menu' }
  | { kind: 'interact' } // e — 일반 상호작용 (메모 읽기, 라디오 켜기, 문 열기)
  | { kind: 'hide' }     // c — 은신 토글 (락커/구석/책상 밑에 들어가거나 나오기)
  | { kind: 'use' }      // f — 손전등 토글, 휴대 도구 사용
  | { kind: 'inventory' }
  | { kind: 'pickup' }
  | { kind: 'descend' }  // > — 다음 구역으로 진입(계단/탈출구)
  | { kind: 'codex' };   // ? — 모은 문서/방송 목록 열기

const KEY_TO_INTENT: Record<string, Intent> = {
  // 이동: 화살표 + WASD + vi-keys
  ArrowLeft: { kind: 'move', dx: -1, dy: 0 },
  ArrowRight: { kind: 'move', dx: 1, dy: 0 },
  ArrowUp: { kind: 'move', dx: 0, dy: -1 },
  ArrowDown: { kind: 'move', dx: 0, dy: 1 },
  a: { kind: 'move', dx: -1, dy: 0 },
  d: { kind: 'move', dx: 1, dy: 0 },
  w: { kind: 'move', dx: 0, dy: -1 },
  s: { kind: 'move', dx: 0, dy: 1 },
  h: { kind: 'move', dx: -1, dy: 0 },
  l: { kind: 'move', dx: 1, dy: 0 },
  k: { kind: 'move', dx: 0, dy: -1 },
  j: { kind: 'move', dx: 0, dy: 1 },
  // 액션
  '.': { kind: 'wait' },
  Enter: { kind: 'confirm' },
  ' ': { kind: 'confirm' },
  Escape: { kind: 'cancel' },
  Tab: { kind: 'menu' },
  e: { kind: 'interact' },
  c: { kind: 'hide' },
  f: { kind: 'use' },
  i: { kind: 'inventory' },
  g: { kind: 'pickup' },
  '>': { kind: 'descend' },
  '?': { kind: 'codex' },
};

export type IntentListener = (intent: Intent) => void;

export class Input {
  // 이동 키 자동 반복 — 첫 발화 후 DELAY 대기, 그 후 INTERVAL 마다 반복.
  // 너무 빠르면 칸 단위 게임이 휘리릭 흘러감. 200/100 이 손에 익는 균형점.
  private static REPEAT_DELAY_MS = 200;
  private static REPEAT_INTERVAL_MS = 100;

  private listeners = new Set<IntentListener>();
  private down = new Set<string>();
  private boundDown = this.onKeyDown.bind(this);
  private boundUp = this.onKeyUp.bind(this);
  private repeatKey: string | null = null;
  private repeatTimeout: number | null = null;
  private repeatInterval: number | null = null;

  attach(target: Window | HTMLElement = window): void {
    target.addEventListener('keydown', this.boundDown as EventListener);
    target.addEventListener('keyup', this.boundUp as EventListener);
  }

  detach(target: Window | HTMLElement = window): void {
    this.stopRepeat();
    target.removeEventListener('keydown', this.boundDown as EventListener);
    target.removeEventListener('keyup', this.boundUp as EventListener);
  }

  onIntent(listener: IntentListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * 키보드 외 입력원(게임패드/터치) 이 Intent 를 직접 발행할 때 사용.
   * 모든 listener 에게 즉시 전달.
   */
  trigger(intent: Intent): void {
    this.dispatch(intent);
  }

  isDown(key: string): boolean {
    return this.down.has(key);
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (event.repeat) return; // 브라우저 기본 반복 무시 — 자체 반복 사용.
    this.down.add(event.key);
    const intent = KEY_TO_INTENT[event.key];
    if (!intent) return;
    event.preventDefault();
    this.dispatch(intent);
    // 이동 의도만 자동 반복. 상호작용·메뉴 같은 단발 의도는 한 번씩만 발화.
    if (intent.kind === 'move') {
      this.startRepeat(event.key, intent);
    }
  }

  private onKeyUp(event: KeyboardEvent): void {
    this.down.delete(event.key);
    if (this.repeatKey === event.key) this.stopRepeat();
  }

  private dispatch(intent: Intent): void {
    for (const listener of this.listeners) listener(intent);
  }

  private startRepeat(key: string, intent: Intent): void {
    this.stopRepeat();
    this.repeatKey = key;
    // 첫 반복까지 짧게 대기 — 단발 입력이 의도였던 경우 자동반복 안 시작되도록.
    this.repeatTimeout = window.setTimeout(() => {
      this.repeatTimeout = null;
      this.repeatInterval = window.setInterval(() => {
        if (this.repeatKey !== key || !this.down.has(key)) {
          this.stopRepeat();
          return;
        }
        this.dispatch(intent);
      }, Input.REPEAT_INTERVAL_MS);
    }, Input.REPEAT_DELAY_MS);
  }

  private stopRepeat(): void {
    if (this.repeatTimeout != null) {
      clearTimeout(this.repeatTimeout);
      this.repeatTimeout = null;
    }
    if (this.repeatInterval != null) {
      clearInterval(this.repeatInterval);
      this.repeatInterval = null;
    }
    this.repeatKey = null;
  }
}
