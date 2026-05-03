// 스프라이트 자산 레지스트리.
//
// 두 가지 소스에서 frame 이름 → Texture 매핑을 채운다:
//   1) public/assets/sprites/main.json (Aseprite Hash 포맷) — 있으면 자동 로드.
//   2) procedural placeholder — sprite name 을 시드로 한 카테고리별 형상.
//      진짜 자산이 없을 때 fallback. 같은 이름은 항상 같은 그림 (결정적).
//
// 게임 코드는 항상 `sprites.get(name)` 으로 받기 때문에 placeholder 든 진짜 자산이든
// 동일 경로. 새 sprite id 추가해도 placeholder 자동 발급.

import { Assets, Spritesheet, Texture } from 'pixi.js';
import { TILE_SIZE } from './renderer';

export class SpriteRegistry {
  private textures = new Map<string, Texture>();
  private animations = new Map<string, Texture[]>();

  /** 외부 spritesheet 로드. 실패해도 throw 안 하고 false 리턴 (placeholder 유지). */
  async loadSpritesheet(url: string): Promise<boolean> {
    try {
      const sheet = await Assets.load<Spritesheet>(url);
      let frameCount = 0;
      for (const name in sheet.textures) {
        const tex = sheet.textures[name];
        if (tex) {
          tex.source.scaleMode = 'nearest';
          this.textures.set(name, tex);
          frameCount += 1;
        }
      }
      let animCount = 0;
      const anims = sheet.animations as Record<string, Texture[]> | undefined;
      if (anims) {
        for (const name in anims) {
          const frames = anims[name];
          if (frames && frames.length > 0) {
            for (const t of frames) t.source.scaleMode = 'nearest';
            this.animations.set(name, frames);
            animCount += 1;
          }
        }
      }
      console.info(
        `[assets] loaded ${frameCount} frames + ${animCount} animations from ${url}`,
      );
      return frameCount > 0;
    } catch (err) {
      console.info(`[assets] no spritesheet at ${url} — using procedural placeholders`);
      return false;
    }
  }

  /** procedural placeholder 등록. 같은 이름이 이미 있으면 덮어쓰지 않음. */
  registerProcedural(name: string, color: number, label?: string): void {
    if (this.textures.has(name)) return;
    const texture = createProceduralTexture(name, color, label);
    texture.source.scaleMode = 'nearest';
    this.textures.set(name, texture);
  }

  get(name: string): Texture | null {
    return this.textures.get(name) ?? null;
  }

  has(name: string): boolean {
    return this.textures.has(name);
  }

  getAnimation(name: string): Texture[] | null {
    return this.animations.get(name) ?? null;
  }

  hasAnimation(name: string): boolean {
    return this.animations.has(name);
  }

  list(): string[] {
    return [...this.textures.keys()];
  }
}

// ============================================================================
// Procedural placeholder — name hash 시드 기반 변주
// ============================================================================
// 이름의 prefix 로 카테고리 결정 (tile / prop / stalker / player).
// 카테고리별 draw 함수는 시드 RNG 로 형상/패턴/색을 결정 — 같은 이름은 항상 같은 그림.

function createProceduralTexture(name: string, color: number, label?: string): Texture {
  const S = TILE_SIZE;
  const canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext('2d');
  if (!ctx) return Texture.WHITE;

  const rng = seedFrom(name);

  if (name.startsWith('tile-')) {
    drawProceduralTile(ctx, color, rng, S);
  } else if (name.startsWith('prop-')) {
    drawProceduralProp(ctx, color, rng, S);
  } else if (name.startsWith('stalker-')) {
    drawProceduralStalker(ctx, rng, S);
  } else if (name.startsWith('player-')) {
    drawProceduralPlayer(ctx, name, rng, S);
  } else {
    drawDefaultPlaceholder(ctx, color, label, S);
  }

  return Texture.from(canvas);
}

