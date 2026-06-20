const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
        VerticalAlign, PageNumber, Header, Footer, PageBreak,
        ExternalHyperlink, ImageRun } = require('docx');
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
const LIGHT_GRAY = "EEEEEE";

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

// Content width A4 with 1.5cm margins each side
// A4 = 11906 DXA, margins 1.5cm = ~851 DXA each, content ≈ 9204 DXA
const CONTENT_W = 9204;

function spacer(size = 120) {
  return new Paragraph({ children: [new TextRun("")], spacing: { before: size, after: size } });
}

function sectionBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// Cover page header band
function coverBand() {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [
      new TableRow({
        children: [new TableCell({
          borders: noBorders,
          width: { size: CONTENT_W, type: WidthType.DXA },
          shading: { fill: NAVY, type: ShadingType.CLEAR },
          margins: { top: 400, bottom: 400, left: 500, right: 500 },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "EXAMEN DE PRÁCTICA · DELE B2", bold: true, color: GOLD, size: 36, font: "Georgia" })]
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "Spanish Lessons with Mercedes", color: WHITE, size: 22, font: "Calibri" })]
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "spanishmercedes.com", color: "9AB3D0", size: 18, font: "Calibri" })]
            }),
          ]
        })]
      })
    ]
  });
}

function pruebaBanner(number, title, color = NAVY) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({
      children: [new TableCell({
        borders: noBorders,
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { fill: color, type: ShadingType.CLEAR },
        margins: { top: 250, bottom: 250, left: 500, right: 500 },
        children: [
          new Paragraph({
            children: [new TextRun({ text: `PRUEBA ${number}`, bold: true, color: GOLD, size: 22, font: "Calibri" })]
          }),
          new Paragraph({
            children: [new TextRun({ text: title, bold: true, color: WHITE, size: 30, font: "Georgia" })]
          })
        ]
      })]
    })]
  });
}

function tareaHeader(number, title, tiempo, preguntas) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({
      children: [new TableCell({
        borders: { top: noBorder, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 16, color: GOLD }, right: noBorder },
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { fill: GOLD_LIGHT, type: ShadingType.CLEAR },
        margins: { top: 160, bottom: 160, left: 300, right: 300 },
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: `TAREA ${number}`, bold: true, color: GOLD, size: 18, font: "Calibri" }),
              new TextRun({ text: `   ·   ${tiempo}   ·   ${preguntas}`, color: MID_GRAY, size: 18, font: "Calibri" })
            ]
          }),
          new Paragraph({
            children: [new TextRun({ text: title, bold: true, color: NAVY, size: 22, font: "Calibri" })]
          })
        ]
      })]
    })]
  });
}

function tipBox(text) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({
      children: [new TableCell({
        borders: { top: noBorder, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 16, color: RED }, right: noBorder },
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { fill: RED_LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 300, right: 300 },
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "TIP MERCEDES · ", bold: true, color: RED, size: 18, font: "Calibri" }),
              new TextRun({ text: text, color: DARK_GRAY, size: 18, font: "Calibri" })
            ]
          })
        ]
      })]
    })]
  });
}

function solutionBox(text) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({
      children: [new TableCell({
        borders: { top: noBorder, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 16, color: NAVY }, right: noBorder },
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { fill: VERY_LIGHT, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 300, right: 300 },
        children: [
          new Paragraph({
            children: [new TextRun({ text: text, color: DARK_GRAY, size: 18, font: "Calibri" })]
          })
        ]
      })]
    })]
  });
}

function audioButton(label, url) {
  // Audio instruction box — shows URL as plain text (no hyperlink, avoids SSL issues)
  const btnW = CONTENT_W;
  // Extract the path after the domain for display
  const displayPath = "spanishmercedes.com/audio-dele-b2";
  return new Table({
    width: { size: btnW, type: WidthType.DXA },
    columnWidths: [Math.round(btnW * 0.08), Math.round(btnW * 0.92)],
    rows: [new TableRow({
      children: [
        new TableCell({
          borders: noBorders,
          width: { size: Math.round(btnW * 0.08), type: WidthType.DXA },
          shading: { fill: GOLD, type: ShadingType.CLEAR },
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 160, bottom: 160, left: 120, right: 120 },
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "▶", font: "Calibri", size: 28, bold: true, color: WHITE })]
          })]
        }),
        new TableCell({
          borders: noBorders,
          width: { size: Math.round(btnW * 0.92), type: WidthType.DXA },
          shading: { fill: NAVY, type: ShadingType.CLEAR },
          margins: { top: 120, bottom: 120, left: 300, right: 200 },
          children: [
            new Paragraph({
              children: [new TextRun({ text: label, font: "Calibri", size: 20, bold: true, color: WHITE })]
            }),
            new Paragraph({
              spacing: { before: 40 },
              children: [
                new TextRun({ text: "Abre en el navegador: ", font: "Calibri", size: 17, color: "9AB3D0", italics: true }),
                new TextRun({ text: displayPath, font: "Calibri", size: 17, color: GOLD, bold: true }),
              ]
            }),
          ]
        }),
      ]
    })]
  });
}

function bodyPara(text, opts = {}) {
  return new Paragraph({
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
    spacing: { before: 60, after: 60 },
    children: [new TextRun({
      text,
      font: "Calibri",
      size: opts.size || 20,
      color: opts.color || DARK_GRAY,
      bold: opts.bold || false,
      italics: opts.italic || false
    })]
  });
}

function questionRow(num, question, options) {
  const half = Math.floor(CONTENT_W / 2);
  const labelW = 500;
  const qW = CONTENT_W - labelW;
  const optW = Math.floor(qW / 2);

  const rows = [
    new TableRow({
      children: [
        new TableCell({
          borders: noBorders,
          width: { size: labelW, type: WidthType.DXA },
          shading: { fill: NAVY, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: `${num}.`, bold: true, color: WHITE, size: 18, font: "Calibri" })]
          })]
        }),
        new TableCell({
          columnSpan: 2,
          borders: { top: border, bottom: noBorder, left: noBorder, right: noBorder },
          width: { size: qW, type: WidthType.DXA },
          margins: { top: 80, bottom: 40, left: 150, right: 150 },
          children: [new Paragraph({
            children: [new TextRun({ text: question, font: "Calibri", size: 18, color: DARK_GRAY })]
          })]
        })
      ]
    })
  ];

  // Two-column options row
  if (options && options.length) {
    const pairRows = [];
    for (let i = 0; i < options.length; i += 2) {
      const left = options[i];
      const right = options[i + 1];
      pairRows.push(new TableRow({
        children: [
          new TableCell({
            borders: noBorders,
            width: { size: labelW, type: WidthType.DXA },
            shading: { fill: NAVY, type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun("")] })]
          }),
          new TableCell({
            borders: right ? { top: noBorder, bottom: i >= options.length - 2 ? border : noBorder, left: noBorder, right: noBorder } : { top: noBorder, bottom: border, left: noBorder, right: noBorder },
            width: { size: optW, type: WidthType.DXA },
            margins: { top: 40, bottom: 40, left: 150, right: 80 },
            children: [new Paragraph({
              children: [new TextRun({
                text: left,
                font: "Calibri", size: 18,
                color: left.startsWith("a)") ? RED : left.startsWith("b)") ? NAVY : GOLD,
                bold: false
              })]
            })]
          }),
          new TableCell({
            borders: { top: noBorder, bottom: i >= options.length - 2 ? border : noBorder, left: noBorder, right: noBorder },
            width: { size: qW - optW, type: WidthType.DXA },
            margins: { top: 40, bottom: 40, left: 80, right: 150 },
            children: [new Paragraph({
              children: [new TextRun({
                text: right || "",
                font: "Calibri", size: 18,
                color: right && right.startsWith("b)") ? NAVY : right && right.startsWith("c)") ? MID_GRAY : "",
                bold: false
              })]
            })]
          })
        ]
      }));
    }
    pairRows.forEach(r => rows.push(r));
  }

  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [labelW, optW, qW - optW],
    rows
  });
}

