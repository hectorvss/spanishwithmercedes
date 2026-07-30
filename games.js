/* ================================================
   Spanish Lessons With Mercedes — Interactive Games
   ================================================ */

/* ── DATA ─────────────────────────────────────── */

const FLASHCARDS = [
  { es:'hola', en:'hello', lvl:'A1' }, { es:'adiós', en:'goodbye', lvl:'A1' },
  { es:'por favor', en:'please', lvl:'A1' }, { es:'gracias', en:'thank you', lvl:'A1' },
  { es:'agua', en:'water', lvl:'A1' }, { es:'comida', en:'food', lvl:'A1' },
  { es:'casa', en:'house', lvl:'A1' }, { es:'amigo', en:'friend', lvl:'A1' },
  { es:'trabajo', en:'work', lvl:'A2' }, { es:'ciudad', en:'city', lvl:'A2' },
  { es:'tiempo', en:'time / weather', lvl:'A2' }, { es:'dinero', en:'money', lvl:'A2' },
  { es:'feliz', en:'happy', lvl:'A2' }, { es:'difícil', en:'difficult', lvl:'B1' },
  { es:'sin embargo', en:'however', lvl:'B1' }, { es:'aunque', en:'although', lvl:'B1' },
  { es:'conseguir', en:'to manage / to get', lvl:'B1' }, { es:'a pesar de', en:'despite', lvl:'B2' },
  { es:'sin duda', en:'without a doubt', lvl:'B2' }, { es:'madrugada', en:'early morning (2–5am)', lvl:'B2' }
];

/* ── SER / ESTAR — 4 LEVELS ──────────────────── */
const SE_LEVELS = {
  a1: {
    label: {en:'A1 · Beginner', es:'A1 · Principiante'},
    color: '#3DDABE',
    qs: [
      /* ── Reglas que SIEMPRE funcionan igual: las 7 grandes del A1 ── */
      { s:'Yo ___ italiana.',            opts:['soy','estoy'],     a:0, e:{en:'Nationality → always SER (yo → soy)',              es:'Nacionalidad → siempre SER (yo → soy)'} },
      { s:'Él ___ dentista.',            opts:['es','está'],       a:0, e:{en:'Profession → always SER (él → es)',                es:'Profesión → siempre SER (él → es)'} },
      { s:'Ella ___ de Colombia.',       opts:['es','está'],       a:0, e:{en:'Origin → always SER + DE (ella → es)',             es:'Origen → siempre SER + DE (ella → es)'} },
      { s:'Hoy ___ miércoles.',          opts:['es','está'],       a:0, e:{en:'Day / date → always SER',                         es:'Día / fecha → siempre SER'} },
      { s:'Mi padre ___ alto y fuerte.', opts:['es','está'],       a:0, e:{en:'Permanent physical trait → SER',                  es:'Rasgo físico permanente → SER'} },
      { s:'Las llaves ___ en el cajón.', opts:['son','están'],     a:1, e:{en:'Location of things → always ESTAR',               es:'Ubicación de objetos → siempre ESTAR'} },
      { s:'Yo ___ muy cansado.',         opts:['soy','estoy'],     a:1, e:{en:'Physical state → always ESTAR (yo → estoy)',      es:'Estado físico → siempre ESTAR (yo → estoy)'} },
      { s:'El niño ___ enfermo.',        opts:['es','está'],       a:1, e:{en:'Health state → always ESTAR (él → está)',         es:'Estado de salud → siempre ESTAR (él → está)'} },
      { s:'Nosotros ___ en la oficina.', opts:['somos','estamos'], a:1, e:{en:'Location of people → always ESTAR',               es:'Ubicación de personas → siempre ESTAR'} },
      { s:'Tú ___ muy triste hoy.',      opts:['eres','estás'],    a:1, e:{en:'Emotional state → always ESTAR (tú → estás)',     es:'Estado emocional → siempre ESTAR (tú → estás)'} }
    ]
  },
  a2: {
    label: {en:'A2 · Elementary', es:'A2 · Elemental'},
    color: '#D4920A',
    qs: [
      /* ── Usos que CONTRADICEN la intuición del A1 + reglas nuevas ── */
      { s:'La boda ___ en la iglesia del pueblo.',        opts:['es','está'],     a:0, e:{en:'⚠ Event location → SER, not ESTAR!',              es:'⚠ Lugar de un evento → SER, ¡no ESTAR!'} },
      { s:'El partido de fútbol ___ a las nueve.',        opts:['es','está'],     a:0, e:{en:'Scheduled event time → SER',                      es:'Hora de un evento programado → SER'} },
      { s:'¿Qué hora ___ exactamente?',                  opts:['es','está'],     a:0, e:{en:'Telling the time → always SER',                   es:'Decir la hora → siempre SER'} },
      { s:'La ventana ___ rota.',                         opts:['es','está'],     a:1, e:{en:'Result of an action (past participle) → ESTAR',    es:'Resultado de una acción (participio) → ESTAR'} },
      { s:'Este bolso ___ hecho de cuero.',               opts:['es','está'],     a:0, e:{en:'Material / composition → SER',                    es:'Material o composición → SER'} },
      { s:'La farmacia ___ cerrada los domingos.',        opts:['es','está'],     a:1, e:{en:'Open/closed states → always ESTAR',               es:'Abierto/cerrado → siempre ESTAR'} },
      { s:'Esta novela ___ escrita en inglés.',           opts:['es','está'],     a:0, e:{en:'Passive voice → SER + past participle',           es:'Voz pasiva → SER + participio'} },
      { s:'Los vasos ___ sucios después de la fiesta.',   opts:['son','están'],   a:1, e:{en:'Condition/result → ESTAR (not a permanent trait)', es:'Estado o resultado → ESTAR (no es un rasgo fijo)'} },
      { s:'¿Para qué ___ este botón rojo?',              opts:['es','está'],     a:0, e:{en:'Purpose → SER para (what is it for?)',             es:'Finalidad → SER para (¿para qué sirve?)'} },
      { s:'Hoy mi jefa ___ de muy buen humor.',          opts:['es','está'],     a:1, e:{en:'Current mood ≠ personality → ESTAR',              es:'Estado de ánimo actual ≠ personalidad → ESTAR'} }
    ]
  },
  b1: {
    label: {en:'B1 · Intermediate', es:'B1 · Intermedio'},
    color: '#2885FD',
    qs: [
      /* ── Adjetivos trampa: mismo adjetivo, distinto verbo, distinto significado ── */
      { ctx:{en:'She remembers everything — you can\'t fool her.',    es:'Recuerda todo — no la engañas nunca.'},
        s:'Mi abuela ___ muy viva.',                   opts:['es','está'],   a:0,
        e:{en:'SER vivo = sharp / alert (permanent trait)',                  es:'SER vivo = aguda, espabilada (rasgo de carácter)'} },
      { ctx:{en:'The doctors arrived in time and saved him.',          es:'Los médicos llegan a tiempo y lo salvan.'},
        s:'El accidentado ___ vivo.',                  opts:['es','está'],   a:1,
        e:{en:'ESTAR vivo = alive (temporary, biological state)',            es:'ESTAR vivo = con vida (estado biológico temporal)'} },
      { ctx:{en:'Exam day — nobody says a word.',                      es:'Día de examen — nadie dice nada.'},
        s:'Los estudiantes ___ muy callados.',         opts:['son','están'], a:1,
        e:{en:'ESTAR callado = quiet right now (temporary state)',           es:'ESTAR callado = callados ahora mismo (estado temporal)'} },
      { ctx:{en:'She\'s always been like this — barely speaks.',       es:'Siempre ha sido así — habla muy poco.'},
        s:'Mi hermana ___ muy callada.',               opts:['es','está'],   a:0,
        e:{en:'SER callado = naturally quiet (permanent character)',         es:'SER callado = reservado por naturaleza (carácter)'} },
      { ctx:{en:'Put her in front of an audience and she freezes.',    es:'Ponla delante de un público y se bloquea.'},
        s:'Mi profesora ___ muy nerviosa en público.', opts:['es','está'],   a:0,
        e:{en:'SER nervioso = a nervous person by nature (trait)',           es:'SER nervioso = nervioso por naturaleza (rasgo)'} },
      { ctx:{en:'It\'s your first day at the new job.',                es:'Es tu primer día en el nuevo trabajo.'},
        s:'Yo ___ muy nervioso hoy.',                  opts:['soy','estoy'], a:1,
        e:{en:'ESTAR nervioso = feeling nervous right now (state)',          es:'ESTAR nervioso = sentir nervios ahora (estado)'} },
      { ctx:{en:'Engineers built it over a hundred years ago.',        es:'Lo construyeron hace más de cien años.'},
        s:'El puente ___ construido en el siglo XIX.', opts:['es','está'],   a:0,
        e:{en:'SER + past participle = passive voice (who made it)',        es:'SER + participio = voz pasiva (quién lo hizo)'} },
      { ctx:{en:'Works started yesterday and will last three weeks.',  es:'Las obras empezaron ayer y durarán tres semanas.'},
        s:'El puente ___ cortado por obras.',          opts:['es','está'],   a:1,
        e:{en:'ESTAR + past participle = current state (how it is now)',    es:'ESTAR + participio = estado actual (cómo está ahora)'} },
      { ctx:{en:'He learned to read at 4 — he amazes every teacher.', es:'Aprendió a leer a los 4 años — sorprende a todos.'},
        s:'Este niño ___ muy despierto.',              opts:['es','está'],   a:0,
        e:{en:'SER despierto = bright / sharp (permanent trait)',           es:'SER despierto = espabilado, listo (rasgo permanente)'} },
      { ctx:{en:'You couldn\'t sleep — you\'ve been awake since 5am.', es:'No pudiste dormir — llevas despierto desde las 5.'},
        s:'Yo ___ despierto desde las cinco.',         opts:['soy','estoy'], a:1,
        e:{en:'ESTAR despierto = awake (physical, temporary state)',        es:'ESTAR despierto = sin dormir (estado físico temporal)'} }
    ]
  },
  adj: {
    label: {en:'Adjectives · B1', es:'Adjetivos · B1'},
    color: '#7C3AED',
    qs: [
      { ctx:{en:'He treats people badly — it\'s his character.',es:'Trata mal a la gente — es su carácter.'},
        s:'Mi vecino ___ muy malo.',        opts:['es','está'],  a:0,
        e:{en:'SER + malo = bad person (character)',   es:'SER + malo = mala persona (carácter)'} },
      { ctx:{en:'She doesn\'t feel well today.',es:'No se encuentra bien hoy.'},
        s:'Ana ___ mala.',                  opts:['es','está'],  a:1,
        e:{en:'ESTAR + malo/a = ill / unwell',         es:'ESTAR + malo/a = enferma / indispuesta'} },
      { ctx:{en:'He\'s a kind, generous person.',es:'Es una persona amable y generosa.'},
        s:'Tu amigo ___ muy buena persona.',opts:['es','está'],  a:0,
        e:{en:'SER + bueno = good person (character)', es:'SER + bueno = buena persona (carácter)'} },
      { ctx:{en:'You try a bite — incredible flavour!',es:'Pruebas un bocado — ¡sabor increíble!'},
        s:'Esta tortilla ___ buenísima.',   opts:['es','está'],  a:1,
        e:{en:'ESTAR + bueno/a = delicious (current taste)', es:'ESTAR + bueno/a = delicioso (sabor actual)'} },
      { ctx:{en:'She always gets top marks — very bright.',es:'Siempre saca sobresalientes — muy inteligente.'},
        s:'Tu hija ___ muy lista.',         opts:['es','está'],  a:0,
        e:{en:'SER + listo = clever / intelligent',   es:'SER + listo = inteligente (rasgo)'} },
      { ctx:{en:'You\'re waiting for the report — it\'s done.',es:'Esperas el informe — ya está terminado.'},
        s:'El informe ya ___ listo.',       opts:['es','está'],  a:1,
        e:{en:'ESTAR + listo = ready (result of action)', es:'ESTAR + listo = preparado (resultado)'} },
      { ctx:{en:'His family has a lot of money.',es:'Su familia tiene mucho dinero.'},
        s:'Su familia ___ muy rica.',       opts:['es','está'],  a:0,
        e:{en:'SER + rico = wealthy',                 es:'SER + rico = adinerado/a'} },
      { ctx:{en:'You taste it — amazing flavour.',es:'Lo pruebas — un sabor increíble.'},
        s:'Este chocolate ___ riquísimo.',  opts:['es','está'],  a:1,
        e:{en:'ESTAR + rico = delicious',             es:'ESTAR + rico = delicioso'} },
      { ctx:{en:'You feel certain — no doubt about it.',es:'Tienes plena certeza — no hay duda.'},
        s:'Yo ___ seguro de que tiene razón.',opts:['soy','estoy'],a:1,
        e:{en:'ESTAR + seguro = certain about something', es:'ESTAR + seguro = tener certeza'} },
      { ctx:{en:'This is a safe neighbourhood — no crime.',es:'En este barrio no hay peligro.'},
        s:'Este barrio ___ muy seguro.',    opts:['es','está'],  a:0,
        e:{en:'SER + seguro = safe (inherent quality)',   es:'SER + seguro = sin peligro (característica)'} },
      { ctx:{en:'The film is objectively dull — always.',es:'La película es objetivamente aburrida.'},
        s:'Esta película ___ muy aburrida.',opts:['es','está'],  a:0,
        e:{en:'SER + aburrido = boring (permanent quality)', es:'SER + aburrido = aburrido de por sí'} },
      { ctx:{en:'He has nothing to do right now.',es:'Ahora mismo no tiene nada que hacer.'},
        s:'Juan ___ aburrido — no sabe qué hacer.', opts:['es','está'], a:1,
        e:{en:'ESTAR + aburrido = bored (temporary state)', es:'ESTAR + aburrido = sentir aburrimiento ahora'} }
    ]
  }
};

const QUIZ = [
  { q:{en:'How do you say "I am hungry"?',       es:'¿Cómo se dice "I am hungry"?'},
    opts:['Tengo hambre','Soy hambriento','Estoy hambre','Hay hambre'], a:0 },
  { q:{en:'Plural of "el libro"?',               es:'¿Plural de "el libro"?'},
    opts:['Los libros','Los libro','El libros','Los libres'], a:0 },
  { q:{en:'"Hablar" conjugated for "yo"?',       es:'"Hablar" conjugado para "yo"?'},
    opts:['Hablo','Hablas','Habla','Hablé'], a:0 },
  { q:{en:'Feminine of "el profesor"?',          es:'¿Femenino de "el profesor"?'},
    opts:['La profesora','La professor','La profesore','El profesora'], a:0 },
  { q:{en:'What does "hace frío" mean?',         es:'¿Qué significa "hace frío"?'},
    opts:["It's cold",'It makes cold','He is cold','Cold exists'], a:0 },
  { q:{en:'Which sentence is correct?',          es:'¿Cuál es la frase correcta?'},
    opts:['Me gusta el café','Yo gusto el café','A mí gusto café','Me gusto café'], a:0 },
  { q:{en:'Preterite of "comer" for "yo"?',      es:'¿Pretérito de "comer" para "yo"?'},
    opts:['Comí','Comé','Comía','Come'], a:0 },
  { q:{en:'Plural of "el lápiz"?',               es:'¿Plural de "el lápiz"?'},
    opts:['Los lápices','Los lápizs','Los lápizes','Los lapices'], a:0 },
  { q:{en:'Why "Me gustan los libros" (not "gusta")?', es:'¿Por qué "Me gustan los libros" y no "gusta"?'},
    opts:['"Libros" is plural','"Me" is plural',"It's past tense",'Random rule'], a:0 },
  { q:{en:'"I\'ve been studying for 2 hours" →', es:'"Llevo 2 horas estudiando" →'},
    opts:['Llevo 2 horas estudiando','Estoy 2 horas estudio','Tengo 2 horas estudiando','Soy 2 horas estudiar'], a:0 }
];

const FILL_GAPS = [
  { s:'Yo ___ en Madrid.',            opts:['vivo','vives','vive','vivimos'],        a:0, h:{en:'I live in Madrid',             es:'Yo vivo en Madrid'} },
  { s:'Me ___ mucho el chocolate.',   opts:['gusta','gustan','gusto','gustas'],       a:0, h:{en:'I like chocolate a lot',       es:'Me gusta mucho el chocolate'} },
  { s:'Ayer ___ al cine.',            opts:['fui','fue','iba','voy'],                 a:0, h:{en:'Yesterday I went to the cinema',es:'Ayer fui al cine'} },
  { s:'Necesito ___ más.',            opts:['estudiar','estudia','estudio','estudiando'],a:0,h:{en:'I need to study more',        es:'Necesito estudiar más'} },
  { s:'Ella ___ español muy bien.',   opts:['habla','hablo','hablas','hablan'],        a:0, h:{en:'She speaks Spanish very well', es:'Ella habla español muy bien'} },
  { s:'No ___ la pregunta.',          opts:['entiendo','entiendes','entiende','entendemos'],a:0,h:{en:"I don't understand",      es:'No entiendo la pregunta'} },
  { s:'___ que salir temprano.',      opts:['Hay','Tiene','Hoy','Han'],                a:0, h:{en:'We have to leave early',       es:'Hay que salir temprano'} },
  { s:'¿___ más café?',              opts:['Quieres','Quiero','Quiere','Quieren'],     a:0, h:{en:'Do you want more coffee?',     es:'¿Quieres más café?'} },
  { s:'Ellos ___ en la oficina.',     opts:['están','son','estoy','somos'],            a:0, h:{en:'They are in the office',       es:'Ellos están en la oficina'} },
  { s:'Yo ___ venir mañana.',         opts:['puedo','puede','puedes','podemos'],       a:0, h:{en:'I can come tomorrow',          es:'Yo puedo venir mañana'} }
];

const WORD_ORDER = [
  { w:['Estoy','en','mi','casa'],                        a:'Estoy en mi casa',                    h:{en:'I am at home',                         es:'Estoy en mi casa'} },
  { w:['Me','gustan','mucho','los','libros'],             a:'Me gustan mucho los libros',           h:{en:'I like books very much',               es:'Me gustan mucho los libros'} },
  { w:['El','café','está','frío'],                       a:'El café está frío',                    h:{en:'The coffee is cold',                   es:'El café está frío'} },
  { w:['Mi','hermana','es','médica'],                    a:'Mi hermana es médica',                 h:{en:'My sister is a doctor',                es:'Mi hermana es médica'} },
  { w:['Yo','vivo','en','Madrid'],                       a:'Yo vivo en Madrid',                    h:{en:'I live in Madrid',                     es:'Yo vivo en Madrid'} },
  { w:['Llevo','dos','años','estudiando','español'],      a:'Llevo dos años estudiando español',    h:{en:"I've been studying Spanish for 2 years",es:'Llevo dos años estudiando español'} },
  { w:['La','puerta','está','cerrada'],                  a:'La puerta está cerrada',               h:{en:'The door is closed',                   es:'La puerta está cerrada'} },
  { w:['¿Tú','puedes','venir','mañana?'],                a:'¿Tú puedes venir mañana?',             h:{en:'Can you come tomorrow?',               es:'¿Tú puedes venir mañana?'} }
];

const VERB_SPRINT = [
  {v:'hablar',a:'hablo'},{v:'comer',a:'como'},{v:'vivir',a:'vivo'},{v:'tener',a:'tengo'},
  {v:'ser',a:'soy'},{v:'estar',a:'estoy'},{v:'ir',a:'voy'},{v:'hacer',a:'hago'},
  {v:'poder',a:'puedo'},{v:'querer',a:'quiero'},{v:'saber',a:'sé'},{v:'venir',a:'vengo'},
  {v:'decir',a:'digo'},{v:'ver',a:'veo'},{v:'dar',a:'doy'},{v:'poner',a:'pongo'},
  {v:'salir',a:'salgo'},{v:'traer',a:'traigo'},{v:'conocer',a:'conozco'},{v:'seguir',a:'sigo'}
];

/* ── HELPERS ─────────────────────────────────── */
// Proper Fisher-Yates shuffle — sort(()=>Math.random()-0.5) is biased
// and barely reorders small arrays, which made "order the words" games
// sometimes show the answer already in the correct order.
function _shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Shuffle, but guarantee the result isn't identical to the original order
// (matters for "put the words in order" puzzles with few tiles).
function _shuffleScrambled(arr) {
  if (arr.length < 2) return [...arr];
  let a = _shuffle(arr);
  let tries = 0;
  while (a.every((w, i) => w === arr[i]) && tries < 10) { a = _shuffle(arr); tries++; }
  return a;
}

// Shuffle answer options, keeping the correct answer tracked by value
function _shuffleOpts(qs) {
  return qs.map(q => {
    const correct = q.opts[q.a];
    const shuffled = _shuffle(q.opts);
    return { ...q, opts: shuffled, a: shuffled.indexOf(correct) };
  });
}

// Shuffle two groups (split by a boolean predicate) and interleave them so
// the same group never appears more than twice in a row — a plain shuffle
// of the combined array can randomly clump all of one type together.
function _interleaveByGroup(arr, isGroupB) {
  const a = _shuffle(arr.filter(x => !isGroupB(x)));
  const b = _shuffle(arr.filter(isGroupB));
  const result = [];
  let lastB = null, streak = 0;
  while (a.length || b.length) {
    let takeB;
    if (!a.length) takeB = true;
    else if (!b.length) takeB = false;
    else if (streak >= 2) takeB = !lastB;
    else takeB = Math.random() < 0.5;
    const pool = takeB ? b : a;
    result.push(pool.shift());
    streak = (takeB === lastB) ? streak + 1 : 1;
    lastB = takeB;
  }
  return result;
}

/* ── STATE ────────────────────────────────────── */
let GS = {};
let timerInt = null;
let currentGameFn = null;
const L = () => localStorage.getItem('slwm_lang') || 'en';

/* ── MODAL ────────────────────────────────────── */
function _modal(bodyHTML, title) {
  document.getElementById('gm-title').textContent = title;
  document.getElementById('gm-body').innerHTML = bodyHTML;
  const m = document.getElementById('game-modal');
  m.style.display = 'flex';
  requestAnimationFrame(() => m.classList.add('gm--open'));
  document.body.style.overflow = 'hidden';
}

function closeGame() {
  const m = document.getElementById('game-modal');
  if (document.fullscreenElement === m) document.exitFullscreen();
  m.classList.remove('gm--open');
  setTimeout(() => { m.style.display = 'none'; }, 220);
  document.body.style.overflow = '';
  if (timerInt) { clearInterval(timerInt); timerInt = null; }
  GS = {};
}

