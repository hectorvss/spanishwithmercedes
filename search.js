(function () {
  var style = document.createElement('style');
  style.textContent = [
    '#searchResults{display:none;position:absolute;top:calc(100% + 8px);right:0;width:300px;background:#fff;border:1px solid rgba(0,0,0,0.12);border-radius:10px;box-shadow:0 6px 20px rgba(0,0,0,0.13);z-index:9999;overflow:hidden}',
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
    { es: 'Ser vs Estar — La lección más importante para principiantes', en: 'Ser vs Estar — The Most Important Lesson for Beginners', type: 'video', level: 'A1', url: 'videos.html#a1', kw: 'ser estar verbos gramática principiante ser-estar' },
    { es: 'Saludos y Presentaciones en Español', en: 'Spanish Greetings & Introductions', type: 'video', level: 'A1', url: 'videos.html#a1', kw: 'saludos presentaciones hola buenos días gramática greetings' },
    { es: 'Números, Días y Meses en Español', en: 'Numbers, Days & Months in Spanish', type: 'video', level: 'A1', url: 'videos.html#a1', kw: 'números días meses vocabulario numbers days months' },
    { es: 'Tus Primeras 100 Palabras en Español', en: 'Your First 100 Spanish Words', type: 'video', level: 'A1', url: 'videos.html#a1', kw: 'palabras vocabulario principiante words vocabulary beginner' },
    { es: 'Pedir Indicaciones en Español', en: 'Asking for Directions in Spanish', type: 'video', level: 'A2', url: 'videos.html#a2', kw: 'indicaciones direcciones conversación frases directions phrases' },
    { es: 'Imperfecto vs Pretérito', en: 'The Imperfect vs Preterite', type: 'video', level: 'B1', url: 'videos.html#b1', kw: 'imperfecto pretérito pasado tiempos verbales gramática imperfect preterite past tense' },
    { es: 'Hablar del Pasado en Español', en: 'Talking About the Past in Spanish', type: 'video', level: 'B1', url: 'videos.html#b1', kw: 'pasado conversación tiempo verbal past conversation' },
    { es: 'Comprensión Lectora DELE B1', en: 'DELE B1 Reading Comprehension', type: 'video', level: 'B1', url: 'videos.html#b1', kw: 'dele b1 comprensión lectura examen reading exam' },
    { es: 'El Subjuntivo Explicado de Una Vez Para Siempre', en: 'The Subjunctive Mood Explained', type: 'video', level: 'B2', url: 'videos.html#b2', kw: 'subjuntivo modo subjuntivo gramática subjunctive grammar' },
    { es: 'Pedir Comida en un Restaurante Español', en: 'Ordering Food in a Spanish Restaurant', type: 'video', level: 'B2', url: 'videos.html#b2', kw: 'comida restaurante conversación pedir food restaurant order' },
    { es: 'Modismos y Expresiones Avanzadas', en: 'Advanced Spanish Idioms & Expressions', type: 'video', level: 'C1', url: 'videos.html#c1', kw: 'modismos expresiones avanzado nativo idioms expressions advanced native' },
    { es: 'Examen Oral DELE C1 — 10 Consejos', en: 'DELE C1 Oral Exam — 10 Tips', type: 'video', level: 'C1', url: 'videos.html#c1', kw: 'dele c1 oral examen consejos exam tips oral' },

    // ── PDFs GRATUITOS ────────────────────────────────────────────────────
    { es: 'El Sonido R en Español', en: 'The R Sound in Spanish', type: 'pdf', level: 'A1-A2', url: 'free-pdf.html#pronunciation', kw: 'r sonido pronunciación rr sound pronunciation consonante' },
    { es: 'Presentarte en Español', en: 'Introducing Yourself in Spanish', type: 'pdf', level: 'A1-A2', url: 'free-pdf.html#grammar', kw: 'presentarse llamarse ser tener vivir presentaciones introduce yourself' },
    { es: 'El Género en Español', en: 'Gender in Spanish', type: 'pdf', level: 'A1-B1', url: 'free-pdf.html#grammar', kw: 'género masculino femenino artículos gramática gender grammar articles' },
    { es: 'Guía Completa de Ser y Estar', en: 'Complete Guide to Ser & Estar', type: 'pdf', level: 'A1-B1', url: 'free-pdf.html#grammar', kw: 'ser estar verbos gramática guía guide verbs grammar' },
    { es: 'El verbo GUSTAR y verbos similares', en: 'GUSTAR & Similar Verbs', type: 'pdf', level: 'A2-B1', url: 'free-pdf.html#grammar', kw: 'gustar encantar molestar verbos pronombres verbos similares like love verbs' },
    { es: 'Ver, Mirar y Observar', en: 'Ver, Mirar & Observar', type: 'pdf', level: 'B1-B2', url: 'free-pdf.html#vocabulary', kw: 'ver mirar observar vocabulario verbos vocabulario see look watch' },

    // ── DELE ──────────────────────────────────────────────────────────────
    { es: 'Examen de Práctica DELE B1', en: 'DELE B1 Practice Exam', type: 'dele', level: 'B1', url: 'dele.html#examenes-practica', kw: 'dele b1 examen práctica descarga pdf practice exam' },
    { es: 'Examen de Práctica DELE B2', en: 'DELE B2 Practice Exam', type: 'dele', level: 'B2', url: 'dele.html#examenes-practica', kw: 'dele b2 examen práctica descarga pdf practice exam' },
    { es: 'Examen de Práctica DELE C1', en: 'DELE C1 Practice Exam', type: 'dele', level: 'C1', url: 'dele.html#examenes-practica', kw: 'dele c1 examen práctica descarga pdf practice exam' },
    { es: 'Examen de Práctica DELE C2', en: 'DELE C2 Practice Exam', type: 'dele', level: 'C2', url: 'dele.html#examenes-practica', kw: 'dele c2 examen práctica descarga pdf practice exam' },
    { es: 'Carta Formal — Materiales DELE C1', en: 'Formal Letter — DELE C1 Materials', type: 'dele', level: 'C1', url: 'dele.html#materiales-dele', kw: 'carta formal dele c1 escritura prueba writing formal letter' },
    { es: 'Los 8 Mejores Consejos para el DELE', en: '8 Best Tips to Pass the DELE', type: 'dele', level: 'B1-C2', url: 'dele.html', kw: 'dele consejos preparar preparación examen tips prepare advice' },

    // ── CULTURA ───────────────────────────────────────────────────────────
    { es: 'Cultura Española', en: 'Spanish Culture', type: 'cultura', level: '', url: 'culture.html', kw: 'cultura españa literatura cine arte culture spain cinema art literature' },
    { es: 'Patria — Guía de Lectura', en: 'Patria — Reading Guide', type: 'cultura', level: 'B2-C2', url: 'patria-reading-guide.html', kw: 'patria novela lectura literatura reading guide novel basque' },

    // ── JUEGOS ────────────────────────────────────────────────────────────
    { es: 'Juego: Ser o Estar', en: 'Game: Ser or Estar', type: 'juego', level: 'A1-B1', url: 'juego-ser-estar.html', kw: 'juego ser estar game practice interactivo interactive' },
  ];

  var TYPE_META = {
    video:   { label: 'Vídeos',          labelEn: 'Videos',     color: '#121117' },
    pdf:     { label: 'PDFs gratuitos',  labelEn: 'Free PDFs',  color: '#D4920A' },
    dele:    { label: 'DELE',            labelEn: 'DELE',       color: '#C8102E' },
    cultura: { label: 'Cultura',         labelEn: 'Culture',    color: '#3DDABE' },
    juego:   { label: 'Juegos',          labelEn: 'Games',      color: '#7C5CBF' },
  };

  function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function wordMatch(str, q) {
    return str.split(/[\s,\-&]+/).some(function(w) { return w === q || w.indexOf(q) === 0; });
  }

  function doSearch(query) {
    if (!query || query.length < 2) return [];
    var q = normalize(query);
    var scored = [];
    INDEX.forEach(function (item) {
      var titleNorm = normalize(item.es + ' ' + item.en);
      var kwNorm = normalize(item.kw);
      var score = 0;
      if (wordMatch(titleNorm, q)) score += 10;
      if (kwNorm.split(' ').some(function(k){ return k === q; })) score += 8;
      if (kwNorm.split(' ').some(function(k){ return k.indexOf(q) === 0 && k !== q; })) score += 3;
      if (score > 0) scored.push({ item: item, score: score });
    });
    scored.sort(function(a, b){ return b.score - a.score; });
    return scored.slice(0, 8).map(function(s){ return s.item; });
  }

  function isEs() {
    var btn = document.querySelector('.lang-btn.active[data-lang="es"]');
    return !!btn;
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
    var groups = {};
    var order = [];
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
        + items
        + '</div>';
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
        var first = results.querySelector('.search-result');
        if (first) { window.location.href = first.getAttribute('href'); }
      }
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('#headerSearch')) {
        results.style.display = 'none';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
