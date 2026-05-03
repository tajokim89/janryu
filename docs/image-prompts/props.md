# 잔류 — 소품 프롬프트 (8종)

소품은 정보 수집과 환경 서사의 매개체. 무기 / 도구는 손전등 하나뿐.

각 프롬프트는 README 의 **공통 스타일 베이스**를 앞에 붙여서 사용. 일반 prop 은 32×32, 큰 것 (전광판) 은 64×64.

**Frame name 규칙:** `prop-{id}`.

---

## prop-info-board — 전광판 (64×64)
**Use:** 운행 종료 안내 / 침수 안내 / 분류 안내. 0·2·4구역에 등장.

> A 64×64 top-down 3/4 view pixel sprite of a wall-mounted Korean subway information display board. Rectangular thin metal frame in cold steel blue `#3a4150`. The display surface is dark `#0a0b0f` with two horizontal lines of partially visible Korean Hangul characters in pale amber-warm `#e8e4d8`. The board juts slightly out from a wall (the top edge has a thin shadow on the wall behind). No mounting bracket visible. The text content is intentionally vague / symbolic — readers will not be able to fully read it. Transparent background.

---

## prop-station-office-window — 역무실 창
**Use:** 0구역. 안쪽이 비어 있다는 사실을 보여주는 매개체.

> A 32×32 top-down 3/4 view pixel sprite of a small staff-office service window cut into a wall. Rectangular frame in cold gray. The opening is dark — almost pitch black `#0a0b0f` — with the very faint outline of an empty chair just barely visible inside. Above the window a tiny placeholder for a name placard, but the placard area is empty / scratched off. No glass reflections. Transparent background.

---

## prop-exit-shutter — 출구 통제문 (인터랙션 매개체)
**Use:** 0구역. 통제문 자체는 wall 타일이지만 그 앞 floor 에 prop 으로 놓아 인터랙션 가능하게.

> A 32×32 top-down 3/4 view pixel sprite of a small floor-mounted warning placard standing upright in front of an unseen shutter door. The placard is rectangular, cold gray frame, with a single line of red `#d56b5b` Korean Hangul characters reading "출구 통제 중" — partially abstract pixel forms. Slight tilt as if hastily placed. Casts no shadow. Transparent background.

---

## prop-note — 메모 종이
**Use:** 모든 구역. 손글씨 / 영수증 뒷면 / 찢긴 종이.

> A 32×32 top-down 3/4 view pixel sprite of a small piece of crumpled white-yellow paper lying flat on the ground. Slightly creased. A few barely-legible dark squiggles representing handwritten Korean Hangul characters in dark blue or black ink. Edges torn or curled. About the size of a sticky note. Transparent background. No table, no clipboard.

---

## prop-poster — 안내문 포스터
**Use:** 1·4구역. 벽에 붙은 긴 안내문 (침수 대피 / 분류 절차).

> A 32×32 top-down 3/4 view pixel sprite of a paper announcement notice taped to an unseen vertical wall, viewed from above. The paper is off-white `#e8e4d8` with multiple horizontal lines of fine dark Hangul text — most readable, some blurred or smudged near the bottom. Two small dark squares of tape at the upper corners. The paper is slightly wrinkled. The center has a small red square accent (like a stamp). Transparent background.

---

## prop-wet-footprint — 젖은 발자국
**Use:** 0구역. 안쪽에서 바깥쪽으로 향하는 발자국 자국.

> A 32×32 top-down view pixel sprite of two wet shoeprints on a dry floor. Both prints face the same direction (toward the upper-right of the tile, suggesting movement outward). The prints are darker than `tile-wet-floor` — wet sole impressions in a deeper blue-black `#1a2030`. Slight asymmetry between left and right foot. No body, no further prints — just two clear marks. Transparent background.

---

## prop-sign — 방향 표지
**Use:** 1·2·3구역. 짧은 안내 ("비상구 →" 같은).

> A 32×32 top-down 3/4 view pixel sprite of a small directional sign mounted at head-height, viewed from above with slight foreshortening showing the top edge. Rectangular plate, cold steel-blue background `#3a4150`, white Hangul text and a small white arrow. Held by a thin pole going down out of frame. Slight shadow line on the wall behind it (suggesting it juts from the wall). Transparent background.

---

## prop-flashlight — 손전등 (픽업)
**Use:** 픽업 가능. 분실물 보관함에서 발견.

> A 32×32 top-down view pixel sprite of a single hand-held flashlight lying on the floor. Cylindrical body, dark gray `#3a4150` with a small button accent. The lens end is matte black — not lit, currently off. Slight perspective showing the cylindrical roundness. Faint highlight along the upper edge of the body. Transparent background. No light beam, no glow.

---

## 일관성 가이드

- 모든 prop 은 **단일 픽셀아트 자산** — 배경 없음 / 그림자 없음
- 32×32 prop 은 타일 하나에 정확히 들어가야 함 (1.5×1.5 처럼 큰 prop 은 64×64 사용)
- 한국어 Hangul 글자가 들어가는 prop (전광판 / 메모 / 포스터) 은 **읽을 수 없을 정도로 흐릿하게** — 의도적으로 분명하지 않게
- 발광 / 빛샘 / 광원 효과 없음 (손전등도 꺼진 상태)
- 색은 strict palette 안에서만 — 새로운 색 추가 X

생성 후 placeholder 위에 그대로 덮어쓰기. frame name 이 prop ID 와 일치하면 자동 매칭.

---

## prop ID → file 매칭 (참고)

| prop ID (`src/content/props.ts`) | sprite frame name |
|---|---|
| `info-board-end-of-service`, `platform-info-board`, `final-info-board` | `prop-info-board` (공유) |
| `station-office-window` | `prop-station-office-window` |
| `exit-shutter` | `prop-exit-shutter` |
| `lost-and-found-note`, `note-*`, `final-graffiti` | `prop-note` (공유) |
| `flood-warning-poster`, `classification-warning`, `classification-procedure` | `prop-poster` (공유) |
| `wet-footprint-trail` | `prop-wet-footprint` |
| `platform-warning-sign`, `transfer-current-location-*` | `prop-sign` (공유) |
| `flashlight` | `prop-flashlight` |

여러 prop 이 같은 sprite 를 공유하는 게 의도 — 같은 종류의 안내 매체는 같은 모양으로 통일.
