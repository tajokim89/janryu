// 잔류 — 잠금해제형 로어.

export interface CodexEntry {
  id: string;
  title: string;
  body: string;
}

export const codexEntries: CodexEntry[] = [
  {
    id: 'codex-mismatched-rules',
    title: '어긋난 규칙',
    body: '안내문은 같은 문장을 반복하지만, 두 번째 안내부터는 항목이 미묘하게 어긋난다.\n역무원은 모든 항목을 끝까지 읽으라고 했지만, 다른 메모는 두 번째 안내부터는 믿지 말라고 한다.',
  },
  {
    id: 'codex-loop-structure',
    title: '반복 통로',
    body: '같은 광고판, 같은 자판기, 같은 전등이 반복된다.\n같은 곳을 세 번 지나면 돌아온 게 아니라 더 깊이 들어간 것이다.',
  },
  {
    id: 'codex-name-calling',
    title: '호명',
    body: '안내방송은 일반적으로 승객의 성명을 부르지 않는다.\n그러나 잔류 절차에 들어선 후로는 이름이 직접 들리는 순간이 있다.\n부르는 쪽을 보지 말 것. 응답하지 말 것. 벽 쪽으로 붙을 것.',
  },
  {
    id: 'codex-classification',
    title: '분류',
    body: '이 역의 마지막 안내는 구조가 아니다.\n귀가 대상과 잔류 승객을 가르는 절차다.\n그 둘은 같은 사람을 두고 진행될 수 있다.',
  },
];
