import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clamp,
  easeInOutCubic,
  formatDuration,
  getDirectionEdge,
  computeMagneticOffset,
  hexToRgb01,
  rgbToOklab,
  unwrapHueStops,
  isScrollIntentKey,
} from './portfolioMath';

test('clamp constrains values to [min, max]', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-3, 0, 10), 0);
  assert.equal(clamp(42, 0, 10), 10);
});

test('easeInOutCubic hits endpoints and midpoint symmetrically', () => {
  assert.equal(easeInOutCubic(0), 0);
  assert.equal(easeInOutCubic(0.5), 0.5);
  assert.equal(easeInOutCubic(1), 1);
  assert.ok(easeInOutCubic(0.25) < 0.25);
  assert.ok(easeInOutCubic(0.75) > 0.75);
});

test('formatDuration formats seconds into m:ss and guards non-finite', () => {
  assert.equal(formatDuration(0), '0:00');
  assert.equal(formatDuration(65), '1:05');
  assert.equal(formatDuration(217), '3:37');
  assert.equal(formatDuration(Number.NaN), '0:00');
  assert.equal(formatDuration(-5), '0:00');
});

test('getDirectionEdge detects left, right, top, and bottom entries', () => {
  const box = { left: 100, top: 100, width: 100, height: 40 };
  assert.deepEqual(getDirectionEdge(box, 102, 120), { origin: 'left center', scale: '0,1' });
  assert.deepEqual(getDirectionEdge(box, 198, 120), { origin: 'right center', scale: '0,1' });
  assert.deepEqual(getDirectionEdge(box, 150, 101), { origin: 'center top', scale: '1,0' });
  assert.deepEqual(getDirectionEdge(box, 150, 139), { origin: 'center bottom', scale: '1,0' });
});

test('computeMagneticOffset scales and clamps to maxDistance', () => {
  const rect = { left: 0, top: 0, width: 100, height: 100 };
  const inside = computeMagneticOffset(rect, 60, 50, 0.8, 100);
  assert.ok(Math.abs(inside.x - 8) < 1e-6);
  assert.equal(inside.y, 0);

  const clamped = computeMagneticOffset(rect, 500, 50, 0.8, 100);
  assert.ok(Math.abs(clamped.x - 100) < 1e-6);
  assert.equal(clamped.y, 0);
});

test('hexToRgb01 and rgbToOklab convert dark background accurately', () => {
  const rgb = hexToRgb01('#080506');
  assert.ok(rgb[0] > rgb[1]);
  const lab = rgbToOklab(rgb);
  assert.ok(lab[0] > 0 && lab[0] < 0.2);

  const unwrapped = unwrapHueStops([
    [0.4, 0.1, 3.0],
    [0.5, 0.1, -3.0],
  ]);
  assert.ok(Math.abs(unwrapped[1][2] - unwrapped[0][2]) <= Math.PI);
});

test('isScrollIntentKey matches scroll keys and ignores skip/pause hotkeys', () => {
  assert.equal(isScrollIntentKey('ArrowDown'), true);
  assert.equal(isScrollIntentKey('PageDown'), true);
  assert.equal(isScrollIntentKey('Home'), true);
  assert.equal(isScrollIntentKey('s'), false);
  assert.equal(isScrollIntentKey('S'), false);
  assert.equal(isScrollIntentKey(' '), false);
});