function writingPrompt(num, title, time, instructions, text) {
  const rows = [
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
  ];
  if (text) {
    rows.push(new TableRow({ children: [new TableCell({
      borders: { top: { style: BorderStyle.SINGLE, size: 2, color: GOLD }, bottom: noBorder, left: noBorder, right: noBorder },
      width: { size: CONTENT_W, type: WidthType.DXA },
      margins: { top: 180, bottom: 180, left: 400, right: 400 },
      children: text.map(t => new Paragraph({ spacing: { before: 60, after: 60 }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: t, font: "Calibri", size: 18, color: DARK_GRAY, italics: true })] }))
    })] }));
  }
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [CONTENT_W], rows });
}

function answerKey(pairs) {
  const cols = 4;
  const colW = Math.floor(CONTENT_W / cols);
  const tableRows = [];
  const headerRow = new TableRow({
    children: Array.from({ length: cols }, (_, i) => new TableCell({
      borders: noBorders,
      width: { size: colW, type: WidthType.DXA },
      shading: { fill: NAVY, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ["Pregunta", "Respuesta", "Pregunta", "Respuesta"][i], bold: true, color: WHITE, size: 16, font: "Calibri" })] })]
    }))
  });
  tableRows.push(headerRow);

  for (let i = 0; i < pairs.length; i += 2) {
    const p1 = pairs[i];
    const p2 = pairs[i + 1];
    tableRows.push(new TableRow({
      children: [
        new TableCell({ borders: { top: noBorder, bottom: border, left: noBorder, right: border }, width: { size: colW, type: WidthType.DXA }, shading: { fill: VERY_LIGHT, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: p1 ? `${p1[0]}` : "", bold: true, font: "Calibri", size: 18, color: NAVY })] })] }),
        new TableCell({ borders: { top: noBorder, bottom: border, left: border, right: border }, width: { size: colW, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: p1 ? `${p1[1]}` : "", bold: true, font: "Calibri", size: 18, color: RED })] })] }),
        new TableCell({ borders: { top: noBorder, bottom: border, left: border, right: border }, width: { size: colW, type: WidthType.DXA }, shading: { fill: VERY_LIGHT, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: p2 ? `${p2[0]}` : "", bold: true, font: "Calibri", size: 18, color: NAVY })] })] }),
        new TableCell({ borders: { top: noBorder, bottom: border, left: border, right: noBorder }, width: { size: colW, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: p2 ? `${p2[1]}` : "", bold: true, font: "Calibri", size: 18, color: RED })] })] }),
      ]
    }));
  }

  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [colW, colW, colW, colW], rows: tableRows });
}

// ─────────────────────────────────────────────────────────────────────────────
// BUILD DOCUMENT
// ─────────────────────────────────────────────────────────────────────────────
const children = [];

// ── COVER ────────────────────────────────────────────────────────────────────
children.push(coverBand());
children.push(spacer(300));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "EXAMEN COMPLETO DE PRÁCTICA", bold: true, color: NAVY, size: 32, font: "Georgia" })]
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Diploma de Español · Nivel B2", color: MID_GRAY, size: 24, font: "Calibri" })]
}));
children.push(spacer(200));

// Stats table
children.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [CONTENT_W / 4, CONTENT_W / 4, CONTENT_W / 4, CONTENT_W / 4].map(v => Math.round(v)),
  rows: [
    new TableRow({
      children: [
        ["4", "PRUEBAS"],
        ["210'", "TOTAL"],
        ["66", "PREGUNTAS"],
        ["25%", "CADA PRUEBA"]
      ].map(([val, label]) => new TableCell({
        borders: noBorders,
        width: { size: Math.round(CONTENT_W / 4), type: WidthType.DXA },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 100, right: 100 },
        children: [
          new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: val, bold: true, color: GOLD, size: 44, font: "Georgia" })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: label, color: "9AB3D0", size: 16, font: "Calibri" })] })
        ]
      }))
    })
  ]
}));

children.push(spacer(300));
children.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [CONTENT_W / 4, CONTENT_W / 4, CONTENT_W / 4, CONTENT_W / 4].map(v => Math.round(v)),
  rows: [new TableRow({
    children: [
      ["PRUEBA 1", "Comprensión de lectura", "70 min · 36 preguntas", NAVY],
      ["PRUEBA 2", "Comprensión auditiva", "40 min · 30 preguntas", LIGHT_NAVY],
      ["PRUEBA 3", "Expresión escrita", "80 min · 2 tareas", "8B0000"],
      ["PRUEBA 4", "Expresión oral", "20+20 min · 3 tareas", "2E5C1E"]
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
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Material de práctica preparado por Mercedes · www.spanishmercedes.com", color: MID_GRAY, size: 16, font: "Calibri", italics: true })]
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Este examen sigue el formato oficial del DELE B2 del Instituto Cervantes", color: MID_GRAY, size: 16, font: "Calibri", italics: true })]
}));

// ── PRUEBA 1: COMPRENSIÓN DE LECTURA ─────────────────────────────────────────
children.push(sectionBreak());
children.push(pruebaBanner("1", "COMPRENSIÓN DE LECTURA", NAVY));
children.push(spacer(160));
children.push(bodyPara("Tiempo disponible: 70 minutos · 4 tareas · 36 preguntas · 25% de la nota final", { bold: true, color: MID_GRAY }));
children.push(spacer(80));
children.push(tipBox("Lee primero las preguntas, luego el texto. Las respuestas siguen el orden del texto. Gestiona tu tiempo: unos 17-18 minutos por tarea."));

// TAREA 1.1
children.push(spacer(200));
children.push(tareaHeader("1", "Localizar información específica en un texto", "~17 min", "6 preguntas"));
children.push(spacer(100));
children.push(bodyPara("Lee el siguiente artículo sobre la transformación digital en España y contesta las preguntas 1-6. Selecciona la opción correcta (a, b o c)."));
children.push(spacer(100));

const texto1 = [
  "LA TRANSFORMACIÓN DIGITAL EN ESPAÑA",
  "",
  "En los últimos años, España ha experimentado una profunda transformación digital que ha afectado a todos los sectores de la economía. Según el Índice de Economía y Sociedad Digitales (DESI) de la Unión Europea, España se sitúa en la posición 11 entre los 27 Estados miembros, por encima de la media europea en conectividad e integración de tecnología digital en las empresas.",
  "",
  "El sector servicios ha liderado esta transformación. Empresas como las del sector turístico han adoptado plataformas digitales para gestionar reservas, atención al cliente y marketing. Los hoteles utilizan sistemas de inteligencia artificial para personalizar la experiencia del huésped, mientras que las agencias de viaje han migrado casi completamente al entorno online.",
  "",
  "Sin embargo, no todo es positivo. La brecha digital sigue siendo un problema significativo, especialmente entre la población mayor de 65 años y en zonas rurales con escasa cobertura de banda ancha. El Gobierno ha puesto en marcha el Plan de Recuperación 'España Digital 2025' con una inversión prevista de 70.000 millones de euros para cerrar esta brecha.",
  "",
  "El teletrabajo, impulsado por la pandemia de 2020, también ha dejado una huella permanente. Según datos del INE, el 16% de los trabajadores españoles realiza su actividad de forma remota, una cifra que duplica la registrada antes de la pandemia, aunque sigue siendo inferior a la media europea del 22%.",
  "",
  "La ciberseguridad emerge como uno de los mayores desafíos. España registró un aumento del 43% en ciberataques durante 2023, lo que ha llevado al Gobierno a reforzar el Centro Nacional de Ciberseguridad y a aprobar legislación específica para proteger las infraestructuras críticas.",
];

texto1.forEach((line, i) => {
  if (i === 0) {
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: line, bold: true, font: "Calibri", size: 20, color: NAVY })]
    }));
  } else if (line === "") {
    children.push(spacer(40));
  } else {
    children.push(bodyPara(line));
  }
});

