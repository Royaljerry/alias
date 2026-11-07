/* Published dictionaries are permanent: add a new version instead of reordering.
   Each entry is an original parody name followed by its cultural inspiration. */
const AgentNames = (() => {
  const legacyBases = [
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
  const legacyTitles = [
    'a bátor szövetséges', 'a családi összekötő', 'a félénk állatbarát', 'a magányos hős',
    'a baráti vészfék', 'a rokoni gyorssegély', 'a bundás rend őre', 'a nyugodt túlélő',
    'a csendes cinkos', 'a vasárnapi békebíró', 'a doromboló diplomata', 'a szunyókáló stratéga',
    'a békés bajtárs', 'a szeretetügynök', 'a mancsos békekövet', 'a titkos önimádó'
  ];
  // Keep the original dictionary and formatter for previously shared v1 URLs.
  // V2 has 96 base names and 64 optional, single-word prefixes: 6144 unique names.
  const bases = [
    ...legacyBases.map(([name, inspiration]) => [name.split(',')[0], inspiration]),
    ['Darth Vader', 'Star Wars · Darth Vader'],
    ['Luke Skywalker', 'Star Wars · Luke Skywalker'],
    ['Lando Kalóriás', 'Star Wars · Lando Calrissian'],
    ['Qui-Gon Jinn', 'Star Wars · Qui-Gon Jinn'],
    ['Dooku Gróf', 'Star Wars · Dooku'],
    ['C-3Presszó', 'Star Wars · C-3PO'],
    ['Padmé Paprikás', 'Star Wars · Padmé Amidala'],
    ['Mace Windu', 'Star Wars · Mace Windu'],
    ['Ordell Omlett', 'Tarantino · Jackie Brown'],
    ['Butch Bundás', 'Tarantino · Ponyvaregény'],
    ['Mr. Narancs', 'Tarantino · Kutyaszorítóban'],
    ['Hattori Hántoló', 'Tarantino · Kill Bill'],
    ['Elle Drazsé', 'Tarantino · Kill Bill'],
    ['O-Ren Sushi', 'Tarantino · Kill Bill'],
    ['Aldo Rágó', 'Tarantino · Becstelen brigantyk'],
    ['Marsellus Waffel', 'Tarantino · Ponyvaregény'],
    ['Antall Aktatáska', 'Kilencvenes évek · Antall József'],
    ['Boross Boríték', 'Kilencvenes évek · Boross Péter'],
    ['Horn Hokedli', 'Kilencvenes évek · Horn Gyula'],
    ['Torgyán Túrógombóc', 'Kilencvenes évek · Torgyán József'],
    ['Kuncze Kulcscsomó', 'Kilencvenes évek · Kuncze Gábor'],
    ['Pető Papírkutya', 'Kilencvenes évek · Pető Iván'],
    ['Orbán Orbitális', 'Kilencvenes évek · Orbán Viktor'],
    ['Deutsch Dosszié', 'Kilencvenes évek · Deutsch Tamás'],
    ['Áder Álcabajusz', 'Kilencvenes évek · Áder János'],
    ['Fodor Fénymásoló', 'Kilencvenes évek · Fodor Gábor'],
    ['Demszky Díszjárat', 'Kilencvenes évek · Demszky Gábor'],
    ['Göncz Gombóc', 'Kilencvenes évek · Göncz Árpád'],
    ['Dávid Drazsé', 'Kilencvenes évek · Dávid Ibolya'],
    ['Bokros Batyu', 'Kilencvenes évek · Bokros Lajos'],
    ['Békesi Béleltboríték', 'Kilencvenes évek · Békesi László'],
    ['Szabó Szaloncukor', 'Kilencvenes évek · Szabó Iván']
  ];
  const prefixes = [
    '', ...colors,
    'Bátor', 'Félénk', 'Gyáva', 'Vakmerő', 'Óvatos', 'Ravasz', 'Csendes',
    'Hangos', 'Álmos', 'Éber', 'Lusta', 'Fürge', 'Nyugodt', 'Izgága',
    'Mogorva', 'Vidám', 'Morcos', 'Derűs', 'Komoly', 'Játékos', 'Titkos',
    'Rejtélyes', 'Gyanús', 'Ártatlan', 'Álcázott', 'Láthatatlan', 'Hűséges',
    'Makacs', 'Kíváncsi', 'Szórakozott', 'Pedáns', 'Rendetlen', 'Éhes',
    'Jóllakott', 'Szomjas', 'Kócos', 'Elegáns', 'Zsebes', 'Papucsos',
    'Bajszos', 'Kalapos', 'Mezítlábas', 'Surranó', 'Lopakodó', 'Kóbor',
    'Otthonülő', 'Békés', 'Dacos', 'Büszke', 'Szerény', 'Furfangos',
    'Leleményes', 'Merengő', 'Bóbiskoló', 'Doromboló', 'Csibész', 'Huncut'
  ];
  const total = 6144;
  const version = 'v2';
  function fromAnswers(answers) {
    const limits = [4, 4, 4, 4, 4, 6];
    if (!Array.isArray(answers) || answers.length !== 6 ||
        !limits.every((limit, i) => Number.isInteger(answers[i]) && answers[i] >= 0 && answers[i] < limit)) {
      throw new Error('Hiányzó vagy hibás válasz.');
    }
    const [age, name, place, hate, love, color] = answers;
    return fromId(((age * 16 + name * 4 + place) * 6 + color) * 16 + hate * 4 + love);
  }
  function fromId(id, resultVersion = version) {
    if (!Number.isInteger(id) || id < 0 || id >= total) return null;
    const code = id.toString(36).padStart(3, '0');
    const hash = `#akta=${resultVersion}-${code}`;
    if (resultVersion === 'v1') {
      const title = id % 16;
      const color = Math.floor(id / 16) % 6;
      const base = Math.floor(id / 96);
      return {id, version: resultVersion, hash, code,
        name: `${colors[color]} ${legacyBases[base][0]}, ${legacyTitles[title]}`,
        inspiration: legacyBases[base][1], color: colors[color]};
    }
    if (resultVersion !== version) return null;
    // 2053 and 6144 are coprime: this is a fixed bijection, not randomness.
    // It distributes all six answers across the name and the optional prefix.
    const index = (id * 2053) % total;
    const [base, inspiration] = bases[index % bases.length];
    const prefix = prefixes[Math.floor(index / bases.length)];
    return {id, version, hash, code, base, prefix,
      name: prefix ? `${prefix} ${base}` : base, inspiration};
  }
  function fromHash(hash) {
    const match = /^#akta=(v1|v2)-([0-9a-z]{3})$/.exec(hash);
    return match ? fromId(parseInt(match[2], 36), match[1]) : null;
  }
  return {fromAnswers, fromId, fromHash, total, version};
})();
if (typeof module !== 'undefined') module.exports = AgentNames;
