/* Version 1 is permanent: append new versions rather than reordering these lists.
   Each entry is an original parody name followed by its cultural inspiration. */
const AgentNames = (() => {
  const bases = [
    ['Darth Lekvár', 'Star Wars · Darth Vader'],
    ['Obi-Wan Kenyérbi', 'Star Wars · Obi-Wan Kenobi'],
    ['Han Szaló', 'Star Wars · Han Solo'],
    ['Jabba, a Háziúr', 'Star Wars · Jabba'],
    ['Boba Fettő', 'Star Wars · Boba Fett'],
    ['Rántotta-D2', 'Star Wars · R2-D2'],
    ['Csubakávé', 'Star Wars · Csubakka'],
    ['Leia Leveske', 'Star Wars · Leia Organa'],
    ['Yoda Józsi', 'Star Wars · Yoda'],
    ['Palpatin Pali', 'Star Wars · Palpatine'],
    ['Mr. Rózsaszín Zaj', 'Tarantino · Kutyaszorítóban'],
    ['Vincent Vega Burger', 'Tarantino · Ponyvaregény'],
    ['Jules, a Szendvicsőr', 'Tarantino · Ponyvaregény'],
    ['Mia Müzli', 'Tarantino · Ponyvaregény'],
    ['Beatrix Kiddozó', 'Tarantino · Kill Bill'],
    ['Django, a Szabadnapos', 'Tarantino · Django elszabadul'],
    ['Jackie Brownie', 'Tarantino · Jackie Brown'],
    ['Mr. Wolf, a Rendrakó', 'Tarantino · Ponyvaregény'],
    ['Fülig Lekvár', 'Rejtő Jenő · Fülig Jimmy'],
    ['Piszkos Fred, a Portás', 'Rejtő Jenő · Piszkos Fred'],
    ['Tuskó Kávé', 'Rejtő Jenő · Tuskó Hopkins'],
    ['Gorcsev, a Kártyafelelős', 'Rejtő Jenő · A tizennégy karátos autó'],
    ['Vanek, a Szabadságos', 'Rejtő Jenő · Vanek úr'],
    ['Senki Alfonz, a Mindenes', 'Rejtő Jenő · Senki Alfonz'],
    ['Potrien, a Porszívó', 'Rejtő Jenő · A három testőr Afrikában'],
    ['Csülök, a Vegán', 'Rejtő Jenő · A három testőr Afrikában'],
    ['Micimaffiózó', 'A. A. Milne · Micimackó'],
    ['Malacka, az Inkognitó', 'A. A. Milne · Micimackó'],
    ['Füles, a Lehallgató', 'A. A. Milne · Micimackó'],
    ['Tigris, a Túlórázó', 'A. A. Milne · Micimackó'],
    ['Nyuszi, az Iktató', 'A. A. Milne · Micimackó'],
    ['Bagoly, a Főelemző', 'A. A. Milne · Micimackó'],
    ['Róbert, a Gyanús Gida', 'A. A. Milne · Micimackó'],
    ['Kanga, a Futár', 'A. A. Milne · Micimackó'],
    ['Zsebibaba, a Mikroügynök', 'A. A. Milne · Micimackó'],
    ['Popzene Pista', 'Európa Kiadó · Popzene'],
    ['Romolj Meg Rezső', 'Európa Kiadó · Romolj meg!'],
    ['Jelküldő Jenő', 'Európa Kiadó · Küldj egy jelet'],
    ['Sárgarózsa Sándor', 'Illés · Sárga rózsa'],
    ['Utcánjáró Ödön', 'Illés · Az utcán'],
    ['Kisvirág Kázmér', 'Illés · Kis virág'],
    ['Lokomotív Lajos', 'LGT · A Locomotiv GT (A síneken)'],
    ['Rádió Rudi', 'LGT · Szól a rádió'],
    ['Ringató Rómeó', 'LGT · Ringasd el magad'],
    ['Afrika Aladár', 'KFT · Afrika'],
    ['Bábu Béla', 'KFT · Bábu vagy'],
    ['Balatoni Béla', 'KFT · Balatoni nyár'],
    ['Közeli Kálmán', 'Bikini · Közeli helyeken'],
    ['Fagyi Ferenc', 'Bikini · Fagyi'],
    ['Mielőtt Elmegyek Elemér', 'Bikini · Mielőtt elmegyek'],
    ['Kétforintos Károly', 'P. Mobil · Kétforintos dal'],
    ['Főnix Feri', 'P. Mobil · Főnix éjszakája'],
    ['Miskolci Móric', 'P. Mobil · Miskolc'],
    ['Jerikó József', 'Beatrice · Jerikó'],
    ['Angyalföldi Álruhás', 'Beatrice · Angyalföld'],
    ['Nagyvárosi Nándor', 'Beatrice · Nagyvárosi farkas'],
    ['Kopaszkutya Kázmér', 'Hobo Blues Band · Kopaszkutya'],
    ['Vadász Vili', 'Hobo Blues Band · Vadászat'],
    ['Zöldbíbor Zoltán', 'P. Box · A zöld, a bíbor és a fekete'],
    ['Vágtázó Valér', 'P. Box · Vágtass velem'],
    ['Kölyök Kelemen', 'Edda Művek · Kölyköd voltam'],
    ['Sarkonálló Samu', 'Edda Művek · A hűtlen'],
    ['Petróleum Pál', 'Omega · Petróleumlámpa'],
    ['Gyöngyhajú Géza', 'Omega · Gyöngyhajú lány']
  ];
  const colors = ['Vörös', 'Kék', 'Zöld', 'Sárga', 'Fekete', 'Lila'];
  const titles = [
    'a bátor szövetséges', 'a családi összekötő', 'a félénk állatbarát', 'a magányos hős',
    'a baráti vészfék', 'a rokoni gyorssegély', 'a bundás rend őre', 'a nyugodt túlélő',
    'a csendes cinkos', 'a vasárnapi békebíró', 'a doromboló diplomata', 'a szunyókáló stratéga',
    'a békés bajtárs', 'a szeretetügynök', 'a mancsos békekövet', 'a titkos önimádó'
  ];
  const total = bases.length * colors.length * titles.length;
  function fromAnswers(answers) {
    const limits = [4, 4, 4, 4, 4, 6];
    if (!Array.isArray(answers) || answers.length !== 6 || answers.some((v, i) => !Number.isInteger(v) || v < 0 || v >= limits[i])) throw new Error('Hiányzó vagy hibás válasz.');
    const [age, name, place, hate, love, color] = answers;
    return fromId(((age * 16 + name * 4 + place) * 6 + color) * 16 + hate * 4 + love);
  }
  function fromId(id) {
    if (!Number.isInteger(id) || id < 0 || id >= total) return null;
    const title = id % 16;
    const color = Math.floor(id / 16) % 6;
    const base = Math.floor(id / 96);
    return {id, name: `${colors[color]} ${bases[base][0]}, ${titles[title]}`, inspiration: bases[base][1], code: id.toString(36).padStart(3, '0'), color: colors[color]};
  }
  function fromHash(hash) {
    const match = /^#akta=v1-([0-9a-z]{3})$/.exec(hash);
    return match ? fromId(parseInt(match[1], 36)) : null;
  }
  return {fromAnswers, fromId, fromHash, total};
})();
if (typeof module !== 'undefined') module.exports = AgentNames;
