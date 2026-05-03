# 잔류 — Image Prompts

이 폴더의 프롬프트는 잔류의 픽셀아트 자산을 일관된 톤으로 생성하기 위한 템플릿. ChatGPT (DALL·E 3) / Stable Diffusion / PixelLab / Aseprite 워크플로우 모두에 호환.

## 사용 방법

1. 아래 **공통 스타일 베이스** 를 모든 프롬프트 앞에 붙여서 생성.
2. 1024×1024 또는 2048×2048 로 생성된 이미지를 Aseprite 로 가져와 32×32 (큰 prop 은 64×64) 로 다운스케일 + 픽셀 클린업.
3. 모든 frame 을 하나의 spritesheet 로 묶어 export.
4. `public/assets/sprites/main.png` + `public/assets/sprites/main.json` (Aseprite Hash 포맷) 에 드롭.
5. **frame name 이 콘텐츠 ID 와 일치하면 SpriteRegistry 가 자동으로 매칭** — placeholder 가 진짜 자산으로 덮임.

## Frame name 규칙

| 카테고리 | 규칙 | 예시 |
|---|---|---|
| 타일 | `tile-{id}` | `tile-floor`, `tile-wet-floor` |
| 플레이어 (정적) | `player-{dir}-0` | `player-down-0`, `player-up-0` |
| 플레이어 (애니메이션) | frame tag `player-idle-{dir}` | `player-idle-down` |
| 추적자 | `stalker-{id}` 또는 frame tag `stalker-{id}-idle` | `stalker-wet-silhouette` |
| 소품 | `prop-{id}` | `prop-info-board`, `prop-flashlight` |

---

## 공통 스타일 베이스

**모든 프롬프트 앞에 그대로 붙여서 사용 — 일관된 톤을 위해 필수.**

> **Style:** 2D pixel art for a top-down 3/4 perspective horror exploration game. Hard-edged pixels, no anti-aliasing, no glow, no outline shading. Limited muted palette only.
>
> **Setting:** A derelict Korean late-1990s subway station at midnight. Heavy rain outside, partial interior flooding. Dim flickering fluorescent lights. Empty platforms. Liminal, uncanny, subdued horror — no jump scares, no gore, no explicit violence. The atmosphere is wrongness and absence, not shock.
>
> **Palette (strict, do not stray):**
> - Background near-black `#0a0b0f`
> - Walls / metal: cold steel blue `#3a4150`
> - Floor: warm gray-beige `#5a544a`
> - Highlights: warm off-white `#e8e4d8`
> - Water / reflective: dark blue `#1a2030`
> - Danger / emergency only: dull red `#d56b5b`
>
> **AVOID:** anime faces, smiling characters, cute proportions, neon, glowing outlines, anti-aliased gradients, modern subway logos, English signage, bright saturated colors, blood splatter, dismembered bodies, pentagrams, generic Western horror clichés.

---

## 파일별

- [`tiles.md`](./tiles.md) — 환경 타일 13종 (바닥/벽/물/계단/문/기둥)
- [`player.md`](./player.md) — 플레이어 4방향 + idle 애니메이션
- [`stalkers.md`](./stalkers.md) — 추적자 3종
- [`props.md`](./props.md) — 소품 8종 (전광판·메모·손전등 등)
- (`ui.md` — UI 자산. 톤 굳어진 후 작성 — 현재 보류)

---

## 사이즈 가이드

| 자산 | 최종 크기 | 생성 권장 크기 |
|---|---|---|
| 일반 타일 | 32×32 | 1024×1024 → 32×32 |
| 큰 prop (전광판/창) | 64×64 | 2048×2048 → 64×64 |
| 플레이어 | 32×32 | 1024×1024 → 32×32 |
| 추적자 | 32×32 | 1024×1024 → 32×32 |

타일은 반드시 **반복(타일링) 가능**하게 만들 것 — 같은 타일이 좌우상하로 이어져도 솔기가 안 보여야 함.
