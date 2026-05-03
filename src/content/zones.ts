// 잔류 — 5구역.
// 0구역만 authored map; 1~4구역은 procedural fallback (추후 디자인).

import type { ChapterDef } from './narrative/chapters';

export type ZoneGenerator = 'authored' | 'rooms' | 'corridor' | 'cellular';

export interface PropSpawn {
  propId: string;
  count: number;
}

export interface StalkerSpawn {
  stalkerId: string;
  count: number;
}

export interface ZoneDef {
  id: string;
  name: string;
  generator: ZoneGenerator;
  width: number;
  height: number;
  authoredMap?: string;
  stalkerSpawns: StalkerSpawn[];
  propSpawns: PropSpawn[];
  exitMode: 'descend' | 'escape' | 'loop';
  ambientSignals?: string[];
}

export const zones: ZoneDef[] = [
  {
    id: 'zone-station-0',
    name: '0구역 — 역사 입구 / 개찰구',
    generator: 'authored',
    authoredMap: 'assets/maps/zone-station-0.json',
    width: 22,
    height: 14,
    stalkerSpawns: [],
    propSpawns: [
      { propId: 'info-board-end-of-service', count: 1 },
      { propId: 'station-office-window', count: 1 },
      { propId: 'exit-shutter', count: 1 },
      { propId: 'lost-and-found-note', count: 1 },
      { propId: 'wet-footprint-trail', count: 1 },
    ],
    exitMode: 'descend',
  },
  {
    id: 'zone-station-1',
    name: '1구역 — 대합실',
    generator: 'rooms',
    width: 26,
    height: 16,
    stalkerSpawns: [],
    propSpawns: [
      { propId: 'flood-warning-poster', count: 1 },
      { propId: 'note-second-warning', count: 1 },
      { propId: 'note-no-staff', count: 1 },
    ],
    exitMode: 'descend',
  },
  {
    id: 'zone-station-2',
    name: '2구역 — 승강장',
    generator: 'rooms',
    width: 28,
    height: 14,
    stalkerSpawns: [{ stalkerId: 'wet-silhouette', count: 1 }],
    propSpawns: [
      { propId: 'platform-info-board', count: 1 },
      { propId: 'platform-warning-sign', count: 1 },
      { propId: 'note-do-not-look', count: 1 },
      { propId: 'flashlight', count: 1 },
    ],
    exitMode: 'descend',
  },
  {
    id: 'zone-station-3',
    name: '3구역 — 환승 통로',
    generator: 'rooms',
    width: 30,
    height: 18,
    stalkerSpawns: [{ stalkerId: 'dark-figure', count: 1 }],
    propSpawns: [
      { propId: 'transfer-current-location-sign', count: 1 },
      { propId: 'transfer-current-location-warped', count: 1 },
      { propId: 'note-board-no', count: 1 },
      { propId: 'note-three-times', count: 1 },
      { propId: 'note-name-call', count: 1 },
      { propId: 'note-cant-go-up', count: 1 },
    ],
    exitMode: 'descend',
  },
  {
    id: 'zone-station-4',
    name: '4구역 — 폐쇄 선로 아래',
    generator: 'rooms',
    width: 26,
    height: 18,
    stalkerSpawns: [{ stalkerId: 'classification-signal', count: 1 }],
    propSpawns: [
      { propId: 'classification-warning', count: 1 },
      { propId: 'classification-procedure', count: 1 },
      { propId: 'final-info-board', count: 1 },
      { propId: 'final-graffiti', count: 1 },
    ],
    exitMode: 'escape',
  },
];

export function zonesForChapter(chapter: ChapterDef): ZoneDef[] {
  return chapter.zoneIds
    .map((id) => zones.find((z) => z.id === id))
    .filter((z): z is ZoneDef => Boolean(z));
}
