const main = document.querySelector('#main');
const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
const questions = [
  { title: 'Hány éves vagy?', hint: 'Csak a korosztály érdekel. A születési anyakönyvi kivonat maradhat.', options: ['18 alatt · ifjú titán', '18–34 · aktív állomány', '35–54 · rutinos róka', '55 vagy több · élő legenda'] },
  { title: 'Hogy hívnak?', hint: 'Elég a keresztneved kezdőbetűje. Az ékezeteket most hagyd el.', options: ['A–F betűvel kezdődik', 'G–L betűvel kezdődik', 'M–R betűvel kezdődik', 'S–Z vagy más karakter'] },
  { title: 'Hol laksz?', hint: 'A pontos címet tartsd meg. Nekünk a terep típusa is elég.', options: ['Budapesten · a központban', 'Más városban · terepen', 'Falun · mély fedésben', 'Külföldön · nemzetközi vonalon'] },
  { title: 'Kit utálsz?', hint: 'Neveket nem kérünk. Még a képzeletbeli aktába sem.', options: ['A sorban tolakodókat', 'A folyton siettetőket', 'A hajnali hangoskodókat', 'Senkit · békés ügynök vagyok'] },
  { title: 'Kit szeretsz?', hint: 'Minden jó ügynöknek van egy gyenge pontja.', options: ['A barátaimat · a csapatot', 'A családomat · a hátországot', 'Az állatokat · a szőrös társakat', 'Magamat · valakinek muszáj'] },
  { title: 'Mi a kedvenc színed?', hint: 'Az utolsó ecsetvonás a titkos személyiségedhez.', options: ['Vörös', 'Kék', 'Zöld', 'Sárga', 'Fekete', 'Lila'], colors: ['#c54a3b', '#4b75b8', '#5e8756', '#dfb831', '#282923', '#9370ad'] }
];
let answers = Array(6).fill(null);
let step = 0;
let screen = 'home';
const arrow = '<span aria-hidden="true">↗</span>';
function focusHeading() { main.querySelector('h1')?.focus({preventScroll: true}); window.scrollTo({top: 0, behavior: 'instant'}); }
function home(announce = true) {
  screen = 'home';
  main.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow"><span class="small-cross">✳</span> CIVIL VAGY. EGYELŐRE.</p>
        <h1 tabindex="-1">Mindenkiben<br>lapul egy<br><span class="highlight">titkosügynök.</span></h1>
        <p class="intro">Benned vajon hogy hívják?<br>Hat ártatlan kérdés. Egy gyanúsan jó fedőnév.</p>
        <button class="primary" id="start">Kérem a fedőnevem ${arrow}</button>
        <p class="micro hero-micro"><span aria-hidden="true">◷</span> KB. 1 PERC <span>·</span> NINCS ROSSZ VÁLASZ</p>
      </div>
      <div class="dossier-scene" aria-label="Illusztrált titkos ügynökakta">
        <div class="folder-back"></div>
        <div class="dossier">
          <div class="file-top"><span>F.Ü.O. / SZEMÉLYI AKTA</span><span>№ 006</span></div>
          <div class="file-title">SZIGORÚAN<br>TITKOS<span class="file-star">✳</span></div>
          <div class="photo-row"><div class="agent-photo">
            <svg viewBox="0 0 200 210" role="img" aria-label="Kalapos, napszemüveges ügynök sziluettje">
              <path fill="#252822" d="M42 70 59 27l39 12 37-12 23 43z"/><path fill="#252822" d="M24 75q74-24 151 0l-9 12H34z"/>
              <path fill="#c4ccaf" d="M61 85h80l-8 57-33 25-32-25z"/><path fill="#252822" d="m52 93 42 4 5 8 7-8 42-4-6 29-31 2-12-15-12 15-30-2z"/>
              <path fill="#252822" d="m68 145 31 22 32-22 39 23 19 42H11l19-42z"/><path fill="#edece4" d="m78 151 21 16-15 29-19-42m54-3-20 16 16 29 19-42"/><path fill="#c5f34b" d="m96 170 7 0 7 40H89z"/>
            </svg><span class="photo-caption">SZEMÉLYAZONOSSÁG: ???</span>
          </div><div class="file-data"><span>NÉV</span><i class="redacted wide"></i><span>FOGLALKOZÁS</span><i class="redacted"></i><span>FEDŐNÉV</span><b>FOLYAMATBAN_</b></div></div>
          <div class="file-lines"><span>MEGJEGYZÉS</span><p>A célszemély gyanúsan hétköznapi.<br>További vizsgálat javasolt.</p></div>
          <div class="stamp">FELOLDVA</div>
          <div class="file-bottom"><span class="barcode" aria-hidden="true"></span><span>AZ AKTA RÁD VÁR.</span></div>
        </div>
        <div class="round-seal" aria-hidden="true">100%<small>ÁLNÉV</small></div>
        <p class="scene-note">A neved marad. A fedősztorid változik. <span aria-hidden="true">↖</span></p>
      </div>
    </section>
    <section class="how" aria-label="Így működik"><div class="section-label">A MŰVELET MENETE <span>↓</span></div><div class="how-item"><span class="step-number">01</span><div><h2>Vallj színt.</h2><p>Hat kérdés. Semmi kihallgatás.</p></div></div><div class="how-item"><span class="step-number">02</span><div><h2>Kapj fedőnevet.</h2><p>Egy kis kultúra. Egy nagy adag abszurd.</p></div></div><div class="how-item"><span class="step-number">03</span><div><h2>Add tovább.</h2><p>Az aktád szabadon megosztható.</p></div></div></section>
    <div class="culture-strip"><span>ISMERŐS LEHET VALAHONNAN</span><p>Star Wars <b>✳</b> Tarantino <b>✳</b> Rejtő Jenő <b>✳</b> Micimackó <b>✳</b> Magyar rocklegendák <b>✳</b> A kilencvenes évek politikusai</p></div>`;
  document.querySelector('#start').addEventListener('click', () => {answers.fill(null); step = 0; quiz();});
  if (announce) focusHeading();
}
function quiz() {
  screen = 'quiz';
  const q = questions[step];
  main.innerHTML = `<section class="quiz-page"><div class="quiz-top"><button id="back" class="text-link">← ${step ? 'Előző kérdés' : 'Vissza a kezdőlapra'}</button><span class="micro">SZEMÉLYI AKTA / ADATFELVÉTEL</span></div>
    <div class="progress-label"><span class="eyebrow">${String(step + 1).padStart(2, '0')} / 06 KÉRDÉS</span><span class="micro">${['ISMERKEDJÜNK.', 'MARADJ INKOGNITÓBAN.', 'MÉRJÜK FEL A TEREPET.', 'VAN EGY GYANÚNK.', 'KÖZEL JÁRUNK.', 'MÁR CSAK EGY VÁLASZ.'][step]}</span></div>
    <div class="progress" role="progressbar" aria-label="Kérdések" aria-valuemin="0" aria-valuemax="6" aria-valuenow="${step + 1}">${questions.map((_, i) => `<i class="${i <= step ? 'filled' : ''}"></i>`).join('')}</div>
    <form id="question-form"><fieldset><legend><h1 tabindex="-1">${q.title}</h1></legend><p class="question-hint" id="question-hint">${q.hint}</p><div class="options" ${q.colors ? 'data-colors="true"' : ''}>${q.options.map((option, i) => `<label class="option"><input type="radio" name="answer" value="${i}" ${answers[step] === i ? 'checked' : ''} aria-describedby="question-hint"><span class="choice-key">${q.colors ? `<i class="color-dot" style="--swatch:${q.colors[i]}"></i>` : letters[i]}</span><span class="option-label">${option}</span><span class="choice-check" aria-hidden="true">↗</span></label>`).join('')}</div></fieldset>
    <div class="quiz-actions"><span class="micro">${step === 5 ? 'A FEDŐSZTORID ÖSSZEÁLLT.' : 'A VÁLASZOD KÖZTÜNK MARAD.'}</span><button class="primary" type="submit" ${answers[step] === null ? 'disabled' : ''}>${step === 5 ? 'Felfedem a fedőnevem' : 'Következő kérdés'} ${arrow}</button></div></form></section>`;
  document.querySelector('#back').addEventListener('click', () => {if (step) {step--; quiz();} else home();});
  const form = document.querySelector('#question-form');
  form.addEventListener('change', e => {answers[step] = Number(e.target.value); form.querySelector('button[type="submit"]').disabled = false;});
  form.addEventListener('submit', e => {e.preventDefault(); if (answers[step] === null) return; if (step < 5) {step++; quiz();} else {const result = AgentNames.fromAnswers(answers); location.hash = result.hash;}});
  focusHeading();
}
function resultPage(result) {
  screen = 'result';
  main.innerHTML = `<section class="result-page"><p class="eyebrow"><i class="live-dot"></i> AZONOSÍTÁS SIKERES / AKTA FELOLDVA</p><div class="result-file"><div class="file-top"><span>FIKTÍV ÜGYEK OSZTÁLYA</span><span id="record-number"></span></div><p class="result-kicker">Az ügynökneved:</p><h1 tabindex="-1" id="agent-name"></h1><div class="result-divider"><span>✳</span><i></i><span>HITELESEN KITALÁLT</span></div><p class="result-note">A fedőnév kötelez. Leginkább arra, hogy ne vedd túl komolyan.</p></div><h2>Ezt az aktát nem kell titkolnod.</h2><p class="share-intro">Oszd meg az ügynöknevedet a barátaiddal!</p><div class="share-actions"><button class="primary" id="copy">Link másolása <span aria-hidden="true">↗</span></button><button class="secondary" id="share" hidden>Megosztás <span aria-hidden="true">↑</span></button></div><p id="share-status" role="status" class="share-status"></p><div id="manual-copy" hidden><label for="share-url">Másold ki ezt a linket:</label><input id="share-url" readonly></div><button class="text-link restart" id="restart">↶ Új akta, új fedőnév</button></section>`;
  document.querySelector('#agent-name').textContent = result.name;
  document.querySelector('#record-number').textContent = `AKTA / ${result.code.toUpperCase()}`;
  document.title = `${result.name} — Fedőnév`;
  const status = document.querySelector('#share-status');
  document.querySelector('#copy').addEventListener('click', async () => {
    try {await navigator.clipboard.writeText(location.href); status.textContent = 'A link a vágólapon. Mehet a beavatottaknak!';}
    catch {document.querySelector('#manual-copy').hidden = false; const input = document.querySelector('#share-url'); input.value = location.href; input.focus(); input.select(); status.textContent = 'A böngésződben a link kézzel másolható.';}
  });
  if (navigator.share && location.protocol !== 'file:') {
    const button = document.querySelector('#share'); button.hidden = false;
    button.addEventListener('click', async () => {try {await navigator.share({title: 'Az ügynöknevem', text: `${result.name}. És téged hogy hívnak fedésben?`, url: location.href});} catch (error) {if (error.name !== 'AbortError') status.textContent = 'A megosztás most nem sikerült. Használd a Link másolása gombot.';}});
  }
  document.querySelector('#restart').addEventListener('click', reset);
  focusHeading();
}
function reset() {answers.fill(null); step = 0; if (location.hash) location.hash = ''; else home();}
function route(initial = false) {
  const result = AgentNames.fromHash(location.hash);
  if (result) resultPage(result);
  else if (location.hash && location.hash !== '#') {
    screen = 'error'; main.innerHTML = `<section class="error-page"><p class="eyebrow">ISMERETLEN AKTA</p><h1 tabindex="-1">Ez a fedősztori<br>nem áll össze.</h1><p>A link hibás, vagy olyan verzióhoz tartozik, amelyet ez az alkalmazás még nem ismer.</p><button id="reset" class="primary">Saját aktát nyitok ${arrow}</button></section>`;
    document.querySelector('#reset').addEventListener('click', reset); focusHeading();
  } else {document.title = 'Fedőnév — Mi a te ügynökneved?'; home(!initial);}
}
document.querySelector('.wordmark').addEventListener('click', e => {e.preventDefault(); reset();});
const about = document.querySelector('#about');
document.querySelector('#about-open').addEventListener('click', () => about.showModal());
about.querySelector('.dialog-close').addEventListener('click', () => about.close());
about.addEventListener('click', e => {if (e.target === about) {const r = about.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) about.close();}});
window.addEventListener('hashchange', () => route());
route(true);