// ----------------------------------------------------------------------------
// 시드 RNG (mulberry32) — 이름이 같으면 같은 시퀀스, 다르면 다른 시퀀스.
// ----------------------------------------------------------------------------
function seedFrom(name: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < name.length; i++) {
    h ^= name.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ----------------------------------------------------------------------------
// 타일 — 베이스 색 채움 + 시드 기반 패턴 7종 중 하나
// ----------------------------------------------------------------------------
function drawProceduralTile(
  ctx: CanvasRenderingContext2D,
  color: number,
  rng: () => number,
  S: number,
): void {
  ctx.fillStyle = hex(color);
  ctx.fillRect(0, 0, S, S);
  ctx.fillStyle = hex(darken(color, 0.65));

  const pattern = Math.floor(rng() * 7);
  switch (pattern) {
    case 0: {
      // 격자
      const step = 3 + Math.floor(rng() * 4);
      for (let i = step; i < S; i += step) {
        ctx.fillRect(i, 0, 1, S);
        ctx.fillRect(0, i, S, 1);
      }
      break;
    }
    case 1: {
      // 가로 줄
      const gap = 3 + Math.floor(rng() * 4);
      for (let y = gap; y < S; y += gap + 1) ctx.fillRect(0, y, S, 1);
      break;
    }
    case 2: {
      // 세로 줄 (벽 패널 느낌)
      const gap = 3 + Math.floor(rng() * 4);
      for (let x = gap; x < S; x += gap + 1) ctx.fillRect(x, 0, 1, S);
      break;
    }
    case 3: {
      // 점·잡티
      const count = 6 + Math.floor(rng() * 10);
      for (let i = 0; i < count; i++) {
        const x = Math.floor(rng() * S);
        const y = Math.floor(rng() * S);
        const sz = 1 + Math.floor(rng() * 2);
        ctx.fillRect(x, y, sz, sz);
      }
      break;
    }
    case 4: {
      // 체커
      const cell = 3 + Math.floor(rng() * 3);
      for (let y = 0; y < S; y += cell) {
        for (let x = 0; x < S; x += cell) {
          if ((Math.floor(x / cell) + Math.floor(y / cell)) % 2 === 0) {
            ctx.fillRect(x, y, cell, cell);
          }
        }
      }
      break;
    }
    case 5: {
      // 대각선
      const step = 4 + Math.floor(rng() * 3);
      for (let off = -S; off < S * 2; off += step) {
        for (let y = 0; y < S; y++) ctx.fillRect(off + y, y, 1, 1);
      }
      break;
    }
    case 6: {
      // 벽돌 (가로 라인 + 엇갈린 세로)
      const rowH = 4 + Math.floor(rng() * 3);
      const colW = 6 + Math.floor(rng() * 4);
      for (let y = 0; y < S; y += rowH) {
        const odd = Math.floor(y / rowH) % 2 === 1;
        const offset = odd ? Math.floor(colW / 2) : 0;
        for (let x = -colW; x < S + colW; x += colW) {
          ctx.fillRect(x + offset, y, 1, rowH);
        }
        ctx.fillRect(0, y, S, 1);
      }
      break;
    }
  }

  // 모서리 그림자 (모든 패턴 공통 — 입체감)
  ctx.fillStyle = hex(darken(color, 0.4));
  ctx.fillRect(0, S - 1, S, 1);
  ctx.fillRect(S - 1, 0, 1, S);
}

// ----------------------------------------------------------------------------
// 소품 — 투명 배경 + 시드 기반 형상 7종 중 하나
// ----------------------------------------------------------------------------
function drawProceduralProp(
  ctx: CanvasRenderingContext2D,
  color: number,
  rng: () => number,
  S: number,
): void {
  ctx.clearRect(0, 0, S, S);

  const c = hex(color);
  const dc = hex(darken(color, 0.5));
  const ac = hex(darken(color, 0.3));
  const kind = Math.floor(rng() * 7);

  switch (kind) {
    case 0: {
      // 폴 위 표지
      const w = 14 + Math.floor(rng() * 8);
      const h = 8 + Math.floor(rng() * 6);
      const x = Math.floor((S - w) / 2);
      const y = 4 + Math.floor(rng() * 4);
      ctx.fillStyle = c;
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = dc;
      ctx.fillRect(x, y, w, 1);
      ctx.fillRect(x, y, 1, h);
      ctx.fillStyle = hex(0xe8e4d8);
      ctx.fillRect(x + 2, y + Math.floor(h / 2), w - 4, 1);
      ctx.fillStyle = hex(0x222a30);
      ctx.fillRect(Math.floor(S / 2) - 1, y + h, 2, S - (y + h) - 1);
      break;
    }
    case 1: {
      // 가로 배너 / 전광판
      const w = S - 8;
      const h = 6 + Math.floor(rng() * 6);
      const x = 4;
      const y = Math.floor((S - h) / 2);
      ctx.fillStyle = c;
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = dc;
      ctx.fillRect(x, y + h - 1, w, 1);
      ctx.fillStyle = hex(0xa87038);
      ctx.fillRect(x + 2, y + Math.floor(h / 2), w - 4, 1);
      break;
    }
    case 2: {
      // 정방 창문 / 액자
      const inset = 4 + Math.floor(rng() * 3);
      ctx.fillStyle = c;
      ctx.fillRect(inset, inset, S - inset * 2, S - inset * 2);
      ctx.fillStyle = hex(0x0a0e14);
      ctx.fillRect(inset + 2, inset + 2, S - (inset + 2) * 2, S - (inset + 2) * 2);
      break;
    }
    case 3: {
      // 종이 / 메모
      const w = S - 12 - Math.floor(rng() * 4);
      const h = S - 14 - Math.floor(rng() * 4);
      const x = Math.floor((S - w) / 2);
      const y = Math.floor((S - h) / 2);
      ctx.fillStyle = hex(0xd8d4c8);
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = hex(0x3a3024);
      const lines = 2 + Math.floor(rng() * 3);
      for (let i = 0; i < lines; i++) {
        const cut = Math.floor(rng() * 5);
        ctx.fillRect(x + 2, y + 3 + i * 4, w - 4 - cut, 1);
      }
      break;
    }
    case 4: {
      // 두 개 짝 (발자국 / 한 쌍)
      ctx.fillStyle = c;
      const offset = 8 + Math.floor(rng() * 4);
      const w = 4 + Math.floor(rng() * 2);
      const h = 6 + Math.floor(rng() * 3);
      ctx.fillRect(6, 12, w, h);
      ctx.fillRect(6 + offset, 14, w, h);
      break;
    }
    case 5: {
      // 원통 (손전등 / 캔)
      const bodyY = Math.floor(S * 0.4) + Math.floor(rng() * 4);
      const bodyH = 5 + Math.floor(rng() * 2);
      const bodyX = 6;
      const bodyW = S - 14;
      ctx.fillStyle = c;
      ctx.fillRect(bodyX, bodyY, bodyW, bodyH);
      ctx.fillStyle = ac;
      ctx.fillRect(bodyX, bodyY, bodyW, 1);
      ctx.fillStyle = dc;
      ctx.fillRect(bodyX, bodyY + bodyH - 1, bodyW, 1);
      ctx.fillStyle = hex(0x222a30);
      ctx.fillRect(bodyX + bodyW - 4, bodyY - 1, 4, bodyH + 2);
      break;
    }
    case 6: {
      // 원형 (구 / 등불)
      const r = 4 + Math.floor(rng() * 4);
      const cx = Math.floor(S / 2);
      const cy = Math.floor(S / 2);
      ctx.fillStyle = c;
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (dx * dx + dy * dy <= r * r) ctx.fillRect(cx + dx, cy + dy, 1, 1);
        }
      }
      ctx.fillStyle = ac;
      ctx.fillRect(cx - r + 1, cy - r + 1, 2, 1);
      break;
    }
  }
}