children.push(spacer(160));

const q1 = [
  ["1.", "Según el artículo, ¿en qué posición se sitúa España en el índice DESI de la UE?", ["a) En la 7ª posición", "b) En la 11ª posición", "c) En la 15ª posición"]],
  ["2.", "¿Qué sector ha liderado la transformación digital en España?", ["a) El sector industrial", "b) El sector servicios", "c) El sector agrario"]],
  ["3.", "¿Cuánto dinero ha previsto invertir el Gobierno en el Plan 'España Digital 2025'?", ["a) 7.000 millones de euros", "b) 700 millones de euros", "c) 70.000 millones de euros"]],
  ["4.", "¿Qué porcentaje de trabajadores españoles trabaja de forma remota según el INE?", ["a) El 22%", "b) El 16%", "c) El 32%"]],
  ["5.", "¿En cuánto aumentaron los ciberataques en España durante 2023?", ["a) Un 34%", "b) Un 43%", "c) Un 53%"]],
  ["6.", "¿Cuál de los siguientes es un problema mencionado en el texto?", ["a) La falta de empresas tecnológicas", "b) La brecha digital en mayores y zonas rurales", "c) El exceso de inversión en tecnología"]],
];

q1.forEach(([num, question, options]) => {
  children.push(questionRow(num, question, [options[0], options[1], options[2], ""]));
  children.push(spacer(60));
});

// TAREA 1.2
children.push(spacer(200));
children.push(tareaHeader("2", "Relacionar textos con afirmaciones", "~17 min", "10 preguntas"));
children.push(spacer(100));
children.push(bodyPara("A continuación leerás cuatro textos (A, B, C, D) sobre el cambio climático. Indica en qué texto (A, B, C o D) se dice lo que aparece en cada enunciado (7-16). Los textos pueden repetirse."));
children.push(spacer(100));

const textos2 = [
  { letra: "A", titulo: "El cambio climático y la agricultura", texto: "La actividad agrícola española se enfrenta a retos sin precedentes. Las sequías cada vez más frecuentes han obligado a los agricultores del sur de la Península a reconvertir sus cultivos, apostando por variedades más resistentes a la falta de agua. El olivar y el almendro ganan terreno frente a cultivos tradicionales como el cereal. La tecnología de riego por goteo se ha convertido en una solución esencial para maximizar el rendimiento con menos recursos hídricos." },
  { letra: "B", titulo: "Ciudades inteligentes frente al calor", texto: "Los ayuntamientos de las principales ciudades españolas han implementado planes de adaptación al calor urbano. Madrid y Sevilla han aumentado su superficie arbolada en un 15% en los últimos cinco años. Se han instalado sistemas de nebulización en espacios públicos y se han reformado edificios municipales para mejorar su eficiencia energética. Los expertos advierten que sin estas medidas, la mortalidad por olas de calor podría aumentar significativamente en las próximas décadas." },
  { letra: "C", titulo: "El turismo y el medioambiente", texto: "El sector turístico es una de las principales fuentes de ingresos de España, pero también uno de los mayores emisores de CO2 del país. Las líneas de crucero y la aviación comercial concentran el mayor impacto ambiental. Sin embargo, está emergiendo un nuevo modelo de turismo sostenible que prioriza el transporte terrestre, el alojamiento local y el consumo de productos de proximidad. Este enfoque no solo reduce la huella de carbono sino que también distribuye mejor la riqueza entre las comunidades locales." },
  { letra: "D", titulo: "Energías renovables en expansión", texto: "España se ha convertido en uno de los líderes europeos en energía solar y eólica. En 2023, las energías renovables cubrieron el 50,3% de la demanda eléctrica nacional, superando por primera vez el umbral del 50%. La inversión privada en parques solares se ha disparado, especialmente en Extremadura, Castilla-La Mancha y Murcia. El Gobierno ha fijado el objetivo de alcanzar el 74% de electricidad renovable en 2030, en línea con los compromisos del Acuerdo de París." },
];

textos2.forEach(({ letra, titulo, texto }) => {
  children.push(new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [600, CONTENT_W - 600],
    rows: [new TableRow({
      children: [
        new TableCell({
          borders: noBorders,
          width: { size: 600, type: WidthType.DXA },
          shading: { fill: NAVY, type: ShadingType.CLEAR },
          margins: { top: 120, bottom: 120, left: 100, right: 100 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `TEXTO ${letra}`, bold: true, color: GOLD, size: 22, font: "Georgia" })] })]
        }),
        new TableCell({
          borders: { top: border, bottom: border, left: noBorder, right: border },
          width: { size: CONTENT_W - 600, type: WidthType.DXA },
          margins: { top: 120, bottom: 120, left: 200, right: 200 },
          children: [
            new Paragraph({ children: [new TextRun({ text: titulo, bold: true, color: NAVY, size: 18, font: "Calibri" })] }),
            new Paragraph({ spacing: { before: 60 }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: texto, font: "Calibri", size: 18, color: DARK_GRAY })] })
          ]
        })
      ]
    })]
  }));
  children.push(spacer(80));
});

children.push(spacer(100));

const afirmaciones = [
  ["7.", "Se menciona una solución tecnológica para ahorrar agua."],
  ["8.", "Se habla de los objetivos del Gobierno para 2030."],
  ["9.", "Se menciona el efecto del turismo en las comunidades locales."],
  ["10.", "Se habla de medidas para reducir la mortalidad en verano."],
  ["11.", "Se menciona que las renovables superaron el 50% de la demanda."],
  ["12.", "Se habla de cambios en los tipos de cultivos."],
  ["13.", "Se menciona la importancia del transporte sostenible."],
  ["14.", "Se habla de reformas en edificios públicos."],
  ["15.", "Se menciona la distribución de la riqueza."],
  ["16.", "Se habla del impacto ambiental de cruceros y aviones."],
];

