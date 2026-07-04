(function () {
  var style = document.createElement('style');
  style.textContent = [
    '#searchResults{display:none;position:absolute;top:calc(100% + 8px);right:0;width:320px;max-height:480px;overflow-y:auto;background:#fff;border:1px solid rgba(0,0,0,0.12);border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,0.14);z-index:9999}',
    '.sr-group-hd{font-size:10px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;padding:10px 14px 4px}',
    '.sr-group+.sr-group{border-top:1px solid rgba(0,0,0,0.07)}',
    '.sr-item{display:flex;align-items:center;gap:10px;padding:9px 14px;text-decoration:none;color:#121117;transition:background .1s}',
    '.sr-item:hover{background:#faf8f3}',
    '.sr-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}',
    '.sr-name{font-size:13px;font-weight:500;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.sr-lvl{font-size:11px;color:rgba(18,17,23,.45);white-space:nowrap}',
    '.sr-empty{padding:14px;font-size:13px;color:rgba(18,17,23,.5);text-align:center}',
  ].join('');
  document.head.appendChild(style);

  var INDEX = [
    // ── VÍDEOS ──────────────────────────────────────────────────────────
    { es:'Ser vs Estar — La lección más importante', en:'Ser vs Estar — The Most Important Lesson', type:'video', level:'A1', url:'videos.html#video-ser-estar', kw:'ser estar verbos gramática principiante copulativos ser-estar difference diferencia' },
    { es:'Saludos y Presentaciones en Español', en:'Spanish Greetings & Introductions', type:'video', level:'A1', url:'videos.html#video-saludos', kw:'saludos presentaciones hola buenos días gramática greetings introducirse' },
    { es:'Números, Días y Meses en Español', en:'Numbers, Days & Months in Spanish', type:'video', level:'A1', url:'videos.html#video-numeros', kw:'números días meses vocabulario numbers days months contar' },
    { es:'Tus Primeras 100 Palabras en Español', en:'Your First 100 Spanish Words', type:'video', level:'A1', url:'videos.html#video-palabras', kw:'palabras vocabulario principiante words vocabulary beginner básico' },
    { es:'Pedir Indicaciones en Español', en:'Asking for Directions in Spanish', type:'video', level:'A2', url:'videos.html#video-indicaciones', kw:'indicaciones direcciones conversación frases directions phrases dónde calle' },
    { es:'Imperfecto vs Pretérito', en:'The Imperfect vs Preterite', type:'video', level:'B1', url:'videos.html#video-imperfecto', kw:'imperfecto pretérito pasado tiempos verbales gramática imperfect preterite past indefinido' },
    { es:'Hablar del Pasado en Español', en:'Talking About the Past in Spanish', type:'video', level:'B1', url:'videos.html#video-pasado', kw:'pasado conversación tiempo verbal past conversation ayer antes' },
    { es:'Comprensión Lectora DELE B1', en:'DELE B1 Reading Comprehension', type:'video', level:'B1', url:'videos.html#video-dele-b1', kw:'dele b1 comprensión lectura examen reading exam leer texto' },
    { es:'El Subjuntivo Explicado', en:'The Subjunctive Mood Explained', type:'video', level:'B2', url:'videos.html#video-subjuntivo', kw:'subjuntivo modo subjuntivo gramática subjunctive grammar quiero que ojalá' },
    { es:'Pedir Comida en un Restaurante Español', en:'Ordering Food in a Spanish Restaurant', type:'video', level:'B2', url:'videos.html#video-comida', kw:'comida restaurante conversación pedir food restaurant order menú comer' },
    { es:'Modismos y Expresiones Avanzadas', en:'Advanced Spanish Idioms & Expressions', type:'video', level:'C1', url:'videos.html#video-modismos', kw:'modismos expresiones avanzado nativo idioms expressions advanced native coloquial' },
    { es:'Examen Oral DELE C1 — 10 Consejos', en:'DELE C1 Oral Exam — 10 Tips', type:'video', level:'C1', url:'videos.html#video-dele-c1', kw:'dele c1 oral examen consejos exam tips oral hablar' },

    // ── PDFs GRATUITOS — GRAMÁTICA ────────────────────────────────────
    { es:'Guía Completa de Ser y Estar', en:'Complete Guide to Ser & Estar', type:'pdf', level:'A1-B1', url:'free-pdf.html#card-ser-estar', kw:'ser estar verbos gramática guía copulativos diferencia attributes states' },
    { es:'El Género en Español', en:'Gender in Spanish', type:'pdf', level:'A1-B1', url:'free-pdf.html#card-genero', kw:'género masculino femenino artículos gramática gender grammar articles el la un una' },
    { es:'El Género en Español: Casos Especiales', en:'Gender in Spanish: Special Cases', type:'pdf', level:'A2-B1', url:'free-pdf.html#card-genero-ii', kw:'género casos especiales masculino femenino irregular excepciones special cases gender' },
    { es:'El verbo GUSTAR y verbos similares', en:'GUSTAR & Similar Verbs', type:'pdf', level:'A2-B1', url:'free-pdf.html#card-gustar', kw:'gustar encantar molestar verbos pronombres similares like love verbs indirecto me gusta' },
    { es:'Por, Para y Durante: Preposiciones de Tiempo', en:'Por, Para & Durante: Time Prepositions', type:'pdf', level:'B1-B2', url:'free-pdf.html#card-por-para', kw:'por para durante preposiciones tiempo gramática time prepositions diferencia for during' },
    { es:'Desde, Desde Hace y Durante', en:'Desde, Desde Hace & Durante', type:'pdf', level:'A2-B2', url:'free-pdf.html#card-desde', kw:'desde desde hace durante tiempo expresiones gramática since for ago duration cuánto tiempo llevas' },
    { es:'El CD y la Preposición A', en:'The Direct Object & Preposition A', type:'pdf', level:'A2-B1', url:'free-pdf.html#card-cd-prep-a', kw:'complemento directo preposición a CD gramática personal a direct object acusativo' },
    { es:'La carta formal: cómo escribirla', en:'The Formal Letter: How to Write It', type:'pdf', level:'C1', url:'free-pdf.html#card-carta-formal', kw:'carta formal dele c1 escritura prueba writing formal letter estructura redactar' },
    { es:'Presentarte en Español', en:'Introducing Yourself in Spanish', type:'pdf', level:'A1-A2', url:'free-pdf.html#card-presentarte', kw:'presentarse llamarse ser tener vivir presentaciones introduce yourself me llamo tengo años' },

    // ── PDFs GRATUITOS — VOCABULARIO ─────────────────────────────────
    { es:'Las profesiones: Masculino y Femenino', en:'Professions: Masculine & Feminine', type:'pdf', level:'B1-B2', url:'free-pdf.html#card-profesiones', kw:'profesiones trabajo masculino femenino vocabulario jobs professions gender masculine feminine médico abogado' },
    { es:'Hablemos del Mundo Laboral', en:"Let's Talk About Work", type:'pdf', level:'B1-B2', url:'free-pdf.html#card-mundo-laboral', kw:'trabajo laboral mundo profesional vocabulario expresiones work jobs professional employment entrevista empresa' },
    { es:'Ver, Mirar y Observar', en:'Ver, Mirar & Observar', type:'pdf', level:'B1', url:'free-pdf.html#card-ver-mirar', kw:'ver mirar observar vocabulario verbos diferencia see look watch observe sinónimos' },

    // ── PDFs GRATUITOS — PRONUNCIACIÓN ───────────────────────────────
    { es:'El Sonido R en Español', en:'The R Sound in Spanish', type:'pdf', level:'A1-A2', url:'free-pdf.html#card-sonido-r', kw:'r sonido pronunciación rr sound pronunciation consonante vibrante cómo pronunciar' },

    // ── EXÁMENES DELE ─────────────────────────────────────────────────
    { es:'Examen de Práctica DELE A1', en:'DELE A1 Practice Exam', type:'dele', level:'A1', url:'free-pdf.html#dele', kw:'dele a1 examen práctica descarga pdf practice exam principiante' },
    { es:'Examen de Práctica DELE A2', en:'DELE A2 Practice Exam', type:'dele', level:'A2', url:'free-pdf.html#dele', kw:'dele a2 examen práctica descarga pdf practice exam elemental' },
    { es:'Examen de Práctica DELE B1', en:'DELE B1 Practice Exam', type:'dele', level:'B1', url:'dele.html#b1', kw:'dele b1 examen práctica descarga pdf practice exam intermedio' },
    { es:'Examen de Práctica DELE B2', en:'DELE B2 Practice Exam', type:'dele', level:'B2', url:'dele.html#b2', kw:'dele b2 examen práctica descarga pdf practice exam avanzado' },
    { es:'Examen de Práctica DELE C1', en:'DELE C1 Practice Exam', type:'dele', level:'C1', url:'dele.html#c1', kw:'dele c1 examen práctica descarga pdf practice exam superior' },
    { es:'Examen de Práctica DELE C2', en:'DELE C2 Practice Exam', type:'dele', level:'C2', url:'dele.html#c2', kw:'dele c2 examen práctica descarga pdf practice exam maestría' },

    // ── CULTURA ───────────────────────────────────────────────────────
    { es:'Cultura Española', en:'Spanish Culture', type:'cultura', level:'', url:'culture.html', kw:'cultura españa literatura cine arte culture spain cinema art literature historia fiestas' },
    { es:'Patria — Guía de Lectura', en:'Patria — Reading Guide', type:'cultura', level:'B2-C2', url:'patria-reading-guide.html', kw:'patria novela lectura literatura aramburu reading guide novel basque vasco eta guía' },

    // ── JUEGOS ────────────────────────────────────────────────────────
    { es:'Juego: Ser o Estar', en:'Game: Ser or Estar', type:'juego', level:'A1-B1', url:'juego-ser-estar.html', kw:'juego ser estar game practice interactivo interactive practicar ejercicio' },
  ];

  var TYPE_META = {
    video:   { label:'Vídeos',         labelEn:'Videos',    color:'#121117' },
    pdf:     { label:'PDFs gratuitos', labelEn:'Free PDFs', color:'#D4920A' },
    dele:    { label:'DELE',           labelEn:'DELE',      color:'#C8102E' },
    cultura: { label:'Cultura',        labelEn:'Culture',   color:'#3DDABE' },
    juego:   { label:'Juegos',         labelEn:'Games',     color:'#7C5CBF' },
  };

  function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function wordMatch(haystack, qw) {
    var re = new RegExp('(?:^|[^a-z])' + qw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return re.test(haystack);
  }

  function doSearch(query) {
    if (!query || query.length < 2) return [];
    var qWords = normalize(query).split(/\s+/).filter(function(w){ return w.length > 1; });
    var scored = [];
    INDEX.forEach(function (item) {
      var haystack = normalize(item.es + ' ' + item.en + ' ' + item.kw + ' ' + item.level);
      var allMatch = qWords.every(function(qw) {
        return wordMatch(haystack, qw);
      });
      if (!allMatch) return;
      var score = 0;
      var titleNorm = normalize(item.es + ' ' + item.en);
      qWords.forEach(function(qw) {
        if (titleNorm.indexOf(qw) !== -1) score += 10;
        else score += 4;
      });
      scored.push({ item: item, score: score });
    });
    scored.sort(function(a, b){ return b.score - a.score; });
    return scored.slice(0, 10).map(function(s){ return s.item; });
  }

  function isEs() {
    return !!document.querySelector('.lang-btn.active[data-lang="es"]');
  }

  function renderResults(results, query) {
    var container = document.getElementById('searchResults');
    if (!container) return;
    if (!results.length) {
      container.innerHTML = '<div class="sr-empty">Sin resultados para "<b>' + query + '</b>"</div>';
      container.style.display = 'block';
      return;
    }
    var es = isEs();
    var groups = {}, order = [];
    results.forEach(function (r) {
      if (!groups[r.type]) { groups[r.type] = []; order.push(r.type); }
      groups[r.type].push(r);
    });
    var html = order.map(function (type) {
      var m = TYPE_META[type] || TYPE_META.video;
      var groupLabel = es ? m.label : m.labelEn;
      var items = groups[type].map(function (r) {
        var title = es ? r.es : r.en;
        return '<a class="sr-item" href="' + r.url + '">'
          + '<span class="sr-dot" style="background:' + m.color + '"></span>'
          + '<span class="sr-name">' + title + '</span>'
          + (r.level ? '<span class="sr-lvl">' + r.level + '</span>' : '')
          + '</a>';
      }).join('');
      return '<div class="sr-group">'
        + '<div class="sr-group-hd" style="color:' + m.color + '">' + groupLabel + '</div>'
        + items + '</div>';
    }).join('');
    container.innerHTML = html;
    container.style.display = 'block';
  }

  function init() {
    var input = document.getElementById('searchInput');
    var results = document.getElementById('searchResults');
    if (!input || !results) return;

    input.addEventListener('input', function () {
      var q = this.value.trim();
      if (q.length < 2) { results.style.display = 'none'; return; }
      renderResults(doSearch(q), q);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { results.style.display = 'none'; input.blur(); }
      if (e.key === 'Enter') {
        var first = results.querySelector('.sr-item');
        if (first) { window.location.href = first.getAttribute('href'); }
      }
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('#headerSearch')) results.style.display = 'none';
    });
  }

  function revealHash() {
    var hash = window.location.hash.slice(1);
    if (!hash) return;
    var target = document.getElementById(hash);
    if (!target) return;
    var el = target.parentElement;
    while (el && el !== document.body) {
      if (el.style.display === 'none') el.style.display = 'block';
      el = el.parentElement;
    }
    if (target.style.display === 'none') target.style.display = 'block';
    setTimeout(function () {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); revealHash(); });
  } else {
    init();
    revealHash();
  }
  window.addEventListener('hashchange', revealHash);
})();
