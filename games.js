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
  m.classList.remove('gm--open');
  setTimeout(() => { m.style.display = 'none'; }, 220);
  document.body.style.overflow = '';
  if (timerInt) { clearInterval(timerInt); timerInt = null; }
  GS = {};
}

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
  const title = lang === 'es' ? '¿Ser o Estar?' : 'Ser or Estar?';
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
  const title = lang === 'es' ? '¿Ser o Estar?' : 'Ser or Estar?';
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
  _renderSE(lang, lang==='es'?'¿Ser o Estar?':'Ser or Estar?');
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
  const title = lang === 'es' ? 'Preséntate en Español' : 'Introduce Yourself';
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
  const title = lang === 'es' ? 'Preséntate en Español' : 'Introduce Yourself';
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
  _renderPres(lang, lang==='es'?'Preséntate en Español':'Introduce Yourself');
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
  const title = lang==='es' ? 'Atrapa la Concordancia' : 'Catch the Agreement';
  GS = { items: _shuffle(GUSTAR_ITEMS).slice(0, 12), idx: 0, correct: 0, total: 12, answered: false };
  _renderGustarRound();
}

function _renderGustarRound() {
  const lang = L();
  const title = lang==='es' ? 'Atrapa la Concordancia' : 'Catch the Agreement';
  const { items, idx, correct, total } = GS;
  if (idx >= total) { _end(correct, total, title); return; }
  const item = items[idx];
  GS.answered = false;
  const duration = 4.5;
  _modal(`
    ${_progress(idx, total, correct, lang)}
    <p class="gm-instr" style="text-align:center">${lang==='es'?'¿GUSTA o GUSTAN? ¡Atrápalo antes de que suba del todo!':'GUSTA or GUSTAN? Catch it before it floats away!'}</p>
    <div class="gu-scene">
      <div class="gu-timerbar"><div class="gu-timerbar-fill" id="gu-timerfill" style="width:100%"></div></div>
      <div class="gu-sky">
        <span class="gu-deco gu-deco1">💭</span>
        <span class="gu-deco gu-deco2">💭</span>
        <span class="gu-deco gu-deco3">💭</span>
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
  const title = lang==='es' ? 'El Carrete de la Concordancia' : 'The Agreement Reel';
  GS = { items: _shuffle(GENERO_ITEMS), idx: 0, correct: 0, total: GENERO_ITEMS.length, answered: false, spun: false };
  _renderGeneroRound();
}

function _renderGeneroRound() {
  const lang = L();
  const title = lang==='es' ? 'El Carrete de la Concordancia' : 'The Agreement Reel';
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
  const title = lang==='es' ? 'La Cinta del CD' : 'The Direct Object Conveyor';
  GS = { items: _shuffle(CD_ITEMS).slice(0, 12), idx: 0, correct: 0, total: 12, answered: false };
  _renderCDRound();
}

function _renderCDRound() {
  const lang = L();
  const title = lang==='es' ? 'La Cinta del CD' : 'The Direct Object Conveyor';
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
  const title = lang==='es' ? 'La Línea del Tiempo' : 'The Timeline';
  GS = { items: _shuffle(DESDE_ITEMS), idx: 0, correct: 0, total: DESDE_ITEMS.length, answered: false };
  _renderDesdeRound();
}

function _renderDesdeRound() {
  const lang = L();
  const title = lang==='es' ? 'La Línea del Tiempo' : 'The Timeline';
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
   right target: causa (POR), finalidad (PARA) or
   duración (DURANTE), the three-way distinction
   English "for" collapses into one word
══════════════════════════════════════════════ */

const PP_ITEMS = [
  { es:'Viví en Londres ___ cinco años.',   correct:'DURANTE', full:'Viví en Londres durante cinco años.' },
  { es:'Estudié ___ tres horas seguidas.',  correct:'DURANTE', full:'Estudié durante tres horas seguidas.' },
  { es:'Llovió ___ toda la noche.',         correct:'DURANTE', full:'Llovió durante toda la noche.' },
  { es:'Estuve enfermo ___ una semana.',    correct:'DURANTE', full:'Estuve enfermo durante una semana.' },
  { es:'Este regalo es ___ ti.',            correct:'PARA',    full:'Este regalo es para ti.' },
  { es:'Necesito el informe ___ el viernes.', correct:'PARA',  full:'Necesito el informe para el viernes.' },
  { es:'Estudio español ___ trabajar.',     correct:'PARA',    full:'Estudio español para trabajar.' },
  { es:'Lo necesito ___ mañana.',           correct:'PARA',    full:'Lo necesito para mañana.' },
  { es:'Lo hice ___ ti, no por dinero.',    correct:'POR',     full:'Lo hice por ti, no por dinero.' },
  { es:'Te llamo ___ teléfono.',            correct:'POR',     full:'Te llamo por teléfono.' },
  { es:'Voy al gimnasio tres veces ___ semana.', correct:'POR', full:'Voy al gimnasio tres veces por semana.' },
  { es:'Pasé ___ Zaragoza de camino a casa.', correct:'POR',   full:'Pasé por Zaragoza de camino a casa.' }
];

const PP_TARGETS = [
  { key:'POR',     icon:'❓', label:{en:'cause',   es:'causa'} },
  { key:'PARA',    icon:'🎁', label:{en:'purpose', es:'finalidad'} },
  { key:'DURANTE', icon:'⏳', label:{en:'duration', es:'duración'} }
];

function playPorPara() {
  currentGameFn = playPorPara;
  const lang = L();
  const title = lang==='es' ? 'La Diana de las Preposiciones' : 'The Preposition Dartboard';
  GS = { items: _shuffle(PP_ITEMS), idx: 0, correct: 0, total: PP_ITEMS.length, answered: false };
  _renderPPRound();
}

function _renderPPRound() {
  const lang = L();
  const title = lang==='es' ? 'La Diana de las Preposiciones' : 'The Preposition Dartboard';
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
    <p class="gm-instr" style="text-align:center">${lang==='es'?'¿Causa, finalidad o duración? ¡Lanza tu respuesta a la diana correcta!':'Cause, purpose or duration? Throw your answer at the right target!'}</p>
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
  const title = lang==='es' ? 'El Ascensor de las Profesiones' : 'The Profession Elevator';
  GS = { items: _shuffle(PROF_ITEMS), idx: 0, correct: 0, total: PROF_ITEMS.length, answered: false };
  _renderProfRound();
}

function _renderProfRound() {
  const lang = L();
  const title = lang==='es' ? 'El Ascensor de las Profesiones' : 'The Profession Elevator';
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

/* ── EXPOSE GLOBALS ───────────────────────────── */
Object.assign(window, {
  closeGame, restartGame, flipFC, fcAnswer,
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
  playFlashcards, playSerEstar, playQuiz, playFillGaps, playWordOrder, playVerbSprint, playPresentarse,
  playRuleta, playDialogos, playGustar, playGenero, playCD, playDesde, playPorPara, playProfesiones
});