afirmaciones.forEach(([num, text]) => {
  const textW = Math.round(CONTENT_W * 0.75);
  const ansW = CONTENT_W - textW;
  children.push(new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [textW, ansW],
    rows: [new TableRow({
      children: [
        new TableCell({ borders: { top: noBorder, bottom: border, left: noBorder, right: noBorder }, width: { size: textW, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [new Paragraph({ children: [new TextRun({ text: `${num}  ${text}`, font: "Calibri", size: 18, color: DARK_GRAY })] })] }),
        new TableCell({ borders: { top: noBorder, bottom: border, left: border, right: noBorder }, width: { size: ansW, type: WidthType.DXA }, shading: { fill: VERY_LIGHT, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A  /  B  /  C  /  D", font: "Calibri", size: 18, color: MID_GRAY })] })] }),
      ]
    })]
  }));
});

// TAREA 1.3
children.push(spacer(200));
children.push(tareaHeader("3", "Seleccionar fragmentos para completar un texto", "~17 min", "6 preguntas"));
children.push(spacer(100));
children.push(bodyPara("Lee el siguiente artículo sobre la inteligencia artificial. Hay seis párrafos numerados (17-22) donde faltan fragmentos. Selecciona el fragmento correspondiente (a-i) para cada espacio. Hay tres fragmentos que no debes utilizar."));
children.push(spacer(100));

const texto3 = [
  { num: "17.", antes: "La inteligencia artificial ha pasado de ser una promesa futurista a convertirse en una realidad cotidiana.", falta: "[_____]", despues: " Desde los asistentes de voz hasta los sistemas de recomendación de plataformas de streaming, la IA está presente en nuestra vida diaria." },
  { num: "18.", antes: "En el ámbito médico, los avances han sido especialmente notables.", falta: "[_____]", despues: " Los algoritmos de aprendizaje profundo han demostrado ser capaces de detectar ciertos tipos de cáncer con mayor precisión que los especialistas humanos." },
  { num: "19.", antes: "Sin embargo, el desarrollo de la IA plantea importantes dilemas éticos.", falta: "[_____]", despues: " Los expertos debaten sobre cómo garantizar que estos sistemas sean transparentes y justos." },
  { num: "20.", antes: "El mercado laboral es uno de los ámbitos más afectados.", falta: "[_____]", despues: " Al mismo tiempo, también se crearán nuevos empleos relacionados con el desarrollo y mantenimiento de estas tecnologías." },
  { num: "21.", antes: "Europa ha tomado la delantera en la regulación de la inteligencia artificial.", falta: "[_____]", despues: " Esta normativa establece diferentes categorías de riesgo y requisitos de transparencia para los sistemas de IA." },
  { num: "22.", antes: "El futuro de la inteligencia artificial depende de las decisiones que tomemos hoy.", falta: "[_____]", despues: " Solo así podremos aprovechar los beneficios de esta tecnología sin perder de vista los valores humanos." },
];

texto3.forEach(({ num, antes, falta, despues }) => {
  children.push(new Paragraph({
    spacing: { before: 80, after: 80 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text: `${num}  `, bold: true, font: "Calibri", size: 18, color: NAVY }),
      new TextRun({ text: antes, font: "Calibri", size: 18, color: DARK_GRAY }),
      new TextRun({ text: ` ${falta} `, bold: true, font: "Calibri", size: 18, color: RED }),
      new TextRun({ text: despues, font: "Calibri", size: 18, color: DARK_GRAY }),
    ]
  }));
});

children.push(spacer(100));
const fragmentos = [
  "a) La Unión Europea aprobó en 2024 el primer reglamento mundial sobre inteligencia artificial.",
  "b) Algunos expertos predicen que la IA podría automatizar entre el 15% y el 30% de los puestos de trabajo actuales.",
  "c) La tecnología se ha integrado de forma tan profunda en nuestras rutinas que muchas veces ni la percibimos.",
  "d) Uno de los principales problemas es el sesgo algorítmico, que puede perpetuar discriminaciones existentes.",
  "e) Los sistemas de diagnóstico por imagen son uno de los avances más prometedores.",
  "f) Necesitamos establecer marcos legales claros, fomentar la educación digital y promover el debate social.",
  "g) Los robots industriales llevan décadas sustituyendo trabajos físicos repetitivos.",
  "h) Las universidades han multiplicado sus programas de formación en ciencia de datos.",
  "i) Inversores de todo el mundo han apostado por startups especializadas en machine learning.",
];

fragmentos.forEach(f => children.push(bodyPara(f)));

// TAREA 1.4
children.push(spacer(200));
children.push(tareaHeader("4", "Elegir la opción gramaticalmente correcta", "~17 min", "14 preguntas"));
children.push(spacer(100));
children.push(bodyPara("Lee el siguiente texto y selecciona la opción (a, b o c) que corresponda a cada espacio numerado (23-36)."));
children.push(spacer(100));

const texto4lines = [
  "La gastronomía española es mucho más que una forma de alimentarse: es una expresión cultural (23)_____ refleja la historia, el carácter y la diversidad de sus gentes.",
  "Desde las tapas andaluzas (24)_____ el cocido madrileño, pasando por la paella valenciana y el pintxo vasco, cada región del país ha desarrollado una identidad culinaria propia.",
  "Este rico patrimonio ha sido reconocido internacionalmente. De hecho, España cuenta (25)_____ más restaurantes con estrellas Michelin que prácticamente cualquier otro país europeo.",
  "Chefs como Ferran Adrià revolucionaron la cocina mundial al (26)_____ técnicas científicas a la alta gastronomía.",
  "Pero la gastronomía española no (27)_____ solo de alta cocina. En el día a día, los mercados tradicionales siguen siendo el corazón de la alimentación local.",
  "El mercado de La Boqueria en Barcelona o el Mercado Central de Valencia atraen tanto a residentes como a turistas (28)_____ buscan productos frescos de temporada.",
  "La dieta mediterránea, (29)_____ fue declarada Patrimonio Inmaterial de la Humanidad por la UNESCO, es considerada una de las más saludables del mundo.",
  "Sus pilares son el aceite de oliva, las legumbres, el pescado y la fruta fresca, aunque los hábitos alimentarios (30)_____ cambiando en los últimos años.",
];

texto4lines.forEach(line => {
  children.push(bodyPara(line));
  children.push(spacer(40));
});

children.push(spacer(100));

const gramQuestions = [
  ["23.", "a) que  b) quien  c) cual"],
  ["24.", "a) hasta  b) desde  c) hacia"],
  ["25.", "a) de  b) con  c) en"],
  ["26.", "a) aplicar  b) aplicando  c) aplique"],
  ["27.", "a) se trata  b) trata  c) es tratada"],
  ["28.", "a) quienes  b) que  c) los que"],
  ["29.", "a) la que  b) quien  c) que"],
  ["30.", "a) están  b) han estado  c) estén"],
];

gramQuestions.forEach(([num, opts]) => {
  const parts = opts.split("  ");
  children.push(questionRow(num, "", [parts[0], parts[1], parts[2], ""]));
  children.push(spacer(40));
});

// ── PRUEBA 2: COMPRENSIÓN AUDITIVA ───────────────────────────────────────────
children.push(sectionBreak());
children.push(pruebaBanner("2", "COMPRENSIÓN AUDITIVA", LIGHT_NAVY));
children.push(spacer(160));
children.push(bodyPara("Tiempo disponible: 40 minutos · 5 tareas · 27 preguntas · 25% de la nota final", { bold: true, color: MID_GRAY }));
children.push(spacer(80));
children.push(tipBox("Escucha dos veces cada audio antes de responder. La transcripción NO forma parte de este cuadernillo. Accede a los audios y transcripciones en: spanishmercedes.com/audio-dele-b2"));
children.push(spacer(140));
children.push(audioButton("▶  Abrir reproductor de audio — Prueba 2 completa", "http://spanishmercedes.com/audio-dele-b2.html"));
children.push(spacer(100));

// ── TAREA 1: 6 conversaciones breves ─────────────────────────────────────────
children.push(spacer(80));
children.push(tareaHeader("1", "Conversaciones breves — opción correcta", "~10 min", "6 preguntas (1-6)"));
children.push(spacer(100));
children.push(bodyPara("Escucharás 6 conversaciones breves. Para cada una, selecciona la opción (a, b o c) que mejor responde a la pregunta."));
children.push(spacer(80));
children.push(audioButton("▶  Escuchar Tarea 1 — Conversaciones", "http://spanishmercedes.com/audio-dele-b2.html#t1-section"));
children.push(spacer(140));

