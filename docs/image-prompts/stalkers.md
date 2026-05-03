# 잔류 — 추적자 프롬프트 (3종)

잔류의 추적자는 모두 **죽일 수 없고**, 시각적으로도 일반 적이 아니다. 각자 다른 "잘못된 것" 의 인격화.

각 프롬프트는 README 의 **공통 스타일 베이스**를 앞에 붙여서 사용. 16×16, 투명 배경.

**Frame name 규칙:** `stalker-{id}` (정적). 애니메이션 추가 시 frame tag `stalker-{id}-idle`.

---

## stalker-wet-silhouette — 젖은 실루엣
**등장:** 2구역 (승강장). 맞은편 승강장에서 처음 보임. 발자국 소리 없음.

**컨셉:** 비에 흠뻑 젖은 사람의 형체. 윤곽이 흐리고, 머리카락 / 옷자락이 물에 잠겨 흐물거림. 형광등 빛이 닿아도 표면이 빛나지 않음 — 빛을 흡수.

> A 16×16 top-down 3/4 view pixel sprite of a humanoid silhouette completely soaked in dark water. Outline is slightly blurred, especially at the bottom — it seems to drip downward into a small dark pool at its feet. Long damp hair / clothing edges droop and sway. Color is uniform dark blue-black `#1a2030` with no facial features visible — just a faint pale curve where the face would be. The silhouette stands very upright, motionless, slightly turned away from the viewer. Does not cast a shadow. Transparent background.

**Idle (선택):** `stalker-wet-silhouette-idle` — 2~3프레임에 걸쳐 머리카락 / 옷자락이 1~2픽셀 움직임. 매우 느림 (~4fps).

---

## stalker-dark-figure — 검은 형체
**등장:** 3구역 (환승 통로). 복도 끝, 전등 꺼진 자리에서 출현. 광고판이 한 장 넘어가는 사이 자세가 바뀜.

**컨셉:** 키가 길고 마른 검은 형체. 팔이 비정상적으로 김. 한 자세에서 다음 자세로 부드럽게 전이하지 않고 **순간 변함**.

> A 16×16 top-down 3/4 view pixel sprite of a tall thin humanoid figure rendered in pure flat black `#0a0b0f`. Head is small, shoulders narrow, but arms are unnaturally long — wrists hang almost to the knees. No facial features whatsoever. The figure stands rigid, slightly hunched. Body is uniform black with no shading or highlight, almost cut-out against the floor. A single tiny pinpoint of dull red `#d56b5b` where one eye would be. Transparent background.

**Idle (선택):** `stalker-dark-figure-idle` — 2프레임. 한 프레임은 위 설명. 다른 프레임은 같은 자세지만 머리가 1픽셀 기울고, 한쪽 어깨가 1픽셀 더 올라감. 부드러운 보간 X — 두 프레임 사이가 **갑작스럽게** 끊김.

---

## stalker-classification-signal — 분류 신호
**등장:** 4구역 (폐쇄 선로 아래). 추적자라기보다 의인화된 안내. 전광판 / 안내방송 시스템 자체가 자세를 갖는다.

**컨셉:** 사람 형상이 아닌 직사각형 신호 패널. 표면에 한국어 글자가 흐르듯 점멸. 색은 차가운 흰색 또는 노란 호박색. 발광 X — 글자만 빛남.

> A 16×16 top-down 3/4 view pixel sprite of a vertical rectangular floor-standing display panel, oriented like a station information sign but standing alone on the floor. Frame is matte cold gray `#3a4150`. The display surface (most of the rectangle) is dark `#0a0b0f` with two horizontal lines of partially visible Korean Hangul characters in pale amber `#e8e4d8`. Some characters are blacked out as if censored. The whole display has a very faint scanline texture. Slight slow vertical scroll suggested. No body, no limbs — it is just the panel. Transparent background.

**Idle (선택):** `stalker-classification-signal-idle` — 3프레임. 글자가 한 줄씩 위로 올라감 (스크롤). 주기적으로 한 프레임은 모든 글자가 검게 가려짐 (1프레임만).

---

## 일관성 가이드

세 추적자가 같은 화면에 등장할 일은 적지만, **셋 모두 동일한 픽셀아트 스타일**을 따라야 함:

- 사람 형상이 있는 경우 (1, 2번): 윤곽선 없음, 솔리드 컬러로만 볼륨 표현
- 모두 발광 효과 / 광원 / 그림자 없음
- 모두 동일한 16×16 프레임에 들어감
- 디테일은 픽셀 1~2개 단위로만 표현 — 너무 정교하게 그리지 말 것

생성 후 placeholder 위에 그대로 덮어 쓰면 됨. SpriteRegistry 가 frame name 매칭 자동.
