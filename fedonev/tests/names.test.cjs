const assert = require('node:assert/strict');
const test = require('node:test');
const names = require('../dist/names.js');
test('all 6144 answer sets produce unique short names and stable v2 URLs', () => {
  const unique = new Set();
  const politicians = new Set();
  let bare = 0;
  let colors = 0;
  let personality = 0;
  for (let a = 0; a < 4; a++) for (let n = 0; n < 4; n++) for (let p = 0; p < 4; p++) for (let h = 0; h < 4; h++) for (let l = 0; l < 4; l++) for (let c = 0; c < 6; c++) {
    const input = [a, n, p, h, l, c];
    const result = names.fromAnswers(input);
    unique.add(result.name);
    assert.equal(result.version, 'v2');
    assert.equal(typeof result.prefix, 'string');
    assert.doesNotMatch(result.prefix, /\s/);
    assert.doesNotMatch(result.name, /,/);
    assert.equal(result.name, result.prefix ? `${result.prefix} ${result.base}` : result.base);
    if (!result.prefix) bare++;
    else if (['Vörös', 'Kék', 'Zöld', 'Sárga', 'Fekete', 'Lila'].includes(result.prefix)) colors++;
    else personality++;
    if (result.inspiration.startsWith('Kilencvenes évek')) politicians.add(result.base);
    assert.deepEqual(names.fromAnswers(input), result);
    assert.deepEqual(names.fromHash(result.hash), result);
  }
  assert.equal(unique.size, 6144);
  assert.equal(names.total, 6144);
  assert.equal(bare, 96);
  assert.equal(colors, 576);
  assert.equal(personality, 5472);
  assert.equal(politicians.size, 16);
  for (const example of ['Bátor Darth Vader', 'Kék Boba Fettő', 'Darth Lekvár', 'Horn Hokedli', 'Torgyán Túrógombóc']) assert.ok(unique.has(example), example);
});
test('malformed links, unknown versions and invalid answers are rejected', () => {
  for (const hash of ['', '#', '#akta=v1-zzz', '#akta=v2-zzz', '#akta=v3-000', '#akta=v2-00', '#akta=v2-0000', '#akta=v2-000<script>', '#akta=v2--01']) assert.equal(names.fromHash(hash), null);
  for (const input of [[], Array(6), [0,0,0,0,0,-1], [0,0,0,0,0,6], [4,0,0,0,0,0], [null,0,0,0,0,0], [0.5,0,0,0,0,0]]) assert.throws(() => names.fromAnswers(input));
  assert.equal(names.fromId(0, 'v3'), null);
});
test('every published v1 link keeps its original name', () => {
  // Digest of all 6144 names from the original committed v1 implementation.
  const {createHash} = require('node:crypto');
  const legacy = Array.from({length: 6144}, (_, id) =>
    names.fromHash(`#akta=v1-${id.toString(36).padStart(3, '0')}`).name);
  assert.equal(createHash('sha256').update(JSON.stringify(legacy)).digest('hex'),
    'd5c99437bf382e2b19fa853c2bc4531d8a24d14e12420a0703f3d7187cd4ec5c');
  assert.equal(names.fromHash('#akta=v1-000').name, 'Vörös Darth Lekvár, a bátor szövetséges');
  assert.equal(names.fromHash('#akta=v2-000').name, 'Darth Lekvár');
});