const qT1 = [
  ["1.", "¿Qué le ha ocurrido a la mujer?",
    ["a) Ha tenido un conflicto con un compañero.", "b) No ha obtenido el ascenso que esperaba.", "c) Le han comunicado un cambio de departamento."]],
  ["2.", "¿Qué quiere hacer el hijo?",
    ["a) Cambiar de especialidad universitaria.", "b) Dejar la carrera y montar su propio negocio.", "c) Irse a trabajar al extranjero."]],
  ["3.", "¿De qué se queja principalmente la primera vecina?",
    ["a) Del coste elevado de las reformas del edificio.", "b) De que las reuniones no llegan a acuerdos concretos.", "c) De la actitud del administrador de la finca."]],
  ["4.", "¿Qué le aconseja la amiga respecto a la oferta de trabajo?",
    ["a) Que consulte con su pareja antes de decidir.", "b) Que no la acepte para proteger su relación.", "c) Que acepte la oferta sin dudarlo."]],
  ["5.", "¿Cuál es la postura del hombre respecto a la reforma laboral?",
    ["a) Le parece positiva porque facilitará el empleo.", "b) Cree que genera inseguridad para los trabajadores.", "c) Afecta sobre todo a las pequeñas empresas."]],
  ["6.", "¿Por qué busca la mujer a Carlos?",
    ["a) Para pedirle disculpas por un malentendido.", "b) Para decirle que ya no puede cuidar a su perro.", "c) Para recomendarle una guardería para animales."]],
];

qT1.forEach(([num, question, options]) => {
  children.push(questionRow(num, question, [options[0], options[1], options[2], ""]));
  children.push(spacer(60));
});

// ── TAREA 2: conversación larga (A/B/Ninguno) ────────────────────────────────
children.push(spacer(200));
children.push(tareaHeader("2", "Conversación — ¿A quién corresponde?", "~8 min", "6 preguntas (7-12)"));
children.push(spacer(100));
children.push(bodyPara("Escucharás una conversación entre Pablo y Cristina. Indica a quién corresponde cada afirmación: A (Pablo), B (Cristina) o C (Ninguno de los dos)."));
children.push(spacer(80));
children.push(audioButton("▶  Escuchar Tarea 2 — Pablo y Cristina", "http://spanishmercedes.com/audio-dele-b2.html#t2-section"));
children.push(spacer(140));

const afirmacionesT2 = [
  ["7.", "Se ha mudado de ciudad recientemente."],
  ["8.", "Tiene pareja actualmente."],
  ["9.", "Sus ingresos actuales son irregulares."],
  ["10.", "Ha realizado formación adicional después de la carrera."],
  ["11.", "Trabaja en el sector para el que estudió en la universidad."],
  ["12.", "Está satisfecho/a con su situación laboral actual."],
];

const tW = Math.round(CONTENT_W * 0.72);
const aN = CONTENT_W - tW;
afirmacionesT2.forEach(([num, text]) => {
  children.push(new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [tW, aN],
    rows: [new TableRow({
      children: [
        new TableCell({ borders: { top: noBorder, bottom: border, left: noBorder, right: noBorder }, width: { size: tW, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [new Paragraph({ children: [new TextRun({ text: `${num}  ${text}`, font: "Calibri", size: 18, color: DARK_GRAY })] })] }),
        new TableCell({ borders: { top: noBorder, bottom: border, left: border, right: noBorder }, width: { size: aN, type: WidthType.DXA }, shading: { fill: VERY_LIGHT, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A   /   B   /   C", font: "Calibri", size: 18, color: MID_GRAY })] })] }),
      ]
    })]
  }));
  children.push(spacer(20));
});

// ── TAREA 3: entrevista — seleccionar opción ──────────────────────────────────
children.push(spacer(200));
children.push(tareaHeader("3", "Entrevista — seleccionar opción correcta", "~8 min", "5 preguntas (13-17)"));
children.push(spacer(100));
children.push(bodyPara("Escucharás una entrevista radiofónica con una emprendedora. Selecciona la opción (a, b o c) correcta para las preguntas 13-17."));
children.push(spacer(80));
children.push(audioButton("▶  Escuchar Tarea 3 — Entrevista", "http://spanishmercedes.com/audio-dele-b2.html#t3-section"));
children.push(spacer(140));

const qT3 = [
  ["13.", "¿Qué motivó a Marta a crear su empresa?",
    ["a) Una experiencia personal con un familiar.", "b) Un estudio de mercado sobre moda sostenible.", "c) Un proyecto de fin de carrera en diseño."]],
  ["14.", "¿Qué dificultad señala Marta al comienzo de su proyecto?",
    ["a) No encontraba trabajadores especializados.", "b) Carecía de formación en gestión empresarial.", "c) No disponía de capital para invertir al inicio."]],
  ["15.", "¿Qué caracteriza a los productos de \"Inclúyeme\"?",
    ["a) Son visualmente distintos a la ropa convencional.", "b) Incorporan adaptaciones técnicas que apenas se notan.", "c) Están fabricados con materiales sostenibles."]],
  ["16.", "¿Cuál es actualmente el principal canal de venta?",
    ["a) Tiendas físicas especializadas.", "b) Centros de rehabilitación y asociaciones.", "c) La venta por internet y redes sociales."]],
  ["17.", "¿Qué expansión está planificando la empresa?",
    ["a) Abrir tiendas en las principales ciudades españolas.", "b) Entrar en mercados europeos próximos a España.", "c) Crear una franquicia de distribución internacional."]],
];

qT3.forEach(([num, question, options]) => {
  children.push(questionRow(num, question, [options[0], options[1], options[2], ""]));
  children.push(spacer(60));
});

// ── TAREA 4: 6 personas — emparejar con enunciado (A-J) ─────────────────────
children.push(spacer(200));
children.push(tareaHeader("4", "Seis personas hablan — relacionar con enunciado", "~8 min", "6 preguntas (18-23)"));
children.push(spacer(100));
children.push(bodyPara("Escucharás a seis personas hablar sobre cómo mantener la motivación al aprender un idioma. Relaciona cada persona (18-23) con uno de los enunciados (A-J). Cuatro enunciados no se utilizan."));
children.push(spacer(80));
children.push(audioButton("▶  Escuchar Tarea 4 — Seis personas", "http://spanishmercedes.com/audio-dele-b2.html#t4-section"));
children.push(spacer(120));

// Enunciados A-J
children.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [Math.round(CONTENT_W/2), Math.round(CONTENT_W/2)],
  rows: [
    new TableRow({ children: [
      new TableCell({ borders: noBorders, width: { size: Math.round(CONTENT_W/2), type: WidthType.DXA }, margins: { top: 60, bottom: 40, left: 80, right: 80 },
        children: [
          new Paragraph({ children: [new TextRun({ text: "ENUNCIADOS", bold: true, color: NAVY, size: 18, font: "Calibri" })] }),
          new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: "A. Establecer objetivos concretos y alcanzables.", font: "Calibri", size: 17, color: DARK_GRAY })] }),
          new Paragraph({ children: [new TextRun({ text: "B. Aprender del contenido cultural del idioma.", font: "Calibri", size: 17, color: DARK_GRAY })] }),
          new Paragraph({ children: [new TextRun({ text: "C. Contar con una estructura de estudio formal.", font: "Calibri", size: 17, color: DARK_GRAY })] }),
          new Paragraph({ children: [new TextRun({ text: "D. Perder el miedo a cometer errores.", font: "Calibri", size: 17, color: DARK_GRAY })] }),
          new Paragraph({ children: [new TextRun({ text: "E. Integrar el idioma en la rutina diaria.", font: "Calibri", size: 17, color: DARK_GRAY })] }),
        ]
      }),
      new TableCell({ borders: noBorders, width: { size: Math.round(CONTENT_W/2), type: WidthType.DXA }, margins: { top: 60, bottom: 40, left: 80, right: 80 },
        children: [
          new Paragraph({ children: [new TextRun({ text: " ", font: "Calibri", size: 18 })] }),
          new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: "F. Practicar con hablantes nativos.", font: "Calibri", size: 17, color: DARK_GRAY })] }),
          new Paragraph({ children: [new TextRun({ text: "G. Centrarse primero en la gramática.", font: "Calibri", size: 17, color: DARK_GRAY })] }),
          new Paragraph({ children: [new TextRun({ text: "H. Usar aplicaciones móviles de idiomas.", font: "Calibri", size: 17, color: DARK_GRAY })] }),
          new Paragraph({ children: [new TextRun({ text: "I. Hacer cursos intensivos en el extranjero.", font: "Calibri", size: 17, color: DARK_GRAY })] }),
          new Paragraph({ children: [new TextRun({ text: "J. Buscar motivación en los logros profesionales.", font: "Calibri", size: 17, color: DARK_GRAY })] }),
        ]
      }),
    ]}),
  ]
}));
children.push(spacer(100));

