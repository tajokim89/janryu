# 잔류 — 플레이어 프롬프트 (4방향)

플레이어는 무기 없는 평범한 인물. 검은 후드 바람막이 + 청바지 + 운동화 + 작은 백팩. 성별·나이 모호한 중성적 실루엣 (잔류는 주인공 고유 정체성보다 "막차에 탔던 평범한 승객" 의 익명성을 유지).

각 프롬프트는 README 의 **공통 스타일 베이스**를 앞에 붙여서 사용. 16×16, 투명 배경.

**Frame name 규칙:** `player-{dir}-0` (정적). 애니메이션 추가 시 frame tag `player-idle-{dir}` 로 묶음.

---

## player-down-0 — 정면 (아래)
> A 16×16 top-down 3/4 view pixel sprite of a single human figure standing still, facing the camera (downward). Dark hooded windbreaker (`#3a4150`), dark blue jeans, off-white sneakers. Small dark backpack barely visible at the shoulders. Hood pulled partially up — face is mostly shadowed, only a hint of pale skin tone (`#e8e4d8`). Arms relaxed at sides. Centered on transparent background. No floor shadow.

---

## player-up-0 — 후면 (위)
> A 16×16 top-down 3/4 view pixel sprite of the same figure as `player-down-0` but viewed from behind, facing away (upward). Back of the dark hooded windbreaker visible, hood up. Backpack straps barely visible. Same dark jeans, off-white sneakers. Arms at sides. Transparent background. No shadow.

---

## player-left-0 — 좌측
> A 16×16 top-down 3/4 view pixel sprite of the same figure as `player-down-0` but turned to face left. Side profile of dark hooded windbreaker, hood up, partial face shadow. Backpack outline visible. Same dark jeans, off-white sneakers. Slight forward lean to suggest readiness to move. Transparent background. No shadow.

---

## player-right-0 — 우측
> A 16×16 top-down 3/4 view pixel sprite of the same figure as `player-down-0` but turned to face right. Mirror of `player-left-0`. Same outfit, same proportions. Transparent background. No shadow.

---

## (선택) Idle 애니메이션 — 4방향 × 2~3프레임
**Frame tags:** `player-idle-down`, `player-idle-up`, `player-idle-left`, `player-idle-right`

각 방향당 추가로 1~2 프레임을 만들어 미세한 호흡 / 어깨 들썩임을 넣어주면 정적 sprite 보다 살아있는 느낌.

> Same figure as `player-{dir}-0`. Add subtle breathing motion: shoulders rise by 1 pixel and the hood shifts down by 1 pixel. Frame should look almost identical except for that one-pixel vertical offset on the upper body. Generate 2 alternate frames per direction. The Aseprite frame tag plays them at ~8fps in a loop.

---

## 프롬프트 일관성을 위한 체크리스트
- 모든 4방향 sprite 가 같은 인물로 보일 것 (옷 색·실루엣 동일)
- 16×16 안에서 머리·몸통·다리가 식별 가능 — 너무 작게 그려져 점이 되지 않도록
- 얼굴 디테일은 거의 없음 (잔류는 익명성)
- 무기 / 도구 손에 안 들고 있음 (손전등은 별도 prop)
- 그림자 / 발광 효과 없음
