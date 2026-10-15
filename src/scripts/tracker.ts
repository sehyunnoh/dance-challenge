// Favorites and practice status, saved in this browser only (localStorage).
export type Status = 'none' | 'practicing' | 'filmed';
export interface Entry { fav: boolean; status: Status }

const KEY = 'dance-challenge:v1';
const EVENT = 'tracker-change';

// Used only when localStorage is blocked, so buttons still respond during this visit.
let fallback: Record<string, Entry> | null = null;

function readAll(): Record<string, Entry> {
  if (fallback) return fallback;
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}') ?? {};
  } catch {
    return {};
  }
}

export function getEntry(id: string): Entry {
  return { fav: false, status: 'none', ...readAll()[id] };
}

export function setEntry(id: string, patch: Partial<Entry>) {
  const all = readAll();
  const next = { ...getEntry(id), ...patch };
  if (!next.fav && next.status === 'none') delete all[id];
  else all[id] = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    fallback = all;
  }
  window.dispatchEvent(new Event(EVENT));
}

// Runs on local changes and on changes made in another tab.
export function onChange(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener('storage', (e) => { if (e.key === KEY) cb(); });
}

export const STATUS_LABEL: Record<Status, string> = {
  none: 'Not started',
  practicing: 'Practicing',
  filmed: 'Filmed ✅',
};
