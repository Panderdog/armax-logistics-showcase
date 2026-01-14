// src/lib/reactSnap.ts
export function isReactSnap(): boolean {
  if (typeof window === "undefined") return false;

  const w = window as any;
  // react-snap часто ставит этот флаг
  if (w.__REACT_SNAP__) return true;

  // запасной вариант по userAgent
  try {
    return typeof navigator !== "undefined" && /ReactSnap/i.test(navigator.userAgent);
  } catch {
    return false;
  }
}
