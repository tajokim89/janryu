# 잔류 — 타일 프롬프트 (13종)

각 프롬프트는 README 의 **공통 스타일 베이스**를 앞에 붙여서 사용. 모든 타일은 16×16, 위에서 본 시점, **타일링 가능** (좌우상하로 이어져도 솔기 없음).

---

## tile-floor — 마른 바닥
**Use:** 모든 구역 기본 보행 영역.

> A 16×16 top-down floor tile of a worn Korean subway station: large gray-beige ceramic floor tiles with subtle scuff marks and faint grout lines. Slightly desaturated, mid-tone. Must seamlessly tile when repeated horizontally and vertically. No props, no debris, no edge highlights.

---

## tile-wall — 지하철 타일 벽
**Use:** 비walkable 벽 (모든 구역 외곽).

> A 16×16 top-down view of a Korean subway station wall section. Cold steel-blue surface with horizontal lines suggesting old metro wall paneling. Flat lighting from above. Slight grime in the corners. Tile-able horizontally and vertically. No graffiti, no signs.

---

## tile-pillar — 기둥
**Use:** 기둥 (못 지나감, 시야 차단).

> A 16×16 top-down view of a square station pillar from above. Solid concrete-gray with subtle vertical seam suggesting structural ribbing. Slight shadow halo on the lower side hinting at depth. Slightly darker than `tile-wall`. Stand-alone tile (does not need to tile-repeat).

---

## tile-ticket-gate — 개찰구
**Use:** 개찰구 라인 (walkable, 시각만).

> A 16×16 top-down view of a Korean subway turnstile / fare gate from above. Two parallel matte black panels with a narrow walkable gap between them. Slight metallic highlight on the upper edges. Yellow caution stripe on the floor between them. Tile-able along the horizontal axis (so a row of gates lines up).

---

## tile-sealed-door — 출구 통제문 (내려와 있음)
**Use:** 비walkable. 셔터가 천장에서 내려와 있는 출구.

> A 16×16 top-down view of a metal roll-down shutter door, currently pulled fully closed. Heavy ribbed steel surface in cold gray-blue. A faint amber sliver at the very bottom suggesting it sealed only moments ago. No handle, no signage. Slightly more imposing than a regular wall.

---

## tile-wet-floor — 살짝 젖은 바닥
**Use:** 마른 바닥 위에 물이 살짝 묻은 자국. 보행 가능.

> A 16×16 top-down floor tile: same gray-beige station floor as `tile-floor` but covered in a thin reflective sheen of water. Subtle dark patches where water pools in the grout. Faint reflection of overhead fluorescent light, warped. Must tile seamlessly. No footprints (those are a separate prop).

---

## tile-shallow-water — 발목까지 찬 물
**Use:** 보행 가능. 1~2구역 침수 진행 표현.

> A 16×16 top-down view of standing dark water about ankle-deep over a barely-visible tile floor. Dark blue `#1a2030` surface with subtle ripple highlights. The faint outline of submerged floor tiles is just visible underneath. Must tile seamlessly. No bubbles, no debris.

---

## tile-flooded — 가득 찬 물
**Use:** 비walkable. 물이 차서 더 못 들어가는 영역.

> A 16×16 top-down view of deep stagnant black water completely covering whatever was below. Almost opaque dark blue-black surface with very subtle ripple texture. A single warped reflection sliver of fluorescent light in the upper-left. Heavier and darker than `tile-shallow-water`. Tile-able.

---

## tile-station-room — 역무실 안
**Use:** 은신 가능. 좁은 어두운 공간.

> A 16×16 top-down view of the inside of a small station office: dark linoleum floor, edges of a desk just visible, warm but very dim incandescent light. Slightly warmer palette than the rest of the station. Feels enclosed and cramped. No staff visible. Tile-able vertically (multiple rows form a deeper room).

---

## tile-pillar-corner — 기둥 뒤 그늘
**Use:** 은신 가능. 기둥 옆 어두운 각.

> A 16×16 top-down floor tile partially shadowed by an unseen pillar above-left: half normal `tile-floor` gray-beige, half deep shadow gradient (hard-edged, no soft AA). The shadowed half should be very dark blue-gray. Stand-alone (does not tile).

---

## tile-platform-edge — 승강장 끝선
**Use:** 비walkable. 선로와의 경계. 노란 경고선.

> A 16×16 top-down view of a Korean subway platform edge from above: top half is rough textured yellow caution strip with raised tactile bumps, bottom half is the dark void of the track recess (almost pure `#0a0b0f`). The transition is hard-edged. Tile-able horizontally (forms a long platform edge).

---

## tile-stairs-down — 내려가는 계단
**Use:** 다음 zone 으로 진행.

> A 16×16 top-down view of station stairs going downward: a series of horizontal step lines receding into shadow at the lower portion of the tile. Cold concrete gray. The lower edge fades almost to black, suggesting depth below. A faint warm light at the very bottom. Stand-alone tile.

---

## tile-exit — 지상 출구
**Use:** 최종 탈출 (4구역 escape).

> A 16×16 top-down view of subway exit stairs going UP toward street level: a series of horizontal step lines ascending toward the top of the tile, with the upper portion bathed in pale moonlit blue-gray suggesting the surface is just above. A faint vertical bar of rain-streaked outdoor light at the top edge. Stand-alone tile.
