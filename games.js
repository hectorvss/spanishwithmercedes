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
// Shuffle answer options, keeping the correct answer tracked by value
function _shuffleOpts(qs) {
  return qs.map(q => {
    const correct = q.opts[q.a];
    const shuffled = [...q.opts].sort(() => Math.random() - 0.5);
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
  GS = { cards: [...FLASHCARDS].sort(() => Math.random() - 0.5), idx: 0, correct: 0, flipped: false };
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
  GS = { qs:_shuffleOpts([...FILL_GAPS].sort(()=>Math.random()-0.5)), idx:0, correct:0, answered:false };
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
  GS = { qs:[...WORD_ORDER].sort(()=>Math.random()-0.5), idx:0, correct:0, selected:[], available:[] };
  _renderWO(lang, title);
}

function _renderWO(lang, title) {
  const { qs, idx, correct } = GS;
  if (idx >= qs.length) { _end(correct, qs.length, title); return; }
  const q = qs[idx];
  GS.selected = [];
  GS.available = [...q.w].sort(()=>Math.random()-0.5);
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
  GS = { verbs:[...VERB_SPRINT].sort(()=>Math.random()-0.5), idx:0, correct:0, timeLeft:60, running:true };
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
    label: { en: 'A1 · First Words', es: 'A1 · Primeras Palabras' },
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
    label: { en: 'A2 · Complete Sentences', es: 'A2 · Frases Completas' },
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
    label: { en: 'B1 · Advanced', es: 'B1 · Avanzado' },
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
      <span class="se-lvl-badge" style="background:${l.color}20;color:${l.color};border:1.5px solid ${l.color}40">${lv.label[lang].split('·')[0].trim()}</span>
      <span class="se-lvl-name">${lv.label[lang].split('·').slice(1).join('·').trim()}</span>
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

/* ── EXPOSE GLOBALS ───────────────────────────── */
Object.assign(window, {
  closeGame, restartGame, flipFC, fcAnswer,
  answerSE, seNext, startSELevel,
  answerQuiz, quizNext,
  answerFill, fillNext,
  woSelect, woRemove, woClear, woCheck, woNext,
  vsCheck, vsNext,
  answerPres, presNext, startPresLevel,
  playFlashcards, playSerEstar, playQuiz, playFillGaps, playWordOrder, playVerbSprint, playPresentarse
});
