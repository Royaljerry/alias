const assert = require('node:assert/strict');
const test = require('node:test');
const names = require('../dist/names.js');
test('all 6144 answer sets produce distinct, stable names and round-trip URLs', () => {
  const unique = new Set();
  for (let a = 0; a < 4; a++) for (let n = 0; n < 4; n++) for (let p = 0; p < 4; p++) for (let h = 0; h < 4; h++) for (let l = 0; l < 4; l++) for (let c = 0; c < 6; c++) {
    const input = [a, n, p, h, l, c];
    const result = names.fromAnswers(input);
    unique.add(result.name);
    assert.deepEqual(names.fromAnswers(input), result);
    assert.deepEqual(names.fromHash(`#akta=v1-${result.code}`), result);
  }
  assert.equal(unique.size, 6144);
  assert.equal(names.total, 6144);
});
test('malformed links and invalid answers are rejected', () => {
  for (const hash of ['', '#', '#akta=v1-zzz', '#akta=v2-000', '#akta=v1-00', '#akta=v1-0000', '#akta=v1-000<script>', '#akta=v1--01']) assert.equal(names.fromHash(hash), null);
  for (const input of [[], [0,0,0,0,0,-1], [0,0,0,0,0,6], [4,0,0,0,0,0], [null,0,0,0,0,0], [0.5,0,0,0,0,0]]) assert.throws(() => names.fromAnswers(input));
});
test('v1 published links remain stable', () => {
  assert.equal(names.fromHash('#akta=v1-000').name, 'Vörös Darth Lekvár, a bátor szövetséges');
  assert.equal(names.fromId(6143).name, 'Lila Gyöngyhajú Géza, a titkos önimádó');
});
