export const clamp = (val: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, val));

export const randRange = (a = 1, b?: number): number =>
  b === undefined ? Math.random() * a : a + Math.random() * (b - a);

export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

export const formatDuration = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
};

export interface RectBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface EdgeWipeTransform {
  origin: string;
  scale: string;
}

export const getDirectionEdge = (
  rect: RectBox,
  clientX: number,
  clientY: number
): EdgeWipeTransform => {
  const w = rect.width || 1;
  const h = rect.height || 1;
  const rx = (clientX - rect.left - w / 2) / w;
  const ry = (clientY - rect.top - h / 2) / h;

  if (Math.abs(rx) > Math.abs(ry)) {
    return rx < 0
      ? { origin: 'left center', scale: '0,1' }
      : { origin: 'right center', scale: '0,1' };
  }
  return ry < 0
    ? { origin: 'center top', scale: '1,0' }
    : { origin: 'center bottom', scale: '1,0' };
};

export const computeMagneticOffset = (
  rect: RectBox,
  clientX: number,
  clientY: number,
  strength: number,
  maxDistance: number
): { x: number; y: number } => {
  let dx = (clientX - (rect.left + rect.width / 2)) * strength;
  let dy = (clientY - (rect.top + rect.height / 2)) * strength;
  const dist = Math.hypot(dx, dy);
  if (dist > maxDistance && dist > 0) {
    const scale = maxDistance / dist;
    dx *= scale;
    dy *= scale;
  }
  return { x: dx, y: dy };
};

export const hexToRgb01 = (hex: string): [number, number, number] => {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = [...clean].map((c) => c + c).join('');
  }
  const num = parseInt(clean, 16);
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
};

const srgbToLinear = (c: number): number =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;

export const rgbToOklab = (rgb: [number, number, number]): [number, number, number] => {
  const [r, g, b] = rgb.map(srgbToLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};

export const rgbToOklch = (rgb: [number, number, number]): [number, number, number] => {
  const [L, a, b] = rgbToOklab(rgb);
  return [L, Math.hypot(a, b), Math.atan2(b, a)];
};

export const unwrapHueStops = (stops: [number, number, number][]): [number, number, number][] => {
  let refHue = (stops.find((s) => s[1] > 0.02) ?? stops[0])[2];
  return stops.map((stop) => {
    let h = stop[1] > 0.02 ? stop[2] : refHue;
    while (h - refHue > Math.PI) h -= 2 * Math.PI;
    while (h - refHue < -Math.PI) h += 2 * Math.PI;
    refHue = h;
    return [stop[0], stop[1], h];
  });
};

const SCROLL_INTENT_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
]);

export const isScrollIntentKey = (key: string): boolean => SCROLL_INTENT_KEYS.has(key);