/* ── FULLSCREEN TOGGLE ────────────────────────── */
function toggleGameFullscreen() {
  const m = document.getElementById('game-modal');
  if (!document.fullscreenElement) {
    if (m.requestFullscreen) m.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}
document.addEventListener('fullscreenchange', () => {
  const icon = document.getElementById('gm-fullscreen-icon');
  if (!icon) return;
  icon.innerHTML = document.fullscreenElement
    ? '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>'
    : '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>';
});

/* ── SHARED END SCREEN ────────────────────────── */
function _end(correct, total, title) {
  if (timerInt) { clearInterval(timerInt); timerInt = null; }
  const lang = L();
  const pct = Math.round((correct / total) * 100);
  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '💪';
  const msg = lang === 'es'
    ? (pct >= 80 ? '¡Excelente! Sigue así.' : pct >= 60 ? '¡Buen trabajo! Casi.' : '¡Sigue practicando!')
    : (pct >= 80 ? 'Excellent! Keep it up.' : pct >= 60 ? 'Good job! Almost there.' : 'Keep practising!');
  _modal(`
    <div class="gm-end">
      <div class="gm-end-emoji">${emoji}</div>
      <div class="gm-end-score">${correct}<span>/${total}</span></div>
      <div class="gm-end-pct">${pct}%</div>
      <div class="gm-end-msg">${msg}</div>
      <div class="gm-end-btns">
        <button class="gm-btn gm-btn-primary" onclick="restartGame()">${lang==='es'?'Jugar de nuevo':'Play again'}</button>
        <button class="gm-btn gm-btn-ghost" onclick="closeGame()">${lang==='es'?'Cerrar':'Close'}</button>
      </div>
    </div>
  `, title);
}

function restartGame() { if (currentGameFn) currentGameFn(); }

/* ── PROGRESS BAR ────────────────────────────── */
function _progress(current, total, correct, lang) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return `
    <div class="gm-top">
      <div class="gm-prog-wrap">
        <div class="gm-prog-bar"><div class="gm-prog-fill" style="width:${pct}%"></div></div>
      </div>
      <span class="gm-count">${current}/${total}</span>
      <span class="gm-correct">✓ ${correct}</span>
    </div>`;
}

/* ══════════════════════════════════════════════
   GAME 1 · FLASHCARDS
══════════════════════════════════════════════ */
function playFlashcards() {
  currentGameFn = playFlashcards;
  const lang = L();
  const title = lang === 'es' ? 'Tarjetas de Vocabulario' : 'Vocabulary Flashcards';
  GS = { cards: _shuffle(FLASHCARDS), idx: 0, correct: 0, flipped: false };
  _renderFC(lang, title);
}

function _renderFC(lang, title) {
  const { cards, idx, correct } = GS;
  if (idx >= cards.length) { _end(correct, cards.length, title); return; }
  const card = cards[idx];
  _modal(`
    ${_progress(idx, cards.length, correct, lang)}
    <p class="gm-instr">${lang==='es'?'Lee la palabra en español y recuerda la traducción en inglés:':'Read the Spanish word and recall the English translation:'}</p>
    <div class="fc-card" id="fc-card" onclick="flipFC()">
      <div class="fc-inner" id="fc-inner">
        <div class="fc-front">
          <span class="fc-lang">Español</span>
          <span class="fc-word">${card.es}</span>
          <span class="fc-level-badge">${card.lvl}</span>
          <span class="fc-tap">${lang==='es'?'Toca para ver':'Tap to reveal'}</span>
        </div>
        <div class="fc-back">
          <span class="fc-lang">English</span>
          <span class="fc-word">${card.en}</span>
          <span class="fc-level-badge">${card.lvl}</span>
        </div>
      </div>
    </div>
    <div class="fc-btns" id="fc-btns" style="display:none">
      <button class="gm-btn gm-btn-wrong" onclick="fcAnswer(false)">✗ ${lang==='es'?'Repasar':'Try again'}</button>
      <button class="gm-btn gm-btn-correct" onclick="fcAnswer(true)">✓ ${lang==='es'?'¡Lo sé!':'Got it!'}</button>
    </div>
  `, title);
}

function flipFC() {
  if (GS.flipped) return;
  GS.flipped = true;
  document.getElementById('fc-inner').classList.add('fc-flipped');
  setTimeout(() => { const b = document.getElementById('fc-btns'); if (b) b.style.display = 'flex'; }, 320);
}

function fcAnswer(ok) {
  if (ok) GS.correct++;
  GS.idx++; GS.flipped = false;
  const lang = L();
  _renderFC(lang, lang==='es'?'Tarjetas de Vocabulario':'Vocabulary Flashcards');
}

/* ══════════════════════════════════════════════
   GAME 2 · SER O ESTAR (4 levels, conjugated)
══════════════════════════════════════════════ */
function playSerEstar() {
  currentGameFn = playSerEstar;
  const lang = L();
  const title = lang === 'es' ? '¿Ser o estar?' : 'Ser or Estar?';
  _seSelectLevel(lang, title);
}

function _seSelectLevel(lang, title) {
  const levels = [
    { key:'a1', color:'#3DDABE', count:10 },
    { key:'a2', color:'#D4920A', count:10 },
    { key:'b1', color:'#2885FD', count:10 },
    { key:'adj', color:'#7C3AED', count:12 }
  ];
  const btns = levels.map(l => {
    const lv = SE_LEVELS[l.key];
    return `<button class="se-lvl-btn" onclick="startSELevel('${l.key}')" style="--lvl-color:${l.color}">
      <span class="se-lvl-badge" style="background:${l.color}20;color:${l.color};border:1.5px solid ${l.color}40">${lv.label[lang].split('·')[0].trim()}</span>
      <span class="se-lvl-name">${lv.label[lang].split('·')[1]?.trim() || ''}</span>
      <span class="se-lvl-count">${l.count} ${lang==='es'?'preguntas':'questions'}</span>
      <svg class="se-lvl-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
    </button>`;
  }).join('');
  _modal(`
    <p class="gm-instr">${lang==='es'?'Elige tu nivel para empezar:':'Choose your level to start:'}</p>
    <div class="se-levels">${btns}</div>
    <div class="se-info-box">
      <strong>${lang==='es'?'¿Cómo funciona?':'How it works?'}</strong>
      ${lang==='es'
        ? 'Verás una frase con un hueco. Elige la forma conjugada correcta de SER o ESTAR. El nivel de Adjetivos trabaja los pares que cambian de significado según el verbo.'
        : 'You\'ll see a sentence with a gap. Choose the correct conjugated form of SER or ESTAR. The Adjectives level practises pairs that change meaning depending on the verb.'}
    </div>
  `, title);
}

function startSELevel(key) {
  const lang = L();
  const title = lang === 'es' ? '¿Ser o estar?' : 'Ser or Estar?';
  const qs = _shuffleOpts([...SE_LEVELS[key].qs]);
  GS = { key, qs, idx: 0, correct: 0, answered: false };
  _renderSE(lang, title);
}