// ----------------------------------------------------------------------------
// 추적자 — 사람 형상 베이스 + 시드 변주 (몸·팔·다리 길이, 눈 점 유무)
// ----------------------------------------------------------------------------
function drawProceduralStalker(
  ctx: CanvasRenderingContext2D,
  rng: () => number,
  S: number,
): void {
  ctx.clearRect(0, 0, S, S);

  const palette = [0x0a0b0f, 0x1a2030, 0x2a2538, 0x1a1820];
  const body = palette[Math.floor(rng() * palette.length)] ?? 0x0a0b0f;
  const cx = Math.floor(S / 2);

  const headW = 6 + Math.floor(rng() * 3);
  const headH = 6 + Math.floor(rng() * 2);
  const torsoW = 8 + Math.floor(rng() * 4);
  const torsoH = 9 + Math.floor(rng() * 4);
  const armH = 7 + Math.floor(rng() * 6); // 길이 변주
  const legH = 5 + Math.floor(rng() * 4);

  ctx.fillStyle = hex(body);
  // head
  ctx.fillRect(cx - Math.floor(headW / 2), 4, headW, headH);
  // torso
  const torsoY = 4 + headH;
  ctx.fillRect(cx - Math.floor(torsoW / 2), torsoY, torsoW, torsoH);
  // arms
  ctx.fillRect(cx - Math.floor(torsoW / 2) - 1, torsoY + 2, 1, armH);
  ctx.fillRect(cx + Math.ceil(torsoW / 2), torsoY + 2, 1, armH);
  // legs
  const legY = torsoY + torsoH;
  if (legY + legH < S) {
    ctx.fillRect(cx - 3, legY, 2, legH);
    ctx.fillRect(cx + 1, legY, 2, legH);
  }

  // 빨간 눈 점 (50% 확률)
  if (rng() > 0.5) {
    ctx.fillStyle = hex(0xd56b5b);
    const ey = 5 + Math.floor(rng() * 2);
    ctx.fillRect(cx + Math.floor(headW / 4), ey, 1, 1);
  }
}

