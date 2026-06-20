const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, BorderStyle, WidthType, ShadingType,
        VerticalAlign, PageNumber, Header, Footer, PageBreak } = require('docx');
const fs = require('fs');

// Colors
const NAVY = "1C2A4A";
const GOLD = "D4920A";
const RED = "C8102E";
const LIGHT_NAVY = "2A3F6A";
const VERY_LIGHT = "F0F4F8";
const GOLD_LIGHT = "FDF5E0";
const RED_LIGHT = "FFF0F0";
const WHITE = "FFFFFF";
const DARK_GRAY = "333333";
const MID_GRAY = "666666";
const TEAL_DARK = "0D7A6A";
const TEAL = "2BBFA8";

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const CONTENT_W = 9204;

function spacer(size = 120) {
  return new Paragraph({ children: [new TextRun("")], spacing: { before: size, after: size } });
}
function sectionBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}
function coverBand() {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({ children: [new TableCell({
      borders: noBorders,
      width: { size: CONTENT_W, type: WidthType.DXA },
      shading: { fill: TEAL_DARK, type: ShadingType.CLEAR },
      margins: { top: 400, bottom: 400, left: 500, right: 500 },
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "EXAMEN DE PRÁCTICA · DELE B1", bold: true, color: GOLD, size: 36, font: "Georgia" })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Spanish Lessons with Mercedes", color: WHITE, size: 22, font: "Calibri" })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "spanishmercedes.com", color: "9AD8CF", size: 18, font: "Calibri" })] }),
      ]
    })] })]
  });
}
function pruebaBanner(number, title, color = NAVY) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({ children: [new TableCell({
      borders: noBorders,
      width: { size: CONTENT_W, type: WidthType.DXA },
      shading: { fill: color, type: ShadingType.CLEAR },
      margins: { top: 250, bottom: 250, left: 500, right: 500 },
      children: [
        new Paragraph({ children: [new TextRun({ text: `PRUEBA ${number}`, bold: true, color: GOLD, size: 22, font: "Calibri" })] }),
        new Paragraph({ children: [new TextRun({ text: title, bold: true, color: WHITE, size: 30, font: "Georgia" })] })
      ]
    })] })]
  });
}
function tareaHeader(number, title, tiempo, preguntas) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: noBorder, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 16, color: GOLD }, right: noBorder },
      width: { size: CONTENT_W, type: WidthType.DXA },
      shading: { fill: GOLD_LIGHT, type: ShadingType.CLEAR },
      margins: { top: 160, bottom: 160, left: 300, right: 300 },
      children: [
        new Paragraph({ children: [
          new TextRun({ text: `TAREA ${number}`, bold: true, color: GOLD, size: 18, font: "Calibri" }),
          new TextRun({ text: `   ·   ${tiempo}   ·   ${preguntas}`, color: MID_GRAY, size: 18, font: "Calibri" })
        ]}),
        new Paragraph({ children: [new TextRun({ text: title, bold: true, color: NAVY, size: 22, font: "Calibri" })] })
      ]
    })] })]
  });
}
function tipBox(text) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: noBorder, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 16, color: RED }, right: noBorder },
      width: { size: CONTENT_W, type: WidthType.DXA },
      shading: { fill: RED_LIGHT, type: ShadingType.CLEAR },
      margins: { top: 120, bottom: 120, left: 300, right: 300 },
      children: [new Paragraph({ children: [
        new TextRun({ text: "TIP MERCEDES · ", bold: true, color: RED, size: 18, font: "Calibri" }),
        new TextRun({ text: text, color: DARK_GRAY, size: 18, font: "Calibri" })
      ]})]
    })] })]
  });
}
function solutionBox(text) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: noBorder, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 16, color: NAVY }, right: noBorder },
      width: { size: CONTENT_W, type: WidthType.DXA },
      shading: { fill: VERY_LIGHT, type: ShadingType.CLEAR },
      margins: { top: 120, bottom: 120, left: 300, right: 300 },
      children: [new Paragraph({ children: [new TextRun({ text: text, color: DARK_GRAY, size: 18, font: "Calibri" })] })]
    })] })]
  });
}
function bodyPara(text, opts = {}) {
  return new Paragraph({
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, font: "Calibri", size: opts.size || 20, color: opts.color || DARK_GRAY, bold: opts.bold || false, italics: opts.italic || false })]
  });
}
function questionRow(num, question, options) {
  const labelW = 500;
  const qW = CONTENT_W - labelW;
  const rows = [
    new TableRow({ children: [
      new TableCell({
        borders: noBorders,
        width: { size: labelW, type: WidthType.DXA },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${num}.`, bold: true, color: WHITE, size: 18, font: "Calibri" })] })]
      }),
      new TableCell({
        borders: { top: border, bottom: noBorder, left: noBorder, right: noBorder },
        width: { size: qW, type: WidthType.DXA },
        margins: { top: 80, bottom: 40, left: 150, right: 150 },
        children: [new Paragraph({ children: [new TextRun({ text: question, font: "Calibri", size: 18, color: DARK_GRAY, bold: true })] })]
      })
    ]})
  ];
  options.forEach((opt, i) => {
    rows.push(new TableRow({ children: [
      new TableCell({ borders: noBorders, width: { size: labelW, type: WidthType.DXA }, shading: { fill: NAVY, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun("")] })] }),
      new TableCell({
        borders: { top: noBorder, bottom: i === options.length - 1 ? border : noBorder, left: noBorder, right: noBorder },
        width: { size: qW, type: WidthType.DXA },
        margins: { top: 40, bottom: 40, left: 150, right: 150 },
        children: [new Paragraph({ children: [new TextRun({ text: opt, font: "Calibri", size: 18, color: DARK_GRAY })] })]
      })
    ]}));
  });
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [labelW, qW], rows });
}
function matchRow(label, placeholder) {
  const tW = Math.round(CONTENT_W * 0.72);
  const aN = CONTENT_W - tW;
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [tW, aN],
    rows: [new TableRow({ children: [
      new TableCell({ borders: { top: noBorder, bottom: border, left: noBorder, right: noBorder }, width: { size: tW, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [new Paragraph({ children: [new TextRun({ text: label, font: "Calibri", size: 18, color: DARK_GRAY })] })] }),
      new TableCell({ borders: { top: noBorder, bottom: border, left: border, right: noBorder }, width: { size: aN, type: WidthType.DXA }, shading: { fill: VERY_LIGHT, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: placeholder, font: "Calibri", size: 16, color: MID_GRAY })] })] })
    ]})]
  });
}
function textBoxLabeled(letra, titulo, texto) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [700, CONTENT_W - 700],
    rows: [new TableRow({ children: [
      new TableCell({
        borders: noBorders,
        width: { size: 700, type: WidthType.DXA },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 100, right: 100 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: letra, bold: true, color: GOLD, size: 24, font: "Georgia" })] })]
      }),
      new TableCell({
        borders: { top: border, bottom: border, left: noBorder, right: border },
        width: { size: CONTENT_W - 700, type: WidthType.DXA },
        margins: { top: 120, bottom: 120, left: 200, right: 200 },
        children: [
          ...(titulo ? [new Paragraph({ children: [new TextRun({ text: titulo, bold: true, color: NAVY, size: 18, font: "Calibri" })] })] : []),
          new Paragraph({ spacing: { before: 60 }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: texto, font: "Calibri", size: 18, color: DARK_GRAY })] })
        ]
      })
    ]})]
  });
}
function answerKey(pairs) {
  const cols = 4;
  const colW = Math.floor(CONTENT_W / cols);
  const tableRows = [];
  tableRows.push(new TableRow({
    children: Array.from({ length: cols }, (_, i) => new TableCell({
      borders: noBorders, width: { size: colW, type: WidthType.DXA },
      shading: { fill: NAVY, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ["Pregunta", "Respuesta", "Pregunta", "Respuesta"][i], bold: true, color: WHITE, size: 16, font: "Calibri" })] })]
    }))
  }));
  for (let i = 0; i < pairs.length; i += 2) {
    const p1 = pairs[i]; const p2 = pairs[i + 1];
    tableRows.push(new TableRow({ children: [
      new TableCell({ borders: { top: noBorder, bottom: border, left: noBorder, right: border }, width: { size: colW, type: WidthType.DXA }, shading: { fill: VERY_LIGHT, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: p1 ? `${p1[0]}` : "", bold: true, font: "Calibri", size: 18, color: NAVY })] })] }),
      new TableCell({ borders: { top: noBorder, bottom: border, left: border, right: border }, width: { size: colW, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: p1 ? `${p1[1]}` : "", bold: true, font: "Calibri", size: 18, color: RED })] })] }),
      new TableCell({ borders: { top: noBorder, bottom: border, left: border, right: border }, width: { size: colW, type: WidthType.DXA }, shading: { fill: VERY_LIGHT, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: p2 ? `${p2[0]}` : "", bold: true, font: "Calibri", size: 18, color: NAVY })] })] }),
      new TableCell({ borders: { top: noBorder, bottom: border, left: border, right: noBorder }, width: { size: colW, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: p2 ? `${p2[1]}` : "", bold: true, font: "Calibri", size: 18, color: RED })] })] }),
    ]}));
  }
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [colW, colW, colW, colW], rows: tableRows });
}
function writingPrompt(num, title, time, instructions) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [
      new TableRow({ children: [new TableCell({
        borders: noBorders,
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 400, right: 400 },
        children: [
          new Paragraph({ children: [new TextRun({ text: `TAREA ${num} — ${time}`, bold: true, color: GOLD, size: 20, font: "Calibri" })] }),
          new Paragraph({ children: [new TextRun({ text: title, bold: true, color: WHITE, size: 26, font: "Georgia" })] }),
        ]
      })] }),
      new TableRow({ children: [new TableCell({
        borders: noBorders,
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { fill: VERY_LIGHT, type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 400, right: 400 },
        children: instructions.map(i => new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun({ text: i, font: "Calibri", size: 18, color: DARK_GRAY })] }))
      })] }),
    ]
  });
}
function audioButton(label) {
  const btnW = CONTENT_W;
  return new Table({
    width: { size: btnW, type: WidthType.DXA },
    columnWidths: [Math.round(btnW * 0.08), Math.round(btnW * 0.92)],
    rows: [new TableRow({ children: [
      new TableCell({
        borders: noBorders,
        width: { size: Math.round(btnW * 0.08), type: WidthType.DXA },
        shading: { fill: GOLD, type: ShadingType.CLEAR },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 160, bottom: 160, left: 120, right: 120 },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "▶", font: "Calibri", size: 28, bold: true, color: WHITE })] })]
      }),
      new TableCell({
        borders: noBorders,
        width: { size: Math.round(btnW * 0.92), type: WidthType.DXA },
        shading: { fill: TEAL_DARK, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 300, right: 200 },
        children: [
          new Paragraph({ children: [new TextRun({ text: label, font: "Calibri", size: 20, bold: true, color: WHITE })] }),
          new Paragraph({ spacing: { before: 40 }, children: [
            new TextRun({ text: "Abre en el navegador: ", font: "Calibri", size: 17, color: "9AD8CF", italics: true }),
            new TextRun({ text: "spanishmercedes.com/audio-dele-b1", font: "Calibri", size: 17, color: GOLD, bold: true }),
          ]})
        ]
      })
    ]})]
  });
}
function oralCard(titulo, lineas) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: noBorder, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 20, color: TEAL_DARK }, right: noBorder },
      width: { size: CONTENT_W, type: WidthType.DXA },
      shading: { fill: "EFFBF8", type: ShadingType.CLEAR },
      margins: { top: 200, bottom: 200, left: 400, right: 400 },
      children: [
        new Paragraph({ children: [new TextRun({ text: titulo, bold: true, color: TEAL_DARK, size: 20, font: "Calibri" })] }),
        ...lineas.map(l => new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: l.text, font: "Calibri", size: 18, color: l.color || DARK_GRAY, bold: l.bold || false, italics: l.italic || false })] }))
      ]
    })] })]
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// BUILD DOCUMENT
// ─────────────────────────────────────────────────────────────────────────────
const children = [];

// ── COVER ──
children.push(coverBand());
children.push(spacer(300));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "EXAMEN COMPLETO DE PRÁCTICA", bold: true, color: NAVY, size: 32, font: "Georgia" })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Diploma de Español · Nivel B1", color: MID_GRAY, size: 24, font: "Calibri" })] }));
children.push(spacer(200));

children.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [CONTENT_W / 4, CONTENT_W / 4, CONTENT_W / 4, CONTENT_W / 4].map(v => Math.round(v)),
  rows: [new TableRow({
    children: [
      ["4", "PRUEBAS"],
      ["~3h", "DURACIÓN"],
      ["60", "PREGUNTAS"],
      ["25%", "CADA PRUEBA"]
    ].map(([val, label]) => new TableCell({
      borders: noBorders,
      width: { size: Math.round(CONTENT_W / 4), type: WidthType.DXA },
      shading: { fill: TEAL_DARK, type: ShadingType.CLEAR },
      margins: { top: 200, bottom: 200, left: 100, right: 100 },
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: val, bold: true, color: GOLD, size: 44, font: "Georgia" })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: label, color: "9AD8CF", size: 16, font: "Calibri" })] })
      ]
    }))
  })]
}));

children.push(spacer(300));
children.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [CONTENT_W / 4, CONTENT_W / 4, CONTENT_W / 4, CONTENT_W / 4].map(v => Math.round(v)),
  rows: [new TableRow({
    children: [
      ["PRUEBA 1", "Comprensión de lectura", "70 min · 30 preguntas", NAVY],
      ["PRUEBA 2", "Comprensión auditiva", "40 min · 30 preguntas", LIGHT_NAVY],
      ["PRUEBA 3", "Expresión escrita", "60 min · 2 tareas", "8B0000"],
      ["PRUEBA 4", "Expresión oral", "15+15 min · 4 tareas", "2E5C1E"]
    ].map(([p, title, details, color]) => new TableCell({
      borders: { top: noBorder, bottom: noBorder, left: noBorder, right: { style: BorderStyle.SINGLE, size: 4, color: WHITE } },
      width: { size: Math.round(CONTENT_W / 4), type: WidthType.DXA },
      shading: { fill: color, type: ShadingType.CLEAR },
      margins: { top: 200, bottom: 200, left: 200, right: 200 },
      children: [
        new Paragraph({ children: [new TextRun({ text: p, bold: true, color: GOLD, size: 16, font: "Calibri" })] }),
        new Paragraph({ children: [new TextRun({ text: title, bold: true, color: WHITE, size: 18, font: "Calibri" })] }),
        new Paragraph({ children: [new TextRun({ text: details, color: "AAAAAA", size: 14, font: "Calibri" })] })
      ]
    }))
  })]
}));

children.push(spacer(400));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Material de práctica preparado por Mercedes · www.spanishmercedes.com", color: MID_GRAY, size: 16, font: "Calibri", italics: true })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Este examen sigue el formato oficial del DELE B1 del Instituto Cervantes", color: MID_GRAY, size: 16, font: "Calibri", italics: true })] }));

// ═════════════════════════════════════════════════════════════════════════════
// PRUEBA 1: COMPRENSIÓN DE LECTURA — 5 tareas, 30 preguntas, 70 min
// ═════════════════════════════════════════════════════════════════════════════
children.push(sectionBreak());
children.push(pruebaBanner("1", "COMPRENSIÓN DE LECTURA", NAVY));
children.push(spacer(160));
children.push(bodyPara("Tiempo disponible: 70 minutos · 5 tareas · 30 preguntas · 25% de la nota final", { bold: true, color: MID_GRAY }));
children.push(spacer(80));
children.push(tipBox("Lee primero las preguntas y después el texto. No te quedes atascado en una pregunta: márcala y vuelve al final. Tienes unos 14 minutos por tarea."));

// ── TAREA 1.1: relacionar personas con anuncios (1-6, textos A-J) ──
children.push(spacer(200));
children.push(tareaHeader("1", "Relacionar personas con anuncios", "~14 min", "Preguntas 1-6"));
children.push(spacer(100));
children.push(bodyPara("Vas a leer seis textos en los que unas personas dicen qué tipo de actividad de tiempo libre buscan y diez anuncios de actividades (A-J). Relaciona a las personas (1-6) con los anuncios. HAY TRES ANUNCIOS QUE NO DEBES RELACIONAR."));
children.push(spacer(120));

const personasT1 = [
  ["1. LAURA", "Trabajo todo el día sentada delante del ordenador y necesito moverme. Busco una actividad física al aire libre, mejor si es en grupo, porque sola me cuesta mucho ser constante."],
  ["2. JORGE", "Me jubilé hace poco y siempre quise aprender a cocinar bien. Me gustaría apuntarme a algún curso presencial donde enseñen platos tradicionales, no cocina moderna de esas espumas y cosas raras."],
  ["3. MARTA", "Tengo dos hijos pequeños y quiero encontrar un plan de fin de semana que podamos hacer todos juntos en familia, preferiblemente en contacto con la naturaleza y los animales."],
  ["4. ANDRÉS", "Estudio Bellas Artes y quiero ganar algo de dinero este verano con algo relacionado con lo mío. No me importa trabajar con niños, al contrario, creo que se me da bien."],
  ["5. CRISTINA", "Después del trabajo necesito desconectar y relajarme. He probado el gimnasio pero hay demasiado ruido. Busco algo tranquilo, sin prisas y a poder ser por la tarde-noche."],
  ["6. RAÚL", "Me encanta la música en directo, pero los conciertos grandes me parecen carísimos. Busco planes musicales en espacios pequeños, con artistas locales y a buen precio."],
];
personasT1.forEach(([nombre, texto]) => {
  children.push(textBoxLabeled(nombre.split(".")[0] + ".", nombre.split(". ")[1], texto));
  children.push(spacer(60));
});

children.push(spacer(120));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ACTIVIDADES Y CURSOS — TABLÓN DE ANUNCIOS", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(80));

const anunciosT1 = [
  ["A", "Club de corredores El Parque", "Grupo de running para todos los niveles. Quedamos los martes y jueves a las 19:00 en la entrada del parque del Oeste. Entrenamos juntos, nos motivamos y una vez al mes participamos en una carrera popular. ¡Primera semana gratis!"],
  ["B", "Sala Acústica — ciclo de cantautores", "Cada viernes, un artista local diferente en nuestro pequeño escenario del barrio de las Letras. Entrada: 8 euros con consumición incluida. Aforo limitado a 60 personas: música de verdad, de cerca."],
  ["C", "Escuela de cocina La Abuela", "Curso de cocina tradicional española: cocido, lentejas, croquetas, tortilla y los guisos de toda la vida. Clases presenciales los lunes y miércoles por la mañana. Grupos reducidos. Ideal para principiantes."],
  ["D", "Granja-escuela El Encinar", "Pasa el sábado o el domingo en nuestra granja: los niños dan de comer a los animales, montan en poni y hacen pan casero mientras los padres disfrutan del campo. Actividades para todas las edades. Comida campestre incluida."],
  ["E", "Taller de pintura para adultos", "Aprende óleo y acuarela desde cero con la pintora Rosa Ferrer. Clases los sábados por la mañana en su estudio del centro. Material incluido. Plazas limitadas."],
  ["F", "Campamento urbano ArteVerano", "Buscamos monitores con formación artística para nuestro campamento de julio. Talleres de dibujo, pintura y manualidades con niños de 6 a 12 años. Contrato de un mes. Enviar currículum antes del 15 de mayo."],
  ["G", "Centro Aqua — yoga y meditación", "Clases de yoga suave y meditación guiada en grupos pequeños. Horarios de tarde y noche (última clase a las 21:30). Ambiente silencioso y tranquilo, con luz tenue y música relajante. Primera clase de prueba gratuita."],
  ["H", "Festival Sinfónico de Verano", "Gran concierto de la Orquesta Nacional en el estadio Metropolitano. Más de 20.000 asistentes cada año. Entradas desde 65 euros. ¡Compra ya la tuya, se agotan rápido!"],
  ["I", "Curso online de repostería creativa", "Aprende a decorar tartas americanas y cupcakes desde casa, a tu ritmo. Vídeos en alta definición y tutorías por videollamada. Certificado digital al terminar."],
  ["J", "Voluntariado en el refugio de animales", "El refugio Patas Amigas busca voluntarios para pasear perros los fines de semana. No se requiere experiencia, solo compromiso y amor por los animales. Actividad no remunerada."],
];
anunciosT1.forEach(([letra, titulo, texto]) => {
  children.push(textBoxLabeled(letra, titulo, texto));
  children.push(spacer(60));
});

children.push(spacer(100));
["1. LAURA", "2. JORGE", "3. MARTA", "4. ANDRÉS", "5. CRISTINA", "6. RAÚL"].forEach(p => {
  children.push(matchRow(p, "A · B · C · D · E · F · G · H · I · J"));
  children.push(spacer(20));
});

// ── TAREA 1.2: texto informativo + 6 preguntas (7-12) ──
children.push(spacer(200));
children.push(tareaHeader("2", "Comprender un texto informativo", "~14 min", "Preguntas 7-12"));
children.push(spacer(100));
children.push(bodyPara("Vas a leer un texto sobre los molinos de viento de La Mancha. Después contesta a las preguntas (7-12). Selecciona la respuesta correcta (a / b / c)."));
children.push(spacer(120));

children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "LOS GIGANTES DE LA MANCHA", bold: true, color: NAVY, size: 22, font: "Georgia" })] }));
children.push(spacer(80));

const textoT2 = [
  "Los molinos de viento de La Mancha son, gracias a la novela de Cervantes, uno de los símbolos más reconocibles de España. Sin embargo, su historia es menos conocida de lo que parece. Aunque solemos imaginarlos como construcciones muy antiguas, los molinos manchegos no se generalizaron hasta el siglo XVI, cuando una serie de años de sequía obligó a buscar una alternativa a los molinos de agua, que dependían del caudal de los ríos para funcionar.",
  "Su función era moler el trigo para obtener harina, un producto esencial en la alimentación de la época. Cada molino podía moler unos doscientos kilos de grano al día, y las familias de los pueblos cercanos llevaban allí sus cosechas. El molinero cobraba su trabajo quedándose con una parte de la harina, llamada maquila, ya que el dinero apenas circulaba en el campo.",
  "El oficio de molinero exigía conocimientos que se transmitían de padres a hijos. El más importante era saber interpretar el viento: el molinero subía a la parte superior del molino y, según la dirección y la fuerza del aire, orientaba el tejado giratorio y elegía las velas adecuadas. Un error de cálculo con viento fuerte podía hacer girar las aspas a demasiada velocidad y provocar un incendio en la maquinaria de madera por el calor del rozamiento.",
  "Con la llegada de las fábricas de harina eléctricas a comienzos del siglo XX, los molinos de viento dejaron de ser rentables y la mayoría fueron abandonados. De los cientos que llegaron a funcionar en la región, hoy se conservan menos de sesenta, gracias sobre todo a las campañas de restauración iniciadas en los años sesenta por los propios ayuntamientos.",
  "En la actualidad, localidades como Consuegra, Campo de Criptana o Mota del Cuervo han convertido sus molinos en museos y oficinas de turismo. Algunos, incluso, muelen grano varias veces al año en demostraciones para visitantes, en las que antiguos molineros y sus descendientes muestran cómo funcionaba este ingenio. El turismo ha devuelto la vida a unos edificios que parecían condenados a desaparecer, y con él ha llegado también el interés de los más jóvenes por conservar un oficio que forma parte de la identidad manchega.",
];
textoT2.forEach(p => { children.push(bodyPara(p)); children.push(spacer(40)); });

children.push(spacer(120));
const preguntasT2 = [
  [7, "Según el texto, los molinos de viento manchegos…", ["a) son anteriores a los molinos de agua.", "b) se extendieron a causa de la falta de lluvias.", "c) se construyeron junto a los ríos."]],
  [8, "En el texto se dice que el molinero cobraba…", ["a) con una parte de la harina.", "b) con dinero de las familias.", "c) con parte de la cosecha de trigo sin moler."]],
  [9, "Según el texto, la principal habilidad del molinero era…", ["a) reparar la maquinaria de madera.", "b) saber leer el viento.", "c) subir a la parte superior del molino."]],
  [10, "En el texto se afirma que un viento demasiado fuerte podía…", ["a) destruir el tejado giratorio.", "b) romper las velas del molino.", "c) causar un fuego en el interior."]],
  [11, "Según el texto, los molinos dejaron de utilizarse porque…", ["a) fueron abandonados por los ayuntamientos.", "b) ya no resultaban económicos.", "c) se estropearon con el paso del tiempo."]],
  [12, "El texto dice que actualmente algunos molinos…", ["a) funcionan a diario para producir harina.", "b) muelen grano en ocasiones especiales.", "c) son propiedad de antiguos molineros."]],
];
preguntasT2.forEach(([num, q, opts]) => { children.push(questionRow(num, q, opts)); children.push(spacer(80)); });

// ── TAREA 1.3: tres personas + 6 preguntas «qué persona dice…» (13-18) ──
children.push(spacer(200));
children.push(tareaHeader("3", "Relacionar preguntas con tres textos personales", "~14 min", "Preguntas 13-18"));
children.push(spacer(100));
children.push(bodyPara("Vas a leer tres textos en los que tres personas cuentan cómo fue su primera experiencia viviendo solas. Relaciona las preguntas (13-18) con los textos (A, B o C)."));
children.push(spacer(120));

children.push(textBoxLabeled("A", "SILVIA", "Me independicé a los veintitrés años, cuando encontré mi primer trabajo estable. Alquilé un estudio diminuto en el centro, tan pequeño que la cama se plegaba contra la pared para poder comer en la mesa. Lo más duro fue descubrir lo caro que es todo: entre el alquiler, la luz y la comida se me iba casi todo el sueldo, así que me hice una lista de gastos semanales y la cumplía a rajatabla. A cambio, tenía la libertad de organizar mi tiempo como quería. Aprendí a cocinar viendo vídeos en internet y ahora es mi gran afición: los domingos preparo comida para toda la semana."));
children.push(spacer(80));
children.push(textBoxLabeled("B", "TOMÁS", "Yo me fui de casa de mis padres para estudiar en otra ciudad. Compartía piso con otros tres estudiantes que no conocía de nada y, la verdad, al principio fue un desastre: nadie fregaba los platos y la nevera siempre estaba vacía. Hasta que un día hicimos una reunión y elaboramos un calendario de tareas que todos teníamos que respetar. Desde entonces la convivencia mejoró muchísimo y dos de aquellos compañeros siguen siendo hoy mis mejores amigos. Lo que peor llevaba era la lavadora: encogí tantos jerséis que al final mi madre me hizo una lista con instrucciones para cada tipo de ropa."));
children.push(spacer(80));
children.push(textBoxLabeled("C", "ELENA", "En mi caso fue todo muy precipitado: me ofrecieron un puesto en una empresa de otra provincia y en dos semanas tuve que encontrar piso, hacer la mudanza y empezar a trabajar. Como no conocía a nadie en la ciudad, los primeros meses me sentía bastante sola, sobre todo los fines de semana. Mi solución fue apuntarme a un club de senderismo: cada sábado salíamos a caminar por la montaña y allí conocí a gente estupenda. Eso sí, reconozco que en lo doméstico sigo siendo un desastre: como casi siempre de menú en el trabajo y mi congelador está lleno de platos precocinados."));

children.push(spacer(120));
const preguntasT3 = [
  ["13. ¿Qué persona dice que controlaba mucho su dinero?", "A · B · C"],
  ["14. ¿Qué persona dice que tuvo problemas con la limpieza del piso?", "A · B · C"],
  ["15. ¿Qué persona dice que hizo amigos gracias a una actividad deportiva?", "A · B · C"],
  ["16. ¿Qué persona dice que cocinar se ha convertido en un pasatiempo?", "A · B · C"],
  ["17. ¿Qué persona dice que recibió ayuda de un familiar?", "A · B · C"],
  ["18. ¿Qué persona dice que tuvo poco tiempo para organizar su cambio de vida?", "A · B · C"],
];
preguntasT3.forEach(([q, opts]) => { children.push(matchRow(q, opts)); children.push(spacer(20)); });

// ── TAREA 1.4: texto con 6 huecos + 8 fragmentos (19-24) ──
children.push(spacer(200));
children.push(tareaHeader("4", "Completar un texto con fragmentos", "~14 min", "Preguntas 19-24"));
children.push(spacer(100));
children.push(bodyPara("Lee el siguiente texto, del que se han extraído seis fragmentos. A continuación lee los ocho fragmentos propuestos (A-H) y decide en qué lugar del texto (19-24) hay que colocar cada uno. HAY DOS FRAGMENTOS QUE NO TIENES QUE ELEGIR."));
children.push(spacer(120));

children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "EL ORIGEN DE LA SIESTA", bold: true, color: NAVY, size: 22, font: "Georgia" })] }));
children.push(spacer(80));

const textoT4 = [
  "Aunque hoy la asociamos con España, la siesta es una costumbre mucho más antigua y extendida de lo que se suele pensar. La propia palabra tiene un origen latino. 19. _____________________ . Los monjes de la Edad Media respetaban esta pausa con disciplina, y de los monasterios la costumbre pasó al resto de la sociedad.",
  "Durante siglos, la siesta estuvo ligada sobre todo al trabajo en el campo. 20. _____________________ . Descansar en las horas centrales no era un lujo, sino una necesidad para poder continuar la jornada por la tarde.",
  "En el siglo XX, con el traslado de la población a las ciudades y los nuevos horarios de oficinas y fábricas, la siesta diaria empezó a perder terreno. 21. _____________________ . De hecho, los estudios indican que menos del veinte por ciento de los españoles duerme la siesta de forma habitual.",
  "La ciencia, sin embargo, ha salido en defensa de esta tradición. 22. _____________________ . Eso sí, los especialistas recomiendan que no supere la media hora, porque un sueño más largo produce el efecto contrario y nos despertamos más cansados.",
  "El interés por el descanso breve ha llegado incluso al mundo de la empresa. 23. _____________________ . Sus directivos aseguran que los empleados rinden más y cometen menos errores después de ese descanso.",
  "Sea como sea, la siesta sigue formando parte de la imagen de España en el mundo. 24. _____________________ . Quizá la mejor respuesta sea la del escritor Camilo José Cela, que la definía, con humor, como «el yoga ibérico».",
];
textoT4.forEach(p => { children.push(bodyPara(p)); children.push(spacer(40)); });

children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "FRAGMENTOS", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
const fragmentosT4 = [
  "A. Viene de la expresión «hora sexta», que era como los romanos llamaban al mediodía, el momento de mayor calor del día.",
  "B. Los agricultores comenzaban a trabajar al amanecer y, cuando el sol apretaba con más fuerza, era imposible seguir en el campo.",
  "C. Numerosas investigaciones han demostrado que una siesta breve mejora la memoria, la concentración y el estado de ánimo.",
  "D. Hoy en día, muchos españoles solo pueden permitírsela los fines de semana o durante las vacaciones.",
  "E. Algunas compañías japonesas y estadounidenses han instalado salas de descanso para que sus trabajadores duerman unos minutos después de comer.",
  "F. Los turistas que visitan el país preguntan a menudo si los españoles realmente duermen todos los días después de comer.",
  "G. Los médicos romanos recomendaban dormir más de dos horas todas las tardes.",
  "H. En aquella época, las familias más ricas dormían la siesta en habitaciones especiales construidas para ello.",
];
fragmentosT4.forEach(f => children.push(bodyPara(f)));

// ── TAREA 1.5: carta con 6 huecos gramaticales (25-30) ──
children.push(spacer(200));
children.push(tareaHeader("5", "Completar una carta — gramática y vocabulario", "~14 min", "Preguntas 25-30"));
children.push(spacer(100));
children.push(bodyPara("Lee el texto y rellena los huecos (25-30) con la opción correcta (a / b / c)."));
children.push(spacer(120));

const cartaT5 = [
  "Querido Marcos:",
  "¡Por fin te escribo! Perdona el retraso, pero es que este mes ____25____ muchísimo trabajo en la tienda y llegaba a casa agotada todos los días.",
  "Te cuento la gran noticia: ¡me mudo! La semana pasada ____26____ un piso precioso cerca de la playa, con una terraza enorme. Lo vi un jueves y el viernes ya estaba firmando el contrato. Todavía no me lo creo.",
  "La mudanza será el primer fin de semana de julio. Mi hermano me ha dicho que me ayuda con las cajas, pero nos vendría muy bien una mano más. ¿Por qué no ____27____ vienes unos días? Así me ayudas un poquito y de paso conoces la zona, que te va a encantar.",
  "Además, quiero hacer una fiesta de inauguración cuando ____28____ instalada del todo, seguramente a finales de julio. ¡Estás invitadísimo, por supuesto!",
  "Espero que esta vez te quedes más ____29____ una semana, que la última vez casi no tuvimos tiempo de nada. Dime qué días te vienen bien y te recojo en la estación. ¡Ah! Y tráete el bañador, que la playa está a diez minutos ____30____ a pie.",
  "Escríbeme pronto.",
  "Un abrazo enorme,",
  "Lucía",
];
cartaT5.forEach(p => { children.push(bodyPara(p)); children.push(spacer(40)); });

children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "OPCIONES", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
const opcionesT5 = [
  "25.   a) he tenido        b) tenía        c) tendré",
  "26.   a) encontraba      b) encontré      c) había encontrado",
  "27.   a) te          b) le          c) me",
  "28.   a) estoy        b) estaré        c) esté",
  "29.   a) que          b) de          c) por",
  "30.   a) andando        b) andar        c) andado",
];
opcionesT5.forEach(o => children.push(bodyPara(o)));

// ═════════════════════════════════════════════════════════════════════════════
// PRUEBA 2: COMPRENSIÓN AUDITIVA — 5 tareas, 30 preguntas, 40 min
// ═════════════════════════════════════════════════════════════════════════════
children.push(sectionBreak());
children.push(pruebaBanner("2", "COMPRENSIÓN AUDITIVA", LIGHT_NAVY));
children.push(spacer(160));
children.push(bodyPara("Tiempo disponible: 40 minutos · 5 tareas · 30 preguntas · 25% de la nota final", { bold: true, color: MID_GRAY }));
children.push(spacer(80));
children.push(tipBox("En el examen real escucharás cada audio DOS veces. Escucha los audios de esta prueba en el reproductor online (con transcripciones ocultables). Lee siempre las preguntas ANTES de escuchar."));
children.push(spacer(140));
children.push(audioButton("Escuchar los audios de la Prueba 2 — Reproductor online"));
children.push(spacer(140));

// ── TAREA 2.1: seis mensajes de buzón de voz (1-6) ──
children.push(tareaHeader("1", "Seis mensajes de voz", "~8 min", "Preguntas 1-6"));
children.push(spacer(100));
children.push(bodyPara("Vas a escuchar seis mensajes del buzón de voz de un teléfono. Escucharás cada mensaje dos veces. Después contesta a las preguntas (1-6). Selecciona la opción correcta (a / b / c)."));
children.push(spacer(120));

const preguntasA1 = [
  [1, "Mensaje 1. ¿Para qué llama Sergio a Marina?", ["a) Para invitarla a una celebración.", "b) Para pedirle ayuda con una mudanza.", "c) Para devolverle unas llaves."]],
  [2, "Mensaje 2. ¿Qué tiene que hacer Alberto?", ["a) Recoger un paquete en la oficina de correos.", "b) Firmar un documento y enviarlo.", "c) Llamar a la empresa de mensajería."]],
  [3, "Mensaje 3. ¿Para qué llama la mujer de la clínica?", ["a) Para cancelar una cita.", "b) Para adelantar una cita.", "c) Para recordar una cita."]],
  [4, "Mensaje 4. ¿Qué le pide Nuria a su hermano?", ["a) Que cuide de su gato unos días.", "b) Que riegue las plantas de su casa.", "c) Que le preste su coche el fin de semana."]],
  [5, "Mensaje 5. ¿Adónde tiene que ir Diego esta tarde?", ["a) Al taller mecánico.", "b) A la farmacia.", "c) Al supermercado."]],
  [6, "Mensaje 6. ¿Qué quiere Carmen que haga Pablo?", ["a) Que compre las entradas por internet.", "b) Que llegue al cine con tiempo.", "c) Que invite también a su prima."]],
];
preguntasA1.forEach(([num, q, opts]) => { children.push(questionRow(num, q, opts)); children.push(spacer(80)); });

// ── TAREA 2.2: monólogo Valentina (7-12) ──
children.push(spacer(200));
children.push(tareaHeader("2", "Monólogo — la vida de una española en México", "~8 min", "Preguntas 7-12"));
children.push(spacer(100));
children.push(bodyPara("Vas a escuchar un fragmento del programa «Españoles por el mundo» en el que Valentina, una sevillana que vive en México, cuenta cómo es su vida. Escucharás la audición dos veces. Después contesta a las preguntas (7-12). Selecciona la respuesta correcta (a / b / c)."));
children.push(spacer(120));

const preguntasA2 = [
  [7, "En la audición, Valentina cuenta que se fue a México…", ["a) porque su empresa la envió allí.", "b) para estar cerca de su familia.", "c) al terminar sus estudios."]],
  [8, "Valentina dice que, al llegar a Ciudad de México, le sorprendió…", ["a) el clima de la ciudad.", "b) el tamaño de la ciudad.", "c) el carácter de la gente."]],
  [9, "Con respecto a su trabajo, Valentina explica que…", ["a) sigue en la misma empresa que la envió.", "b) ahora tiene su propio negocio.", "c) trabaja en una consultora mexicana."]],
  [10, "Valentina cuenta que con la comida mexicana…", ["a) tuvo problemas de salud al principio.", "b) aprendió a cocinar con picante.", "c) echa de menos los platos de su tierra."]],
  [11, "Según la audición, su momento más difícil fue…", ["a) la primera Navidad lejos de casa.", "b) la búsqueda de su primer apartamento.", "c) los primeros meses en el trabajo."]],
  [12, "Valentina dice que sus amigos mexicanos…", ["a) son como una segunda familia.", "b) la visitan a menudo en Sevilla.", "c) son casi todos compañeros de trabajo."]],
];
preguntasA2.forEach(([num, q, opts]) => { children.push(questionRow(num, q, opts)); children.push(spacer(80)); });

// ── TAREA 2.3: seis noticias (13-18) ──
children.push(spacer(200));
children.push(tareaHeader("3", "Seis noticias de radio", "~8 min", "Preguntas 13-18"));
children.push(spacer(100));
children.push(bodyPara("Vas a escuchar seis noticias en un programa de radio. Escucharás el programa dos veces. Después contesta a las preguntas (13-18). Selecciona la respuesta correcta (a / b / c)."));
children.push(spacer(120));

const preguntasA3 = [
  [13, "Noticia 1. La nueva biblioteca municipal…", ["a) abrirá sus puertas el próximo mes.", "b) tendrá más de 100.000 libros.", "c) estará abierta también los domingos."]],
  [14, "Noticia 2. El festival de teatro de calle…", ["a) durará una semana completa.", "b) contará con compañías internacionales.", "c) celebra este año su décima edición."]],
  [15, "Noticia 3. El cocinero Andrés Soler…", ["a) ha publicado un libro de recetas.", "b) ha recibido un premio internacional.", "c) ha abierto un restaurante en el extranjero."]],
  [16, "Noticia 4. La exposición de fotografía puede visitarse…", ["a) en el museo provincial.", "b) en el centro cultural del puerto.", "c) en la antigua estación de tren."]],
  [17, "Noticia 5. El equipo de baloncesto de la ciudad…", ["a) jugará la final el próximo sábado.", "b) ganó ayer en el último segundo.", "c) perdió a su mejor jugador por lesión."]],
  [18, "Noticia 6. Según el pronóstico del tiempo…", ["a) mañana bajarán las temperaturas.", "b) el fin de semana lloverá.", "c) hoy habrá viento fuerte por la tarde."]],
];
preguntasA3.forEach(([num, q, opts]) => { children.push(questionRow(num, q, opts)); children.push(spacer(80)); });

// ── TAREA 2.4: seis personas + enunciados A-J (19-24) ──
children.push(spacer(200));
children.push(tareaHeader("4", "Seis personas hablan de sus vacaciones", "~8 min", "Preguntas 19-24"));
children.push(spacer(100));
children.push(bodyPara("Vas a escuchar a seis personas que cuentan recuerdos de sus vacaciones. Escucharás a cada persona dos veces. Selecciona el enunciado (A-J) que corresponde al tema del que habla cada persona (19-24). Hay diez enunciados. Selecciona solamente seis."));
children.push(spacer(120));

children.push(new Paragraph({ children: [new TextRun({ text: "ENUNCIADOS", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
const enunciadosA4 = [
  "A. Perdió un medio de transporte.",
  "B. Conoció a una persona importante en su vida.",
  "C. El alojamiento no era como esperaba.",
  "D. Cambió de planes por el mal tiempo.",
  "E. Se puso enfermo durante el viaje.",
  "F. Olvidó algo imprescindible en casa.",
  "G. Probó una actividad por primera vez.",
  "H. Viajó para asistir a una celebración familiar.",
  "I. Le robaron durante las vacaciones.",
  "J. Volvió a un lugar de su infancia.",
];
enunciadosA4.forEach(e => children.push(bodyPara(e)));
children.push(spacer(100));
["19. Persona 1", "20. Persona 2", "21. Persona 3", "22. Persona 4", "23. Persona 5", "24. Persona 6"].forEach(p => {
  children.push(matchRow(p, "A · B · C · D · E · F · G · H · I · J"));
  children.push(spacer(20));
});

// ── TAREA 2.5: conversación Isabel/Fernando A/B/C (25-30) ──
children.push(spacer(200));
children.push(tareaHeader("5", "Conversación entre dos amigos", "~8 min", "Preguntas 25-30"));
children.push(spacer(100));
children.push(bodyPara("Vas a escuchar una conversación entre dos amigos, Isabel y Fernando, que están organizando un viaje a Lisboa. Indica si los enunciados (25-30) se refieren a Isabel (A), a Fernando (B) o a ninguno de los dos (C). Escucharás la conversación dos veces."));
children.push(spacer(120));

const preguntasA5 = [
  ["25. Prefiere gastar más en el alojamiento.", "A · B · C"],
  ["26. Ha estado antes en Lisboa.", "A · B · C"],
  ["27. Se encargará de reservar el hotel.", "A · B · C"],
  ["28. Comprará las entradas para un espectáculo.", "A · B · C"],
  ["29. Quiere dejar tiempo sin planes durante el viaje.", "A · B · C"],
  ["30. Propone alquilar un coche en Lisboa.", "A · B · C"],
];
children.push(bodyPara("A = Isabel       B = Fernando       C = Ninguno de los dos", { bold: true, color: NAVY }));
children.push(spacer(60));
preguntasA5.forEach(([q, opts]) => { children.push(matchRow(q, opts)); children.push(spacer(20)); });

// ═════════════════════════════════════════════════════════════════════════════
// PRUEBA 3: EXPRESIÓN E INTERACCIÓN ESCRITAS — 2 tareas, 60 min
// ═════════════════════════════════════════════════════════════════════════════
children.push(sectionBreak());
children.push(pruebaBanner("3", "EXPRESIÓN E INTERACCIÓN ESCRITAS", "8B0000"));
children.push(spacer(160));
children.push(bodyPara("Tiempo disponible: 60 minutos · 2 tareas · 25% de la nota final", { bold: true, color: MID_GRAY }));
children.push(spacer(80));
children.push(tipBox("Tarea 1: 100-120 palabras (~25 min). Tarea 2: 130-150 palabras (~35 min). Cumple TODOS los puntos de las instrucciones: el examinador comprueba uno por uno que los has incluido."));
children.push(spacer(160));

children.push(writingPrompt(
  "1",
  "Responder a un correo electrónico",
  "~25 minutos · 100-120 palabras",
  [
    "Has recibido este correo electrónico de una amiga española:",
    "",
    "«¡Hola! ¿Qué tal todo? Mi hermana me ha contado que el mes pasado hiciste un curso de cocina, ¡qué envidia! Yo siempre he querido hacer uno. Cuéntame: ¿dónde lo hiciste y por qué decidiste apuntarte? ¿Qué aprendiste? Yo estoy pensando en apuntarme a uno en septiembre, ¿me lo recomiendas? Por cierto, ¿por qué no quedamos un día y me preparas algo de lo que has aprendido? Un beso, Alicia.»",
    "",
    "Escríbele un correo electrónico a Alicia para responder a sus preguntas. En él deberás:",
    "•  saludar;",
    "•  contar dónde hiciste el curso y por qué decidiste apuntarte;",
    "•  explicar qué aprendiste y si se lo recomiendas;",
    "•  proponerle un día para quedar y decirle qué le vas a cocinar;",
    "•  despedirte.",
  ]
));

children.push(spacer(200));
children.push(new Paragraph({ children: [new TextRun({ text: "RESPUESTA MODELO — TAREA 1", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(80));
[
  "¡Hola, Alicia!",
  "¡Qué alegría leerte! Pues sí, en mayo hice un curso de cocina italiana en una escuela del centro. Me apunté porque estaba cansada de comer siempre lo mismo y quería aprender a hacer pasta fresca de verdad.",
  "Aprendimos muchísimo: a preparar la masa, tres tipos de salsa y hasta tiramisú. El profesor era italiano y muy simpático. Te lo recomiendo totalmente, sobre todo si te gusta la cocina mediterránea. Además, los grupos son pequeños y practicas desde el primer día.",
  "¿Por qué no vienes a cenar a mi casa el sábado que viene? Te prepararé lasaña casera y de postre, tiramisú. ¡Ya verás qué rica!",
  "Contéstame cuando puedas.",
  "Un beso muy fuerte,",
  "Marta",
].forEach(l => children.push(bodyPara(l, { italic: true })));

children.push(spacer(200));
children.push(writingPrompt(
  "2",
  "Redacción — elige UNA de las dos opciones",
  "~35 minutos · 130-150 palabras",
  [
    "OPCIÓN 1 — Lee este mensaje publicado en un blog de viajes:",
    "",
    "«En nuestro blog estamos recopilando experiencias de nuestros lectores sobre viajes que no salieron como estaban planeados. Cuéntanos qué pasó: a veces los mejores recuerdos nacen de los planes que fallan.»",
    "",
    "Escribe un comentario para enviar al blog en el que cuentes:",
    "•  adónde viajabas y con quién;",
    "•  qué problema o imprevisto ocurrió;",
    "•  cómo lo solucionasteis;",
    "•  por qué lo recuerdas de forma especial.",
    "",
    "─────────────────────────────────",
    "",
    "OPCIÓN 2 — Lee este mensaje de la página web de tu escuela de español:",
    "",
    "«Queremos mejorar nuestras actividades culturales. Invitamos a todos los estudiantes a participar en el foro: contadnos a qué actividades habéis asistido este curso, cuáles os han gustado más y qué proponéis para el año que viene.»",
    "",
    "Redacta un texto para enviar al foro en el que deberás:",
    "•  presentarte;",
    "•  decir a qué actividades asististe este curso;",
    "•  explicar cuáles te gustaron más y cuáles menos, y por qué;",
    "•  proponer actividades nuevas para el próximo curso.",
  ]
));

children.push(spacer(200));
children.push(new Paragraph({ children: [new TextRun({ text: "RESPUESTA MODELO — TAREA 2 (OPCIÓN 1)", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(80));
[
  "El verano pasado mi mejor amiga y yo viajamos a Menorca. Lo teníamos todo organizado: hotel junto a la playa, excursiones en barco y hasta las cenas reservadas.",
  "Pero al llegar al aeropuerto descubrimos que nuestra maleta se había perdido. Allí estábamos, con la ropa puesta y poco más. Al principio nos enfadamos muchísimo, claro. La compañía nos dijo que la maleta llegaría «en dos o tres días».",
  "¿La solución? Compramos dos camisetas y un bañador en un mercadillo del puerto y decidimos no dejar que aquello nos estropeara el viaje. Resultó que sin tantas cosas vivimos unas vacaciones mucho más sencillas y divertidas: playa por la mañana, paseos por la tarde y risas todo el día.",
  "Lo recuerdo de forma especial porque aprendí que los problemas, con buena compañía, se convierten en anécdotas.",
].forEach(l => children.push(bodyPara(l, { italic: true })));

// ═════════════════════════════════════════════════════════════════════════════
// PRUEBA 4: EXPRESIÓN E INTERACCIÓN ORALES — 4 tareas
// ═════════════════════════════════════════════════════════════════════════════
children.push(sectionBreak());
children.push(pruebaBanner("4", "EXPRESIÓN E INTERACCIÓN ORALES", "2E5C1E"));
children.push(spacer(160));
children.push(bodyPara("Preparación: 15 minutos (tareas 1 y 2) · Examen: 15 minutos · 4 tareas · 25% de la nota final", { bold: true, color: MID_GRAY }));
children.push(spacer(80));
children.push(tipBox("Durante la preparación puedes tomar notas y hacer un esquema, pero NO puedes leerlo durante el examen. Estructura siempre tu exposición: introducción, desarrollo y conclusión."));
children.push(spacer(160));

children.push(oralCard("TAREA 1 · Presentación breve — 2-3 minutos", [
  { text: "Elige UNO de los dos temas y prepara una exposición. El entrevistador no intervendrá en esta parte.", italic: true },
  { text: "" },
  { text: "TEMA A: Una persona importante en tu vida", bold: true, color: NAVY },
  { text: "Incluye información sobre: quién es y qué relación tienes con ella · cómo es física y personalmente · por qué es importante para ti · una experiencia que hayáis vivido juntos · cómo crees que será vuestra relación en el futuro.", italic: true },
  { text: "" },
  { text: "TEMA B: Tu trabajo o tus estudios ideales", bold: true, color: NAVY },
  { text: "Incluye información sobre: qué trabajo o estudios te gustaría tener y por qué · desde cuándo te interesa · qué necesitas hacer para conseguirlo · qué ventajas e inconvenientes tendría · experiencias de personas que conozcas con ese trabajo o esos estudios.", italic: true },
  { text: "" },
  { text: "No olvides: diferenciar introducción, desarrollo y conclusión · ordenar y relacionar bien las ideas · justificar tus opiniones.", color: MID_GRAY, italic: true },
]));
children.push(spacer(160));

children.push(oralCard("TAREA 2 · Conversación sobre el tema — 3-4 minutos", [
  { text: "Conversarás con el entrevistador sobre el tema de la Tarea 1.", italic: true },
  { text: "" },
  { text: "Ejemplos de preguntas del entrevistador (Tema A):", bold: true, color: NAVY },
  { text: "• ¿Se parece usted a esa persona? ¿En qué?" },
  { text: "• ¿Con qué frecuencia se ven o hablan?" },
  { text: "• ¿Qué cualidades valora más en las personas? ¿Por qué?" },
  { text: "" },
  { text: "Ejemplos de preguntas del entrevistador (Tema B):", bold: true, color: NAVY },
  { text: "• ¿Qué es más importante para usted: ganar mucho dinero o disfrutar del trabajo?" },
  { text: "• ¿Cree que estudiará o trabajará en otro país en el futuro?" },
  { text: "• ¿Qué profesiones cree que serán más necesarias dentro de veinte años?" },
]));
children.push(spacer(160));

children.push(oralCard("TAREA 3 · Describir una fotografía — 2-3 minutos", [
  { text: "Describe con detalle, durante 1 o 2 minutos, lo que ves en la foto y lo que imaginas que está ocurriendo. Después el entrevistador te hará algunas preguntas.", italic: true },
  { text: "" },
  { text: "[FOTOGRAFÍA: Un mercado al aire libre. Una vendedora de fruta atiende a una clienta mayor que lleva un carrito de la compra. Alrededor hay otros puestos y gente paseando.]", bold: true, color: MID_GRAY, italic: true },
  { text: "" },
  { text: "Aspectos que puedes comentar:", bold: true, color: NAVY },
  { text: "• Las personas: dónde están, cómo son, qué hacen." },
  { text: "• El lugar: cómo es, qué se vende." },
  { text: "• Los objetos: qué hay, dónde están." },
  { text: "• Qué relación crees que existe entre estas personas y de qué hablan." },
  { text: "" },
  { text: "Ejemplos de preguntas del entrevistador:", bold: true, color: NAVY },
  { text: "• ¿Suele usted comprar en mercados como este? ¿Por qué?" },
  { text: "• ¿Qué diferencias hay entre comprar en un mercado y en un supermercado?" },
  { text: "• ¿Cómo son los mercados de su país?" },
]));
children.push(spacer(160));

children.push(oralCard("TAREA 4 · Diálogo en situación simulada — 2-3 minutos", [
  { text: "Imagina que el entrevistador es el recepcionista de un hotel. Habla con él siguiendo estas indicaciones.", italic: true },
  { text: "" },
  { text: "SITUACIÓN: Llegaste anoche a un hotel donde habías reservado una habitación tranquila con vistas al mar. Sin embargo, te han dado una habitación interior, pequeña y muy ruidosa, y apenas has podido dormir. Decides ir a la recepción para quejarte.", bold: true, color: NAVY },
  { text: "" },
  { text: "Durante la conversación debes:", bold: true, color: NAVY },
  { text: "• explicar cuál es el problema con la habitación;" },
  { text: "• recordar qué tipo de habitación habías reservado;" },
  { text: "• pedir que te cambien de habitación;" },
  { text: "• quejarte y pedir otra solución si dicen que no es posible." },
  { text: "" },
  { text: "Ejemplos de intervenciones del entrevistador:", bold: true, color: NAVY },
  { text: "• «Buenos días, ¿en qué puedo ayudarle?»", italic: true },
  { text: "• «Déjeme comprobar su reserva… ¿Me dice su nombre, por favor?»", italic: true },
  { text: "• «Lo siento, ahora mismo el hotel está completo…»", italic: true },
]));

// ═════════════════════════════════════════════════════════════════════════════
// TRANSCRIPCIONES
// ═════════════════════════════════════════════════════════════════════════════
children.push(sectionBreak());
children.push(pruebaBanner("AUDIO", "TRANSCRIPCIONES — PRUEBA 2", LIGHT_NAVY));
children.push(spacer(160));
children.push(bodyPara("Estas son las transcripciones de los audios de la Prueba 2. Los audios grabados están disponibles en el reproductor online: spanishmercedes.com/audio-dele-b1 — allí puedes escucharlos y leer las transcripciones a la vez.", { italic: true }));
children.push(spacer(100));
children.push(audioButton("Escuchar todos los audios — Reproductor online"));
children.push(spacer(120));

function transcripcion(titulo, lineas) {
  children.push(new Paragraph({ children: [new TextRun({ text: titulo, bold: true, color: NAVY, size: 22, font: "Calibri" })] }));
  children.push(spacer(60));
  lineas.forEach(l => children.push(bodyPara(l)));
  children.push(spacer(140));
}

transcripcion("TAREA 1 — Seis mensajes de voz", [
  "Mensaje 1 — HOMBRE: Hola, Marina, soy Sergio. Te llamo porque el sábado que viene celebro mi cumpleaños en casa, nada formal, una cena con los amigos de siempre. Me haría mucha ilusión que vinieras. Es a partir de las nueve. Confírmame si puedes, ¿vale? ¡Un beso!",
  "Mensaje 2 — MUJER: Buenos días, este mensaje es para Alberto Ríos. Le llamamos de la gestoría Sanz. Ya tenemos preparado el contrato de alquiler. Necesitamos que lo firme y nos lo devuelva esta misma semana, puede mandárnoslo escaneado por correo electrónico. Gracias.",
  "Mensaje 3 — MUJER: Hola, buenas tardes. Llamamos de la Clínica Dental Sonrisa. Le recordamos que tiene cita con el doctor Vega mañana jueves a las cinco y media de la tarde. Si no puede venir, por favor avísenos con tiempo. Muchas gracias.",
  "Mensaje 4 — MUJER: ¡Hola, hermanito! Soy Nuria. Oye, que al final nos vamos el viernes al pueblo y volvemos el lunes. ¿Te importaría pasarte por mi casa y darle de comer a Michu? Ya sabes dónde dejo la llave. Con una vez al día es suficiente. ¡Te debo una cena! Gracias, de verdad.",
  "Mensaje 5 — HOMBRE: Diego, soy papá. Mira, me acaba de llamar el mecánico y dice que el coche ya está arreglado. Yo no puedo ir hoy porque salgo tarde de la oficina. ¿Puedes pasarte tú esta tarde a recogerlo antes de que cierren a las ocho? Ya está pagado todo. Luego hablamos.",
  "Mensaje 6 — MUJER: Pablo, soy Carmen. Que ya he comprado las entradas para el cine de mañana por internet, así que no hace falta hacer cola. Eso sí, la película empieza a las siete en punto y ya sabes cómo eres… ¡no llegues tarde, por favor! Nos vemos en la puerta a menos cuarto.",
]);

transcripcion("TAREA 2 — Monólogo de Valentina", [
  "MUJER: Me llamo Valentina, soy de Sevilla y llevo ocho años viviendo en Ciudad de México. Vine porque la empresa donde trabajaba me ofreció un puesto en su oficina mexicana, y acepté casi sin pensarlo, aunque mi familia al principio no entendía la decisión. Lo primero que me impresionó al llegar fue lo enorme que es la ciudad: en mi primer fin de semana intenté recorrerla a pie, ¡qué ingenua! Al final aprendí a moverme en metro como todo el mundo. Estuve cinco años en aquella empresa, pero hace tres decidí independizarme y monté mi propia consultora con una socia mexicana, y la verdad es que no puedo estar más contenta. Con la comida tuve una historia curiosa: yo no estaba acostumbrada al picante, pero me gustó tanto la cocina de aquí que me apunté a clases y ahora preparo unos chiles en nogada que ya quisieran muchos restaurantes. Lo más duro de estos años fue la primera Navidad: toda mi familia reunida en Sevilla y yo aquí sola, lo pasé fatal, no paré de llorar por videollamada. Pero todo cambió cuando empecé a hacer amigos de verdad. Ahora tengo un grupo de amigos mexicanos que son como una segunda familia: celebramos juntos los cumpleaños, los buenos momentos y también los malos. Por eso, cuando me preguntan si volveré a España, ya no sé qué contestar.",
]);

transcripcion("TAREA 3 — Seis noticias", [
  "Noticia 1 — LOCUTOR: La nueva biblioteca municipal abrirá finalmente sus puertas el próximo mes de octubre, tras dos años de obras. El edificio, de cuatro plantas, contará con salas de estudio, una zona infantil y un auditorio para presentaciones de libros. El horario será de lunes a sábado.",
  "Noticia 2 — LOCUTOR: Mañana comienza el festival de teatro de calle, que este año celebra su décima edición. Durante cuatro días, más de treinta compañías, todas ellas nacionales, llenarán de espectáculos las plazas del casco antiguo. Todas las actuaciones serán gratuitas.",
  "Noticia 3 — LOCUTOR: El cocinero Andrés Soler ha sido galardonado en París con el premio al mejor chef europeo del año, un reconocimiento que recibe por primera vez un cocinero de nuestra región. Soler, que regenta su restaurante en el mercado viejo, dedicó el premio a su madre, de quien aprendió a cocinar.",
  "Noticia 4 — LOCUTOR: Desde hoy puede visitarse la exposición «Mar adentro», con más de cien fotografías históricas de la vida de los pescadores. La muestra, organizada por el museo provincial, se exhibe en el centro cultural del puerto y permanecerá abierta hasta finales de mes. La entrada es libre.",
  "Noticia 5 — LOCUTOR: Y en deportes, victoria agónica del equipo de baloncesto de la ciudad, que ayer ganó su partido con una canasta espectacular en el último segundo. Con este triunfo, el equipo se clasifica para las semifinales, que se disputarán dentro de dos semanas.",
  "Noticia 6 — LOCUTOR: En cuanto al tiempo, hoy seguiremos con cielos despejados y temperaturas agradables. Eso sí, atención al fin de semana: se esperan lluvias intensas tanto el sábado como el domingo, así que si tienen planes al aire libre, mejor cambiarlos.",
]);

transcripcion("TAREA 4 — Seis personas hablan de sus vacaciones", [
  "Persona 1 — MUJER: ¿Mis vacaciones más inolvidables? Hace dos veranos, en Galicia. Habíamos alquilado una casa rural por las fotos de internet: piscina, jardín precioso… Pues llegamos y nada que ver: la piscina llevaba años vacía y las habitaciones olían a humedad. Pedimos que nos devolvieran el dinero y acabamos en un hostal del pueblo, que por cierto era encantador.",
  "Persona 2 — HOMBRE: Yo nunca olvidaré el viaje a Ibiza con mis amigos al acabar el instituto. El segundo día me apunté a una clase de buceo sin haberlo hecho nunca, ¡con el miedo que me daba a mí el mar! Y resultó que me encantó. Tanto que ahora tengo el título de buceador y voy siempre que puedo.",
  "Persona 3 — MUJER: Pues mira, yo el año pasado fui a la boda de mi prima en Argentina. Fue un viaje larguísimo, pero no podíamos faltar: era la primera boda en la familia en muchos años y estábamos todos invitados. Fue precioso reencontrarme con mis tíos y primos después de tanto tiempo.",
  "Persona 4 — HOMBRE: Mi peor anécdota fue en Roma. Segundo día de viaje, en el autobús del centro, me distraje un momento con el móvil haciendo fotos y, cuando fui a pagar en una cafetería… la cartera había desaparecido. Documentos, tarjetas, dinero, todo. Me pasé la tarde en comisaría en vez de viendo el Coliseo.",
  "Persona 5 — MUJER: El verano pasado volví al pueblo de mis abuelos, donde pasaba todos los veranos de pequeña. Hacía más de veinte años que no iba. Pasee por las mismas calles, me bañé en el mismo río… Fue muy emocionante, no había cambiado casi nada, hasta la panadería seguía siendo de la misma familia.",
  "Persona 6 — HOMBRE: ¿Vacaciones complicadas? Las del año pasado. Teníamos planeada una semana de senderismo en los Pirineos, con las rutas estudiadas y todo. Pues llegamos y empezó a llover… y no paró en cinco días. Al final dejamos la montaña y nos fuimos a San Sebastián: museos, pintxos y paseos con paraguas. Distinto, pero estupendo.",
]);

transcripcion("TAREA 5 — Conversación entre Isabel y Fernando", [
  "ISABEL: ¡Fernando! Ya tengo los resultados de la búsqueda. El vuelo del viernes a las seis de la tarde es el más barato. ¿Lo reservo?",
  "FERNANDO: Perfecto, ese mismo. Oye, ¿y el hotel? He visto uno baratísimo, pero está a las afueras de Lisboa.",
  "ISABEL: Uy, no, mira, yo prefiero pagar un poco más y estar en el centro. Son solo treinta euros más por persona y nos ahorramos transportes y tiempo.",
  "FERNANDO: Bueno, visto así tienes razón. Tú que controlas más de hoteles, ¿te encargas de la reserva?",
  "ISABEL: Vale, esta noche lo reservo yo. Ah, y tenemos que comprar las entradas para el espectáculo de fado, que se agotan enseguida. Mi compañera de trabajo me lo advirtió: ella se quedó sin verlas.",
  "FERNANDO: De eso me ocupo yo, que ya he visto una página donde venden las entradas oficiales. ¿Y qué más quieres visitar? Yo había pensado el barrio de Alfama y, por supuesto, probar los famosos pasteles de Belém.",
  "ISABEL: ¡Sí, sí, los pasteles son obligatorios! Pero una cosa, Fernando: no quiero un viaje con horarios para todo. Me gustaría dejar alguna tarde libre, sin nada planeado, para pasear y perdernos por ahí.",
  "FERNANDO: Totalmente de acuerdo. Lo mejor de viajar es improvisar de vez en cuando. Bueno, pues ya casi lo tenemos todo, ¿no?",
  "ISABEL: Casi. Solo falta decidir cómo vamos al aeropuerto… ¡pero eso lo hablamos mañana con un café!",
]);

// ═════════════════════════════════════════════════════════════════════════════
// SOLUCIONES
// ═════════════════════════════════════════════════════════════════════════════
children.push(sectionBreak());
children.push(pruebaBanner("SOLUCIONES", "CLAVE DE RESPUESTAS", GOLD));
children.push(spacer(160));

children.push(new Paragraph({ children: [new TextRun({ text: "PRUEBA 1 — COMPRENSIÓN DE LECTURA", bold: true, color: NAVY, size: 24, font: "Calibri" })] }));
children.push(spacer(80));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 1 (Preguntas 1-6) — Persona → Anuncio:", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[1,"A"],[2,"C"],[3,"D"],[4,"F"],[5,"G"],[6,"B"]]));
children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 2 (Preguntas 7-12):", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[7,"b"],[8,"a"],[9,"b"],[10,"c"],[11,"b"],[12,"b"]]));
children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 3 (Preguntas 13-18) — ¿Qué persona?", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[13,"A"],[14,"B"],[15,"C"],[16,"A"],[17,"B"],[18,"C"]]));
children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 4 (Preguntas 19-24) — Fragmentos:", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[19,"A"],[20,"B"],[21,"D"],[22,"C"],[23,"E"],[24,"F"]]));
children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 5 (Preguntas 25-30) — Gramática:", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[25,"a"],[26,"b"],[27,"a"],[28,"c"],[29,"b"],[30,"a"]]));

children.push(spacer(200));
children.push(new Paragraph({ children: [new TextRun({ text: "PRUEBA 2 — COMPRENSIÓN AUDITIVA", bold: true, color: NAVY, size: 24, font: "Calibri" })] }));
children.push(spacer(80));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 1 (Preguntas 1-6):", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[1,"a"],[2,"b"],[3,"c"],[4,"a"],[5,"a"],[6,"b"]]));
children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 2 (Preguntas 7-12):", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[7,"a"],[8,"b"],[9,"b"],[10,"b"],[11,"a"],[12,"a"]]));
children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 3 (Preguntas 13-18):", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[13,"a"],[14,"c"],[15,"b"],[16,"b"],[17,"b"],[18,"b"]]));
children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 4 (Preguntas 19-24) — Persona → Enunciado:", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[19,"C"],[20,"G"],[21,"H"],[22,"I"],[23,"J"],[24,"D"]]));
children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 5 (Preguntas 25-30) — A=Isabel / B=Fernando / C=Ninguno:", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[25,"A"],[26,"C"],[27,"A"],[28,"B"],[29,"A"],[30,"C"]]));

// Scoring guide
children.push(spacer(200));
children.push(new Paragraph({ children: [new TextRun({ text: "GUÍA DE PUNTUACIÓN", bold: true, color: NAVY, size: 24, font: "Calibri" })] }));
children.push(spacer(80));

const scoringData = [
  ["PRUEBA", "PUNTUACIÓN MÁXIMA", "MÍNIMO RECOMENDADO", "TU PUNTUACIÓN"],
  ["Prueba 1: Comprensión de lectura", "25 puntos", "15 puntos (18/30 aciertos)", "_____ / 25"],
  ["Prueba 2: Comprensión auditiva", "25 puntos", "15 puntos (18/30 aciertos)", "_____ / 25"],
  ["Prueba 3: Expresión escrita", "25 puntos", "15 puntos", "_____ / 25"],
  ["Prueba 4: Expresión oral", "25 puntos", "15 puntos", "_____ / 25"],
  ["TOTAL", "100 puntos", "60 puntos", "_____ / 100"],
];
const colWidths4 = [Math.round(CONTENT_W * 0.35), Math.round(CONTENT_W * 0.18), Math.round(CONTENT_W * 0.27), Math.round(CONTENT_W * 0.2)];
children.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: colWidths4,
  rows: scoringData.map((row, ri) => new TableRow({
    children: row.map((cell, ci) => new TableCell({
      borders,
      width: { size: colWidths4[ci], type: WidthType.DXA },
      shading: { fill: ri === 0 ? NAVY : ri === 5 ? GOLD_LIGHT : (ri % 2 === 0 ? VERY_LIGHT : WHITE), type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: cell, font: "Calibri", size: 17, bold: ri === 0 || ri === 5, color: ri === 0 ? WHITE : DARK_GRAY })] })]
    }))
  }))
}));
children.push(spacer(160));
children.push(solutionBox("RECUERDA: En el DELE B1 oficial, las pruebas se agrupan en dos bloques (Grupo 1: Lectura + Escrita; Grupo 2: Auditiva + Oral). Necesitas un mínimo de 30 puntos sobre 50 en CADA grupo para obtener el APTO. Si en este examen de práctica superas el 60% en todas las pruebas, tienes muy buenas opciones de aprobar el examen real."));

children.push(spacer(200));
children.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [CONTENT_W],
  rows: [new TableRow({ children: [new TableCell({
    borders: noBorders,
    width: { size: CONTENT_W, type: WidthType.DXA },
    shading: { fill: TEAL_DARK, type: ShadingType.CLEAR },
    margins: { top: 300, bottom: 300, left: 400, right: 400 },
    children: [
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "¿Quieres preparar el DELE B1 con Mercedes?", bold: true, color: GOLD, size: 26, font: "Georgia" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [new TextRun({ text: "Clases personalizadas · Material exclusivo · Simulacros de examen", color: "9AD8CF", size: 20, font: "Calibri" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [new TextRun({ text: "www.spanishmercedes.com", color: WHITE, size: 22, font: "Calibri", bold: true })] }),
    ]
  })] })]
}));

// Build
const doc = new Document({
  styles: { default: { document: { run: { font: "Calibri", size: 20, color: DARK_GRAY } } } },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 851, right: 851, bottom: 851, left: 851 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: GOLD } },
          children: [
            new TextRun({ text: "EXAMEN DE PRÁCTICA DELE B1  ·  ", font: "Calibri", size: 16, color: MID_GRAY }),
            new TextRun({ text: "spanishmercedes.com", font: "Calibri", size: 16, color: NAVY, bold: true })
          ]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: GOLD } },
          children: [
            new TextRun({ text: "Página ", font: "Calibri", size: 16, color: MID_GRAY }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 16, color: NAVY }),
            new TextRun({ text: " de ", font: "Calibri", size: 16, color: MID_GRAY }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Calibri", size: 16, color: NAVY }),
            new TextRun({ text: "  ·  Spanish Lessons with Mercedes  ·  Material de uso educativo", font: "Calibri", size: 14, color: MID_GRAY }),
          ]
        })]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  if (!fs.existsSync("DESCARGABLES_PDF/DELE_B1")) fs.mkdirSync("DESCARGABLES_PDF/DELE_B1", { recursive: true });
  const outPath = "DESCARGABLES_PDF/DELE_B1/EXAMEN_PRACTICA_DELE_B1.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Created:", outPath, "Size:", buffer.length, "bytes");
}).catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});
