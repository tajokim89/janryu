// 잔류 — 인트로 슬라이드.

export interface IntroSlide {
  title: string;
  body: string;
}

export const introSlides: IntroSlide[] = [
  {
    title: '23:42 / 막차',
    body: '폭우가 멈추지 않는다.\n눈을 떴을 때, 객실에는 아무도 없었다.',
  },
  {
    title: '운행 종료',
    body: '역에 내렸지만, 출구 위로 통제문이 천천히 내려오고 있다.\n역무실은 비어 있다.',
  },
  {
    title: '잔류',
    body: '안내가 시작된다.\n어디로도 가지 마십시오.\n호명되지 않은 승객은 응답하지 마십시오.',
  },
];