// ----------------------------------------------------------------------------
// 플레이어 — 사람 형상 + 방향(name 에서 추출). 색은 hash 변주.
// ----------------------------------------------------------------------------
function drawProceduralPlayer(
  ctx: CanvasRenderingContext2D,
  name: string,
  rng: () => number,
  S: number,
): void {
  ctx.clearRect(0, 0, S, S);

  const dir = name.endsWith('-up-0')
    ? 'up'
    : name.endsWith('-left-0')
      ? 'left'
      : name.endsWith('-right-0')
        ? 'right'
        : 'down';

  const cx = Math.floor(S / 2);
  const hoodColors = [0x3a4150, 0x2a3540, 0x404048];
  const hood = hoodColors[Math.floor(rng() * hoodColors.length)] ?? 0x3a4150;

  // 후드
  ctx.fillStyle = hex(hood);
  ctx.fillRect(cx - 4, 4, 8, 7);
  // 몸통
  ctx.fillRect(cx - 5, 11, 10, 12);
  // 청바지
  ctx.fillStyle = hex(0x1a2030);
  ctx.fillRect(cx - 4, 23, 3, 6);
  ctx.fillRect(cx + 1, 23, 3, 6);
  // 운동화
  ctx.fillStyle = hex(0xc8c4b8);
  ctx.fillRect(cx - 4, S - 2, 3, 2);
  ctx.fillRect(cx + 1, S - 2, 3, 2);

  // 방향 indicator
  ctx.fillStyle = hex(0xc8b89a);
  if (dir === 'down') {
    ctx.fillRect(cx - 1, 9, 2, 1);
  } else if (dir === 'up') {
    ctx.fillStyle = hex(darken(hood, 0.7));
    ctx.fillRect(cx - 4, 5, 8, 3);
  } else if (dir === 'left') {
    ctx.fillRect(cx - 4, 8, 1, 2);
  } else if (dir === 'right') {
    ctx.fillRect(cx + 3, 8, 1, 2);
  }
}

// ----------------------------------------------------------------------------
// Default — 카테고리 미매칭 시 fallback
// ----------------------------------------------------------------------------
function drawDefaultPlaceholder(
  ctx: CanvasRenderingContext2D,
  color: number,
  label: string | undefined,
  S: number,
): void {
  ctx.fillStyle = hex(color);
  ctx.fillRect(0, 0, S, S);
  const dark = darken(color, 0.45);
  ctx.fillStyle = hex(dark);
  ctx.fillRect(0, 0, S, 1);
  ctx.fillRect(0, 0, 1, S);
  ctx.fillRect(S - 1, 0, 1, S);
  ctx.fillRect(0, S - 1, S, 1);
  if (label && label.length > 0) {
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${Math.floor(S * 0.55)}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label.charAt(0).toUpperCase(), S / 2, S / 2 + 1);
  }
}

function hex(color: number): string {
  return `#${color.toString(16).padStart(6, '0')}`;
}

function darken(color: number, factor: number): number {
  const r = Math.floor(((color >> 16) & 0xff) * factor);
  const g = Math.floor(((color >> 8) & 0xff) * factor);
  const b = Math.floor((color & 0xff) * factor);
  return (r << 16) | (g << 8) | b;
}

/** 문자열 id → 안정적 색상. 같은 id 는 항상 같은 색. */
export function hashColor(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // HSL 에서 채도 제한해서 호러 톤에 맞는 차분한 색
  const hue = (h >>> 0) % 360;
  return hslToRgb(hue, 35, 45);
}

function hslToRgb(h: number, s: number, l: number): number {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  const r = Math.round(f(0) * 255);
  const g = Math.round(f(8) * 255);
  const b = Math.round(f(4) * 255);
  return (r << 16) | (g << 8) | b;
}