const personasT4 = [
  ["18.", "Lucía (Persona 1)"],
  ["19.", "Marcos (Persona 2)"],
  ["20.", "Sofía (Persona 3)"],
  ["21.", "Ana (Persona 4)"],
  ["22.", "Roberto (Persona 5)"],
  ["23.", "Carmen (Persona 6)"],
];

const pW = Math.round(CONTENT_W * 0.72);
const pN = CONTENT_W - pW;
personasT4.forEach(([num, nombre]) => {
  children.push(new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [pW, pN],
    rows: [new TableRow({
      children: [
        new TableCell({ borders: { top: noBorder, bottom: border, left: noBorder, right: noBorder }, width: { size: pW, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [new Paragraph({ children: [new TextRun({ text: `${num}  ${nombre}`, font: "Calibri", size: 18, color: DARK_GRAY })] })] }),
        new TableCell({ borders: { top: noBorder, bottom: border, left: border, right: noBorder }, width: { size: pN, type: WidthType.DXA }, shading: { fill: VERY_LIGHT, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A  B  C  D  E  F  G  H  I  J", font: "Calibri", size: 16, color: MID_GRAY })] })] }),
      ]
    })]
  }));
  children.push(spacer(20));
});

// ── TAREA 5: monólogo — seleccionar opción ────────────────────────────────────
children.push(spacer(200));
children.push(tareaHeader("5", "Monólogo — seleccionar opción correcta", "~6 min", "4 preguntas (24-27)"));
children.push(spacer(100));
children.push(bodyPara("Escucharás el monólogo de una emprendedora hablando sobre su trayectoria profesional. Selecciona la opción (a, b o c) correcta para las preguntas 24-27."));
children.push(spacer(80));
children.push(audioButton("▶  Escuchar Tarea 5 — Monólogo", "http://spanishmercedes.com/audio-dele-b2.html#t5-section"));
children.push(spacer(140));

const qT5 = [
  ["24.", "¿Qué observación llevó a esta empresaria a crear su empresa?",
    ["a) El descontento con su trabajo anterior en logística.", "b) Un problema de distribución que detectó en su comunidad.", "c) Una idea de negocio surgida durante sus estudios."]],
  ["25.", "¿Con qué recursos contó para empezar?",
    ["a) Con financiación de una entidad bancaria.", "b) Con sus ahorros y un préstamo familiar.", "c) Con una subvención pública para emprendedores."]],
  ["26.", "¿Qué caracteriza al equipo de \"Entrega Justa\"?",
    ["a) Está formado principalmente por ingenieros en logística.", "b) Una parte importante son personas en situación de vulnerabilidad.", "c) Todos provienen del sector del transporte de mercancías."]],
  ["27.", "Según la empresaria, ¿cuál es su principal ventaja competitiva?",
    ["a) Ofrecer precios más bajos que la competencia.", "b) Contar con tecnología de distribución innovadora.", "c) Que los clientes también valoran el impacto social de la empresa."]],
];

const q23 = qT5; // kept as q23 for loop below
q23.forEach(([num, question, options]) => {
  children.push(questionRow(num, question, [options[0], options[1], options[2], ""]));
  children.push(spacer(60));
});

// ── PRUEBA 3: EXPRESIÓN ESCRITA ───────────────────────────────────────────────
children.push(sectionBreak());
children.push(pruebaBanner("3", "EXPRESIÓN E INTERACCIÓN ESCRITAS", "8B0000"));
children.push(spacer(160));
children.push(bodyPara("Tiempo disponible: 80 minutos · 2 tareas · 25% de la nota final", { bold: true, color: MID_GRAY }));
children.push(spacer(80));
children.push(tipBox("Tarea 1: Texto formal de 150-180 palabras (40 min). Tarea 2: Texto de opinión de 150-180 palabras (40 min). Cuida la cohesión, el registro y la variedad de estructuras."));
children.push(spacer(160));

children.push(writingPrompt(
  "1",
  "Carta formal o informe",
  "40 minutos · 150-180 palabras",
  [
    "Has leído el siguiente anuncio en la web del Ayuntamiento de tu ciudad:",
    "",
    "\"El Ayuntamiento convoca a los ciudadanos a presentar propuestas para mejorar el barrio. Las propuestas seleccionadas recibirán financiación de hasta 10.000 euros. Plazo de presentación: 30 días.\"",
    "",
    "Escribe una carta al Ayuntamiento en la que:",
    "• Te presentes y expliques por qué escribes.",
    "• Describas un problema concreto de tu barrio.",
    "• Propongas una solución detallada.",
    "• Expliques los beneficios de tu propuesta para la comunidad.",
    "",
    "Recuerda usar un registro formal. Incluye saludo, cuerpo y despedida adecuados.",
  ],
  null
));

children.push(spacer(200));

// Model answer for Tarea 3.1
children.push(new Paragraph({ children: [new TextRun({ text: "RESPUESTA MODELO — TAREA 1", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(80));
const cartaModelo = [
  "Estimado/a Sr./Sra. Alcalde/sa:",
  "",
  "Me dirijo a usted en calidad de vecino/a del barrio de San Andrés para presentar una propuesta en el marco de la convocatoria municipal de mejora de barrios.",
  "",
  "En nuestra zona existe un grave problema de falta de zonas verdes. El único parque del barrio lleva más de dos años sin mantenimiento, con bancos rotos y ausencia total de iluminación nocturna. Esta situación afecta especialmente a las familias con niños y a las personas mayores.",
  "",
  "Mi propuesta consiste en rehabilitar el parque municipal de la calle Esperanza mediante la sustitución del mobiliario urbano deteriorado, la instalación de iluminación led solar y la plantación de árboles de bajo mantenimiento. Asimismo, propongo la creación de un huerto comunitario que fomente la participación vecinal.",
  "",
  "Esta actuación beneficiaría a más de 3.000 vecinos, reduciría el calor urbano en verano y contribuiría a fortalecer el tejido social del barrio.",
  "",
  "Quedo a su disposición para ampliar la información que considere necesaria.",
  "",
  "Atentamente,",
  "[Nombre del/la candidato/a]",
];

cartaModelo.forEach(line => {
  if (line === "") { children.push(spacer(40)); }
  else { children.push(bodyPara(line, { italic: line.startsWith("Estimado") || line.startsWith("Atentamente") ? false : false })); }
});

children.push(spacer(200));

children.push(writingPrompt(
  "2",
  "Texto de opinión — ensayo argumentativo",
  "40 minutos · 150-180 palabras",
  [
    "Has leído el siguiente titular en un periódico digital:",
    "",
    "\"Los videojuegos: ¿entretenimiento inocente o amenaza para la juventud?\"",
    "",
    "Escribe un texto de opinión para el mismo periódico en el que:",
    "• Expliques tu posición sobre el tema.",
    "• Presentes argumentos a favor de los videojuegos como herramienta positiva.",
    "• Menciones los posibles riesgos y cómo pueden prevenirse.",
    "• Concluyas con una reflexión personal.",
    "",
    "Puedes estar a favor, en contra o presentar una visión equilibrada. Usa conectores discursivos y un registro semiformal.",
  ],
  null
));

children.push(spacer(200));
children.push(new Paragraph({ children: [new TextRun({ text: "RESPUESTA MODELO — TAREA 2", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(80));
const ensayoModelo = [
  "Los videojuegos, a menudo criticados como una distracción improductiva, son en realidad una herramienta con un potencial enorme si se utilizan de forma responsable.",
  "",
  "En primer lugar, numerosos estudios demuestran que los videojuegos mejoran habilidades cognitivas como la concentración, la toma de decisiones y la resolución de problemas. Los juegos de estrategia, en particular, fomentan el pensamiento crítico y la planificación a largo plazo. Además, los juegos en línea desarrollan competencias sociales, ya que requieren trabajo en equipo y comunicación en tiempo real.",
  "",
  "No obstante, es innegable que un uso excesivo puede generar adicción, sedentarismo y alteraciones del sueño. Por ello, es fundamental que padres y educadores establezcan límites de tiempo y seleccionen contenidos adecuados a la edad.",
  "",
  "En conclusión, los videojuegos no son ni buenos ni malos por sí mismos: depende del uso que hagamos de ellos. Con supervisión adecuada, pueden convertirse en una herramienta valiosa para el desarrollo intelectual y social de los jóvenes.",
];

ensayoModelo.forEach(line => {
  if (line === "") { children.push(spacer(60)); }
  else { children.push(bodyPara(line)); }
});

// ── PRUEBA 4: EXPRESIÓN ORAL ───────────────────────────────────────────────────
children.push(sectionBreak());
children.push(pruebaBanner("4", "EXPRESIÓN E INTERACCIÓN ORALES", "2E5C1E"));
children.push(spacer(160));
children.push(bodyPara("Tiempo de preparación: 20 minutos · Tiempo de presentación: 20 minutos · 3 tareas · 25% de la nota final", { bold: true, color: MID_GRAY }));
children.push(spacer(80));
children.push(tipBox("En la Tarea 1 y 2, habla durante al menos 6-8 minutos. Usa conectores, ejemplos y expresa tu opinión con argumentos. El examinador puede hacerte preguntas de seguimiento."));
children.push(spacer(160));

// Tarea 4.1
children.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [CONTENT_W],
  rows: [new TableRow({ children: [new TableCell({
    borders: { top: noBorder, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 20, color: "2E5C1E" }, right: noBorder },
    width: { size: CONTENT_W, type: WidthType.DXA },
    shading: { fill: "F0FFF0", type: ShadingType.CLEAR },
    margins: { top: 200, bottom: 200, left: 400, right: 400 },
    children: [
      new Paragraph({ children: [new TextRun({ text: "TAREA 1 · Exposición de un tema — 6-8 minutos", bold: true, color: "2E5C1E", size: 20, font: "Calibri" })] }),
      new Paragraph({ spacing: { before: 80 }, children: [new TextRun({ text: "Elige UNO de los dos temas y prepara una presentación estructurada.", font: "Calibri", size: 18, color: DARK_GRAY })] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "OPCIÓN A: El impacto de las redes sociales en las relaciones personales", bold: true, color: NAVY, size: 20, font: "Calibri" })] }),
      new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: "Habla sobre: cómo han cambiado las relaciones personales con las redes sociales · aspectos positivos y negativos · diferencias generacionales · tu experiencia personal.", font: "Calibri", size: 18, color: DARK_GRAY, italics: true })] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "OPCIÓN B: El envejecimiento de la población en España", bold: true, color: NAVY, size: 20, font: "Calibri" })] }),
      new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: "Habla sobre: causas del envejecimiento poblacional · consecuencias sociales y económicas · posibles soluciones · tu opinión sobre el sistema de pensiones.", font: "Calibri", size: 18, color: DARK_GRAY, italics: true })] }),
    ]
  })] })]
}));

