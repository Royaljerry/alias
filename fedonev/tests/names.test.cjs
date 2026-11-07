const assert = require('node:assert/strict');
const test = require('node:test');
const names = require('../dist/names.js');
test('all seven-answer combinations produce distinct short names and stable v3 URLs', () => {
  const unique = new Set();
  const prefixes = new Set();
  const poems = new Set();
  const films = new Set();
  let bare = 0;
  for (let a = 0; a < 4; a++) for (let n = 0; n < 4; n++) for (let p = 0; p < 4; p++) for (let h = 0; h < 4; h++) for (let l = 0; l < 4; l++) for (let c = 0; c < 6; c++) {
    const heightNames = new Set();
    for (let height = 0; height < 4; height++) {
      const input = [a, n, p, h, l, c, height];
      const result = names.fromAnswers(input);
      unique.add(result.name);
      heightNames.add(result.name);
      prefixes.add(result.prefix);
      assert.equal(result.version, 'v3');
      assert.equal(typeof result.prefix, 'string');
      assert.doesNotMatch(result.prefix, /\s/);
      assert.doesNotMatch(result.name, /,/);
      assert.equal(result.name, result.prefix ? `${result.prefix} ${result.base}` : result.base);
      if (!result.prefix) bare++;
      if (result.inspiration.startsWith('Petőfi Sándor')) poems.add(result.base);
      if (result.inspiration.startsWith('Ötvös Csöpi-filmek')) films.add(result.base);
      assert.deepEqual(names.fromAnswers(input), result);
      assert.deepEqual(names.fromHash(result.hash), result);
    }
    assert.equal(heightNames.size, 4, 'height must affect the generated name');
  }
  assert.equal(unique.size, 24576);
  assert.equal(names.total, 24576);
  assert.equal(bare, 128);
  assert.equal(poems.size, 16);
  assert.equal(films.size, 16);
  for (const prefix of ['Kétballábas', 'Genya', 'Lökött', 'Boomer']) assert.ok(prefixes.has(prefix));
  for (const example of ['Bátor Darth Vader', 'Kék Boba Fettő', 'Pató Pál', 'Kétballábas Kukorica Jancsi', 'Genya Ötvös Csöpi', 'Lökött Kardos Doktor', 'Boomer Hamis Baba']) assert.ok(unique.has(example), example);
});
test('malformed links, version-specific bounds and invalid answers are rejected', () => {
  for (const version of ['v1', 'v2', 'v3']) {
    for (const code of ['zzz', '00', '0000', '000<script>', '-01']) assert.equal(names.fromHash(`#akta=${version}-${code}`), null);
  }
  for (const hash of ['', '#', '#akta=v4-000', '#akta=v1-4qo', '#akta=v2-4qo']) assert.equal(names.fromHash(hash), null);
  assert.equal(names.fromHash('#akta=v3-4qo').id, 6144);
  assert.equal(names.fromId(24576), null);
  for (const input of [[], Array(7), [0,0,0,0,0,0], [0,0,0,0,0,0,-1], [0,0,0,0,0,0,4], [0,0,0,0,0,6,0], [4,0,0,0,0,0,0], [null,0,0,0,0,0,0], [0.5,0,0,0,0,0,0]]) assert.throws(() => names.fromAnswers(input));
  assert.equal(names.fromId(0, 'v4'), null);
});
test('all previously published v1 and v2 names remain unchanged', () => {
  const {createHash} = require('node:crypto');
  const digests = {
    v1: 'd5c99437bf382e2b19fa853c2bc4531d8a24d14e12420a0703f3d7187cd4ec5c',
    v2: 'c9b74e6215b87560898a565a18c220399aa1e54511de8b69b37484bd4719012b'
  };
  for (const [version, digest] of Object.entries(digests)) {
    const legacy = Array.from({length:6144}, (_, id) => names.fromHash(`#akta=${version}-${id.toString(36).padStart(3, '0')}`).name);
    assert.equal(createHash('sha256').update(JSON.stringify(legacy)).digest('hex'), digest);
  }
  assert.equal(names.fromHash('#akta=v2-2n4').name, 'Bátor Darth Vader');
});