function _renderSE(lang, title) {
  const { key, qs, idx, correct } = GS;
  if (idx >= qs.length) { _seResults(correct, qs.length, key, lang, title); return; }
  const q = qs[idx];
  const lv = SE_LEVELS[key];
  const levelPill = `<span class="se-level-pill" style="background:${lv.color}20;color:${lv.color};border:1px solid ${lv.color}40">${lv.label[lang]}</span>`;
  const ctxBlock = q.ctx
    ? `<div class="se-context">💬 <em>${q.ctx[lang]}</em></div>`
    : '';
  const btnA = `<button class="se-btn" onclick="answerSE(0)">${q.opts[0]}</button>`;
  const btnB = `<button class="se-btn" onclick="answerSE(1)">${q.opts[1]}</button>`;
  _modal(`
    ${_progress(idx, qs.length, correct, lang)}
    <div class="se-level-row">${levelPill}</div>
    ${ctxBlock}
    <div class="gm-sentence">${q.s.replace('___','<span class="gm-blank">___</span>')}</div>
    <div class="se-btns">${btnA}${btnB}</div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function answerSE(choiceIdx) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const q = GS.qs[GS.idx];
  const ok = choiceIdx === q.a;
  if (ok) GS.correct++;
  document.querySelectorAll('.se-btn').forEach((b, i) => {
    b.disabled = true;
    if (i === q.a) b.classList.add('se-correct');
    if (i === choiceIdx && !ok) b.classList.add('se-wrong');
  });
  const correctForm = q.opts[q.a];
  const filled = q.s.replace('___', `<strong style="color:${ok?'#1A9E87':'#C8102E'}">${correctForm}</strong>`);
  const nextLabel = lang==='es' ? 'Siguiente →' : 'Next →';
  document.getElementById('gm-fb').innerHTML = `
    <div class="se-fb-row">
      <span class="${ok?'fb-ok':'fb-ko'}">${ok ? '✓ '+(lang==='es'?'¡Correcto!':'Correct!') : '✗ '+(lang==='es'?'La respuesta es:':'Answer:') +' <strong>'+correctForm+'</strong>'}</span>
    </div>
    <div class="se-fb-sentence">${filled}</div>
    <div class="se-fb-rule">📌 ${q.e[lang]}</div>
    <button class="gm-btn gm-btn-primary gm-next-btn" onclick="seNext()">${nextLabel}</button>`;
}

function seNext() {
  const lang = L();
  GS.idx++; GS.answered = false;
  _renderSE(lang, lang==='es'?'¿Ser o estar?':'Ser or Estar?');
}

function _seResults(correct, total, key, lang, title) {
  if (timerInt) { clearInterval(timerInt); timerInt = null; }
  const pct = Math.round((correct / total) * 100);
  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '💪';
  const msg = lang === 'es'
    ? (pct >= 80 ? '¡Dominas este nivel!' : pct >= 60 ? '¡Buen trabajo! Repasa los errores.' : 'Sigue practicando — ¡ya casi!')
    : (pct >= 80 ? 'You\'ve mastered this level!' : pct >= 60 ? 'Good job! Review your mistakes.' : 'Keep practising — almost there!');
  const levels = ['a1','a2','b1','adj'];
  const nextKey = levels[levels.indexOf(key)+1];
  const nextBtn = nextKey
    ? `<button class="gm-btn gm-btn-primary" onclick="startSELevel('${nextKey}')">${lang==='es'?'Siguiente nivel →':'Next level →'}</button>`
    : '';
  document.getElementById('gm-body').innerHTML = `
    <div class="gm-end">
      <div class="gm-end-emoji">${emoji}</div>
      <div class="gm-end-score">${correct}<span>/${total}</span></div>
      <div class="gm-end-pct">${pct}%</div>
      <div class="gm-end-msg">${msg}</div>
      <div class="gm-end-btns">
        ${nextBtn}
        <button class="gm-btn gm-btn-ghost" onclick="playSerEstar()">${lang==='es'?'Cambiar nivel':'Change level'}</button>
        <button class="gm-btn gm-btn-ghost" onclick="closeGame()">${lang==='es'?'Cerrar':'Close'}</button>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════
   GAME 3 · GRAMMAR QUIZ
══════════════════════════════════════════════ */
function playQuiz() {
  currentGameFn = playQuiz;
  const lang = L();
  const title = lang==='es'?'Test de Gramática':'Grammar Quiz';
  GS = { qs:_shuffleOpts([...QUIZ]), idx:0, correct:0, answered:false };
  _renderQuiz(lang, title);
}

function _renderQuiz(lang, title) {
  const { qs, idx, correct } = GS;
  if (idx >= qs.length) { _end(correct, qs.length, title); return; }
  const q = qs[idx];
  const opts = q.opts.map((o,i)=>`<button class="gm-opt" onclick="answerQuiz(${i})">${o}</button>`).join('');
  _modal(`
    ${_progress(idx, qs.length, correct, lang)}
    <p class="gm-question">${q.q[lang]}</p>
    <div class="gm-opts">${opts}</div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function answerQuiz(i) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const q = GS.qs[GS.idx];
  const ok = i === q.a;
  if (ok) GS.correct++;
  document.querySelectorAll('.gm-opt').forEach((b,j) => {
    b.disabled = true;
    if (j === q.a) b.classList.add('opt-correct');
    if (j === i && !ok) b.classList.add('opt-wrong');
  });
  document.getElementById('gm-fb').innerHTML =
    `<span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Correcto!':'Correct!'):'✗ '+(lang==='es'?'Respuesta:':'Answer:')+' '+q.opts[q.a]}</span>
    <button class="gm-btn gm-btn-primary gm-next-btn" onclick="quizNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
}
function quizNext() {
  const lang=L(); GS.idx++; GS.answered=false;
  _renderQuiz(lang, lang==='es'?'Test de Gramática':'Grammar Quiz');
}

/* ══════════════════════════════════════════════
   GAME 4 · FILL THE GAPS
══════════════════════════════════════════════ */
function playFillGaps() {
  currentGameFn = playFillGaps;
  const lang = L();
  const title = lang==='es'?'Rellena los Huecos':'Fill the Gaps';
  GS = { qs:_shuffleOpts(_shuffle(FILL_GAPS)), idx:0, correct:0, answered:false };
  _renderFill(lang, title);
}

function _renderFill(lang, title) {
  const { qs, idx, correct } = GS;
  if (idx >= qs.length) { _end(correct, qs.length, title); return; }
  const q = qs[idx];
  const opts = q.opts.map((o,i)=>`<button class="gm-opt" onclick="answerFill(${i})">${o}</button>`).join('');
  _modal(`
    ${_progress(idx, qs.length, correct, lang)}
    <p class="gm-instr">${lang==='es'?'Elige la palabra correcta:':'Choose the correct word:'}</p>
    <div class="gm-sentence">${q.s.replace('___','<span class="gm-blank">___</span>')}</div>
    <div class="gm-hint-line">💡 ${q.h[lang]}</div>
    <div class="gm-opts">${opts}</div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function answerFill(i) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const q = GS.qs[GS.idx];
  const ok = i === q.a;
  if (ok) GS.correct++;
  document.querySelectorAll('.gm-opt').forEach((b,j) => {
    b.disabled = true;
    if (j === q.a) b.classList.add('opt-correct');
    if (j === i && !ok) b.classList.add('opt-wrong');
  });
  document.getElementById('gm-fb').innerHTML =
    `<span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Correcto!':'Correct!'):'✗ '+q.opts[q.a]}</span>
    <button class="gm-btn gm-btn-primary gm-next-btn" onclick="fillNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
}
function fillNext() {
  const lang=L(); GS.idx++; GS.answered=false;
  _renderFill(lang, lang==='es'?'Rellena los Huecos':'Fill the Gaps');
}

/* ══════════════════════════════════════════════
   GAME 5 · WORD ORDER
══════════════════════════════════════════════ */
function playWordOrder() {
  currentGameFn = playWordOrder;
  const lang = L();
  const title = lang==='es'?'Ordena las Palabras':'Word Order';
  GS = { qs:_shuffle(WORD_ORDER), idx:0, correct:0, selected:[], available:[] };
  _renderWO(lang, title);
}

function _renderWO(lang, title) {
  const { qs, idx, correct } = GS;
  if (idx >= qs.length) { _end(correct, qs.length, title); return; }
  const q = qs[idx];
  GS.selected = [];
  GS.available = _shuffleScrambled(q.w);
  const wordBtns = GS.available.map((w,i)=>`<button class="wo-word" onclick="woSelect(${i})">${w}</button>`).join('');
  _modal(`
    ${_progress(idx, qs.length, correct, lang)}
    <p class="gm-instr">${lang==='es'?'Toca las palabras en el orden correcto:':'Click the words in the correct order:'}</p>
    <div class="gm-hint-line">💡 ${q.h[lang]}</div>
    <div class="wo-selected-area" id="wo-sel">
      <span class="wo-placeholder">${lang==='es'?'Tu frase aparecerá aquí…':'Your sentence will appear here…'}</span>
    </div>
    <div class="wo-words-area" id="wo-words">${wordBtns}</div>
    <div class="wo-actions">
      <button class="gm-btn gm-btn-ghost" onclick="woClear()" id="wo-clear" style="display:none">${lang==='es'?'Borrar todo':'Clear all'}</button>
      <button class="gm-btn gm-btn-primary" onclick="woCheck()" id="wo-check" style="display:none">${lang==='es'?'Comprobar':'Check'}</button>
    </div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function woSelect(i) {
  const btns = document.querySelectorAll('.wo-word');
  if (btns[i].disabled) return;
  btns[i].disabled = true;
  btns[i].classList.add('wo-used');
  GS.selected.push({ word: GS.available[i], i });
  _woRenderSelected();
  const hasAny = GS.selected.length > 0;
  document.getElementById('wo-clear').style.display = hasAny ? 'inline-flex' : 'none';
  document.getElementById('wo-check').style.display = hasAny ? 'inline-flex' : 'none';
}

function _woRenderSelected() {
  const area = document.getElementById('wo-sel');
  if (GS.selected.length === 0) {
    area.innerHTML = `<span class="wo-placeholder">${L()==='es'?'Tu frase aparecerá aquí…':'Your sentence will appear here…'}</span>`;
    return;
  }
  area.innerHTML = GS.selected.map((s,j)=>
    `<span class="wo-chip" onclick="woRemove(${j})">${s.word} <span class="wo-x">×</span></span>`
  ).join('');
}

function woRemove(j) {
  const removed = GS.selected.splice(j, 1)[0];
  const btns = document.querySelectorAll('.wo-word');
  btns[removed.i].disabled = false;
  btns[removed.i].classList.remove('wo-used');
  _woRenderSelected();
  const hasAny = GS.selected.length > 0;
  document.getElementById('wo-clear').style.display = hasAny ? 'inline-flex' : 'none';
  document.getElementById('wo-check').style.display = hasAny ? 'inline-flex' : 'none';
}

function woClear() {
  GS.selected = [];
  document.querySelectorAll('.wo-word').forEach(b => { b.disabled = false; b.classList.remove('wo-used'); });
  _woRenderSelected();
  document.getElementById('wo-clear').style.display = 'none';
  document.getElementById('wo-check').style.display = 'none';
}

function woCheck() {
  const lang = L();
  const q = GS.qs[GS.idx];
  const answer = GS.selected.map(s => s.word).join(' ');
  const ok = answer.toLowerCase() === q.a.toLowerCase();
  if (ok) GS.correct++;
  document.getElementById('wo-check').disabled = true;
  document.getElementById('wo-clear').disabled = true;
  document.getElementById('gm-fb').innerHTML =
    `<span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Perfecto!':'Perfect!'):'✗ '+q.a}</span>
    <button class="gm-btn gm-btn-primary gm-next-btn" onclick="woNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
}
function woNext() {
  const lang=L(); GS.idx++;
  _renderWO(lang, lang==='es'?'Ordena las Palabras':'Word Order');
}

/* ══════════════════════════════════════════════
   GAME 6 · VERB SPRINT
══════════════════════════════════════════════ */
function playVerbSprint() {
  currentGameFn = playVerbSprint;
  const lang = L();
  const title = lang==='es'?'Sprint de Verbos':'Verb Sprint';
  GS = { verbs:_shuffle(VERB_SPRINT), idx:0, correct:0, timeLeft:60, running:true };
  _renderVS(lang, title);
}

function _renderVS(lang, title) {
  const { verbs, idx, correct, timeLeft } = GS;
  if (!GS.running || idx >= verbs.length) { _end(correct, idx, title); return; }
  const v = verbs[idx];
  _modal(`
    ${_progress(idx, verbs.length, correct, lang)}
    <div class="vs-header">
      <span class="gm-instr">${lang==='es'?'Conjuga en 1ª persona del presente (yo):':'Conjugate in 1st person present (yo):'}</span>
      <span class="vs-timer" id="vs-timer">⏱ ${timeLeft}s</span>
    </div>
    <div class="vs-verb">${v.v}</div>
    <div class="vs-formula">yo ___</div>
    <input class="vs-input" id="vs-input" type="text" autocomplete="off" autocorrect="off" spellcheck="false"
      placeholder="${lang==='es'?'escribe y pulsa Enter…':'type and press Enter…'}"
      onkeydown="if(event.key==='Enter')vsCheck()">
    <button class="gm-btn gm-btn-primary" style="margin-top:12px" onclick="vsCheck()">
      ${lang==='es'?'Comprobar →':'Check →'}
    </button>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
  setTimeout(() => { const i = document.getElementById('vs-input'); if(i) i.focus(); }, 80);
  if (timerInt) clearInterval(timerInt);
  timerInt = setInterval(() => {
    GS.timeLeft--;
    const el = document.getElementById('vs-timer');
    if (el) { el.textContent = `⏱ ${GS.timeLeft}s`; if (GS.timeLeft<=10) el.classList.add('vs-urgent'); }
    if (GS.timeLeft <= 0) { clearInterval(timerInt); timerInt = null; GS.running = false; _end(GS.correct, GS.idx, lang==='es'?'Sprint de Verbos':'Verb Sprint'); }
  }, 1000);
}

function vsCheck() {
  const lang = L();
  const v = GS.verbs[GS.idx];
  const inp = document.getElementById('vs-input');
  if (!inp) return;
  const ans = inp.value.trim().toLowerCase();
  const ok = ans === v.a.toLowerCase();
  if (ok) GS.correct++;
  document.getElementById('gm-fb').innerHTML =
    `<span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Correcto!':'Correct!'):'✗ '+v.a}</span>
    <button class="gm-btn gm-btn-primary gm-next-btn" onclick="vsNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
  inp.disabled = true;
}
function vsNext() {
  const lang=L(); GS.idx++;
  _renderVS(lang, lang==='es'?'Sprint de Verbos':'Verb Sprint');
}

/* ══════════════════════════════════════════════
   GAME 7 · PRESÉNTATE EN ESPAÑOL (4 levels)
══════════════════════════════════════════════ */

const PRES_LEVELS = {
  a1: {
    label: { en: 'First Words', es: 'Primeras Palabras' },
    color: '#3DDABE',
    qs: [
      { s:'Yo ___ Ana.',              opts:['me llamo','te llamas','se llama'],    a:0, e:{en:'LLAMARSE (yo) → me llamo',             es:'LLAMARSE (yo) → me llamo'} },
      { s:'¿Cómo ___ tú?',           opts:['te llamas','me llamo','se llama'],     a:0, e:{en:'LLAMARSE (tú) → te llamas',            es:'LLAMARSE (tú) → te llamas'} },
      { s:'Ella ___ Laura.',          opts:['se llama','me llamo','os llamáis'],   a:0, e:{en:'LLAMARSE (ella) → se llama',            es:'LLAMARSE (ella) → se llama'} },
      { s:'Soy ___ Japón.',           opts:['de','en','a'],                         a:0, e:{en:'Origin → SER + DE',                    es:'Origen → SER + DE'} },
      { s:'Mi hermano ___ abogado.',  opts:['es','está','tiene'],                  a:0, e:{en:'Profession → SER (no article!)',        es:'Profesión → SER (sin artículo)'} },
      { s:'Yo ___ 25 años.',          opts:['tengo','soy','estoy'],                a:0, e:{en:'Age → TENER, never SER',               es:'Edad → TENER, nunca SER'} },
      { s:'¿Cuántos años ___ él?',    opts:['tiene','es','está'],                  a:0, e:{en:'Age (él) → TENER → tiene',             es:'Edad (él) → TENER → tiene'} },
      { s:'Vivo ___ París.',           opts:['en','a','de'],                        a:0, e:{en:'VIVIR + EN — never "a"',               es:'VIVIR + EN — nunca "a"'} },
      { s:'Ellos ___ en Roma.',        opts:['viven','son','están'],               a:0, e:{en:'VIVIR (ellos) → viven',                es:'VIVIR (ellos) → viven'} },
      { s:'¿De dónde ___ usted?',      opts:['es','está','tiene'],                 a:0, e:{en:'Origin question → SER (usted → es)',   es:'Pregunta de origen → SER (usted → es)'} },
    ]
  },
  a2: {
    label: { en: 'Complete Sentences', es: 'Frases Completas' },
    color: '#D4920A',
    qs: [
      { s:'Soy profesora ___ español.',          opts:['de','en','del'],                  a:0, e:{en:'"Profesora de español" → always DE',     es:'"Profesora de español" → siempre DE'} },
      { s:'¿Cómo ___ llama usted? (formal)',     opts:['se','me','te'],                   a:0, e:{en:'LLAMARSE (usted) → se llama',            es:'LLAMARSE (usted) → se llama'} },
      { s:'Vivo en Madrid ___ 2020.',            opts:['desde','hace','por'],              a:0, e:{en:'"Desde" anchors a point in time',        es:'"Desde" marca el punto de inicio'} },
      { s:'¿A qué ___ dedicas?',                opts:['te','se','me'],                   a:0, e:{en:'DEDICARSE (tú) → te dedicas',            es:'DEDICARSE (tú) → te dedicas'} },
      { s:'Me ___ a la enseñanza.',             opts:['dedico','llamo','vivo'],           a:0, e:{en:'DEDICARSE (yo) → me dedico',             es:'DEDICARSE (yo) → me dedico'} },
      { s:'Trabajo ___ una empresa francesa.',   opts:['en','a','de'],                    a:0, e:{en:'TRABAJAR EN (company/place)',             es:'TRABAJAR EN (empresa/lugar)'} },
      { s:'Llevo dos años ___ en Valencia.',     opts:['viviendo','vivo','vivir'],         a:0, e:{en:'LLEVAR + time + gerundio',               es:'LLEVAR + tiempo + gerundio'} },
      { s:'Soy ___ Sevilla.',                   opts:['de','en','desde'],                a:0, e:{en:'Origin (city) → SER + DE',               es:'Origen (ciudad) → SER + DE'} },
      { s:'Tengo cinco años ___ experiencia.',  opts:['de','en','con'],                  a:0, e:{en:'"X años de experiencia" → always DE',    es:'"X años de experiencia" → siempre DE'} },
      { s:'Me ___ con un cliente hoy.',         opts:['reúno','llamo','vivo'],            a:0, e:{en:'REUNIRSE (yo) → me reúno',               es:'REUNIRSE (yo) → me reúno'} },
    ]
  },
  b1: {
    label: { en: 'Going Deeper', es: 'En Profundidad' },
    color: '#2885FD',
    qs: [
      { s:'Me ___ en filología hispánica.',                        opts:['licencié','llamé','presenté'],           a:0, e:{en:'LICENCIARSE (yo) → me licencié = I graduated in',   es:'LICENCIARSE (yo) → me licencié en'} },
      { s:'Vivo aquí ___ hace dos años.',                          opts:['desde','por','hace'],                    a:0, e:{en:'"Desde hace" = for (ongoing up to now)',             es:'"Desde hace" = hace X tiempo, hasta ahora'} },
      { s:'Estoy ___ en enseñanza de idiomas.',                    opts:['formada','formando','forma'],            a:0, e:{en:'ESTAR + past participle → completed training',       es:'ESTAR + participio → formación completada'} },
      { s:'Nació ___ Colombia y creció en España.',                opts:['en','de','a'],                           a:0, e:{en:'NACER EN — always EN for place of birth',            es:'NACER EN — siempre EN para lugar de nacimiento'} },
      { s:'¿___ mucho tiempo que vives en esta ciudad?',           opts:['Hace','Está','Es'],                      a:0, e:{en:'HACE + time = how long ago / how long since',       es:'HACE + tiempo = cuánto tiempo lleva algo ocurriendo'} },
      { s:'Tengo sólida ___ en lingüística aplicada.',             opts:['formación','forma','formado'],           a:0, e:{en:'TENER + noun — "tener formación en" = trained in',  es:'TENER + sustantivo — "tener formación en"'} },
      { s:'Llevo ___ viviendo en esta ciudad.',                    opts:['tres años','desde tres','hace tres'],    a:0, e:{en:'LLEVAR + time + gerundio (not "desde"/"hace")',      es:'LLEVAR + tiempo + gerundio (no "desde"/"hace")'} },
      { s:'Sus apellidos ___ de origen árabe.',                    opts:['son','están','tienen'],                  a:0, e:{en:'Permanent origin/characteristic → SER',             es:'Origen o característica permanente → SER'} },
      { s:'Se describe ___ una persona organizada y empática.',    opts:['como','de','en'],                        a:0, e:{en:'DESCRIBIRSE COMO — always COMO for roles/traits',   es:'DESCRIBIRSE COMO — siempre COMO para rasgos o roles'} },
      { s:'Soy ___ persona muy comprometida con mi trabajo.',      opts:['una','la','Ø'],                          a:0, e:{en:'SER + trait noun + adjective → article UNA needed', es:'SER + sustantivo + adjetivo → artículo UNA obligatorio'} },
    ]
  },
  work: {
    label: { en: '💼 Work Context', es: '💼 Contexto Laboral' },
    color: '#E8355A',
    qs: [
      { ctx:{en:'🏢 Job interview — you introduce yourself to the panel.',       es:'🏢 Entrevista de trabajo — te presentas al panel.'},
        s:'Buenos días. ___ llamo Ana Martín.',                                  opts:['Me','Te','Se'],          a:0,
        e:{en:'LLAMARSE (yo) → me llamo — formal self-introduction',            es:'LLAMARSE (yo) → me llamo — presentación formal'} },
      { ctx:{en:'🤝 Formal meeting — you ask a colleague their name.',           es:'🤝 Reunión formal — preguntas el nombre a un compañero.'},
        s:'Disculpe, ¿cómo ___ llama usted?',                                    opts:['se','te','me'],          a:0,
        e:{en:'LLAMARSE (usted) → se llama — formal register',                  es:'LLAMARSE (usted) → se llama — registro formal'} },
      { ctx:{en:'💼 Networking event — you describe what you do.',               es:'💼 Evento de networking — describes tu actividad.'},
        s:'Me dedico ___ la consultoría estratégica.',                            opts:['a','en','de'],           a:0,
        e:{en:'DEDICARSE A — always uses the preposition A',                    es:'DEDICARSE A — siempre con la preposición A'} },
      { ctx:{en:'📋 Professional introduction — you explain your role.',         es:'📋 Introducción profesional — explicas tu cargo.'},
        s:'Trabajo ___ directora de marketing.',                                  opts:['como','en','de'],        a:0,
        e:{en:'"Trabajar como" + role — more formal than "trabajo de"',         es:'"Trabajar como" + cargo — más formal que "trabajo de"'} },
      { ctx:{en:'📊 Interview — they ask how long you\'ve been in the sector.',  es:'📊 Entrevista — preguntan cuánto llevas en el sector.'},
        s:'Llevo quince años ___ en educación.',                                  opts:['trabajando','trabajo','trabajar'], a:0,
        e:{en:'LLEVAR + time + gerundio = ongoing action over a period',        es:'LLEVAR + tiempo + gerundio = acción continuada'} },
      { ctx:{en:'🎤 Conference — you present yourself as an expert.',            es:'🎤 Conferencia — te presentas como experta.'},
        s:'Soy ___ investigadora especializada en inteligencia artificial.',      opts:['una','la','Ø'],          a:0,
        e:{en:'SER + profession + adjective → article UNA is required',         es:'SER + profesión + adjetivo → artículo UNA obligatorio'} },
      { ctx:{en:'📧 Business email — first contact with a client.',              es:'📧 Correo corporativo — primer contacto con un cliente.'},
        s:'Me pongo en contacto con usted ___ presentarme.',                      opts:['para','por','a'],        a:0,
        e:{en:'"Para" = purpose/intention — not "por"',                         es:'"Para" = finalidad — no "por"'} },
      { ctx:{en:'🔍 Interview — they ask about your specialisation.',            es:'🔍 Entrevista — preguntan en qué te especializas.'},
        s:'Me especializo ___ la gestión de equipos internacionales.',            opts:['en','a','de'],           a:0,
        e:{en:'ESPECIALIZARSE EN — always EN',                                  es:'ESPECIALIZARSE EN — siempre EN'} },
      { ctx:{en:'🎓 Congress presentation — you describe your career.',          es:'🎓 Presentación en congreso — describes tu trayectoria.'},
        s:'Mi trayectoria ___ más de veinte años en comunicación.',               opts:['abarca','es','tiene'],   a:0,
        e:{en:'ABARCAR = to span / cover — formal register',                    es:'ABARCAR = cubrir un período — registro formal'} },
      { ctx:{en:'💻 Video call with an international client.',                   es:'💻 Videollamada con un cliente internacional.'},
        s:'Actualmente ___ como responsable del área digital.',                   opts:['trabajo','soy','estoy'], a:0,
        e:{en:'"Trabajo como" = action verb, describes current role precisely', es:'"Trabajo como" = verbo de acción, define el cargo con precisión'} },
      { ctx:{en:'📅 HR asks about your availability.',                           es:'📅 RRHH pregunta si estás disponible.'},
        s:'¿___ usted disponible el próximo lunes?',                              opts:['Está','Es','Tiene'],     a:0,
        e:{en:'Availability = temporary state → ESTAR',                         es:'Disponibilidad = estado temporal → ESTAR'} },
      { ctx:{en:'🌟 You close your presentation at a professional event.',       es:'🌟 Cierras tu presentación en un evento profesional.'},
        s:'___ muy contenta de estar aquí con todos ustedes.',                    opts:['Estoy','Soy','Me'],      a:0,
        e:{en:'ESTAR + emotion = present feeling (temporary state)',            es:'ESTAR + emoción = sentimiento presente (estado temporal)'} },
    ]
  }
};

function playPresentarse() {
  currentGameFn = playPresentarse;
  const lang = L();
  const title = lang === 'es' ? 'Preséntate en español' : 'Introduce Yourself';
  _presSelectLevel(lang, title);
}

function _presSelectLevel(lang, title) {
  const levels = [
    { key:'a1',   color:'#3DDABE', count:10 },
    { key:'a2',   color:'#D4920A', count:10 },
    { key:'b1',   color:'#2885FD', count:10 },
    { key:'work', color:'#E8355A', count:12 }
  ];
  const btns = levels.map(l => {
    const lv = PRES_LEVELS[l.key];
    return `<button class="se-lvl-btn" onclick="startPresLevel('${l.key}')" style="--lvl-color:${l.color}">
      <span class="se-lvl-name">${lv.label[lang]}</span>
      <span class="se-lvl-count">${l.count} ${lang==='es'?'preguntas':'questions'}</span>
      <svg class="se-lvl-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
    </button>`;
  }).join('');
  _modal(`
    <p class="gm-instr">${lang==='es'?'Elige tu nivel para empezar:':'Choose your level to start:'}</p>
    <div class="se-levels">${btns}</div>
    <div class="se-info-box">
      <strong>${lang==='es'?'¿Cómo funciona?':'How it works?'}</strong>
      ${lang==='es'
        ? 'Verás una frase con un hueco. Elige la opción correcta. El nivel Laboral simula situaciones reales de trabajo con contexto para cada pregunta.'
        : 'See a sentence with a gap and choose the correct option. The Work level simulates real professional situations with a context clue for each question.'}
    </div>
  `, title);
}

function startPresLevel(key) {
  const lang = L();
  const title = lang === 'es' ? 'Preséntate en español' : 'Introduce Yourself';
  const qs = _shuffleOpts([...PRES_LEVELS[key].qs]);
  GS = { key, qs, idx: 0, correct: 0, answered: false };
  _renderPres(lang, title);
}

function _renderPres(lang, title) {
  const { key, qs, idx, correct } = GS;
  if (idx >= qs.length) { _presResults(correct, qs.length, key, lang, title); return; }
  const q = qs[idx];
  const lv = PRES_LEVELS[key];
  const levelPill = `<span class="se-level-pill" style="background:${lv.color}20;color:${lv.color};border:1px solid ${lv.color}40">${lv.label[lang]}</span>`;
  const ctxBlock = q.ctx ? `<div class="se-context">${q.ctx[lang]}</div>` : '';
  const btns = q.opts.map((o,i) => `<button class="se-btn" onclick="answerPres(${i})">${o}</button>`).join('');
  _modal(`
    ${_progress(idx, qs.length, correct, lang)}
    <div class="se-level-row">${levelPill}</div>
    ${ctxBlock}
    <div class="gm-sentence">${q.s.replace('___','<span class="gm-blank">___</span>')}</div>
    <div class="se-btns">${btns}</div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function answerPres(choiceIdx) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const q = GS.qs[GS.idx];
  const ok = choiceIdx === q.a;
  if (ok) GS.correct++;
  document.querySelectorAll('.se-btn').forEach((b, i) => {
    b.disabled = true;
    if (i === q.a) b.classList.add('se-correct');
    if (i === choiceIdx && !ok) b.classList.add('se-wrong');
  });
  const correctForm = q.opts[q.a];
  const filled = q.s.replace('___', `<strong style="color:${ok?'#1A9E87':'#C8102E'}">${correctForm}</strong>`);
  const nextLabel = lang==='es' ? 'Siguiente →' : 'Next →';
  document.getElementById('gm-fb').innerHTML = `
    <div class="se-fb-row">
      <span class="${ok?'fb-ok':'fb-ko'}">${ok ? '✓ '+(lang==='es'?'¡Correcto!':'Correct!') : '✗ '+(lang==='es'?'La respuesta es:':'Answer:')+' <strong>'+correctForm+'</strong>'}</span>
    </div>
    <div class="se-fb-sentence">${filled}</div>
    <div class="se-fb-rule">📌 ${q.e[lang]}</div>
    <button class="gm-btn gm-btn-primary gm-next-btn" onclick="presNext()">${nextLabel}</button>`;
}

function presNext() {
  const lang = L();
  GS.idx++; GS.answered = false;
  _renderPres(lang, lang==='es'?'Preséntate en español':'Introduce Yourself');
}

function _presResults(correct, total, key, lang, title) {
  if (timerInt) { clearInterval(timerInt); timerInt = null; }
  const pct = Math.round((correct / total) * 100);
  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '💪';
  const msg = lang === 'es'
    ? (pct >= 80 ? '¡Dominas este nivel! Ya puedes presentarte con confianza.' : pct >= 60 ? '¡Buen trabajo! Repasa los errores.' : 'Sigue practicando — ¡ya casi!')
    : (pct >= 80 ? 'Level mastered! You can introduce yourself with confidence.' : pct >= 60 ? 'Good job! Review your mistakes.' : 'Keep practising — almost there!');
  const levelKeys = ['a1','a2','b1','work'];
  const nextKey = levelKeys[levelKeys.indexOf(key)+1];
  const nextBtn = nextKey
    ? `<button class="gm-btn gm-btn-primary" onclick="startPresLevel('${nextKey}')">${lang==='es'?'Siguiente nivel →':'Next level →'}</button>`
    : '';
  document.getElementById('gm-body').innerHTML = `
    <div class="gm-end">
      <div class="gm-end-emoji">${emoji}</div>
      <div class="gm-end-score">${correct}<span>/${total}</span></div>
      <div class="gm-end-pct">${pct}%</div>
      <div class="gm-end-msg">${msg}</div>
      <div class="gm-end-btns">
        ${nextBtn}
        <button class="gm-btn gm-btn-ghost" onclick="playPresentarse()">${lang==='es'?'Cambiar nivel':'Change level'}</button>
        <button class="gm-btn gm-btn-ghost" onclick="closeGame()">${lang==='es'?'Cerrar':'Close'}</button>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════
   GAME 8 · LA RULETA DE PERSONAJES
   (character roulette — read a 3rd-person bio,
   judge true/false statements about who they are)
══════════════════════════════════════════════ */

const RULETA_PERSONAJES = [
  { country:{es:'Nigeria', en:'Nigeria'}, role:'🩺', name:'Amara', city:'Toronto', age:29, color:'#D4920A',
    job:{es:'Soy enfermera.', en:"I'm a nurse."} },
  { country:{es:'Argentina', en:'Argentina'}, role:'🍳', name:'Diego', city:'Bogotá', age:34, color:'#3DDABE',
    job:{es:'Soy chef.', en:"I'm a chef."} },
  { country:{es:'Suecia', en:'Sweden'}, role:'🎨', name:'Ingrid', city:'Lisboa', age:26, color:'#2885FD',
    job:{es:'Soy diseñadora.', en:"I'm a designer."} },
  { country:{es:'Marruecos', en:'Morocco'}, role:'🚕', name:'Youssef', city:'Barcelona', age:41, color:'#7C3AED',
    job:{es:'Soy taxista.', en:"I'm a taxi driver."} },
  { country:{es:'Corea del Sur', en:'South Korea'}, role:'🎻', name:'Soo-ah', city:'Berlín', age:23, color:'#E8355A',
    job:{es:'Estudio música.', en:'I study music.'} },
  { country:{es:'Brasil', en:'Brazil'}, role:'⚖️', name:'Fernanda', city:'Miami', age:37, color:'#1A9E87',
    job:{es:'Soy abogada.', en:"I'm a lawyer."} },
  { country:{es:'Canadá', en:'Canada'}, role:'📚', name:'Liam', city:'Tokio', age:30, color:'#F5A800',
    job:{es:'Soy profesor de inglés.', en:"I'm an English teacher."} },
  { country:{es:'Pakistán', en:'Pakistan'}, role:'🩹', name:'Zara', city:'Londres', age:45, color:'#4D9DE0',
    job:{es:'Soy médica.', en:"I'm a doctor."} }
];

const RT_QPR = 4; // questions per round (randomly chosen out of RT_CATEGORIES)

const RT_CATEGORIES = [
  { key:'nombre', verb:'LLAMARSE',
    variants:[
      { tiles:['¿Cómo','te','llamas?'], q:'¿Cómo te llamas?' },
      { tiles:['¿Cuál','es','tu','nombre?'], q:'¿Cuál es tu nombre?' }
    ],
    getAnswer:(c,lang)=> lang==='es' ? `Me llamo ${c.name}.` : `My name is ${c.name}.` },
  { key:'nacionalidad', verb:'SER',
    variants:[
      { tiles:['¿De','dónde','eres?'], q:'¿De dónde eres?' },
      { tiles:['¿Cuál','es','tu','nacionalidad?'], q:'¿Cuál es tu nacionalidad?' }
    ],
    getAnswer:(c,lang)=> lang==='es' ? `Soy de ${c.country.es}.` : `I'm from ${c.country.en}.` },
  { key:'edad', verb:'TENER',
    variants:[
      { tiles:['¿Cuántos','años','tienes?'], q:'¿Cuántos años tienes?' },
      { tiles:['¿Qué','edad','tienes?'], q:'¿Qué edad tienes?' }
    ],
    getAnswer:(c,lang)=> lang==='es' ? `Tengo ${c.age} años.` : `I'm ${c.age} years old.` },
  { key:'ciudad', verb:'VIVIR',
    variants:[
      { tiles:['¿En','qué','ciudad','vives?'], q:'¿En qué ciudad vives?' },
      { tiles:['¿Dónde','vives?'], q:'¿Dónde vives?' }
    ],
    getAnswer:(c,lang)=> lang==='es' ? `Vivo en ${c.city}.` : `I live in ${c.city}.` },
  { key:'profesion', verb:'SER',
    variants:[
      { tiles:['¿A','qué','te','dedicas?'], q:'¿A qué te dedicas?' },
      { tiles:['¿Cuál','es','tu','profesión?'], q:'¿Cuál es tu profesión?' }
    ],
    getAnswer:(c,lang)=> c.job[lang] }
];

const RT_CAT_LABEL = {
  nombre:{es:'nombre', en:'name'},
  nacionalidad:{es:'nacionalidad', en:'nationality'},
  edad:{es:'edad', en:'age'},
  ciudad:{es:'ciudad', en:'city'},
  profesion:{es:'profesión', en:'profession'}
};

const RT_CAT_ICON = { nombre:'👤', nacionalidad:'🌍', edad:'🎂', ciudad:'📍', profesion:'💼' };

// One rotating "bag" of variant indices per category so the same phrasing
// never repeats before every other phrasing has been used once.
function _rtMakeVariantBags() {
  const bags = {};
  RT_CATEGORIES.forEach(cat => { bags[cat.key] = { queue: [], last: -1 }; });
  return bags;
}
function _rtNextVariant(bags, cat) {
  const bag = bags[cat.key];
  if (bag.queue.length === 0) {
    let fresh = _shuffle(cat.variants.map((_, i) => i));
    // avoid the refill accidentally starting with the variant just served
    if (cat.variants.length > 1 && fresh[fresh.length - 1] === bag.last) {
      fresh = [fresh[fresh.length - 1], ...fresh.slice(0, -1)];
    }
    bag.queue = fresh;
  }
  const idx = bag.queue.pop();
  bag.last = idx;
  return cat.variants[idx];
}

function playRuleta() {
  currentGameFn = playRuleta;
  const lang = L();
  const title = lang==='es' ? 'La Ruleta de Personajes' : 'The Character Roulette';
  const chars = _shuffle(RULETA_PERSONAJES.map((c,i) => ({ ...c, origIndex:i }))).slice(0,5);

  // Balanced category coverage: each round skips exactly one category, and
  // across the 5 rounds every category ends up skipped exactly once — so no
  // category is over- or under-represented, and rounds never look identical.
  const skipOrder = _shuffle(RT_CATEGORIES.map((_, i) => i));
  const variantBags = _rtMakeVariantBags();

  chars.forEach((c, i) => {
    const excludeIdx = skipOrder[i % RT_CATEGORIES.length];
    const roundCats = _shuffle(RT_CATEGORIES.filter((_, ci) => ci !== excludeIdx));
    c.questions = roundCats.map(cat => {
      const variant = _rtNextVariant(variantBags, cat);
      return { key: cat.key, verb: cat.verb, tiles: variant.tiles, q: variant.q, getAnswer: cat.getAnswer };
    });
  });

  GS = { chars, roundIdx:0, catIdx:0, correct:0, total: chars.length*RT_QPR, profile:[], answered:false };
  _renderRuletaSpin(lang, title);
}

function _wheelHTML() {
  const n = RULETA_PERSONAJES.length;
  const seg = 360 / n;
  const gradient = RULETA_PERSONAJES.map((c,i) => `${c.color} ${i*seg}deg ${(i+1)*seg}deg`).join(', ');
  const labels = RULETA_PERSONAJES.map((c,i) => {
    const angle = i*seg + seg/2;
    return `<div class="rt-wheel-label" style="transform:rotate(${angle}deg)">
      <span style="transform:rotate(${-angle}deg)">${c.role}</span>
    </div>`;
  }).join('');
  return `
    <div class="rt-wheel-pointer">▼</div>
    <div class="rt-wheel2" id="rt-wheel" style="background:conic-gradient(from 0deg, ${gradient})">
      ${labels}
      <div class="rt-wheel-hub">🎯</div>
    </div>`;
}

function _renderRuletaSpin(lang, title) {
  _modal(`
    <p class="gm-instr" style="text-align:center">${lang==='es'?'Gira la ruleta y descubre a tu próximo personaje…':'Spin the wheel and meet your next character…'}</p>
    <div class="rt-wheel-wrap">${_wheelHTML()}</div>
    <button class="gm-btn gm-btn-primary" id="rt-spin-btn" style="width:100%;justify-content:center" onclick="ruletaReveal()">
      ${lang==='es'?'🎡 Girar la ruleta':'🎡 Spin the wheel'}
    </button>
  `, title);
}

function ruletaReveal() {
  const btn = document.getElementById('rt-spin-btn');
  if (btn) btn.disabled = true;
  const wheel = document.getElementById('rt-wheel');
  const target = GS.chars[GS.roundIdx];
  const n = RULETA_PERSONAJES.length;
  const seg = 360 / n;
  const centerAngle = target.origIndex * seg + seg/2;
  const jitter = (Math.random() - 0.5) * (seg * 0.6);
  const spins = 5;
  const finalDeg = spins*360 + (360 - centerAngle - jitter);
  if (wheel) {
    requestAnimationFrame(() => { wheel.style.transform = `rotate(${finalDeg}deg)`; });
  }
  setTimeout(() => {
    GS.catIdx = 0; GS.answered = false; GS.profile = [];
    _renderRtIntro();
  }, 3400);
}

function _rtAvatar(c, size, revealed) {
  const content = revealed ? c.role : '❓';
  return `<div class="rt-avatar" style="width:${size}px;height:${size}px;font-size:${size*0.46}px;background:${c.color}20;border-color:${c.color}">${content}</div>`;
}

function _rtProfileHTML(lang) {
  if (!GS.profile.length) return '';
  return `<div class="rt-profile-list">${GS.profile.map(p =>
    `<span class="rt-profile-pill" style="border-color:${p.color}40;color:${p.color};background:${p.color}15">${p.icon} ${p.text}</span>`
  ).join('')}</div>`;
}

function _renderRtIntro() {
  const lang = L();
  const title = lang==='es' ? 'La Ruleta de Personajes' : 'The Character Roulette';
  const { chars, roundIdx, catIdx, correct, total } = GS;
  const c = chars[roundIdx];
  const globalIdx = roundIdx*RT_QPR + catIdx;
  _modal(`
    ${_progress(globalIdx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'Alguien nuevo ha llegado… ¡pregúntale para conocerlo!':'Someone new has arrived… ask them to find out who they are!'}</p>
    <div class="rt-intro">
      ${_rtAvatar(c, 72, false)}
      <div class="rt-bubble">${lang==='es'?'¡Hola! Pregúntame lo que quieras…':'Hi! Ask me anything…'}</div>
    </div>
    <button class="gm-btn gm-btn-primary" style="width:100%;justify-content:center" onclick="_renderRtQuestion()">
      ${lang==='es'?'Empezar a preguntar →':'Start asking →'}
    </button>
  `, title);
}

function _renderRtQuestion() {
  const lang = L();
  const title = lang==='es' ? 'La Ruleta de Personajes' : 'The Character Roulette';
  const { chars, roundIdx, catIdx, correct, total } = GS;
  const c = chars[roundIdx];
  const question = c.questions[catIdx];
  const globalIdx = roundIdx*RT_QPR + catIdx;
  GS.buildSelected = [];
  GS.buildAvailable = _shuffleScrambled(question.tiles);
  const wordBtns = GS.buildAvailable.map((w,i)=>`<button class="wo-word" onclick="rtBuildSelect(${i})">${w}</button>`).join('');
  const catLabel = RT_CAT_LABEL[question.key][lang];
  _modal(`
    ${_progress(globalIdx, total, correct, lang)}
    <div class="rt-fact-header">
      ${_rtAvatar(c, 44, catIdx > 0)}
      <span class="rt-fact-name">${catIdx > 0 ? c.name : (lang==='es'?'???':'???')}</span>
    </div>
    ${_rtProfileHTML(lang)}
    <p class="gm-instr">${lang==='es'?`Quieres saber su ${catLabel}. Ordena las palabras para preguntar (verbo ${question.verb}):`:`You want to know their ${catLabel}. Order the words to ask (verb ${question.verb}):`}</p>
    <div class="wo-selected-area" id="wo-sel">
      <span class="wo-placeholder">${lang==='es'?'Tu pregunta aparecerá aquí…':'Your question will appear here…'}</span>
    </div>
    <div class="wo-words-area" id="wo-words">${wordBtns}</div>
    <div class="wo-actions">
      <button class="gm-btn gm-btn-ghost" onclick="rtBuildClear()" id="wo-clear" style="display:none">${lang==='es'?'Borrar todo':'Clear all'}</button>
      <button class="gm-btn gm-btn-primary" onclick="rtBuildCheck()" id="wo-check" style="display:none">${lang==='es'?'Preguntar':'Ask'}</button>
    </div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function rtBuildSelect(i) {
  const btns = document.querySelectorAll('.wo-word');
  if (btns[i].disabled) return;
  btns[i].disabled = true;
  btns[i].classList.add('wo-used');
  GS.buildSelected.push({ word: GS.buildAvailable[i], i });
  _rtRenderSelected();
  const hasAny = GS.buildSelected.length > 0;
  document.getElementById('wo-clear').style.display = hasAny ? 'inline-flex' : 'none';
  document.getElementById('wo-check').style.display = hasAny ? 'inline-flex' : 'none';
}

function _rtRenderSelected() {
  const area = document.getElementById('wo-sel');
  if (GS.buildSelected.length === 0) {
    area.innerHTML = `<span class="wo-placeholder">${L()==='es'?'Tu pregunta aparecerá aquí…':'Your question will appear here…'}</span>`;
    return;
  }
  area.innerHTML = GS.buildSelected.map((s,j)=>
    `<span class="wo-chip" onclick="rtBuildRemove(${j})">${s.word} <span class="wo-x">×</span></span>`
  ).join('');
}

function rtBuildRemove(j) {
  const removed = GS.buildSelected.splice(j, 1)[0];
  const btns = document.querySelectorAll('.wo-word');
  btns[removed.i].disabled = false;
  btns[removed.i].classList.remove('wo-used');
  _rtRenderSelected();
  const hasAny = GS.buildSelected.length > 0;
  document.getElementById('wo-clear').style.display = hasAny ? 'inline-flex' : 'none';
  document.getElementById('wo-check').style.display = hasAny ? 'inline-flex' : 'none';
}

function rtBuildClear() {
  GS.buildSelected = [];
  document.querySelectorAll('.wo-word').forEach(b => { b.disabled = false; b.classList.remove('wo-used'); });
  _rtRenderSelected();
  document.getElementById('wo-clear').style.display = 'none';
  document.getElementById('wo-check').style.display = 'none';
}

function rtBuildCheck() {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const { chars, roundIdx, catIdx } = GS;
  const c = chars[roundIdx];
  const question = c.questions[catIdx];
  const answer = GS.buildSelected.map(s => s.word).join(' ');
  const ok = answer.toLowerCase() === question.q.toLowerCase();
  if (ok) GS.correct++;
  document.getElementById('wo-check').disabled = true;
  document.getElementById('wo-clear').disabled = true;
  const answerText = question.getAnswer(c, lang);
  GS.profile.push({ icon: RT_CAT_ICON[question.key], text: answerText, color: c.color });
  document.getElementById('gm-fb').innerHTML = `
    <span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Pregunta perfecta!':'Perfect question!'):'✗ '+(lang==='es'?'La pregunta correcta era:':'The correct question was:')+' "'+question.q+'"'}</span>
    <div class="rt-bubble rt-bubble-small" style="margin-top:10px">${c.name}: "${answerText}"</div>
    <button class="gm-btn gm-btn-primary gm-next-btn" onclick="rtNextCategory()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
}

function rtNextCategory() {
  GS.catIdx++;
  GS.answered = false;
  if (GS.catIdx >= RT_QPR) {
    _renderRtRoundEnd();
    return;
  }
  _renderRtQuestion();
}

function _renderRtRoundEnd() {
  const lang = L();
  const title = lang==='es' ? 'La Ruleta de Personajes' : 'The Character Roulette';
  const { chars, roundIdx, correct, total } = GS;
  const c = chars[roundIdx];
  const globalIdx = (roundIdx+1)*RT_QPR;
  const isLast = roundIdx >= chars.length - 1;
  const askedProfession = c.questions.some(q => q.key === 'profesion');
  const closing = askedProfession
    ? (lang==='es' ? '¡Ya me conoces! Ha sido un placer.' : "Now you know me! It's been a pleasure.")
    : (lang==='es' ? `¡Ya me conoces! Ah, y una cosa más: ${c.job.es}` : `Now you know me! Oh, one more thing: ${c.job.en}`);
  _modal(`
    ${_progress(globalIdx, total, correct, lang)}
    <div class="rt-intro">
      ${_rtAvatar(c, 72, true)}
      <div class="rt-bubble">
        <span class="rt-bubble-name" style="color:${c.color}">${c.name} <span class="rt-bubble-nat">· ${c.country[lang]}</span></span>
        ${closing}
      </div>
    </div>
    ${_rtProfileHTML(lang)}
    <button class="gm-btn gm-btn-primary" style="width:100%;justify-content:center" onclick="ruletaNext()">
      ${isLast ? (lang==='es'?'Ver resultados →':'See results →') : (lang==='es'?'Girar de nuevo →':'Spin again →')}
    </button>
  `, title);
}

function ruletaNext() {
  GS.roundIdx++;
  GS.catIdx = 0;
  GS.answered = false;
  GS.profile = [];
  if (GS.roundIdx >= GS.chars.length) {
    const lang = L();
    _end(GS.correct, GS.total, lang==='es'?'La Ruleta de Personajes':'The Character Roulette');
    return;
  }
  _renderRuletaSpin(L(), L()==='es'?'La Ruleta de Personajes':'The Character Roulette');
}

/* ══════════════════════════════════════════════
   GAME 9 · DIÁLOGOS CRUZADOS
   (match the mixed-up dialogue lines by scene —
   register recognition: tú vs usted in context)
══════════════════════════════════════════════ */

const DIALOGOS_ESCENAS = [
  { icon:'🏨', register:'usted',
    title:{en:'At the hotel front desk', es:'En la recepción del hotel'},
    note:{en:'Formal register with strangers in professional service settings — always usted.', es:'Registro formal con desconocidos en un contexto de servicio profesional — siempre usted.'},
    pairs:[
      { p:'Buenas tardes, ¿tiene usted una reserva a su nombre?', r:'Sí, buenas tardes. Está a nombre de Zara Ahmed.' },
      { p:'¿Me permite su pasaporte, por favor?',                 r:'Claro, aquí lo tiene.' },
      { p:'¿De dónde es usted?',                                  r:'Soy de Pakistán, pero vivo en Londres.' },
      { p:'¿Cuántas noches se queda con nosotros?',               r:'Me quedo tres noches, hasta el jueves.' }
    ] },
  { icon:'🎉', register:'tú',
    title:{en:'At a birthday party', es:'En una fiesta de cumpleaños'},
    note:{en:'Informal register with peers at a casual social event — tú from the very first question.', es:'Registro informal entre personas de tu edad en un evento social — tú desde la primera pregunta.'},
    pairs:[
      { p:'¡Hola! No nos conocemos, ¿verdad? ¿Cómo te llamas?',   r:'Me llamo Diego, soy amigo del cumpleañero.' },
      { p:'¿Y de dónde eres, Diego?',                              r:'Soy argentino, pero ahora vivo en Bogotá.' },
      { p:'¿A qué te dedicas?',                                    r:'Soy chef — trabajo en un restaurante del centro.' },
      { p:'¿Cuántos años tienes, si no es indiscreción?',          r:'Tengo 34. ¿Y tú?' }
    ] },
  { icon:'💻', register:'usted',
    title:{en:'International work video call', es:'Videollamada de trabajo internacional'},
    note:{en:'Formal register in professional/corporate contexts, even between colleagues of similar age.', es:'Registro formal en contextos profesionales o corporativos, incluso entre colegas de edad similar.'},
    pairs:[
      { p:'Buenos días. Disculpe, ¿cómo se llama usted?',          r:'Buenos días, me llamo Ingrid Berg.' },
      { p:'¿Podría decirme desde dónde se conecta hoy?',           r:'Sí, me conecto desde Lisboa, aunque soy sueca.' },
      { p:'¿Cuál es su especialidad profesional?',                 r:'Soy diseñadora gráfica, especializada en branding.' },
      { p:'Un placer, señora Berg. Empezamos enseguida.',          r:'Perfecto, muchas gracias por la puntualidad.' }
    ] },
  { icon:'🚕', register:'tú',
    title:{en:'Small talk with a taxi driver', es:'Charla con el taxista'},
    note:{en:'In Spain, taxi drivers usually address tourists informally (tú), even on a first meeting.', es:'En España, los taxistas suelen tratar de tú a los turistas, incluso en un primer encuentro.'},
    pairs:[
      { p:'¿Es tu primera vez en Barcelona?',                      r:'Sí, es la primera vez. Estoy aquí de vacaciones.' },
      { p:'¿De dónde vienes?',                                     r:'Vengo de Corea del Sur, pero vivo en Berlín.' },
      { p:'¿Cuánto tiempo te quedas en la ciudad?',                r:'Me quedo una semana, hasta el domingo.' },
      { p:'Pues que disfrutes mucho de tu viaje.',                 r:'¡Muchas gracias! Seguro que sí.' }
    ] }
];

function playDialogos() {
  currentGameFn = playDialogos;
  const lang = L();
  const title = lang==='es' ? 'Diálogos Cruzados' : 'Crossed Dialogues';
  GS = { scenes: [...DIALOGOS_ESCENAS], sceneIdx:0, mistakes:0, matchedTotal:0,
         totalPairs: DIALOGOS_ESCENAS.reduce((n,s)=>n+s.pairs.length,0) };
  _startDgScene();
}

function _startDgScene() {
  const { scenes, sceneIdx } = GS;
  const scene = scenes[sceneIdx];
  const items = [];
  scene.pairs.forEach((pair, i) => {
    items.push({ id:'p'+i, pairId:i, type:'p', text:pair.p });
    items.push({ id:'r'+i, pairId:i, type:'r', text:pair.r });
  });
  GS.items = _shuffle(items);
  GS.matched = new Set();
  GS.selected = null;
  GS.wrongPair = null;
  _renderDialogos();
}

function _renderDialogos() {
  const lang = L();
  const title = lang==='es' ? 'Diálogos Cruzados' : 'Crossed Dialogues';
  const { scenes, sceneIdx, items, matched, selected, wrongPair, mistakes, totalPairs, matchedTotal } = GS;
  const scene = scenes[sceneIdx];
  const sceneDone = matched.size === scene.pairs.length * 2;

  const bubbles = items.map(it => {
    const isMatched = matched.has(it.id);
    const isSelected = selected === it.id;
    const isWrong = wrongPair && wrongPair.includes(it.id);
    let cls = 'dg-bubble';
    if (it.type === 'r') cls += ' dg-bubble--response';
    if (isMatched) cls += ' dg-bubble--matched';
    if (isSelected) cls += ' dg-bubble--selected';
    if (isWrong) cls += ' dg-bubble--wrong';
    return `<button class="${cls}" ${isMatched?'disabled':''} onclick="dgSelect('${it.id}')">${it.text}</button>`;
  }).join('');

  const regLabel = scene.register === 'usted'
    ? (lang==='es'?'Formal · usted':'Formal · usted')
    : (lang==='es'?'Informal · tú':'Informal · tú');

  const doneBlock = sceneDone ? `
    <div class="se-fb-rule" style="margin-top:14px">📌 ${scene.note[lang]}</div>
    <button class="gm-btn gm-btn-primary gm-next-btn" onclick="dgNextScene()">
      ${sceneIdx < scenes.length-1 ? (lang==='es'?'Siguiente escena →':'Next scene →') : (lang==='es'?'Ver resultados →':'See results →')}
    </button>` : '';

  _modal(`
    ${_progress(sceneIdx, scenes.length, matched.size/2 + (scenes.slice(0,sceneIdx).reduce((n,s)=>n+s.pairs.length,0)), lang)}
    <div class="dg-scene-header">
      <span class="dg-scene-icon">${scene.icon}</span>
      <span class="dg-scene-title">${scene.title[lang]}</span>
      <span class="se-level-pill" style="background:${scene.register==='usted'?'#2885FD20':'#1A9E8720'};color:${scene.register==='usted'?'#1450AA':'#1A9E87'};border:1px solid ${scene.register==='usted'?'#2885FD40':'#1A9E8740'}">${regLabel}</span>
    </div>
    <p class="gm-instr">${lang==='es'?'Toca una pregunta y su respuesta correcta para emparejarlas:':'Tap a question and its matching reply to pair them:'}</p>
    <div class="dg-grid">${bubbles}</div>
    ${!sceneDone ? `<div class="gm-hint-line">${lang==='es'?'Errores en esta partida':'Mistakes so far'}: ${mistakes}</div>` : ''}
    ${doneBlock}
  `, title);
}

function dgSelect(id) {
  if (GS.wrongPair) return;
  const { items, matched } = GS;
  if (matched.has(id)) return;
  if (!GS.selected) { GS.selected = id; _renderDialogos(); return; }
  if (GS.selected === id) { GS.selected = null; _renderDialogos(); return; }

  const a = items.find(i => i.id === GS.selected);
  const b = items.find(i => i.id === id);
  const isPair = a.pairId === b.pairId && a.type !== b.type;

  if (isPair) {
    GS.matched.add(a.id); GS.matched.add(b.id);
    GS.matchedTotal++;
    GS.selected = null;
    _renderDialogos();
  } else {
    GS.mistakes++;
    GS.wrongPair = [a.id, b.id];
    _renderDialogos();
    setTimeout(() => { GS.wrongPair = null; GS.selected = null; _renderDialogos(); }, 700);
  }
}

function dgNextScene() {
  const lang = L();
  if (GS.sceneIdx < GS.scenes.length - 1) {
    GS.sceneIdx++;
    _startDgScene();
  } else {
    const pct = Math.max(0, 100 - GS.mistakes*5);
    const correctEquivalent = Math.round(pct/100 * GS.totalPairs);
    _end(correctEquivalent, GS.totalPairs, lang==='es'?'Diálogos Cruzados':'Crossed Dialogues');
  }
}

/* ══════════════════════════════════════════════
   GAME 10 · ATRAPA LA CONCORDANCIA (GUSTAR)
   (things rise as floating bubbles — catch each one
   before it escapes by calling GUSTA or GUSTAN,
   the #1 confusion point in the GUSTAR PDF)
══════════════════════════════════════════════ */

const GUSTAR_ITEMS = [
  { es:'el cine', plural:false, pron:'Me' }, { es:'la música', plural:false, pron:'Te' }, { es:'el café', plural:false, pron:'Le' },
  { es:'el fútbol', plural:false, pron:'Nos' }, { es:'la ópera', plural:false, pron:'Os' }, { es:'la playa', plural:false, pron:'Les' },
  { es:'la paella', plural:false, pron:'Me' }, { es:'esta canción', plural:false, pron:'Te' }, { es:'el chocolate', plural:false, pron:'Le' },
  { es:'leer', plural:false, pron:'Nos' },
  { es:'las películas', plural:true, pron:'Os' }, { es:'los viajes', plural:true, pron:'Les' }, { es:'los deportes', plural:true, pron:'Me' },
  { es:'las gambas', plural:true, pron:'Te' }, { es:'los helados', plural:true, pron:'Le' }, { es:'las novelas históricas', plural:true, pron:'Nos' },
  { es:'los fines de semana', plural:true, pron:'Os' }, { es:'las verduras', plural:true, pron:'Les' }, { es:'los perros', plural:true, pron:'Me' },
  { es:'las series', plural:true, pron:'Te' }
];

function playGustar() {
  currentGameFn = playGustar;
  const lang = L();
  const title = lang==='es' ? 'Atrapa la concordancia' : 'Catch the Agreement';
  // Interleave singular/plural items so they alternate instead of coming
  // in two clumped blocks (a plain shuffle can randomly group them).
  GS = { items: _interleaveByGroup(GUSTAR_ITEMS, i => i.plural).slice(0, 12), idx: 0, correct: 0, total: 12, answered: false };
  _renderGustarRound();
}

function _renderGustarRound() {
  const lang = L();
  const title = lang==='es' ? 'Atrapa la concordancia' : 'Catch the Agreement';
  const { items, idx, correct, total } = GS;
  if (idx >= total) { _end(correct, total, title); return; }
  const item = items[idx];
  GS.answered = false;
  // The bubble's rise (and the time to read it) only ramps up gently and
  // plateaus at a readable minimum. The background clouds are purely
  // decorative, so they ramp up faster and much more noticeably.
  const duration = Math.max(3.4, 4.6 - idx * 0.15);
  const cloudSpeed = Math.max(0.4, 1 - idx * 0.06);
  const cloudBase = [7, 9, 5.5];
  const cloudDelay = [0, 1.5, 0.7];
  const cloudsHTML = cloudBase.map((d, i) => `<span class="gu-deco gu-deco${i+1}" style="animation-duration:${(d*cloudSpeed).toFixed(2)}s; animation-delay:${(cloudDelay[i]*cloudSpeed).toFixed(2)}s">☁️</span>`).join('');
  _modal(`
    ${_progress(idx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'¿GUSTA o GUSTAN? ¡Atrápalo antes de que suba del todo!':'GUSTA or GUSTAN? Catch it before it floats away!'}</p>
    <div class="gu-scene">
      <div class="gu-timerbar"><div class="gu-timerbar-fill" id="gu-timerfill" style="width:100%"></div></div>
      <div class="gu-sky">
        ${cloudsHTML}
        <div class="gu-bubble" id="gu-bubble" style="--gu-duration:${duration}s">${item.pron} <span class="gm-blank">___</span> ${item.es}</div>
      </div>
      <div class="gu-catch-row">
        <button class="gu-catch gu-catch-sing" onclick="gustarAnswer(false)">GUSTA</button>
        <button class="gu-catch gu-catch-plur" onclick="gustarAnswer(true)">GUSTAN</button>
      </div>
    </div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);

  requestAnimationFrame(() => {
    const fill = document.getElementById('gu-timerfill');
    if (fill) { fill.style.transition = `width ${duration}s linear`; fill.style.width = '0%'; }
  });

  if (timerInt) clearTimeout(timerInt);
  timerInt = setTimeout(() => { if (!GS.answered) gustarAnswer(null, true); }, duration * 1000);
}

function gustarAnswer(guessedPlural, timedOut) {
  if (GS.answered) return;
  GS.answered = true;
  if (timerInt) { clearTimeout(timerInt); timerInt = null; }
  const lang = L();
  const item = GS.items[GS.idx];
  const bubble = document.getElementById('gu-bubble');
  const ok = !timedOut && guessedPlural === item.plural;
  if (ok) GS.correct++;
  document.querySelectorAll('.gu-catch').forEach(b => b.disabled = true);
  if (bubble) {
    bubble.style.animationPlayState = 'paused';
    bubble.classList.add(ok ? 'gu-pop-ok' : 'gu-pop-ko');
  }
  const correctWord = item.plural ? 'GUSTAN' : 'GUSTA';
  const fullSentence = `${item.pron} ${item.plural ? 'gustan' : 'gusta'} ${item.es}.`;
  const lead = timedOut
    ? (lang==='es'?'⏱ ¡Se escapó!':'⏱ It got away!')
    : (ok ? '✓ '+(lang==='es'?'¡Correcto!':'Correct!') : '✗ '+(lang==='es'?'Era':'It was')+' <strong>'+correctWord+'</strong>');
  document.getElementById('gm-fb').innerHTML = `
    <span class="${ok?'fb-ok':'fb-ko'}">${lead}</span>
    <div class="se-fb-sentence">${fullSentence}</div>
    <button class="gm-btn gm-btn-primary gm-next-btn" onclick="gustarNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
}

function gustarNext() {
  GS.idx++;
  _renderGustarRound();
}

/* ══════════════════════════════════════════════
   GAME 11 · TRAGAPERRAS DE LA CONCORDANCIA (GÉNERO)
   (a slot-machine reel spins and lands on a noun
   phrase — pick the adjective that truly agrees,
   including the invariable -e/consonant traps and
   the classic -o/-a exceptions from the PDF)
══════════════════════════════════════════════ */

const GENERO_ITEMS = [
  { noun:'el coche',    correct:'rápido',      opts:['rápido','rápida','rápidos'] },
  { noun:'la mesa',     correct:'pequeña',     opts:['pequeño','pequeña','pequeñas'] },
  { noun:'un libro',    correct:'interesante', opts:['interesante','interesanta','interesantes'] },
  { noun:'una ciudad',  correct:'bonita',      opts:['bonito','bonita','bonitas'] },
  { noun:'un problema', correct:'importante',  opts:['importante','importanta','importantes'] },
  { noun:'una lección', correct:'interesante', opts:['interesante','interesanto','interesantes'] },
  { noun:'un examen',   correct:'difícil',     opts:['difícil','difícila','difíciles'] },
  { noun:'una pregunta',correct:'difícil',     opts:['difícil','difícila','difíciles'] },
  { noun:'el chico',    correct:'joven',       opts:['joven','jovena','jóvenes'] },
  { noun:'la chica',    correct:'joven',       opts:['joven','jovena','jóvenes'] },
  { noun:'el edificio', correct:'grande',      opts:['grande','granda','grandes'] },
  { noun:'la casa',     correct:'grande',      opts:['grande','granda','grandes'] }
];

function playGenero() {
  currentGameFn = playGenero;
  const lang = L();
  const title = lang==='es' ? 'El carrete de la concordancia' : 'The Agreement Reel';
  GS = { items: _shuffle(GENERO_ITEMS), idx: 0, correct: 0, total: GENERO_ITEMS.length, answered: false, spun: false };
  _renderGeneroRound();
}

function _renderGeneroRound() {
  const lang = L();
  const title = lang==='es' ? 'El carrete de la concordancia' : 'The Agreement Reel';
  const { items, idx, correct, total } = GS;
  if (idx >= total) { _end(correct, total, title); return; }
  const item = items[idx];
  GS.answered = false;
  GS.spun = false;

  const others = _shuffle(GENERO_ITEMS.filter(g => g !== item)).slice(0, 7).map(g => g.noun);
  const reelList = _shuffle([...others]);
  reelList.push(item.noun);
  const landIndex = reelList.length - 1;
  const reelHTML = reelList.map(n => `<div class="ge-reel-item">${n}</div>`).join('');
  const optsShuffled = _shuffle(item.opts);

  _modal(`
    ${_progress(idx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'Gira el carrete… ¿qué adjetivo concuerda de verdad?':'Spin the reel… which adjective truly agrees?'}</p>
    <div class="ge-reel-window">
      <div class="ge-reel-strip" id="ge-strip">${reelHTML}</div>
    </div>
    <div class="ge-adj-row" id="ge-adj-row" style="display:none">
      <div class="se-btns">
        ${optsShuffled.map(o => `<button class="se-btn" onclick="generoAnswer('${o.replace(/'/g,"\\'")}')">${o}</button>`).join('')}
      </div>
    </div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);

  requestAnimationFrame(() => {
    const strip = document.getElementById('ge-strip');
    if (strip) strip.style.transform = `translateY(-${landIndex * 64}px)`;
  });

  setTimeout(() => {
    const row = document.getElementById('ge-adj-row');
    if (row) row.style.display = 'block';
  }, 2300);
}

function generoAnswer(choice) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const item = GS.items[GS.idx];
  const ok = choice === item.correct;
  if (ok) GS.correct++;
  document.querySelectorAll('#ge-adj-row .se-btn').forEach(b => {
    b.disabled = true;
    if (b.textContent === item.correct) b.classList.add('se-correct');
    else if (b.textContent === choice) b.classList.add('se-wrong');
  });
  document.getElementById('gm-fb').innerHTML = `
    <span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Concuerda perfectamente!':'Perfect agreement!'):'✗ '+(lang==='es'?'La forma correcta es':'The correct form is')+' <strong>'+item.correct+'</strong>'}</span>
    <div class="se-fb-sentence">${item.noun} <strong>${item.correct}</strong></div>
    <button class="gm-btn gm-btn-primary gm-next-btn" onclick="generoNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
}

function generoNext() {
  GS.idx++;
  _renderGeneroRound();
}

/* ══════════════════════════════════════════════
   GAME 12 · LA CINTA DEL CD (CD Y LA PREPOSICIÓN A)
   (sentences slide along a conveyor belt — decide
   CON A or SIN A before each one reaches the end,
   the personal "a" rule from the PDF)
══════════════════════════════════════════════ */

const CD_ITEMS = [
  { es:'Veo ___ Laura.',              needsA:true,  full:'Veo a Laura.' },
  { es:'Busco ___ mi jefe.',          needsA:true,  full:'Busco a mi jefe.' },
  { es:'Escucho ___ la profesora.',   needsA:true,  full:'Escucho a la profesora.' },
  { es:'Visitamos ___ mis abuelos.',  needsA:true,  full:'Visitamos a mis abuelos.' },
  { es:'Necesito ___ mi médico.',     needsA:true,  full:'Necesito a mi médico.' },
  { es:'Quiero ___ mi perro.',        needsA:true,  full:'Quiero a mi perro.' },
  { es:'Llamo ___ mi madre.',         needsA:true,  full:'Llamo a mi madre.' },
  { es:'Conozco ___ tu hermano.',     needsA:true,  full:'Conozco a tu hermano.' },
  { es:'Veo ___ el coche.',           needsA:false, full:'Veo el coche.' },
  { es:'Busco ___ trabajo.',          needsA:false, full:'Busco trabajo.' },
  { es:'Escucho ___ música.',         needsA:false, full:'Escucho música.' },
  { es:'Visitamos ___ la Sagrada Familia.', needsA:false, full:'Visitamos la Sagrada Familia.' },
  { es:'Necesito ___ un médico.',     needsA:false, full:'Necesito un médico.' },
  { es:'Busco ___ secretaria.',       needsA:false, full:'Busco secretaria.' }
];

function playCD() {
  currentGameFn = playCD;
  const lang = L();
  const title = lang==='es' ? 'La cinta del CD' : 'The Direct Object Conveyor';
  GS = { items: _shuffle(CD_ITEMS).slice(0, 12), idx: 0, correct: 0, total: 12, answered: false };
  _renderCDRound();
}

function _renderCDRound() {
  const lang = L();
  const title = lang==='es' ? 'La cinta del CD' : 'The Direct Object Conveyor';
  const { items, idx, correct, total } = GS;
  if (idx >= total) { _end(correct, total, title); return; }
  const item = items[idx];
  GS.answered = false;
  const duration = 8;
  _modal(`
    ${_progress(idx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'¿Necesita «a» o no? ¡Decide antes de que llegue al final de la cinta!':'Does it need "a" or not? Decide before it reaches the end of the belt!'}</p>
    <div class="cd-track">
      <div class="cd-card" id="cd-card" style="--cd-duration:${duration}s">${item.es}</div>
      <div class="cd-belt"></div>
    </div>
    <div class="cd-catch-row">
      <button class="gu-catch cd-catch-no" onclick="cdAnswer(false)">${lang==='es'?'Sin preposición "a"':'Without preposition "a"'}</button>
      <button class="gu-catch cd-catch-yes" onclick="cdAnswer(true)">${lang==='es'?'Con preposición "a"':'With preposition "a"'}</button>
    </div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);

  if (timerInt) clearTimeout(timerInt);
  timerInt = setTimeout(() => { if (!GS.answered) cdAnswer(null, true); }, duration * 1000);
}

function cdAnswer(guessedNeedsA, timedOut) {
  if (GS.answered) return;
  GS.answered = true;
  if (timerInt) { clearTimeout(timerInt); timerInt = null; }
  const lang = L();
  const item = GS.items[GS.idx];
  const card = document.getElementById('cd-card');
  const ok = !timedOut && guessedNeedsA === item.needsA;
  if (ok) GS.correct++;
  document.querySelectorAll('.cd-catch-row .gu-catch').forEach(b => b.disabled = true);
  if (card) {
    card.style.animationPlayState = 'paused';
    card.classList.add(ok ? 'cd-pop-ok' : 'cd-pop-ko');
  }
  const lead = timedOut
    ? (lang==='es'?'⏱ ¡Llegó al final!':'⏱ It reached the end!')
    : (ok ? '✓ '+(lang==='es'?'¡Correcto!':'Correct!') : '✗ '+(lang==='es'?'No exactamente…':'Not quite…'));
  document.getElementById('gm-fb').innerHTML = `
    <span class="${ok?'fb-ok':'fb-ko'}">${lead}</span>
    <div class="se-fb-sentence">${item.full}</div>
    <button class="gm-btn gm-btn-primary gm-next-btn" onclick="cdNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
}

function cdNext() {
  GS.idx++;
  _renderCDRound();
}

/* ══════════════════════════════════════════════
   GAME 13 · LA LÍNEA DEL TIEMPO (DESDE/DESDE HACE/DURANTE)
   (pick the right time expression, then watch a
   timeline draw itself to reveal whether the action
   reaches "HOY" — still ongoing — or stops short —
   a closed, finished period)
══════════════════════════════════════════════ */

const DESDE_ITEMS = [
  { es:'Vivo en Barcelona ___ 2020.',              correct:'DESDE',       full:'Vivo en Barcelona desde 2020.',              ongoing:true,  fill:100 },
  { es:'Trabajo en esta empresa ___ marzo.',       correct:'DESDE',       full:'Trabajo en esta empresa desde marzo.',       ongoing:true,  fill:100 },
  { es:'Estudio español ___ 2019.',                correct:'DESDE',       full:'Estudio español desde 2019.',                ongoing:true,  fill:100 },
  { es:'Vivo en esta ciudad ___ el verano pasado.',correct:'DESDE',       full:'Vivo en esta ciudad desde el verano pasado.',ongoing:true,  fill:100 },
  { es:'Vivo en Barcelona ___ cinco años.',        correct:'DESDE HACE',  full:'Vivo en Barcelona desde hace cinco años.',   ongoing:true,  fill:100 },
  { es:'Trabajo en esta empresa ___ ocho meses.',  correct:'DESDE HACE',  full:'Trabajo en esta empresa desde hace ocho meses.', ongoing:true, fill:100 },
  { es:'Estudio español ___ tres años.',           correct:'DESDE HACE',  full:'Estudio español desde hace tres años.',      ongoing:true,  fill:100 },
  { es:'Conozco a Laura ___ diez años.',           correct:'DESDE HACE',  full:'Conozco a Laura desde hace diez años.',      ongoing:true,  fill:100 },
  { es:'Estudié piano ___ seis años.',             correct:'DURANTE',     full:'Estudié piano durante seis años.',           ongoing:false, fill:55 },
  { es:'Trabajé en esa empresa ___ dos años.',     correct:'DURANTE',     full:'Trabajé en esa empresa durante dos años.',   ongoing:false, fill:40 },
  { es:'Viví en Londres ___ cuatro años.',         correct:'DURANTE',     full:'Viví en Londres durante cuatro años.',       ongoing:false, fill:50 },
  { es:'Viajé por Europa ___ un mes.',             correct:'DURANTE',     full:'Viajé por Europa durante un mes.',           ongoing:false, fill:28 }
];

function playDesde() {
  currentGameFn = playDesde;
  const lang = L();
  const title = lang==='es' ? 'La línea del tiempo' : 'The Timeline';
  GS = { items: _shuffle(DESDE_ITEMS), idx: 0, correct: 0, total: DESDE_ITEMS.length, answered: false };
  _renderDesdeRound();
}

function _renderDesdeRound() {
  const lang = L();
  const title = lang==='es' ? 'La línea del tiempo' : 'The Timeline';
  const { items, idx, correct, total } = GS;
  if (idx >= total) { _end(correct, total, title); return; }
  const item = items[idx];
  GS.answered = false;
  const opts = _shuffle(['DESDE', 'DESDE HACE', 'DURANTE']);

  _modal(`
    ${_progress(idx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'¿Continúa hoy o ya terminó? Elige la expresión correcta:':'Does it continue today, or has it ended? Choose the right expression:'}</p>
    <div class="gm-sentence">${item.es}</div>
    <div class="se-btns">
      ${opts.map(o => `<button class="se-btn" onclick="desdeAnswer('${o}')">${o}</button>`).join('')}
    </div>
    <div class="ds-timeline-wrap" id="ds-timeline" style="display:none">
      <div class="ds-timeline-labels">
        <span class="ds-timeline-start">${lang==='es'?'Pasado':'Past'}</span>
        <div class="ds-timeline-hoy"><span class="ds-timeline-dot"></span>HOY</div>
      </div>
      <div class="ds-timeline-track">
        <div class="ds-timeline-fill" id="ds-timeline-fill"><span class="ds-timeline-marker" id="ds-timeline-marker"></span></div>
      </div>
      <div class="ds-timeline-caption" id="ds-timeline-caption"></div>
    </div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function desdeAnswer(choice) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const item = GS.items[GS.idx];
  const ok = choice === item.correct;
  if (ok) GS.correct++;
  document.querySelectorAll('.se-btn').forEach(b => {
    b.disabled = true;
    if (b.textContent === item.correct) b.classList.add('se-correct');
    else if (b.textContent === choice) b.classList.add('se-wrong');
  });

  const wrap = document.getElementById('ds-timeline');
  const fill = document.getElementById('ds-timeline-fill');
  const marker = document.getElementById('ds-timeline-marker');
  const caption = document.getElementById('ds-timeline-caption');
  if (wrap) {
    wrap.style.display = 'block';
    wrap.classList.toggle('ds-finished', !item.ongoing);
    if (marker) marker.textContent = item.ongoing ? '' : '⏹';
    if (caption) caption.textContent = item.ongoing
      ? (lang==='es' ? '👉 La acción llega hasta hoy — todavía continúa.' : '👉 The action reaches today — it\'s still going on.')
      : (lang==='es' ? '👉 La acción se detiene aquí, en el pasado — ya terminó.' : '👉 The action stops here, in the past — it already ended.');
    requestAnimationFrame(() => { if (fill) fill.style.width = item.fill + '%'; });
  }

  document.getElementById('gm-fb').innerHTML = `
    <span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Correcto!':'Correct!'):'✗ '+(lang==='es'?'La forma correcta es':'The correct form is')+' <strong>'+item.correct+'</strong>'}</span>
    <div class="se-fb-sentence">${item.full}</div>
    <button class="gm-btn gm-btn-primary gm-next-btn" onclick="desdeNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
}

function desdeNext() {
  GS.idx++;
  _renderDesdeRound();
}

/* ══════════════════════════════════════════════
   GAME 14 · LA DIANA DE LAS PREPOSICIONES
   (POR / PARA / DURANTE) — throw the answer at the
   right target. POR and PARA each cover several
   real uses from the PDF (causa, medio, recorrido,
   periodicidad, intercambio · finalidad,
   destinatario, destino, plazo) — DURANTE is
   always duración
══════════════════════════════════════════════ */

const PP_ITEMS = [
  { es:'Viví en Londres ___ cinco años.',   correct:'DURANTE', full:'Viví en Londres durante cinco años.',   sense:{en:'duration — how long the action lasted',   es:'duración — cuánto duró la acción'} },
  { es:'Estudié ___ tres horas seguidas.',  correct:'DURANTE', full:'Estudié durante tres horas seguidas.',  sense:{en:'duration — how long the action lasted',   es:'duración — cuánto duró la acción'} },
  { es:'Llovió ___ toda la noche.',         correct:'DURANTE', full:'Llovió durante toda la noche.',         sense:{en:'duration — how long the action lasted',   es:'duración — cuánto duró la acción'} },
  { es:'Estuve enfermo ___ una semana.',    correct:'DURANTE', full:'Estuve enfermo durante una semana.',    sense:{en:'duration — how long the action lasted',   es:'duración — cuánto duró la acción'} },
  { es:'Este regalo es ___ ti.',            correct:'PARA',    full:'Este regalo es para ti.',               sense:{en:'recipient — who it is for',               es:'destinatario — a quién va dirigido'} },
  { es:'Necesito el informe ___ el viernes.', correct:'PARA',  full:'Necesito el informe para el viernes.',  sense:{en:'deadline — the time limit',               es:'plazo — la fecha límite'} },
  { es:'Estudio español ___ trabajar.',     correct:'PARA',    full:'Estudio español para trabajar.',        sense:{en:'purpose — the goal',                      es:'finalidad — el objetivo'} },
  { es:'Lo necesito ___ mañana.',           correct:'PARA',    full:'Lo necesito para mañana.',              sense:{en:'deadline — the time limit',               es:'plazo — la fecha límite'} },
  { es:'Salimos ___ Madrid mañana.',        correct:'PARA',    full:'Salimos para Madrid mañana.',           sense:{en:'destination — where you are headed',      es:'destino — hacia dónde vas'} },
  { es:'Lo hice ___ ti, no por dinero.',    correct:'POR',     full:'Lo hice por ti, no por dinero.',        sense:{en:'cause — the reason why',                  es:'causa — el motivo'} },
  { es:'Te llamo ___ teléfono.',            correct:'POR',     full:'Te llamo por teléfono.',                sense:{en:'means — how it is done',                  es:'medio — cómo se hace'} },
  { es:'Voy al gimnasio tres veces ___ semana.', correct:'POR', full:'Voy al gimnasio tres veces por semana.', sense:{en:'frequency — how often',                  es:'periodicidad — con qué frecuencia'} },
  { es:'Pasé ___ Zaragoza de camino a casa.', correct:'POR',   full:'Pasé por Zaragoza de camino a casa.',   sense:{en:'route — the place you pass through',      es:'recorrido — el lugar por donde pasas'} },
  { es:'Te lo cambio ___ el tuyo.',          correct:'POR',    full:'Te lo cambio por el tuyo.',             sense:{en:'exchange — what for what',                es:'intercambio — a cambio de qué'} }
];

const PP_TARGETS = [
  { key:'POR',     icon:'❓', label:{en:'several meanings', es:'varios usos'} },
  { key:'PARA',    icon:'🎁', label:{en:'several meanings', es:'varios usos'} },
  { key:'DURANTE', icon:'⏳', label:{en:'duration',         es:'duración'} }
];

function playPorPara() {
  currentGameFn = playPorPara;
  const lang = L();
  const title = lang==='es' ? 'La diana de las preposiciones' : 'The Preposition Dartboard';
  GS = { items: _shuffle(PP_ITEMS), idx: 0, correct: 0, total: PP_ITEMS.length, answered: false };
  _renderPPRound();
}

function _renderPPRound() {
  const lang = L();
  const title = lang==='es' ? 'La diana de las preposiciones' : 'The Preposition Dartboard';
  const { items, idx, correct, total } = GS;
  if (idx >= total) { _end(correct, total, title); return; }
  const item = items[idx];
  GS.answered = false;

  const targetsHTML = PP_TARGETS.map(t => `
    <button class="pp-target" data-key="${t.key}" onclick="ppAnswer('${t.key}')">
      <span class="pp-target-icon">${t.icon}</span>
      <span class="pp-target-label">${t.key}<br><small>${t.label[lang]}</small></span>
    </button>`).join('');

  _modal(`
    ${_progress(idx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'¿POR, PARA o DURANTE? ¡Lanza tu respuesta a la diana correcta!':'POR, PARA or DURANTE? Throw your answer at the right target!'}</p>
    <div class="gm-sentence">${item.es}</div>
    <div class="pp-arena">
      <div class="pp-targets">${targetsHTML}</div>
      <div class="pp-dart" id="pp-dart" style="display:none">📍</div>
    </div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function ppAnswer(key) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const item = GS.items[GS.idx];
  const ok = key === item.correct;
  if (ok) GS.correct++;

  const targets = document.querySelectorAll('.pp-target');
  targets.forEach(t => t.disabled = true);
  const clickedBtn = document.querySelector(`.pp-target[data-key="${key}"]`);
  const correctBtn = document.querySelector(`.pp-target[data-key="${item.correct}"]`);
  const dart = document.getElementById('pp-dart');
  const arena = document.querySelector('.pp-arena');

  if (dart && arena && clickedBtn) {
    const arenaRect = arena.getBoundingClientRect();
    const btnRect = clickedBtn.getBoundingClientRect();
    const dx = (btnRect.left + btnRect.width / 2) - (arenaRect.left + arenaRect.width / 2);
    dart.style.display = 'flex';
    requestAnimationFrame(() => {
      dart.style.transform = `translate(calc(-50% + ${dx}px), -130px) scale(1.1) rotate(20deg)`;
    });
  }

  setTimeout(() => {
    if (clickedBtn) clickedBtn.classList.add(ok ? 'pp-hit' : 'pp-miss');
    if (!ok && correctBtn) correctBtn.classList.add('pp-hit');
    document.getElementById('gm-fb').innerHTML = `
      <span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Diana!':'Bullseye!'):'✗ '+(lang==='es'?'La respuesta correcta es':'The correct answer is')+' <strong>'+item.correct+'</strong>'}</span>
      <div class="se-fb-sentence">${item.full}</div>
      <div class="pf-note">${item.sense[lang]}</div>
      <button class="gm-btn gm-btn-primary gm-next-btn" onclick="ppNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
  }, 480);
}

function ppNext() {
  GS.idx++;
  _renderPPRound();
}

/* ══════════════════════════════════════════════
   GAME 15 · EL ASCENSOR DE LAS PROFESIONES
   (LAS PROFESIONES — masculino/femenino, las 4
   reglas del género) — send the elevator to the
   floor that matches the gender rule, then watch
   the doors open to reveal if you were right
══════════════════════════════════════════════ */

const PF_FLOORS = [
  { key:'IRR',   n:4, percent:'80%', label:{en:'Irregular',           es:'Irregular'} },
  { key:'INV',   n:3, percent:'56%', label:{en:'Invariable (-E/-ISTA)', es:'Invariable (-E/-ISTA)'} },
  { key:'ORORA', n:2, percent:'32%', label:{en:'-OR → -ORA',          es:'-OR → -ORA'} },
  { key:'OA',    n:1, percent:'8%',  label:{en:'-O → -A',             es:'-O → -A'} }
];

const PROF_ITEMS = [
  { masc:'el médico',     fem:'la médica',     floor:'OA',    note:{en:'Ends in -O → change to -A.',                                es:'Termina en -O → cambia a -A.'} },
  { masc:'el cocinero',   fem:'la cocinera',   floor:'OA',    note:{en:'Ends in -O → change to -A.',                                es:'Termina en -O → cambia a -A.'} },
  { masc:'el abogado',    fem:'la abogada',    floor:'OA',    note:{en:'Ends in -O → change to -A.',                                es:'Termina en -O → cambia a -A.'} },
  { masc:'el director',   fem:'la directora',  floor:'ORORA', note:{en:'Ends in -OR → add -A (directora).',                         es:'Termina en -OR → añade -A (directora).'} },
  { masc:'el profesor',   fem:'la profesora',  floor:'ORORA', note:{en:'Ends in -OR → add -A (profesora).',                         es:'Termina en -OR → añade -A (profesora).'} },
  { masc:'el escritor',   fem:'la escritora',  floor:'ORORA', note:{en:'Ends in -OR → add -A (escritora).',                         es:'Termina en -OR → añade -A (escritora).'} },
  { masc:'el periodista', fem:'la periodista', floor:'INV',   note:{en:'Ends in -ISTA → same word, only the article changes.',      es:'Termina en -ISTA → misma palabra, solo cambia el artículo.'} },
  { masc:'el dentista',   fem:'la dentista',   floor:'INV',   note:{en:'Ends in -ISTA → same word, only the article changes.',      es:'Termina en -ISTA → misma palabra, solo cambia el artículo.'} },
  { masc:'el estudiante', fem:'la estudiante', floor:'INV',   note:{en:'Ends in -E → invariable, only the article changes.',        es:'Termina en -E → invariable, solo cambia el artículo.'} },
  { masc:'el actor',      fem:'la actriz',     floor:'IRR',   note:{en:'Irregular — a completely different word.',                  es:'Irregular — palabra completamente distinta.'} },
  { masc:'el rey',        fem:'la reina',      floor:'IRR',   note:{en:'Irregular — a completely different word.',                  es:'Irregular — palabra completamente distinta.'} },
  { masc:'el policía',    fem:'la policía',    floor:'IRR',   note:{en:'Irregular type — same word, only the article changes.',     es:'Tipo irregular — misma palabra, solo cambia el artículo.'} }
];

function playProfesiones() {
  currentGameFn = playProfesiones;
  const lang = L();
  const title = lang==='es' ? 'El ascensor de las profesiones' : 'The Profession Elevator';
  GS = { items: _shuffle(PROF_ITEMS), idx: 0, correct: 0, total: PROF_ITEMS.length, answered: false };
  _renderProfRound();
}

function _renderProfRound() {
  const lang = L();
  const title = lang==='es' ? 'El ascensor de las profesiones' : 'The Profession Elevator';
  const { items, idx, correct, total } = GS;
  if (idx >= total) { _end(correct, total, title); return; }
  const item = items[idx];
  GS.answered = false;

  const panelHTML = PF_FLOORS.map(f => `
    <button class="pf-btn" data-key="${f.key}" onclick="profAnswer('${f.key}')">
      <span class="pf-btn-n">${f.n}</span>
      <span class="pf-btn-label">${f.label[lang]}</span>
    </button>`).join('');

  _modal(`
    ${_progress(idx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'Mira la profesión en masculino. ¿A qué piso pertenece según la regla del género? Pulsa el botón del ascensor.':'Look at the profession in the masculine form. Which floor does it belong to, by gender rule? Press the elevator button.'}</p>
    <div class="gm-sentence">${item.masc}</div>
    <div class="pf-wrap">
      <div class="pf-shaft">
        <div class="pf-floor-marks">
          <div class="pf-floor-mark">4</div>
          <div class="pf-floor-mark">3</div>
          <div class="pf-floor-mark">2</div>
          <div class="pf-floor-mark">1</div>
        </div>
        <div class="pf-car" id="pf-car">
          <div class="pf-car-doors">
            <div class="pf-door pf-door-left"></div>
            <div class="pf-door pf-door-right"></div>
          </div>
          <div class="pf-car-content" id="pf-car-content"></div>
        </div>
      </div>
      <div class="pf-panel">${panelHTML}</div>
    </div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function profAnswer(key) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const item = GS.items[GS.idx];
  const ok = key === item.floor;
  if (ok) GS.correct++;

  document.querySelectorAll('.pf-btn').forEach(b => {
    b.disabled = true;
    if (b.dataset.key === item.floor) b.classList.add('pf-correct');
    else if (b.dataset.key === key && !ok) b.classList.add('pf-wrong');
  });

  const target = PF_FLOORS.find(f => f.key === key);
  const correctFloor = PF_FLOORS.find(f => f.key === item.floor);
  const car = document.getElementById('pf-car');
  const content = document.getElementById('pf-car-content');
  if (car) {
    car.style.bottom = target.percent;
    setTimeout(() => {
      car.classList.add('pf-open');
      if (content) {
        content.innerHTML = ok
          ? `<strong>${item.fem}</strong>`
          : `<strong>${item.fem}</strong><small>${lang==='es'?'Piso correcto: ':'Correct floor: '}${correctFloor.n}</small>`;
      }
    }, 1150);
  }

  setTimeout(() => {
    document.getElementById('gm-fb').innerHTML = `
      <span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Piso correcto!':'Right floor!'):'✗ '+(lang==='es'?'Ese no era el piso':'Wrong floor')}</span>
      <div class="se-fb-sentence">${item.masc} → ${item.fem}</div>
      <div class="pf-note">${item.note[lang]}</div>
      <button class="gm-btn gm-btn-primary gm-next-btn" onclick="profNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
  }, 1400);
}

function profNext() {
  GS.idx++;
  _renderProfRound();
}

/* ══════════════════════════════════════════════
   GAME 16 · EL OBJETIVO DE LA CÁMARA
   (VER / MIRAR / OBSERVAR) — choose the right verb
   and watch a camera lens act out its meaning: VER
   blinks open passively, MIRAR snaps a crosshair
   onto the target on purpose, OBSERVAR zooms in
   and frames the detail with focus brackets
══════════════════════════════════════════════ */

const VM_ITEMS = [
  { blank:'___ un avión en el cielo.', correct:'VER', full:'Veo un avión en el cielo.', emoji:'✈️',
    note:{en:'VER = to perceive without seeking it — it just reaches your eyes.', es:'VER = percibir sin buscarlo — simplemente te llega a los ojos.'} },
  { blank:'___ el reloj para saber la hora.', correct:'MIRAR', full:'Miro el reloj para saber la hora.', emoji:'⏰',
    note:{en:'MIRAR = to direct your gaze on purpose.', es:'MIRAR = dirigir la vista de forma consciente.'} },
  { blank:'___ el experimento para entenderlo mejor.', correct:'OBSERVAR', full:'Observo el experimento para entenderlo mejor.', emoji:'🔬',
    note:{en:'OBSERVAR = to look closely and analyze the details.', es:'OBSERVAR = mirar con atención y analizar los detalles.'} },
  { blank:'___ la televisión todas las noches.', correct:'VER', full:'Veo la televisión todas las noches.', emoji:'📺',
    note:{en:'TV, series, films, YouTube, Netflix → always VER, never MIRAR.', es:'TV, series, películas, YouTube, Netflix → siempre VER, nunca MIRAR.'} },
  { blank:'El científico ___ los insectos bajo el microscopio.', correct:'OBSERVAR', full:'El científico observa los insectos bajo el microscopio.', emoji:'🔬',
    note:{en:'Careful, detailed analysis → OBSERVAR.', es:'Análisis detallado y minucioso → OBSERVAR.'} },
  { blank:'¿___ al profesor cuando habla?', correct:'MIRAR', full:'¿Miras al profesor cuando habla?', emoji:'🧑‍🏫',
    note:{en:'You consciously direct your eyes at a person → MIRAR.', es:'Diriges los ojos de forma consciente hacia una persona → MIRAR.'} },
  { blank:'Desde el tren ___ campos y montañas.', correct:'VER', full:'Desde el tren veo campos y montañas.', emoji:'🚆',
    note:{en:'The landscape reaches your eyes without effort → VER.', es:'El paisaje te llega a los ojos sin esfuerzo → VER.'} },
  { blank:'Voy a ___ una película en Netflix esta noche.', correct:'VER', full:'Voy a ver una película en Netflix esta noche.', emoji:'🎬',
    note:{en:'Streaming and films → always VER.', es:'Streaming y películas → siempre VER.'} },
  { blank:'El detective ___ cada detalle con calma.', correct:'OBSERVAR', full:'El detective observa cada detalle con calma.', emoji:'🕵️',
    note:{en:'Looking for details to draw conclusions → OBSERVAR.', es:'Buscar detalles para sacar conclusiones → OBSERVAR.'} },
  { blank:'¡___ aquí! Tengo algo que mostrarte.', correct:'MIRAR', full:'¡Mira aquí! Tengo algo que mostrarte.', emoji:'👀',
    note:{en:'An order to direct someone’s gaze somewhere → MIRAR.', es:'Una orden para dirigir la vista a un sitio → MIRAR.'} },
  { blank:'Ella ___ su reflejo en el espejo.', correct:'MIRAR', full:'Ella mira su reflejo en el espejo.', emoji:'🪞',
    note:{en:'You deliberately direct your eyes at the mirror → MIRAR.', es:'Diriges la vista de forma intencional al espejo → MIRAR.'} },
  { blank:'La profesora ___ el comportamiento de los alumnos durante el examen.', correct:'OBSERVAR', full:'La profesora observa el comportamiento de los alumnos durante el examen.', emoji:'📝',
    note:{en:'Watching closely to analyze behavior → OBSERVAR.', es:'Mirar con atención para analizar el comportamiento → OBSERVAR.'} }
];

function playVerMirar() {
  currentGameFn = playVerMirar;
  const lang = L();
  const title = lang==='es' ? 'El objetivo de la cámara' : 'The Camera Lens';
  GS = { items: _shuffle(VM_ITEMS), idx: 0, correct: 0, total: VM_ITEMS.length, answered: false };
  _renderVMRound();
}

function _renderVMRound() {
  const lang = L();
  const title = lang==='es' ? 'El objetivo de la cámara' : 'The Camera Lens';
  const { items, idx, correct, total } = GS;
  if (idx >= total) { _end(correct, total, title); return; }
  const item = items[idx];
  GS.answered = false;

  const btns = [
    { key:'VER',      icon:'👁️' },
    { key:'MIRAR',    icon:'🎯' },
    { key:'OBSERVAR', icon:'🔍' }
  ];
  const btnsHTML = btns.map(b => `
    <button class="vm-btn" data-key="${b.key}" onclick="vmAnswer('${b.key}')">
      <span class="vm-btn-icon">${b.icon}</span>${b.key}
    </button>`).join('');

  _modal(`
    ${_progress(idx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'¿VER, MIRAR u OBSERVAR? Elige el verbo correcto y mira por el objetivo.':'VER, MIRAR or OBSERVAR? Choose the right verb and look through the lens.'}</p>
    <div class="gm-sentence">${item.blank}</div>
    <div class="vm-scene">
      <div class="vm-viewfinder" id="vm-viewfinder">
        <span class="vm-subject">${item.emoji}</span>
        <div class="vm-crosshair" id="vm-crosshair"></div>
        <div class="vm-grid" id="vm-grid">
          <span class="vm-corner vm-corner-tl"></span>
          <span class="vm-corner vm-corner-tr"></span>
          <span class="vm-corner vm-corner-bl"></span>
          <span class="vm-corner vm-corner-br"></span>
        </div>
        <div class="vm-aperture" id="vm-aperture"></div>
      </div>
    </div>
    <div class="vm-btn-row">${btnsHTML}</div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function vmAnswer(key) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const item = GS.items[GS.idx];
  const ok = key === item.correct;
  if (ok) GS.correct++;

  document.querySelectorAll('.vm-btn').forEach(b => {
    b.disabled = true;
    if (b.dataset.key === item.correct) b.classList.add('vm-correct');
    else if (b.dataset.key === key && !ok) b.classList.add('vm-wrong');
  });

  const aperture = document.getElementById('vm-aperture');
  const crosshair = document.getElementById('vm-crosshair');
  const grid = document.getElementById('vm-grid');
  const viewfinder = document.getElementById('vm-viewfinder');

  if (item.correct === 'VER') {
    if (aperture) aperture.classList.add('vm-anim-blink');
  } else if (item.correct === 'MIRAR') {
    if (aperture) aperture.classList.add('vm-anim-focus');
    requestAnimationFrame(() => { if (crosshair) crosshair.classList.add('vm-show'); });
  } else {
    if (aperture) aperture.classList.add('vm-anim-focus');
    if (viewfinder) viewfinder.classList.add('vm-zoom');
    requestAnimationFrame(() => { if (grid) grid.classList.add('vm-show'); });
  }

  setTimeout(() => {
    document.getElementById('gm-fb').innerHTML = `
      <span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Correcto!':'Correct!'):'✗ '+(lang==='es'?'El verbo correcto es':'The correct verb is')+' <strong>'+item.correct+'</strong>'}</span>
      <div class="se-fb-sentence">${item.full}</div>
      <div class="pf-note">${item.note[lang]}</div>
      <button class="gm-btn gm-btn-primary gm-next-btn" onclick="vmNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
  }, 950);
}

function vmNext() {
  GS.idx++;
  _renderVMRound();
}

/* ══════════════════════════════════════════════
   GAME 17 · LA PONCHADORA DEL TRABAJO
   (HABLEMOS DEL MUNDO LABORAL — SER, TRABAJAR EN,
   TRABAJAR COMO, DEDICARSE A) — pick the right
   verb and a time-clock card slides up into the
   machine, then a stamp arm slams down to mark it
   right or wrong
══════════════════════════════════════════════ */

const WK_CONJ = {
  yo: { SER:'SOY',   TRABAJAR_EN:'TRABAJO EN',  TRABAJAR_COMO:'TRABAJO COMO',  DEDICARSE_A:'ME DEDICO A' },
  tu: { SER:'ERES',  TRABAJAR_EN:'TRABAJAS EN', TRABAJAR_COMO:'TRABAJAS COMO', DEDICARSE_A:'TE DEDICAS A' },
  el: { SER:'ES',    TRABAJAR_EN:'TRABAJA EN',  TRABAJAR_COMO:'TRABAJA COMO',  DEDICARSE_A:'SE DEDICA A' }
};

const WK_ITEMS = [
  { blank:'___ ingeniero.', correct:'SER', person:'yo', full:'Soy ingeniero.', emoji:'🧑‍💼',
    note:{en:'SER + profession, never with an article.', es:'SER + profesión, nunca con artículo.'} },
  { blank:'___ periodista.', correct:'SER', person:'yo', full:'Soy periodista.', emoji:'📰',
    note:{en:'SER + profession, never with an article.', es:'SER + profesión, nunca con artículo.'} },
  { blank:'¿___ profesora?', correct:'SER', person:'tu', full:'¿Eres profesora?', emoji:'🍎',
    note:{en:'SER + profession, never with an article.', es:'SER + profesión, nunca con artículo.'} },
  { blank:'___ un hospital.', correct:'TRABAJAR_EN', person:'yo', full:'Trabajo en un hospital.', emoji:'🏥',
    note:{en:'TRABAJAR EN + place — the location, not the role.', es:'TRABAJAR EN + lugar — el sitio, no el puesto.'} },
  { blank:'___ una empresa de diseño.', correct:'TRABAJAR_EN', person:'yo', full:'Trabajo en una empresa de diseño.', emoji:'🏢',
    note:{en:'TRABAJAR EN + place — the location, not the role.', es:'TRABAJAR EN + lugar — el sitio, no el puesto.'} },
  { blank:'¿___ en un laboratorio o en una clínica?', correct:'TRABAJAR_EN', person:'tu', full:'¿Trabajas en un laboratorio o en una clínica?', emoji:'🔬',
    note:{en:'TRABAJAR EN + place — the location, not the role.', es:'TRABAJAR EN + lugar — el sitio, no el puesto.'} },
  { blank:'Ana ___ periodista en un diario digital.', correct:'TRABAJAR_COMO', person:'el', full:'Ana trabaja como periodista en un diario digital.', emoji:'💻',
    note:{en:'TRABAJAR COMO + role — the job title you perform.', es:'TRABAJAR COMO + puesto — la función que desempeñas.'} },
  { blank:'Ella ___ diseñadora en un estudio de moda.', correct:'TRABAJAR_COMO', person:'el', full:'Ella trabaja como diseñadora en un estudio de moda.', emoji:'✂️',
    note:{en:'TRABAJAR COMO + role — the job title you perform.', es:'TRABAJAR COMO + puesto — la función que desempeñas.'} },
  { blank:'___ camarero los fines de semana.', correct:'TRABAJAR_COMO', person:'yo', full:'Trabajo como camarero los fines de semana.', emoji:'🍽️',
    note:{en:'TRABAJAR COMO + role — the job title you perform.', es:'TRABAJAR COMO + puesto — la función que desempeñas.'} },
  { blank:'Luis ___ la hostelería desde hace diez años.', correct:'DEDICARSE_A', person:'el', full:'Luis se dedica a la hostelería desde hace diez años.', emoji:'🏨',
    note:{en:'DEDICARSE A + sector, never a profession — always with the preposition A.', es:'DEDICARSE A + sector, nunca una profesión — siempre con la preposición A.'} },
  { blank:'Mi padre ___ la educación toda su vida.', correct:'DEDICARSE_A', person:'el', full:'Mi padre se dedica a la educación toda su vida.', emoji:'🎓',
    note:{en:'DEDICARSE A + sector, never a profession — always with the preposition A.', es:'DEDICARSE A + sector, nunca una profesión — siempre con la preposición A.'} },
  { blank:'___ al turismo.', correct:'DEDICARSE_A', person:'yo', full:'Me dedico al turismo.', emoji:'🧳',
    note:{en:'DEDICARSE A + sector, never a profession — always with the preposition A.', es:'DEDICARSE A + sector, nunca una profesión — siempre con la preposición A.'} }
];

function playTrabajo() {
  currentGameFn = playTrabajo;
  const lang = L();
  const title = lang==='es' ? 'Preséntate en tu trabajo' : 'Introduce Yourself at Work';
  GS = { items: _shuffle(WK_ITEMS), idx: 0, correct: 0, total: WK_ITEMS.length, answered: false };
  _renderWKRound();
}

function _renderWKRound() {
  const lang = L();
  const title = lang==='es' ? 'Preséntate en tu trabajo' : 'Introduce Yourself at Work';
  const { items, idx, correct, total } = GS;
  if (idx >= total) { _end(correct, total, title); return; }
  const item = items[idx];
  GS.answered = false;

  const conj = WK_CONJ[item.person];
  const btns = [
    { key:'SER',            label:conj.SER },
    { key:'TRABAJAR_EN',    label:conj.TRABAJAR_EN },
    { key:'TRABAJAR_COMO',  label:conj.TRABAJAR_COMO },
    { key:'DEDICARSE_A',    label:conj.DEDICARSE_A }
  ];
  const btnsHTML = btns.map(b => `<button class="wk-btn" data-key="${b.key}" onclick="wkAnswer('${b.key}')">${b.label}</button>`).join('');

  _modal(`
    ${_progress(idx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'¿SER, TRABAJAR EN, TRABAJAR COMO o DEDICARSE A? Elige el verbo y poncha la tarjeta.':'SER, TRABAJAR EN, TRABAJAR COMO or DEDICARSE A? Choose the verb and punch the card.'}</p>
    <div class="gm-sentence">${item.blank}</div>
    <div class="wk-scene">
      <div class="wk-machine">
        <div class="wk-slot"></div>
        <div class="wk-stamp" id="wk-stamp"></div>
        <div class="wk-card" id="wk-card">
          <span class="wk-card-emoji">${item.emoji}</span>
          <span class="wk-card-mark" id="wk-card-mark"></span>
        </div>
      </div>
    </div>
    <div class="wk-btn-row">${btnsHTML}</div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function wkAnswer(key) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const item = GS.items[GS.idx];
  const ok = key === item.correct;
  if (ok) GS.correct++;

  document.querySelectorAll('.wk-btn').forEach(b => {
    b.disabled = true;
    if (b.dataset.key === item.correct) b.classList.add('wk-correct');
    else if (b.dataset.key === key && !ok) b.classList.add('wk-wrong');
  });

  const card = document.getElementById('wk-card');
  const stamp = document.getElementById('wk-stamp');
  const mark = document.getElementById('wk-card-mark');

  if (card) card.classList.add('wk-inserted');
  setTimeout(() => {
    if (stamp) stamp.classList.add('wk-hit');
    setTimeout(() => {
      if (mark) { mark.textContent = ok ? '✓' : '✗'; mark.classList.add(ok ? 'wk-mark-ok' : 'wk-mark-ko'); }
      if (card) card.classList.add('wk-stamped');
    }, 260);
  }, 550);

  setTimeout(() => {
    document.getElementById('gm-fb').innerHTML = `
      <span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Fichado correcto!':'Correctly clocked in!'):'✗ '+(lang==='es'?'La forma correcta es':'The correct form is')+' <strong>'+WK_CONJ[item.person][item.correct]+'</strong>'}</span>
      <div class="se-fb-sentence">${item.full}</div>
      <div class="pf-note">${item.note[lang]}</div>
      <button class="gm-btn gm-btn-primary gm-next-btn" onclick="wkNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
  }, 1200);
}

function wkNext() {
  GS.idx++;
  _renderWKRound();
}

/* ══════════════════════════════════════════════
   GAME 18 · EL VIBRÓMETRO
   (LA R — R suave vs RR fuerte) — pick which sound
   the word uses and watch a gauge needle react: a
   single quick swing for R suave, a rapid multi-step
   vibration before settling for RR fuerte
══════════════════════════════════════════════ */

const RR_ITEMS = [
  { word:'pirata',    correct:'SUAVE',  note:{en:'A single R between vowels → one quick tap of the tongue.', es:'Una sola R entre vocales → un golpe rápido de la lengua.'} },
  { word:'corazón',   correct:'SUAVE',  note:{en:'A single R between vowels → one quick tap of the tongue.', es:'Una sola R entre vocales → un golpe rápido de la lengua.'} },
  { word:'verano',    correct:'SUAVE',  note:{en:'A single R between vowels → one quick tap of the tongue.', es:'Una sola R entre vocales → un golpe rápido de la lengua.'} },
  { word:'corona',    correct:'SUAVE',  note:{en:'A single R between vowels → one quick tap of the tongue.', es:'Una sola R entre vocales → un golpe rápido de la lengua.'} },
  { word:'pera',      correct:'SUAVE',  note:{en:'A single R between vowels → one quick tap of the tongue.', es:'Una sola R entre vocales → un golpe rápido de la lengua.'} },
  { word:'mariposa',  correct:'SUAVE',  note:{en:'A single R between vowels → one quick tap of the tongue.', es:'Una sola R entre vocales → un golpe rápido de la lengua.'} },
  { word:'cerradura', correct:'FUERTE', note:{en:'Written RR between vowels → the tongue vibrates several times.', es:'RR escrita entre vocales → la lengua vibra varias veces.'} },
  { word:'barrio',    correct:'FUERTE', note:{en:'Written RR between vowels → the tongue vibrates several times.', es:'RR escrita entre vocales → la lengua vibra varias veces.'} },
  { word:'marrón',    correct:'FUERTE', note:{en:'Written RR between vowels → the tongue vibrates several times.', es:'RR escrita entre vocales → la lengua vibra varias veces.'} },
  { word:'terrible',  correct:'FUERTE', note:{en:'Written RR between vowels → the tongue vibrates several times.', es:'RR escrita entre vocales → la lengua vibra varias veces.'} },
  { word:'rico',      correct:'FUERTE', note:{en:'R at the start of a word is always the strong R.', es:'La R al principio de palabra siempre es fuerte.'} },
  { word:'alrededor', correct:'FUERTE', note:{en:'R right after L is always the strong R.', es:'La R justo después de L siempre es fuerte.'} }
];

function playSonidoR() {
  currentGameFn = playSonidoR;
  const lang = L();
  const title = lang==='es' ? 'El vibrómetro' : 'The Vibration Meter';
  GS = { items: _shuffle(RR_ITEMS), idx: 0, correct: 0, total: RR_ITEMS.length, answered: false };
  _renderRRRound();
}

function _renderRRRound() {
  const lang = L();
  const title = lang==='es' ? 'El vibrómetro' : 'The Vibration Meter';
  const { items, idx, correct, total } = GS;
  if (idx >= total) { _end(correct, total, title); return; }
  const item = items[idx];
  GS.answered = false;

  _modal(`
    ${_progress(idx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'¿R suave (un golpe) o RR fuerte (vibra)? Elige el sonido correcto.':'R suave (one tap) or RR fuerte (vibrates)? Choose the right sound.'}</p>
    <div class="gm-sentence">${item.word}</div>
    <div class="rr-scene">
      <div class="rr-gauge-face">
        <span class="rr-gauge-label rr-gauge-label-left">R SUAVE</span>
        <span class="rr-gauge-label rr-gauge-label-right">RR FUERTE</span>
        <div class="rr-needle" id="rr-needle"></div>
        <div class="rr-pivot"></div>
      </div>
    </div>
    <div class="rr-btn-row">
      <button class="rr-btn" data-key="SUAVE" onclick="rrAnswer('SUAVE')">R suave</button>
      <button class="rr-btn" data-key="FUERTE" onclick="rrAnswer('FUERTE')">RR fuerte</button>
    </div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function rrAnswer(key) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const item = GS.items[GS.idx];
  const ok = key === item.correct;
  if (ok) GS.correct++;

  document.querySelectorAll('.rr-btn').forEach(b => {
    b.disabled = true;
    if (b.dataset.key === item.correct) b.classList.add('rr-correct');
    else if (b.dataset.key === key && !ok) b.classList.add('rr-wrong');
  });

  const needle = document.getElementById('rr-needle');
  if (needle) {
    if (item.correct === 'FUERTE') {
      needle.classList.add('rr-anim-fuerte');
    } else {
      needle.classList.add('rr-anim-suave');
      requestAnimationFrame(() => { needle.style.transform = 'translateX(-50%) rotate(-55deg)'; });
    }
  }

  setTimeout(() => {
    const label = item.correct === 'SUAVE' ? (lang==='es'?'R suave':'R suave') : (lang==='es'?'RR fuerte':'RR fuerte');
    document.getElementById('gm-fb').innerHTML = `
      <span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Correcto!':'Correct!'):'✗ '+(lang==='es'?'Es':'It is')+' <strong>'+label+'</strong>'}</span>
      <div class="se-fb-sentence">${item.word}</div>
      <div class="pf-note">${item.note[lang]}</div>
      <button class="gm-btn gm-btn-primary gm-next-btn" onclick="rrNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
  }, 1000);
}

function rrNext() {
  GS.idx++;
  _renderRRRound();
}

/* ══════════════════════════════════════════════
   GAME 19 · LA MONEDA DEL GÉNERO
   (GÉNERO II — CASOS ESPECIALES) — pick EL or LA
   and watch a coin flip in 3D to land on the face
   that matches the correct meaning. Covers words
   that are always masculine (tilde final, -MA) and
   the striking case where the article completely
   changes the meaning (capital, cura, frente...)
══════════════════════════════════════════════ */

const CN_ITEMS = [
  { blank:'___ menú del día incluye bebida y postre.', correct:'EL', word:'menú', icon:'📋',
    full:'El menú del día incluye bebida y postre.',
    note:{en:'Words stressed on the last vowel (tilde) are almost always masculine.', es:'Las palabras agudas terminadas en vocal con tilde son casi siempre masculinas.'} },
  { blank:'Necesito comprar ___ champú nuevo.', correct:'EL', word:'champú', icon:'🧴',
    full:'Necesito comprar un champú nuevo.',
    note:{en:'Words stressed on the last vowel (tilde) are almost always masculine.', es:'Las palabras agudas terminadas en vocal con tilde son casi siempre masculinas.'} },
  { blank:'___ esquí es muy ligero.', correct:'EL', word:'esquí', icon:'⛷️',
    full:'El esquí es muy ligero.',
    note:{en:'Words stressed on the last vowel (tilde) are almost always masculine.', es:'Las palabras agudas terminadas en vocal con tilde son casi siempre masculinas.'} },
  { blank:'___ idioma español es precioso.', correct:'EL', word:'idioma', icon:'🗣️',
    full:'El idioma español es precioso.',
    note:{en:'Words ending in -MA from Greek are masculine (el problema, el sistema...).', es:'Las palabras en -MA de origen griego son masculinas (el problema, el sistema...).'} },
  { blank:'___ planeta Tierra es único.', correct:'EL', word:'planeta', icon:'🪐',
    full:'El planeta Tierra es único.',
    note:{en:'Words ending in -MA from Greek are masculine (el problema, el sistema...).', es:'Las palabras en -MA de origen griego son masculinas (el problema, el sistema...).'} },
  { blank:'Dicen que esa casa tiene ___ fantasma.', correct:'EL', word:'fantasma', icon:'👻',
    full:'Dicen que esa casa tiene un fantasma.',
    note:{en:'Words ending in -MA from Greek are masculine (el problema, el sistema...).', es:'Las palabras en -MA de origen griego son masculinas (el problema, el sistema...).'} },
  { blank:'Madrid es ___ capital de España.', correct:'LA', word:'capital', icon:'🏙️',
    full:'Madrid es la capital de España.',
    note:{en:'LA capital = the city. EL capital = money, investment. Same word, different meaning.', es:'LA capital = la ciudad. EL capital = el dinero, la inversión. Misma palabra, distinto significado.'} },
  { blank:'___ capital de la empresa ha crecido mucho.', correct:'EL', word:'capital', icon:'💰',
    full:'El capital de la empresa ha crecido mucho.',
    note:{en:'EL capital = money, investment. LA capital = the city. Same word, different meaning.', es:'EL capital = el dinero, la inversión. LA capital = la ciudad. Misma palabra, distinto significado.'} },
  { blank:'___ cura llegó antes de la ceremonia.', correct:'EL', word:'cura', icon:'⛪',
    full:'El cura llegó antes de la ceremonia.',
    note:{en:'EL cura = the priest. LA cura = the medical treatment. Same word, different meaning.', es:'EL cura = el sacerdote. LA cura = el tratamiento médico. Misma palabra, distinto significado.'} },
  { blank:'___ cura fue muy rápida.', correct:'LA', word:'cura', icon:'💊',
    full:'La cura fue muy rápida.',
    note:{en:'LA cura = the medical treatment. EL cura = the priest. Same word, different meaning.', es:'LA cura = el tratamiento médico. EL cura = el sacerdote. Misma palabra, distinto significado.'} },
  { blank:'Los soldados avanzaron hacia ___ frente.', correct:'EL', word:'frente', icon:'⚔️',
    full:'Los soldados avanzaron hacia el frente.',
    note:{en:'EL frente = the combat zone. LA frente = your forehead. Same word, different meaning.', es:'EL frente = la zona de combate. LA frente = la parte de la cara. Misma palabra, distinto significado.'} },
  { blank:'Me duele ___ frente.', correct:'LA', word:'frente', icon:'🤕',
    full:'Me duele la frente.',
    note:{en:'LA frente = your forehead. EL frente = the combat zone. Same word, different meaning.', es:'LA frente = la parte de la cara. EL frente = la zona de combate. Misma palabra, distinto significado.'} }
];

function playGeneroII() {
  currentGameFn = playGeneroII;
  const lang = L();
  const title = lang==='es' ? 'La moneda del género' : 'The Gender Coin';
  // Interleave EL/LA answers so they alternate instead of coming in two clumped blocks.
  GS = { items: _interleaveByGroup(CN_ITEMS, i => i.correct === 'LA'), idx: 0, correct: 0, total: CN_ITEMS.length, answered: false };
  _renderCNRound();
}

function _renderCNRound() {
  const lang = L();
  const title = lang==='es' ? 'La moneda del género' : 'The Gender Coin';
  const { items, idx, correct, total } = GS;
  if (idx >= total) { _end(correct, total, title); return; }
  const item = items[idx];
  GS.answered = false;

  _modal(`
    ${_progress(idx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'¿EL o LA? Elige el artículo correcto y observa cómo cae la moneda.':'EL or LA? Choose the right article and watch the coin land.'}</p>
    <div class="gm-sentence">${item.blank}</div>
    <div class="cn-coin-wrap">
      <div class="cn-coin" id="cn-coin">
        <div class="cn-face cn-face-el">
          <span class="cn-face-icon" id="cn-face-el-icon">?</span>
          <span class="cn-face-label">EL</span>
        </div>
        <div class="cn-face cn-face-la">
          <span class="cn-face-icon" id="cn-face-la-icon">?</span>
          <span class="cn-face-label">LA</span>
        </div>
      </div>
    </div>
    <div class="cn-btn-row">
      <button class="cn-btn" data-key="EL" onclick="cnAnswer('EL')">EL</button>
      <button class="cn-btn" data-key="LA" onclick="cnAnswer('LA')">LA</button>
    </div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function cnAnswer(key) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const item = GS.items[GS.idx];
  const ok = key === item.correct;
  if (ok) GS.correct++;

  document.querySelectorAll('.cn-btn').forEach(b => {
    b.disabled = true;
    if (b.dataset.key === item.correct) b.classList.add('cn-correct');
    else if (b.dataset.key === key && !ok) b.classList.add('cn-wrong');
  });

  const iconEl = document.getElementById(item.correct === 'EL' ? 'cn-face-el-icon' : 'cn-face-la-icon');
  if (iconEl) iconEl.textContent = item.icon;
  const coin = document.getElementById('cn-coin');
  if (coin) coin.classList.add(item.correct === 'EL' ? 'cn-spin-el' : 'cn-spin-la');

  setTimeout(() => {
    document.getElementById('gm-fb').innerHTML = `
      <span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Correcto!':'Correct!'):'✗ '+(lang==='es'?'Es':'It is')+' <strong>'+item.correct+'</strong>'}</span>
      <div class="se-fb-sentence">${item.full}</div>
      <div class="pf-note">${item.note[lang]}</div>
      <button class="gm-btn gm-btn-primary gm-next-btn" onclick="cnNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
  }, 1100);
}

function cnNext() {
  GS.idx++;
  _renderCNRound();
}

/* ══════════════════════════════════════════════
   GAME 20 · EL CAMBIO DE VÍAS
   (CONSTRUCCIONES TEMPORALES — antes de que, en
   cuanto, mientras, hasta que...) — B2. Pick the
   correctly conjugated verb form (infinitivo,
   indicativo or subjuntivo) and a train travels
   down that track to its station. Tests the real
   B2 skill: reasoning about subject and tense, not
   just filling a gap
══════════════════════════════════════════════ */

const TK_ITEMS = [
  { blank:'Antes de ___ (yo/dormir), leo un rato.', options:['dormir','duerma','duermo'], correct:'dormir', mood:'INFINITIVO',
    full:'Antes de dormir, leo un rato.', note:{en:'Same subject in both parts (yo/yo) → infinitive, no "que" needed.', es:'Mismo sujeto en las dos partes (yo/yo) → infinitivo, sin "que".'} },
  { blank:'En cuanto ___ (nosotros/aterrizar) mañana, te escribiré.', options:['aterricemos','aterrizar','aterrizaremos'], correct:'aterricemos', mood:'SUBJUNTIVO',
    full:'En cuanto aterricemos mañana, te escribiré.', note:{en:'A future moment that hasn\'t happened yet is never a fact → subjunctive, never future tense.', es:'Un momento futuro que todavía no ha pasado nunca es un hecho → subjuntivo, nunca futuro.'} },
  { blank:'Mientras ___ (ella/conducir), escuchaba la radio.', options:['conducía','conducir','conduzca'], correct:'conducía', mood:'INDICATIVO',
    full:'Mientras conducía, escuchaba la radio.', note:{en:'Two simultaneous actions, already real in the past → indicative.', es:'Dos acciones simultáneas, ya reales en el pasado → indicativo.'} },
  { blank:'Cada vez que ___ (nosotros/viajar) juntos, nos perdemos.', options:['viajamos','viajar','viajemos'], correct:'viajamos', mood:'INDICATIVO',
    full:'Cada vez que viajamos juntos, nos perdemos.', note:{en:'A repeated habit, a real and known pattern → indicative.', es:'Un hábito repetido, un patrón real y conocido → indicativo.'} },
  { blank:'Te esperaré hasta que ___ (tú/decidir) qué hacer.', options:['decidas','decides','decidir'], correct:'decidas', mood:'SUBJUNTIVO',
    full:'Te esperaré hasta que decidas qué hacer.', note:{en:'The decision hasn\'t happened yet — not a fact → subjunctive.', es:'Todavía no ha decidido — no es un hecho → subjuntivo.'} },
  { blank:'Después de ___ (ellos/firmar) el contrato, se dieron la mano.', options:['firmar','firmen','firmaron'], correct:'firmar', mood:'INFINITIVO',
    full:'Después de firmar el contrato, se dieron la mano.', note:{en:'Same subject in both parts (ellos/ellos) → infinitive, no "que".', es:'Mismo sujeto en las dos partes (ellos/ellos) → infinitivo, sin "que".'} },
  { blank:'Antes de que el profesor ___ (llegar), guardad los teléfonos.', options:['llegue','llega','llegar'], correct:'llegue', mood:'SUBJUNTIVO',
    full:'Antes de que el profesor llegue, guardad los teléfonos.', note:{en:'Two different subjects (el profesor / vosotros) → "que" introduces a new clause, which needs subjunctive.', es:'Sujetos distintos (el profesor / vosotros) → el "que" introduce una oración nueva, que necesita subjuntivo.'} },
  { blank:'Después de que el jefe ___ (hablar), todos se quedaron en silencio.', options:['habló','hable','hablar'], correct:'habló', mood:'INDICATIVO',
    full:'Después de que el jefe habló, todos se quedaron en silencio.', note:{en:'Different subjects, but it\'s already a real, completed past fact → indicative.', es:'Sujetos distintos, pero ya es un hecho real y terminado en el pasado → indicativo.'} },
  { blank:'Una vez que ___ (yo/entregar) el informe, me iré de vacaciones.', options:['entregue','entrego','entregar'], correct:'entregue', mood:'SUBJUNTIVO',
    full:'Una vez que entregue el informe, me iré de vacaciones.', note:{en:'A future moment that hasn\'t happened yet — not a fact → subjunctive.', es:'Un momento futuro que todavía no ha pasado — no es un hecho → subjuntivo.'} },
  { blank:'A medida que el bebé ___ (crecer), necesitaba ropa nueva.', options:['crecía','crezca','crecer'], correct:'crecía', mood:'INDICATIVO',
    full:'A medida que el bebé crecía, necesitaba ropa nueva.', note:{en:'A gradual progression, already real in the past → indicative.', es:'Una progresión gradual, ya real en el pasado → indicativo.'} },
  { blank:'En cuanto el tren ___ (llegar), los pasajeros bajaron.', options:['llegó','llegue','llegar'], correct:'llegó', mood:'INDICATIVO',
    full:'En cuanto el tren llegó, los pasajeros bajaron.', note:{en:'It already happened — a real, completed past fact → indicative.', es:'Ya sucedió — un hecho real y terminado en el pasado → indicativo.'} },
  { blank:'Esperé hasta que la lluvia ___ (parar) para salir.', options:['paró','pare','parar'], correct:'paró', mood:'INDICATIVO',
    full:'Esperé hasta que la lluvia paró para salir.', note:{en:'It already happened — a real, completed past fact → indicative.', es:'Ya sucedió — un hecho real y terminado en el pasado → indicativo.'} }
];

function playConectores() {
  currentGameFn = playConectores;
  const lang = L();
  const title = lang==='es' ? 'El cambio de vías' : 'The Track Switch';
  GS = { items: _shuffle(TK_ITEMS), idx: 0, correct: 0, total: TK_ITEMS.length, answered: false };
  _renderTKRound();
}

function _renderTKRound() {
  const lang = L();
  const title = lang==='es' ? 'El cambio de vías' : 'The Track Switch';
  const { items, idx, correct, total } = GS;
  if (idx >= total) { _end(correct, total, title); return; }
  const item = items[idx];
  GS.answered = false;

  const lanesHTML = item.options.map((opt, i) => `
    <button class="tk-lane" data-idx="${i}" onclick="tkAnswer(${i})">
      <span class="tk-rail"></span>
      <span class="tk-loco" id="tk-loco-${i}">🚂</span>
      <span class="tk-lane-label">${opt}</span>
    </button>`).join('');

  _modal(`
    ${_progress(idx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'¿Infinitivo, indicativo o subjuntivo? Elige la vía correcta para el tren.':'Infinitive, indicative or subjunctive? Choose the right track for the train.'}</p>
    <div class="gm-sentence">${item.blank}</div>
    <div class="tk-yard">${lanesHTML}</div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function tkAnswer(idx) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const item = GS.items[GS.idx];
  const correctIdx = item.options.indexOf(item.correct);
  const ok = idx === correctIdx;
  if (ok) GS.correct++;

  document.querySelectorAll('.tk-lane').forEach((el, i) => {
    el.disabled = true;
    if (i === correctIdx) el.classList.add('tk-lane--correct');
    else if (i === idx && !ok) el.classList.add('tk-lane--wrong');
  });

  const lanes = document.querySelectorAll('.tk-lane');
  if (lanes[correctIdx]) lanes[correctIdx].classList.add('tk-active');

  setTimeout(() => {
    document.getElementById('gm-fb').innerHTML = `
      <span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Vía correcta!':'Right track!'):'✗ '+(lang==='es'?'La forma correcta es':'The correct form is')+' <strong>'+item.correct+'</strong>'}</span>
      <div class="se-fb-sentence">${item.full}</div>
      <div class="pf-note">${item.note[lang]}</div>
      <button class="gm-btn gm-btn-primary gm-next-btn" onclick="tkNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
  }, 1150);
}

function tkNext() {
  GS.idx++;
  _renderTKRound();
}

/* ══════════════════════════════════════════════
   GAME 19 · EL RELOJ DE LA SOBREMESA
   (LA SOBREMESA — hacer sobremesa, quedarse de
   sobremesa, una sobremesa animada, alargar la
   sobremesa, sobremesa interminable) — read the
   real example sentence and pick the expression
   it illustrates; a clock face starting at 3pm
   spins its hands forward on every correct answer,
   as if the sobremesa itself keeps getting longer
══════════════════════════════════════════════ */

const SM_EXPR = [
  { key:'HACER',     label:'HACER SOBREMESA' },
  { key:'QUEDARSE',  label:'QUEDARSE DE SOBREMESA' },
  { key:'ANIMADA',   label:'UNA SOBREMESA ANIMADA' },
  { key:'ALARGAR',   label:'ALARGAR LA SOBREMESA' },
  { key:'INTERMINABLE', label:'SOBREMESA INTERMINABLE' }
];

const SM_ITEMS = [
  { sentence:'"Después de comer, siempre hacemos sobremesa."', correct:'HACER',
    note:{en:'HACER SOBREMESA = to stay chatting at the table after eating.', es:'HACER SOBREMESA = quedarse charlando en la mesa después de comer.'} },
  { sentence:'"Los domingos, mi familia siempre hace sobremesa después de la paella."', correct:'HACER',
    note:{en:'HACER SOBREMESA = to stay chatting at the table after eating.', es:'HACER SOBREMESA = quedarse charlando en la mesa después de comer.'} },
  { sentence:'"Nos quedamos de sobremesa hasta las cuatro."', correct:'QUEDARSE',
    note:{en:'QUEDARSE DE SOBREMESA = to remain at the table talking.', es:'QUEDARSE DE SOBREMESA = permanecer en la mesa charlando.'} },
  { sentence:'"Ayer nos quedamos de sobremesa más de dos horas."', correct:'QUEDARSE',
    note:{en:'QUEDARSE DE SOBREMESA = to remain at the table talking.', es:'QUEDARSE DE SOBREMESA = permanecer en la mesa charlando.'} },
  { sentence:'"Tuvimos una sobremesa muy animada ayer."', correct:'ANIMADA',
    note:{en:'UNA SOBREMESA ANIMADA = a lively, fun conversation.', es:'UNA SOBREMESA ANIMADA = una conversación viva y divertida.'} },
  { sentence:'"En el cumpleaños de mi tío, la sobremesa fue muy animada."', correct:'ANIMADA',
    note:{en:'UNA SOBREMESA ANIMADA = a lively, fun conversation.', es:'UNA SOBREMESA ANIMADA = una conversación viva y divertida.'} },
  { sentence:'"Nadie quería alargar la sobremesa."', correct:'ALARGAR',
    note:{en:'ALARGAR LA SOBREMESA = to make it last longer.', es:'ALARGAR LA SOBREMESA = hacer que dure más tiempo.'} },
  { sentence:'"Decidimos alargar la sobremesa con un café más."', correct:'ALARGAR',
    note:{en:'ALARGAR LA SOBREMESA = to make it last longer.', es:'ALARGAR LA SOBREMESA = hacer que dure más tiempo.'} },
  { sentence:'"En Navidad, la sobremesa es interminable."', correct:'INTERMINABLE',
    note:{en:'SOBREMESA INTERMINABLE = a very long sobremesa.', es:'SOBREMESA INTERMINABLE = una sobremesa muy larga.'} },
  { sentence:'"Con mis abuelos, la sobremesa siempre es interminable."', correct:'INTERMINABLE',
    note:{en:'SOBREMESA INTERMINABLE = a very long sobremesa.', es:'SOBREMESA INTERMINABLE = una sobremesa muy larga.'} }
];

function playSobremesa() {
  currentGameFn = playSobremesa;
  GS = { items: _shuffle(SM_ITEMS), idx: 0, correct: 0, total: SM_ITEMS.length, answered: false, minutes: 0 };
  _renderSMRound();
}

function _smClockHTML(minutes) {
  const hourDeg = (minutes / 60) * 30;
  const minDeg = (minutes % 60) * 6;
  const totalH = Math.floor(minutes / 60);
  const startHour = 15;
  const endHour = (startHour + totalH) % 24;
  const endMin = minutes % 60;
  const timeLabel = String(endHour).padStart(2,'0') + ':' + String(endMin).padStart(2,'0');
  return `
    <div class="sm-scene">
      <div class="sm-clock">
        <div class="sm-tick sm-tick-12"></div><div class="sm-tick sm-tick-3"></div>
        <div class="sm-tick sm-tick-6"></div><div class="sm-tick sm-tick-9"></div>
        <div class="sm-hand sm-hand-hour" id="sm-hour" style="transform:translateX(-50%) rotate(${hourDeg}deg)"></div>
        <div class="sm-hand sm-hand-min" id="sm-min" style="transform:translateX(-50%) rotate(${minDeg}deg)"></div>
        <div class="sm-clock-center"></div>
        <span class="sm-cup" id="sm-cup">☕</span>
      </div>
      <div class="sm-time-label" id="sm-time-label">${timeLabel}</div>
    </div>`;
}

function _renderSMRound() {
  const lang = L();
  const title = lang==='es' ? 'El reloj de la sobremesa' : 'The Sobremesa Clock';
  const { items, idx, correct, total, minutes } = GS;
  if (idx >= total) { _end(correct, total, title); return; }
  const item = items[idx];
  GS.answered = false;

  const btnsHTML = SM_EXPR.map(e => `<button class="sm-btn" data-key="${e.key}" onclick="smAnswer('${e.key}')">${e.label}</button>`).join('');

  _modal(`
    ${_progress(idx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'Lee la frase real y elige qué expresión de "sobremesa" ilustra.':'Read the real sentence and pick which "sobremesa" expression it illustrates.'}</p>
    <div class="gm-sentence">${item.sentence}</div>
    ${_smClockHTML(minutes)}
    <div class="sm-btn-col">${btnsHTML}</div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function smAnswer(key) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const item = GS.items[GS.idx];
  const ok = key === item.correct;
  if (ok) GS.correct++;

  document.querySelectorAll('.sm-btn').forEach(b => {
    b.disabled = true;
    if (b.dataset.key === item.correct) b.classList.add('sm-correct');
    else if (b.dataset.key === key && !ok) b.classList.add('sm-wrong');
  });

  const advance = ok ? 48 : 6;
  const from = GS.minutes;
  const to = from + advance;
  GS.minutes = to;

  const hourEl = document.getElementById('sm-hour');
  const minEl = document.getElementById('sm-min');
  const cup = document.getElementById('sm-cup');
  if (hourEl) hourEl.style.transform = `translateX(-50%) rotate(${(to/60)*30}deg)`;
  if (minEl) minEl.style.transform = `translateX(-50%) rotate(${(to%60)*6}deg)`;
  const label = document.getElementById('sm-time-label');
  if (label) {
    const totalH = Math.floor(to / 60);
    const endHour = (15 + totalH) % 24;
    const endMin = to % 60;
    label.textContent = String(endHour).padStart(2,'0') + ':' + String(endMin).padStart(2,'0');
  }
  if (ok && cup) { cup.classList.remove('sm-steam'); void cup.offsetWidth; cup.classList.add('sm-steam'); }

  const expr = SM_EXPR.find(e => e.key === item.correct);

  setTimeout(() => {
    document.getElementById('gm-fb').innerHTML = `
      <span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Correcto! La sobremesa se alarga.':'Correct! The sobremesa runs longer.'):'✗ '+(lang==='es'?'La expresión correcta es':'The correct expression is')+' <strong>'+expr.label+'</strong>'}</span>
      <div class="pf-note">${item.note[lang]}</div>
      <button class="gm-btn gm-btn-primary gm-next-btn" onclick="smNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
  }, 900);
}

function smNext() {
  GS.idx++;
  _renderSMRound();
}

/* ══════════════════════════════════════════════
   GAME 20 · LA PUERTA DEL HOTEL
   (EN EL HOTEL — fórmulas de cortesía y
   vocabulario del check-in) — complete the real
   dialogue line from the guide's official exercise;
   a correct answer swipes a keycard, turns the
   lock light green and swings the hotel room door
   open; a wrong answer flashes the light red and
   the door stays shut
══════════════════════════════════════════════ */

const HTL_ITEMS = [
  { blank:'¿En qué puedo ________?', correct:'AYUDARLE', opts:['AYUDARLE','AYUDARTE','AYUDO','AYUDAN'],
    note:{en:'Fixed reception greeting: "¿En qué puedo ayudarle?" — usted form.', es:'Saludo fijo de recepción: "¿En qué puedo ayudarle?" — forma de usted.'} },
  { blank:'Me ________ reservar una habitación.', correct:'GUSTARÍA', opts:['GUSTARÍA','GUSTA','GUSTAN','GUSTO'],
    note:{en:'ME GUSTARÍA + infinitive = polite way to state what you want.', es:'ME GUSTARÍA + infinitivo = forma cortés de pedir algo.'} },
  { blank:'¿A nombre de ________ hago la reserva?', correct:'QUIÉN', opts:['QUIÉN','QUÉ','CUÁNDO','CÓMO'],
    note:{en:'"A nombre de quién" asks whose name the booking goes under.', es:'"A nombre de quién" pregunta bajo qué nombre va la reserva.'} },
  { blank:'¿Podría ________ su pasaporte?', correct:'ENSEÑARME', opts:['ENSEÑARME','ENSEÑARLE','VERME','MOSTRARLE'],
    note:{en:'¿PODRÍA + infinitive? = polite request at check-in.', es:'¿PODRÍA + infinitivo? = petición cortés en el check-in.'} },
  { blank:'El aire acondicionado no ________.', correct:'FUNCIONA', opts:['FUNCIONA','FUNCIONO','TRABAJA','SIRVE'],
    note:{en:'NO FUNCIONA = it does not work — reporting a problem.', es:'NO FUNCIONA = para reportar una avería o un problema.'} },
  { blank:'¿Sería ________ cambiar de habitación?', correct:'POSIBLE', opts:['POSIBLE','CAPAZ','SEGURO','DISPONIBLE'],
    note:{en:'¿SERÍA POSIBLE...? = very polite way to ask for a change.', es:'¿SERÍA POSIBLE...? = fórmula muy cortés para pedir un cambio.'} },
  { blank:'¿Podrían ________ una almohada más?', correct:'TRAERME', opts:['TRAERME','LLEVARME','DARME','TRAER'],
    note:{en:'¿PODRÍAN TRAERME...? = polite request for room service.', es:'¿PODRÍAN TRAERME...? = petición cortés de servicio de habitación.'} },
  { blank:'¿Sería posible ________ mi estancia?', correct:'ALARGAR', opts:['ALARGAR','CAMBIAR','ANULAR','RESERVAR'],
    note:{en:'ALARGAR LA ESTANCIA = to extend your stay one more night.', es:'ALARGAR LA ESTANCIA = quedarse una noche más.'} },
  { blank:'¿Podría dejar mi ________ aquí?', correct:'MALETA', opts:['MALETA','PASAPORTE','TARJETA','LLAVE'],
    note:{en:'DEJAR LA MALETA = to leave your luggage after check-out.', es:'DEJAR LA MALETA = guardar el equipaje después del check-out.'} },
  { blank:'Que ________ de su estancia.', correct:'DISFRUTE', opts:['DISFRUTE','DISFRUTA','DISFRUTES','APROVECHE'],
    note:{en:'"Que disfrute" — usted-form farewell wish.', es:'"Que disfrute" — despedida formal en la forma de usted.'} }
];

function playHotel() {
  currentGameFn = playHotel;
  GS = { items: _shuffleOpts(_shuffle(HTL_ITEMS).map(it => ({ ...it, a: it.opts.indexOf(it.correct) }))), idx: 0, correct: 0, total: HTL_ITEMS.length, answered: false };
  _renderHTLRound();
}

function _renderHTLRound() {
  const lang = L();
  const title = lang==='es' ? 'La puerta del hotel' : 'The Hotel Room Door';
  const { items, idx, correct, total } = GS;
  if (idx >= total) { _end(correct, total, title); return; }
  const item = items[idx];
  GS.answered = false;

  const btnsHTML = item.opts.map((o, i) => `<button class="htl-btn" data-idx="${i}" onclick="htlAnswer(${i})">${o}</button>`).join('');

  _modal(`
    ${_progress(idx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'Completa la frase real del hotel. Si aciertas, la puerta se abre.':'Complete the real hotel line. Get it right and the door opens.'}</p>
    <div class="gm-sentence">${item.blank}</div>
    <div class="htl-scene">
      <div class="htl-door-frame">
        <div class="htl-door" id="htl-door">
          <div class="htl-door-handle"></div>
        </div>
        <div class="htl-light" id="htl-light"></div>
      </div>
      <div class="htl-keycard" id="htl-keycard">🔑</div>
    </div>
    <div class="htl-btn-row">${btnsHTML}</div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function htlAnswer(i) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const item = GS.items[GS.idx];
  const ok = i === item.a;
  if (ok) GS.correct++;

  document.querySelectorAll('.htl-btn').forEach((b, bi) => {
    b.disabled = true;
    if (bi === item.a) b.classList.add('htl-correct');
    else if (bi === i && !ok) b.classList.add('htl-wrong');
  });

  const card = document.getElementById('htl-keycard');
  const door = document.getElementById('htl-door');
  const light = document.getElementById('htl-light');
  if (card) card.classList.add('htl-swipe');

  setTimeout(() => {
    if (light) light.classList.add(ok ? 'htl-light-green' : 'htl-light-red');
    if (ok && door) door.classList.add('htl-open');
    if (!ok && door) door.classList.add('htl-shake');
  }, 450);

  setTimeout(() => {
    document.getElementById('gm-fb').innerHTML = `
      <span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Puerta abierta!':'Door open!'):'✗ '+(lang==='es'?'La palabra correcta es':'The correct word is')+' <strong>'+item.correct+'</strong>'}</span>
      <div class="pf-note">${item.note[lang]}</div>
      <button class="gm-btn gm-btn-primary gm-next-btn" onclick="htlNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
  }, 1050);
}

function htlNext() {
  GS.idx++;
  _renderHTLRound();
}

/* ══════════════════════════════════════════════
   GAME 21 · EL CALENDARIO DE LAS FECHAS
   (LAS FECHAS EN ESPAÑOL — SER/ESTAR + fecha, DE/EN/A,
   EL vs LOS con días de la semana) — complete the real
   sentence from the guide; a correct answer flips a
   desk-calendar page forward one month, wrong keeps
   the page stuck and shakes it
══════════════════════════════════════════════ */

const CAL_MONTHS = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];

const CAL_ITEMS = [
  { blank:'Hoy es ___ 5 de marzo.', correct:'—', opts:['EL','—','UN','LA'],
    note:{en:'No article before a date in Spanish — never "el 5 de marzo" after ser.', es:'En español no se usa artículo ante la fecha — nunca "el 5 de marzo" después de ser.'} },
  { blank:'Estamos ___ abril.', correct:'EN', opts:['EN','A','DE','POR'],
    note:{en:'EN + month to say what month it is.', es:'EN + mes para decir en qué mes estamos.'} },
  { blank:'___ lunes tengo clase todas las semanas.', correct:'LOS', opts:['LOS','EL','UN','—'],
    note:{en:'LOS + day (plural form) = habitual, repeated action.', es:'LOS + día = acción habitual, que se repite.'} },
  { blank:'Hoy ___ 24 de septiembre.', correct:'ES', opts:['ES','ESTÁ','SOY','ESTOY'],
    note:{en:'SER + date is the most common, neutral way to say the date.', es:'SER + fecha es la forma más frecuente y neutra de decir la fecha.'} },
  { blank:'A ___ de mayo empieza el buen tiempo.', correct:'PRINCIPIOS', opts:['PRINCIPIOS','LOS PRINCIPIOS','PRINCIPIO','INICIOS'],
    note:{en:'A PRINCIPIOS DE + month = at the beginning of the month.', es:'A PRINCIPIOS DE + mes = al inicio del mes.'} },
  { blank:'Hoy ___ 3 de febrero.', correct:'ES', opts:['ES','ESTOY','SOY','ESTAMOS'],
    note:{en:'SER + date, third person singular: "hoy es".', es:'SER + fecha, tercera persona singular: "hoy es".'} },
  { blank:'___ verano hace mucho calor.', correct:'EN', opts:['EN','DE','A','POR'],
    note:{en:'EN + season to say when something happens.', es:'EN + estación para situar algo en el tiempo.'} },
  { blank:'Hoy estamos ___ 15 de junio.', correct:'A', opts:['A','EN','DE','POR'],
    note:{en:'ESTAR + date always needs the preposition A.', es:'ESTAR + fecha necesita siempre la preposición A.'} },
  { blank:'Estamos ___ marzo.', correct:'EN', opts:['EN','A','DE','—'],
    note:{en:'EN + month, not A — that rule is only for ESTAR + full date.', es:'EN + mes, no A — esa regla es solo para ESTAR + fecha completa.'} },
  { blank:'A finales ___ agosto nos vamos de vacaciones.', correct:'DE', opts:['DE','EN','A','POR'],
    note:{en:'A FINALES DE + month = at the end of the month.', es:'A FINALES DE + mes = al final del mes.'} },
  { blank:'___ jueves voy al gimnasio.', correct:'LOS', opts:['LOS','EL','UN','ESE'],
    note:{en:'LOS + day = habitual action, every Thursday.', es:'LOS + día = acción habitual, todos los jueves.'} },
  { blank:'___ lunes tengo una cita médica.', correct:'EL', opts:['EL','LOS','UN','ESTE'],
    note:{en:'EL + day = one specific, concrete day.', es:'EL + día = un día concreto, no habitual.'} }
];

function playFechas() {
  currentGameFn = playFechas;
  GS = { items: _shuffleOpts(_shuffle(CAL_ITEMS).map(it => ({ ...it, a: it.opts.indexOf(it.correct) }))), idx: 0, correct: 0, total: CAL_ITEMS.length, answered: false, month: 0 };
  _renderCALRound();
}

function _calCardHTML(month) {
  return `
    <div class="cal-scene">
      <div class="cal-block">
        <div class="cal-block-top">2026</div>
        <div class="cal-page" id="cal-page">
          <span class="cal-page-month" id="cal-page-month">${CAL_MONTHS[month]}</span>
        </div>
      </div>
    </div>`;
}

function _renderCALRound() {
  const lang = L();
  const title = lang==='es' ? 'El calendario de las fechas' : 'The Dates Calendar';
  const { items, idx, correct, total, month } = GS;
  if (idx >= total) { _end(correct, total, title); return; }
  const item = items[idx];
  GS.answered = false;

  const btnsHTML = item.opts.map((o, i) => `<button class="cal-btn" data-idx="${i}" onclick="calAnswer(${i})">${o}</button>`).join('');

  _modal(`
    ${_progress(idx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'Completa la frase real sobre las fechas. Si aciertas, el calendario pasa de mes.':'Complete the real sentence about dates. Get it right and the calendar flips to the next month.'}</p>
    <div class="gm-sentence">${item.blank}</div>
    ${_calCardHTML(month)}
    <div class="cal-btn-row">${btnsHTML}</div>
    <div class="gm-feedback" id="gm-fb"></div>
  `, title);
}

function calAnswer(i) {
  if (GS.answered) return;
  GS.answered = true;
  const lang = L();
  const item = GS.items[GS.idx];
  const ok = i === item.a;
  if (ok) GS.correct++;

  document.querySelectorAll('.cal-btn').forEach((b, bi) => {
    b.disabled = true;
    if (bi === item.a) b.classList.add('cal-correct');
    else if (bi === i && !ok) b.classList.add('cal-wrong');
  });

  const page = document.getElementById('cal-page');
  if (ok) {
    GS.month = (GS.month + 1) % 12;
    if (page) {
      page.classList.add('cal-flip');
      setTimeout(() => {
        const label = document.getElementById('cal-page-month');
        if (label) label.textContent = CAL_MONTHS[GS.month];
        page.classList.remove('cal-flip');
      }, 320);
    }
  } else if (page) {
    page.classList.add('cal-shake');
    setTimeout(() => page.classList.remove('cal-shake'), 400);
  }

  setTimeout(() => {
    document.getElementById('gm-fb').innerHTML = `
      <span class="${ok?'fb-ok':'fb-ko'}">${ok?'✓ '+(lang==='es'?'¡Página pasada!':'Page turned!'):'✗ '+(lang==='es'?'La respuesta correcta es':'The correct answer is')+' <strong>'+item.correct+'</strong>'}</span>
      <div class="pf-note">${item.note[lang]}</div>
      <button class="gm-btn gm-btn-primary gm-next-btn" onclick="calNext()">${lang==='es'?'Siguiente →':'Next →'}</button>`;
  }, 500);
}

function calNext() {
  GS.idx++;
  _renderCALRound();
}

/* ── EXPOSE GLOBALS ───────────────────────────── */
Object.assign(window, {
  closeGame, restartGame, toggleGameFullscreen, flipFC, fcAnswer,
  answerSE, seNext, startSELevel,
  answerQuiz, quizNext,
  answerFill, fillNext,
  woSelect, woRemove, woClear, woCheck, woNext,
  vsCheck, vsNext,
  answerPres, presNext, startPresLevel,
  ruletaReveal, ruletaNext,
  rtBuildSelect, rtBuildRemove, rtBuildClear, rtBuildCheck, rtNextCategory,
  dgSelect, dgNextScene,
  gustarAnswer, gustarNext,
  generoAnswer, generoNext,
  cdAnswer, cdNext,
  desdeAnswer, desdeNext,
  ppAnswer, ppNext,
  profAnswer, profNext,
  vmAnswer, vmNext,
  wkAnswer, wkNext,
  rrAnswer, rrNext,
  cnAnswer, cnNext,
  tkAnswer, tkNext,
  smAnswer, smNext,
  htlAnswer, htlNext,
  calAnswer, calNext,
  playFlashcards, playSerEstar, playQuiz, playFillGaps, playWordOrder, playVerbSprint, playPresentarse,
  playRuleta, playDialogos, playGustar, playGenero, playCD, playDesde, playPorPara, playProfesiones, playVerMirar, playTrabajo, playSonidoR, playGeneroII, playConectores,
  playSobremesa, playHotel, playFechas
});
