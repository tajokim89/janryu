// 잔류 — 대사 트리.
// 잔류는 직접 만남이 거의 없다. 거의 모든 목소리는 안내방송 / 전광판 / 메모 형태.
// 빈 배열이지만 보일러플레이트 타입은 유지 — 향후 필요 시 추가.

export interface DialogueChoice {
  text: string;
  nextId: string | null;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  lines: string[];
  choices?: DialogueChoice[];
}

export const dialogueNodes: DialogueNode[] = [];