children.push(spacer(160));

// Tarea 4.2
children.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [CONTENT_W],
  rows: [new TableRow({ children: [new TableCell({
    borders: { top: noBorder, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 20, color: "2E5C1E" }, right: noBorder },
    width: { size: CONTENT_W, type: WidthType.DXA },
    shading: { fill: "F0FFF0", type: ShadingType.CLEAR },
    margins: { top: 200, bottom: 200, left: 400, right: 400 },
    children: [
      new Paragraph({ children: [new TextRun({ text: "TAREA 2 · Comentar una imagen — 4-6 minutos", bold: true, color: "2E5C1E", size: 20, font: "Calibri" })] }),
      new Paragraph({ spacing: { before: 80 }, children: [new TextRun({ text: "Describe y comenta la fotografía. Relaciona lo que ves con el tema propuesto.", font: "Calibri", size: 18, color: DARK_GRAY })] }),
      new Paragraph({ spacing: { before: 120, after: 120 }, alignment: AlignmentType.CENTER, children: [new ImageRun({ type: "png", data: fs.readFileSync("images/B2_ORAL_IMAGE.png"), transformation: { width: 400, height: 300 } })] }),
      new Paragraph({ spacing: { before: 80 }, children: [new TextRun({ text: "Puntos para comentar:", bold: true, color: NAVY, size: 18, font: "Calibri" })] }),
      new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: "• ¿Qué ves en la imagen? Descríbela con detalle.", font: "Calibri", size: 18, color: DARK_GRAY })] }),
      new Paragraph({ children: [new TextRun({ text: "• ¿Qué tipo de relación tienen estas personas?", font: "Calibri", size: 18, color: DARK_GRAY })] }),
      new Paragraph({ children: [new TextRun({ text: "• ¿Cómo han cambiado las estructuras familiares en España?", font: "Calibri", size: 18, color: DARK_GRAY })] }),
      new Paragraph({ children: [new TextRun({ text: "• ¿Qué papel juega la familia en tu cultura?", font: "Calibri", size: 18, color: DARK_GRAY })] }),
    ]
  })] })]
}));

children.push(spacer(160));

