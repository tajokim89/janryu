// 잔류 — 튜토리얼 (=0구역 진입 안내).

export interface TutorialStep {
  id: string;
  title: string;
  prompt: string;
}

export const tutorialSteps: TutorialStep[] = [
  {
    id: 'move',
    title: '이동',
    prompt: '↑ ↓ ← → 또는 W A S D 로 역사 안을 이동합니다. 마침표(.)로 한 박자 멈춰 듣기.',
  },
  {
    id: 'interact',
    title: '안내 확인',
    prompt: 'e 로 전광판·역무실 창·메모를 확인합니다. g 로 떨어진 물건을 줍습니다.',
  },
  {
    id: 'use',
    title: '손전등',
    prompt: 'f 로 손전등을 켜고 끕니다. 켜면 시야가 넓어지지만, 그쪽도 당신을 더 잘 봅니다.',
  },
  {
    id: 'hide',
    title: '은신',
    prompt: 'c 로 기둥 뒤·역무실 안으로 몸을 숨깁니다. 들키지 않으면 발걸음이 지나갈 때까지 기다릴 수 있습니다.',
  },
  {
    id: 'exit',
    title: '다음 구역',
    prompt: '> 로 계단·통로·비상구를 빠져나갑니다. 들키지 않고 도달하는 것이 목표.',
  },
  {
    id: 'goal',
    title: '시작',
    prompt: '역사 입구. Enter 로 시작합니다.',
  },
];