// Tarea 4.3
children.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [CONTENT_W],
  rows: [new TableRow({ children: [new TableCell({
    borders: { top: noBorder, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 20, color: "2E5C1E" }, right: noBorder },
    width: { size: CONTENT_W, type: WidthType.DXA },
    shading: { fill: "F0FFF0", type: ShadingType.CLEAR },
    margins: { top: 200, bottom: 200, left: 400, right: 400 },
    children: [
      new Paragraph({ children: [new TextRun({ text: "TAREA 3 · Debate con el examinador — 4-5 minutos", bold: true, color: "2E5C1E", size: 20, font: "Calibri" })] }),
      new Paragraph({ spacing: { before: 80 }, children: [new TextRun({ text: "El examinador simulará posiciones contrarias. Defiende tu punto de vista con argumentos.", font: "Calibri", size: 18, color: DARK_GRAY })] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Tema: ¿Debería ser obligatorio el uso de uniformes en todos los colegios de España?", bold: true, color: NAVY, size: 20, font: "Calibri" })] }),
      new Paragraph({ spacing: { before: 80 }, children: [new TextRun({ text: "Posibles argumentos del examinador (practica respuestas):", bold: true, color: NAVY, size: 18, font: "Calibri" })] }),
      new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: "• \"El uniforme elimina las diferencias socioeconómicas entre alumnos.\"", font: "Calibri", size: 18, color: DARK_GRAY, italics: true })] }),
      new Paragraph({ children: [new TextRun({ text: "• \"Sin uniforme, los niños dedican demasiado tiempo a pensar en la ropa.\"", font: "Calibri", size: 18, color: DARK_GRAY, italics: true })] }),
      new Paragraph({ children: [new TextRun({ text: "• \"El uniforme favorece la identidad escolar y el sentido de pertenencia.\"", font: "Calibri", size: 18, color: DARK_GRAY, italics: true })] }),
      new Paragraph({ spacing: { before: 80 }, children: [new TextRun({ text: "Conectores útiles para el debate: sin embargo · no obstante · por otro lado · es cierto que... pero · en mi opinión · me parece que · no estoy de acuerdo porque", font: "Calibri", size: 18, color: MID_GRAY, italics: true })] }),
    ]
  })] })]
}));

// ── SOLUCIONES ─────────────────────────────────────────────────────────────────
children.push(sectionBreak());
children.push(pruebaBanner("SOLUCIONES", "CLAVE DE RESPUESTAS", GOLD));
children.push(spacer(160));

// Prueba 1 answers
children.push(new Paragraph({ children: [new TextRun({ text: "PRUEBA 1 — COMPRENSIÓN DE LECTURA", bold: true, color: NAVY, size: 24, font: "Calibri" })] }));
children.push(spacer(80));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 1 (Preguntas 1-6):", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[1,"b"],[2,"b"],[3,"c"],[4,"b"],[5,"b"],[6,"b"]]));
children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 2 (Preguntas 7-16) — ¿En qué texto?", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[7,"A"],[8,"D"],[9,"C"],[10,"B"],[11,"D"],[12,"A"],[13,"C"],[14,"B"],[15,"C"],[16,"C"]]));
children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 3 (Preguntas 17-22) — Fragmentos:", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[17,"c"],[18,"e"],[19,"d"],[20,"b"],[21,"a"],[22,"f"]]));
children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 4 (Preguntas 23-30) — Gramática:", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[23,"a"],[24,"b"],[25,"b"],[26,"b"],[27,"a"],[28,"b"],[29,"c"],[30,"a"]]));

// Prueba 2 answers
children.push(spacer(200));
children.push(new Paragraph({ children: [new TextRun({ text: "PRUEBA 2 — COMPRENSIÓN AUDITIVA", bold: true, color: NAVY, size: 24, font: "Calibri" })] }));
children.push(spacer(80));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 1 (Preguntas 1-6):", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[1,"b"],[2,"b"],[3,"b"],[4,"c"],[5,"b"],[6,"b"]]));
children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 2 (Preguntas 7-12) — A=Pablo / B=Cristina / C=Ninguno:", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[7,"A"],[8,"B"],[9,"A"],[10,"B"],[11,"C"],[12,"B"]]));
children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 3 (Preguntas 13-17):", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[13,"a"],[14,"c"],[15,"b"],[16,"c"],[17,"b"]]));
children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 4 (Preguntas 18-23) — Persona → Enunciado:", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[18,"A"],[19,"F"],[20,"E"],[21,"D"],[22,"C"],[23,"B"]]));
children.push(spacer(120));
children.push(new Paragraph({ children: [new TextRun({ text: "Tarea 5 (Preguntas 24-27):", bold: true, color: NAVY, size: 20, font: "Calibri" })] }));
children.push(spacer(60));
children.push(answerKey([[24,"b"],[25,"b"],[26,"b"],[27,"c"]]));

// Scoring guide
children.push(spacer(200));
children.push(new Paragraph({ children: [new TextRun({ text: "GUÍA DE PUNTUACIÓN", bold: true, color: NAVY, size: 24, font: "Calibri" })] }));
children.push(spacer(80));

const scoringData = [
  ["PRUEBA", "PUNTUACIÓN MÁXIMA", "MÍNIMO PARA APROBAR", "TU PUNTUACIÓN"],
  ["Prueba 1: Comprensión de lectura", "25 puntos", "10 puntos", "_____ / 25"],
  ["Prueba 2: Comprensión auditiva", "25 puntos", "10 puntos", "_____ / 25"],
  ["Prueba 3: Expresión escrita", "25 puntos", "10 puntos", "_____ / 25"],
  ["Prueba 4: Expresión oral", "25 puntos", "10 puntos", "_____ / 25"],
  ["TOTAL", "100 puntos", "Mínimo 60 + 10 en c/u", "_____ / 100"],
];

const colWidths4 = [Math.round(CONTENT_W * 0.35), Math.round(CONTENT_W * 0.2), Math.round(CONTENT_W * 0.25), Math.round(CONTENT_W * 0.2)];
const scoringRows = scoringData.map((row, ri) =>
  new TableRow({
    children: row.map((cell, ci) => new TableCell({
      borders,
      width: { size: colWidths4[ci], type: WidthType.DXA },
      shading: { fill: ri === 0 ? NAVY : ri === 5 ? GOLD_LIGHT : (ri % 2 === 0 ? VERY_LIGHT : WHITE), type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({
        children: [new TextRun({
          text: cell,
          font: "Calibri",
          size: 17,
          bold: ri === 0 || ri === 5,
          color: ri === 0 ? WHITE : DARK_GRAY
        })]
      })]
    }))
  })
);

children.push(new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: colWidths4, rows: scoringRows }));
children.push(spacer(160));
children.push(solutionBox("RECUERDA: Para aprobar el DELE B2 necesitas un mínimo de 60 puntos en total Y al menos 10 puntos en cada una de las 4 pruebas. Si suspendes una prueba aunque tengas 60 en total, no obtendrás el diploma."));

children.push(spacer(200));
children.push(new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [CONTENT_W],
  rows: [new TableRow({ children: [new TableCell({
    borders: noBorders,
    width: { size: CONTENT_W, type: WidthType.DXA },
    shading: { fill: NAVY, type: ShadingType.CLEAR },
    margins: { top: 300, bottom: 300, left: 400, right: 400 },
    children: [
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "¿Quieres preparar el DELE B2 con Mercedes?", bold: true, color: GOLD, size: 26, font: "Georgia" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [new TextRun({ text: "Clases personalizadas · Material exclusivo · Resultados garantizados", color: "9AB3D0", size: 20, font: "Calibri" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [new TextRun({ text: "www.spanishmercedes.com", color: WHITE, size: 22, font: "Calibri", bold: true })] }),
    ]
  })] })]
}));

// Build document
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 20, color: DARK_GRAY } }
    }
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 851, right: 851, bottom: 851, left: 851 } // ~1.5cm
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: GOLD } },
          children: [
            new TextRun({ text: "EXAMEN DE PRÁCTICA DELE B2  ·  ", font: "Calibri", size: 16, color: MID_GRAY }),
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
  const outPath = "DESCARGABLES_PDF/DELE_B2/EXAMEN_PRACTICA_DELE_B2.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Created:", outPath, "Size:", buffer.length, "bytes");
}).catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});
