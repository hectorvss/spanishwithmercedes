const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, BorderStyle, WidthType, ShadingType,
        VerticalAlign, PageNumber, Header, Footer, PageBreak } = require('docx');
const fs = require('fs');

const NAVY = "1C2A4A";
const GOLD = "D4920A";
const RED = "C8102E";
const TEAL = "2BBFA8";
const TEAL_DARK = "0D7A6A";
const CONTENT_W = 9204;

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function spacer(size = 120) {
  return new Paragraph({ children: [new TextRun("")], spacing: { before: size, after: size } });
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
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "EXAMEN DE PRÁCTICA · DELE C1", bold: true, color: GOLD, size: 36, font: "Georgia" })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Spanish Lessons with Mercedes", color: "FFFFFF", size: 22, font: "Calibri" })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "spanishmercedes.com", color: "9AB3D0", size: 18, font: "Calibri" })] }),
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
        new Paragraph({ children: [new TextRun({ text: title, bold: true, color: "FFFFFF", size: 30, font: "Georgia" })] })
      ]
    })] })]
  });
}

function tareaHeader(number, title, details = "") {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: noBorder, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 16, color: GOLD }, right: noBorder },
      width: { size: CONTENT_W, type: WidthType.DXA },
      shading: { fill: "FDF5E0", type: ShadingType.CLEAR },
      margins: { top: 160, bottom: 160, left: 300, right: 300 },
      children: [
        new Paragraph({
          children: [
            new TextRun({ text: `TAREA ${number}`, bold: true, color: GOLD, size: 18, font: "Calibri" }),
            new TextRun({ text: `   ·   ${details}`, color: "666666", size: 18, font: "Calibri" })
          ]
        }),
        new Paragraph({
          children: [new TextRun({ text: title, bold: true, color: NAVY, size: 22, font: "Calibri" })],
          spacing: { before: 60 }
        })
      ]
    })] })]
  });
}

function bodyPara(text, bold = false) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 360 },
    children: [new TextRun({ text, size: 22, font: "Calibri", bold })]
  });
}

function questionBox(num, question, options) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [1000, 8204],
    rows: [new TableRow({ children: [
      new TableCell({
        width: { size: 1000, type: WidthType.DXA },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        borders: noBorders,
        margins: { top: 60, bottom: 60, left: 60, right: 60 },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${num}`, bold: true, color: "FFFFFF", size: 20 })] })]
      }),
      new TableCell({
        width: { size: 8204, type: WidthType.DXA },
        borders: noBorders,
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
        children: [
          new Paragraph({ children: [new TextRun({ text: question, size: 22, bold: true })], spacing: { after: 80 } }),
          ...options.map(opt =>
            new Paragraph({
              children: [new TextRun({ text: `${opt}`, size: 20 })],
              spacing: { after: 40 }
            })
          )
        ]
      })
    ] })]
  });
}

function answerTable(pairs) {
  const width = 25;
  const rows = [
    new TableRow({
      children: [
        new TableCell({ width: { size: width, type: WidthType.PERCENTAGE }, shading: { fill: NAVY, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Pregunta", bold: true, color: "FFFFFF", size: 20 })] })] }),
        new TableCell({ width: { size: width, type: WidthType.PERCENTAGE }, shading: { fill: NAVY, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Respuesta", bold: true, color: "FFFFFF", size: 20 })] })] }),
        new TableCell({ width: { size: width, type: WidthType.PERCENTAGE }, shading: { fill: NAVY, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Pregunta", bold: true, color: "FFFFFF", size: 20 })] })] }),
        new TableCell({ width: { size: width, type: WidthType.PERCENTAGE }, shading: { fill: NAVY, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 80, right: 80 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Respuesta", bold: true, color: "FFFFFF", size: 20 })] })] })
      ]
    })
  ];
  for (let i = 0; i < pairs.length; i += 2) {
    rows.push(
      new TableRow({
        children: [
          new TableCell({ width: { size: width, type: WidthType.PERCENTAGE }, margins: { top: 50, bottom: 50, left: 80, right: 80 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${pairs[i][0]}`, size: 20 })] })] }),
          new TableCell({ width: { size: width, type: WidthType.PERCENTAGE }, shading: { fill: "F0F0F0", type: ShadingType.CLEAR }, margins: { top: 50, bottom: 50, left: 80, right: 80 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: pairs[i][1], size: 20, bold: true })] })] }),
          new TableCell({ width: { size: width, type: WidthType.PERCENTAGE }, margins: { top: 50, bottom: 50, left: 80, right: 80 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${pairs[i + 1][0]}`, size: 20 })] })] }),
          new TableCell({ width: { size: width, type: WidthType.PERCENTAGE }, shading: { fill: "F0F0F0", type: ShadingType.CLEAR }, margins: { top: 50, bottom: 50, left: 80, right: 80 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: pairs[i + 1][1], size: 20, bold: true })] })] })
        ]
      })
    );
  }
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, rows });
}

const children = [
  spacer(240),
  coverBand(),
  spacer(240),

  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Duración total: 335 minutos (5 horas y 35 minutos)", bold: true, size: 24, color: NAVY, font: "Calibri" })] }),
  spacer(160),

  new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [Math.round(CONTENT_W/4), Math.round(CONTENT_W/4), Math.round(CONTENT_W/4), Math.round(CONTENT_W/4)],
    rows: [new TableRow({
      children: [
        ["PRUEBA 1", "Comprensión de lectura", "90 min · 18 preguntas", NAVY],
        ["PRUEBA 2", "Comprensión auditiva", "105 min · 38 preguntas", "1C2A4A"],
        ["PRUEBA 3", "Expresión escrita", "80 min · 2 tareas", RED],
        ["PRUEBA 4", "Expresión oral", "20+20 min · 3 tareas", TEAL_DARK]
      ].map(([p, title, details, color]) => new TableCell({
        borders: { top: noBorder, bottom: noBorder, left: noBorder, right: { style: BorderStyle.SINGLE, size: 4, color: "FFFFFF" } },
        width: { size: Math.round(CONTENT_W/4), type: WidthType.DXA },
        shading: { fill: color, type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 200, right: 200 },
        children: [
          new Paragraph({ children: [new TextRun({ text: p, bold: true, color: GOLD, size: 16, font: "Calibri" })] }),
          new Paragraph({ children: [new TextRun({ text: title, bold: true, color: "FFFFFF", size: 18, font: "Calibri" })] }),
          new Paragraph({ children: [new TextRun({ text: details, color: "AAAAAA", size: 14, font: "Calibri" })] })
        ]
      }))
    })]
  }),

  spacer(400),

  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Material de práctica preparado por Mercedes · www.spanishmercedes.com", color: "666666", size: 16, font: "Calibri", italics: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Este examen sigue el formato oficial del DELE C1 del Instituto Cervantes", color: "666666", size: 16, font: "Calibri", italics: true })] }),

  // PAGE BREAK
  new Paragraph({ children: [new PageBreak()] }),

  // PRUEBA 1
  pruebaBanner(1, "Comprensión de lectura y uso de la lengua", NAVY),
  spacer(160),
  bodyPara("Duración: 90 minutos · 3 tareas · 18 preguntas · 25% de la nota final", { bold: true, color: "666666" }),
  spacer(120),

  // TAREA 1
  tareaHeader(1, "Localizar información específica en un texto", "~17 min · 6 preguntas"),
  spacer(100),
  bodyPara("Lee el siguiente artículo sobre la transformación educativa en el siglo XXI y contesta las preguntas 1-6. Selecciona la opción correcta (a, b o c)."),
  spacer(120),

  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "LA EDUCACIÓN EN LA ERA DE LA INTELIGENCIA ARTIFICIAL", bold: true, size: 22, color: NAVY, font: "Calibri" })], spacing: { after: 120 } }),

  bodyPara("La inteligencia artificial está revolucionando no solo cómo aprendemos, sino también qué debemos aprender. Las universidades del siglo veintiuno se enfrentan a un dilema existencial: ¿cómo preparar a los estudiantes para un futuro donde máquinas pueden ejecutar tareas cognitivas que hace una década parecían exclusivamente humanas? La respuesta no es simplemente adoptar tecnología, sino repensar radicalmente los objetivos educativos."),
  spacer(100),

  bodyPara("Los sistemas educativos tradicionales se construyeron alrededor de la transmisión eficiente de información. Un profesor era el experto, los estudiantes eran receptores pasivos de contenido. Pero en la era de la IA, la información es abundante, accesible instantáneamente. Lo que falta es capacidad de discernimiento, pensamiento crítico, creatividad y adaptabilidad. Las universidades deben transformarse en espacios donde estos valores se cultiven, no donde se acumule conocimiento factual que un motor de búsqueda puede resolver en milisegundos."),
  spacer(100),

  bodyPara("Algunos defensores de la IA en educación argumentan que las máquinas pueden personalizar el aprendizaje a una escala jamás vista. Tutores virtuales con inteligencia adaptativa pueden identificar las brechas específicas en el conocimiento de cada estudiante y ajustar el ritmo y contenido en tiempo real. Esto democratiza el acceso a educación de calidad, eliminando las barreras geográficas y económicas que han plagado los sistemas educativos tradicionales."),
  spacer(100),

  bodyPara("Sin embargo, esta optimismo debe templarse con un realismo ético. La IA entrenada en datos históricos reproduce y amplifica sesgos existentes. Si un algoritmo de admisión universitaria se entrena en décadas de decisiones humanas, heredará los prejuicios de esa historia. Más inquietante aún es cómo la automatización del aprendizaje podría erosionar dimensiones esencialmente humanas: la relación mentoring entre profesor y estudiante, la serendipia del descubrimiento intelectual no planificado, la comunidad de aprendizaje que surge en aulas físicas."),
  spacer(160),

  questionBox(1, "Según el artículo, ¿cuál fue el rol tradicional de las universidades?", [
    "a) Desarrollar pensamiento crítico y creatividad en los estudiantes",
    "b) Transmitir eficientemente información de expertos a receptores pasivos",
    "c) Usar inteligencia artificial para personalizar el aprendizaje"
  ]),
  spacer(80),

  questionBox(2, "¿Por qué la IA puede democratizar la educación según el texto?", [
    "a) Porque reduce costos para las universidades",
    "b) Porque personaliza el aprendizaje eliminando barreras geográficas y económicas",
    "c) Porque reemplaza a los profesores con máquinas más eficientes"
  ]),
  spacer(80),

  questionBox(3, "¿Cuál es la principal preocupación ética mencionada sobre la IA en educación?", [
    "a) Que es demasiado costosa para las universidades pobres",
    "b) Que reproduce sesgos históricos en decisiones de admisión",
    "c) Que los estudiantes no aprenderán a pensar críticamente"
  ]),
  spacer(80),

  questionBox(4, "¿Qué dimensiones humanas podría erosionar la automatización del aprendizaje?", [
    "a) La capacidad de memorizar información",
    "b) La relación mentor-estudiante y la comunidad de aprendizaje",
    "c) El acceso a recursos educativos de calidad"
  ]),
  spacer(80),

  questionBox(5, "¿Cuál es el principal cambio que las universidades deben hacer según el autor?", [
    "a) Adoptar más tecnología para todos los cursos",
    "b) Transformarse en espacios donde se cultiven habilidades como pensamiento crítico",
    "c) Eliminar los profesores humanos y reemplazarlos con tutores virtuales"
  ]),
  spacer(80),

  questionBox(6, "¿Qué propósito tiene el párrafo sobre \"algunos defensores de la IA\"?", [
    "a) Criticar completamente el uso de IA en educación",
    "b) Presentar beneficios potenciales antes de matizarlos con preocupaciones éticas",
    "c) Demostrar que la IA es perfecta para la educación moderna"
  ]),
  spacer(160),

  // PAGE BREAK
  new Paragraph({ children: [new PageBreak()] }),

  // TAREA 2
  tareaHeader(2, "Relacionar textos con afirmaciones", "~36 min · 10 preguntas"),
  spacer(100),
  bodyPara("Lee los siguientes textos breves sobre políticas de salud pública. A continuación encontrarás 10 afirmaciones. Debes indicar qué texto corresponde a cada afirmación. HAY TEXTOS QUE PUEDEN USARSE VARIAS VECES Y OTROS QUE NO SE USAN."),
  spacer(120),

  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TEXTOS", bold: true, size: 20, color: NAVY, font: "Calibri" })], spacing: { after: 120 } }),

  new Paragraph({ children: [new TextRun({ text: "Texto A:", bold: true, size: 20, font: "Calibri" }), new TextRun({ text: " La obesidad ha alcanzado proporciones epidémicas en países desarrollados. Un enfoque basado únicamente en responsabilidad individual—\"come menos, muévete más\"—ha demostrado ser ineficaz. Las políticas públicas deben abordar determinantes estructurales: acceso a alimentos frescos en barrios pobres, diseño urbano que desincentiva actividad física, publicidad agresiva de ultraprocesados dirigida a niños.", size: 20, font: "Calibri" })], spacing: { after: 120 } }),

  new Paragraph({ children: [new TextRun({ text: "Texto B:", bold: true, size: 20, font: "Calibri" }), new TextRun({ text: " Las campañas de vacunación masiva contra enfermedades infecciosas representan uno de los mayores éxitos de la salud pública del siglo veinte. La erradicación de la viruela y casi-eliminación de polio demuestran que intervenciones coordinadas globales pueden eliminar amenazas de salud existenciales. Sin embargo, la confianza en vacunas ha erosionado, impulsada por desinformación y desconfianza institucional.", size: 20, font: "Calibri" })], spacing: { after: 120 } }),

  new Paragraph({ children: [new TextRun({ text: "Texto C:", bold: true, size: 20, font: "Calibri" }), new TextRun({ text: " La salud mental está siendo reconocida finalmente como prioritaria, no como lujo de sociedades ricas. Depresión, ansiedad y PTSD cargan economías globales con miles de millones en productividad perdida. Sin embargo, acceso a psicoterapia sigue siendo un privilegio: en muchos países, existe un psicólogo por cada 100,000 personas. Intervenciones de bajo costo—grupos de apoyo comunitarios, mindfulness en escuelas—pueden ser escalables sin comprometer calidad.", size: 20, font: "Calibri" })], spacing: { after: 120 } }),

  new Paragraph({ children: [new TextRun({ text: "Texto D:", bold: true, size: 20, font: "Calibri" }), new TextRun({ text: " El cambio climático es fundamentalmente una crisis de salud pública. Olas de calor matan más personas que terremotos. La contaminación del aire causa 7 millones de muertes anuales. Vectores de enfermedades infecciosas migran hacia nuevos territorios. Paradójicamente, soluciones climáticas—energía renovable, transporte activo—mejoran salud simultáneamente, creando un raro caso donde la política ambiental y la medicina convergen.", size: 20, font: "Calibri" })], spacing: { after: 160 } }),

  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AFIRMACIONES", bold: true, size: 20, color: NAVY, font: "Calibri" })], spacing: { after: 120 } }),

  bodyPara("7. Los determinantes estructurales de la salud son tan importantes como el comportamiento individual"),
  spacer(40),
  bodyPara("8. Factores ambientales tienen consecuencias de salud global que trascienden sus dominios tradicionales"),
  spacer(40),
  bodyPara("9. La desconfianza institucional ha reducido la efectividad de intervenciones de salud pública previamente exitosas"),
  spacer(40),
  bodyPara("10. El acceso equitativo a servicios de salud mental requiere innovación en modelos de entrega"),
  spacer(40),
  bodyPara("11. Las soluciones a crisis de salud pública deben ser multisectoriales, no puramente médicas"),
  spacer(40),
  bodyPara("12. La intervención coordinada puede eliminar enfermedades que parecen permanentes"),
  spacer(40),
  bodyPara("13. Los costos indirectos de problemas de salud mental exceden ampliamente los costos directos"),
  spacer(40),
  bodyPara("14. Mensajes simplistas sobre salud pueden ser contraproducentes cuando ignoran factores sistémicos"),
  spacer(40),
  bodyPara("15. Intervenciones de salud pueden simultáneamente resolver problemas sociales y ambientales"),
  spacer(40),
  bodyPara("16. El acceso a recursos de salud sigue siendo desigual incluso en problemas reconocidos como prioritarios"),
  spacer(160),

  // PAGE BREAK
  new Paragraph({ children: [new PageBreak()] }),

  // PRUEBA 2
  pruebaBanner(2, "Comprensión auditiva", RED),
  spacer(160),
  bodyPara("Duración: 105 minutos · 6 tareas · 38 preguntas", { bold: true, color: "666666" }),
  spacer(120),
  bodyPara("Los audios de esta prueba están disponibles en línea en: spanishmercedes.com/audio-dele-c1", { bold: true, color: TEAL_DARK }),
  spacer(120),

  tareaHeader(1, "Seleccionar opción correcta después de escuchar fragmentos", "~17 min · 6 preguntas"),
  spacer(100),
  bodyPara("Escucharás 6 fragmentos breves sobre noticias y actualidad. Para cada uno, selecciona la opción correcta (a, b o c)."),
  spacer(120),

  questionBox(1, "¿Cuál es el tema principal del fragmento?", ["a) Energías renovables", "b) Transformación digital", "c) Cambios demográficos"]),
  spacer(80),
  questionBox(2, "¿Qué dato específico se menciona?", ["a) Una posición de ranking", "b) Un porcentaje de aumento", "c) Un número de años"]),
  spacer(80),
  questionBox(3, "¿Cuál es la implicación principal?", ["a) Hay optimismo sobre el futuro", "b) Se necesitan cambios urgentes", "c) La situación es estable"]),
  spacer(80),
  questionBox(4, "¿Quién es responsable según el fragmento?", ["a) Gobiernos", "b) Empresas", "c) Ciudadanos"]),
  spacer(80),
  questionBox(5, "¿Cuál es el tono del fragmento?", ["a) Alarmista", "b) Informativo", "c) Irónico"]),
  spacer(80),
  questionBox(6, "¿Qué se propone como solución?", ["a) Regulación", "b) Educación", "c) No se menciona"]),
  spacer(160),

  tareaHeader(2, "Responder preguntas sobre fragmento largo académico", "~27 min · 6 preguntas"),
  spacer(100),
  bodyPara("Escucharás un fragmento largo de aproximadamente 10 minutos sobre disrupción tecnológica e historia económica. Responde a las siguientes preguntas."),
  spacer(120),

  questionBox(7, "¿Cuáles fueron las revoluciones tecnológicas comparadas en el fragmento?", [
    "a) La mecanización agrícola y la automatización digital",
    "b) La industrial y la de la IA",
    "c) La del ferrocarril y la del internet"
  ]),
  spacer(80),

  questionBox(8, "¿Cuál es la diferencia fundamental mencionada entre revoluciones?", [
    "a) La industrial fue más destructiva",
    "b) La digital ocurre más rápidamente",
    "c) La industrial benefició a más personas"
  ]),
  spacer(80),

  questionBox(9, "¿Qué desajuste señala el experto?", [
    "a) Entre oferta y demanda de trabajos",
    "b) Entre capacidad de adaptación y demandas del mercado",
    "c) Entre salarios y productividad"
  ]),
  spacer(80),

  questionBox(10, "¿Qué enfoques se mencionan para lidiar con disrupciones?", [
    "a) Solo educación pública",
    "b) Aprendizaje permanente o reconversión laboral con inversión pública",
    "c) Protecciones comerciales de industrias antiguas"
  ]),
  spacer(80),

  questionBox(11, "Según el fragmento, ¿cuál es la pregunta clave para los economistas?", [
    "a) Si habrá más disrupciones",
    "b) Cuán rápido la sociedad se adaptará",
    "c) Si el mercado se autorregulará"
  ]),
  spacer(80),

  questionBox(12, "¿Qué advertencia se hace sobre aprendizaje permanente?", [
    "a) Es imposible de implementar",
    "b) Podría aumentar desigualdad sin inversión pública",
    "c) Solo funciona para profesionales"
  ]),
  spacer(160),

  tareaHeader(3, "Responder preguntas sobre conversación académica", "~17 min · 8 preguntas"),
  spacer(100),
  bodyPara("Escucharás una conversación entre Mercedes y un profesor sobre educación. Responde a las siguientes preguntas."),
  spacer(120),

  questionBox(13, "¿Cuál es el primer desafío mencionado?", [
    "a) Que el currículo es demasiado antiguo",
    "b) Que no hay docentes calificados",
    "c) Que falta financiamiento"
  ]),
  spacer(80),

  questionBox(14, "¿Cuál es el segundo desafío?", [
    "a) Que la educación selecciona talento en lugar de crear capacidades",
    "b) Que hay demasiada tecnología",
    "c) Que los estudiantes son desmotivados"
  ]),
  spacer(80),

  questionBox(15, "¿Cuál es la diferencia entre selección y movilidad social?", [
    "a) No hay diferencia, son sinónimos",
    "b) Selección identifica talento; movilidad crea capacidades",
    "c) Selección es para ricos; movilidad para pobres"
  ]),
  spacer(80),

  questionBox(16, "¿Qué países ejemplifican el enfoque correcto?", [
    "a) Países latinoamericanos",
    "b) Países asiáticos",
    "c) Países escandinavos e Islandia"
  ]),
  spacer(80),

  questionBox(17, "¿Qué priorizan estos países?", [
    "a) Que todos alcancen excelencia mínima antes de seleccionar mejores",
    "b) Que los mejores sean identificados tempranamente",
    "c) Que haya máxima competencia"
  ]),
  spacer(80),

  questionBox(18, "¿Cuántos años ha investigado el profesor?", [
    "a) 5 años",
    "b) 10 años",
    "c) 15 años"
  ]),
  spacer(80),

  questionBox(19, "¿Cuál es el tono del profesor en la conversación?", [
    "a) Pesimista",
    "b) Crítico pero propositivo",
    "c) Indiferente"
  ]),
  spacer(80),

  questionBox(20, "¿Qué estructura utiliza el profesor para explicar?", [
    "a) Comparación de dos modelos",
    "b) Causa y efecto",
    "c) Cronología histórica"
  ]),
  spacer(160),

  // PAGE BREAK - CONTINUAR CON TAREAS 4, 5, 6 DE AUDIOS
  new Paragraph({ children: [new PageBreak()] }),

  tareaHeader(4, "Responder preguntas sobre monólogo especializado", "~10 min · 5 preguntas"),
  spacer(100),
  bodyPara("Escucharás un monólogo de un economista sobre sostenibilidad ambiental y contabilidad. Responde a las preguntas."),
  spacer(120),

  questionBox(21, "¿Por qué la sostenibilidad es una cuestión económica fundamental?", [
    "a) Porque requiere inversión inicial",
    "b) Porque externalizar costos ambientales es insostenible",
    "c) Porque afecta las ganancias corporativas"
  ]),
  spacer(80),

  questionBox(22, "¿Qué ocurre cuando se internalizan costos ambientales?", [
    "a) Las empresas se hacen más rentables",
    "b) Muchas industrias aparentemente rentables resultan deficitarias",
    "c) El gobierno debe subsidiar a las empresas"
  ]),
  spacer(80),

  questionBox(23, "¿Cuál es el problema actual según el experto?", [
    "a) Que no hay tecnología limpia disponible",
    "b) Que los costos ambientales no aparecen en balances",
    "c) Que los gobiernos gastan demasiado en ambiente"
  ]),
  spacer(80),

  questionBox(24, "¿Qué tipo de modelos empresariales están siendo presionados?", [
    "a) Los modelos tradicionales de manufactura",
    "b) Modelos genuinamente sostenibles",
    "c) Modelos únicamente de cosméticos sostenibles"
  ]),
  spacer(80),

  questionBox(25, "¿Cuál es el resultado potencial de esta revolución contable?", [
    "a) Que las empresas desaparecerán",
    "b) Que surgirán modelos empresariales verdaderamente sostenibles",
    "c) Que los gobiernos tomarán control de la economía"
  ]),
  spacer(160),

  tareaHeader(5, "Seleccionar opinión correcta de múltiples fragmentos", "~15 min · 7 preguntas"),
  spacer(100),
  bodyPara("Escucharás 7 personas opinando sobre teletrabajo. Para cada pregunta, indica quién expresaría esa opinión."),
  spacer(120),

  questionBox(26, "¿Quién valora principalmente la flexibilidad personal?", [
    "a) Persona 1",
    "b) Persona 2",
    "c) Persona 4"
  ]),
  spacer(80),

  questionBox(27, "¿Quién enfatiza impactos en desigualdad?", [
    "a) Persona 2",
    "b) Persona 5",
    "c) Persona 7"
  ]),
  spacer(80),

  questionBox(28, "¿Quién menciona la importancia de desconexión digital?", [
    "a) Persona 1",
    "b) Persona 3",
    "c) Persona 6"
  ]),
  spacer(80),

  questionBox(29, "¿Quién habla desde perspectiva empresarial?", [
    "a) Persona 1",
    "b) Persona 4",
    "c) Persona 7"
  ]),
  spacer(80),

  questionBox(30, "¿Quién diferencia sectores que pueden vs. no pueden trabajar remotamente?", [
    "a) Persona 3",
    "b) Persona 5",
    "c) Persona 6"
  ]),
  spacer(80),

  questionBox(31, "¿Quién critica resistencia al cambio por tradición?", [
    "a) Persona 2",
    "b) Persona 6",
    "c) Persona 4"
  ]),
  spacer(80),

  questionBox(32, "¿Quién ve la conectividad como bien público?", [
    "a) Persona 5",
    "b) Persona 7",
    "c) Persona 3"
  ]),
  spacer(160),

  tareaHeader(6, "Completar información faltante de conferencia", "~19 min · 8 preguntas"),
  spacer(100),
  bodyPara("Escucharás un fragmento de conferencia sobre IA. Completa los espacios en blanco (33-40) con la información que escuches."),
  spacer(120),

  questionBox(33, "La IA es el desarrollo tecnológico más ________ desde la imprenta.", [
    "a) importante",
    "b) transformador",
    "c) costoso"
  ]),
  spacer(80),

  questionBox(34, "Los sistemas de IA actuales carecen de ________ genuina.", [
    "a) eficiencia",
    "b) comprensión",
    "c) tecnología"
  ]),
  spacer(80),

  questionBox(35, "Las regulaciones emergentes buscan establecer ________ clara para algoritmos.", [
    "a) rentabilidad",
    "b) responsabilidad",
    "c) transparencia"
  ]),
  spacer(80),

  questionBox(36, "Un algoritmo que rechaza créditos sin explicación es ________.", [
    "a) eficiente",
    "b) problemático",
    "c) rentable"
  ]),
  spacer(80),

  questionBox(37, "La verdadera revolución de IA será ________ y ética, no tecnológica.", [
    "a) política",
    "b) legal",
    "c) social"
  ]),
  spacer(80),

  questionBox(38, "Se necesitan marcos de ________ que equilibren innovación con protección.", [
    "a) gobierno",
    "b) gobernanza",
    "c) gestión"
  ]),
  spacer(160),

  // PAGE BREAK - PRUEBA 3 y 4
  new Paragraph({ children: [new PageBreak()] }),

  pruebaBanner(3, "Expresión e interacción escrita", RED),
  spacer(160),
  bodyPara("Duración: 80 minutos · 2 tareas", { bold: true, color: "666666" }),
  spacer(160),

  tareaHeader(1, "Escribir carta formal respondiendo a oferta de empleo", "~40 min · 250-400 palabras"),
  spacer(100),
  bodyPara("Ha visto la siguiente oferta de empleo y desea responder. Escriba una carta o correo formal."),
  spacer(120),

  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "OFERTA DE EMPLEO", bold: true, size: 20, color: NAVY, font: "Calibri" })], spacing: { after: 100 } }),

  bodyPara("Se busca Coordinador/a de Proyectos Internacionales para organización de desarrollo sostenible con sede en Madrid. Requisitos: experiencia mínima 5 años en gestión de proyectos, dominio avanzado de inglés, capacidad de trabajo en entornos multiculturales, experiencia en América Latina preferible. Se ofrece salario competitivo, flexibilidad laboral, oportunidad de desarrollo profesional. Interesados: rrhh@organizacion.org"),
  spacer(160),

  bodyPara("En su carta/correo, debe:"),
  spacer(60),
  bodyPara("• Expresar interés genuino en la posición y organización"),
  spacer(40),
  bodyPara("• Describir su experiencia relevante con ejemplos concretos"),
  spacer(40),
  bodyPara("• Mencionar competencias específicas: gestión de proyectos, idiomas, trabajo internacional"),
  spacer(40),
  bodyPara("• Explicar por qué es candidato/a adecuado/a para esta organización en particular"),
  spacer(40),
  bodyPara("• Solicitar una entrevista de manera profesional"),
  spacer(160),

  tareaHeader(2, "Escribir ensayo o artículo sobre tema propuesto", "~40 min · 280-400 palabras"),
  spacer(100),
  bodyPara("Escriba un ensayo o artículo de opinión (280-400 palabras) sobre UNO de los siguientes temas:"),
  spacer(120),

  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TEMA A", bold: true, size: 20, color: NAVY, font: "Calibri" })], spacing: { after: 100 } }),
  bodyPara("\"Los gobiernos tienen mayor responsabilidad que las corporaciones en la transición hacia economía circular. Sin regulación y liderazgo público, iniciativas corporativas de sostenibilidad son maquillaje verde.\""  ),
  spacer(100),

  bodyPara("¿Está de acuerdo con esta afirmación? Desarrolle su argumento considerando: (1) el papel del estado vs mercado, (2) ejemplos de éxito y fracaso, (3) incentivos reales para cambio corporativo, (4) rol de consumidores."),
  spacer(160),

  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TEMA B", bold: true, size: 20, color: NAVY, font: "Calibri" })], spacing: { after: 100 } }),
  bodyPara("\"La migración global es resultado inevitable de desigualdad estructural, no un problema de seguridad o control de fronteras. Abordar migraciones exige atacar raíces: conflictos, cambio climático, pobreza extrema—no solo cerrar puertas.\""),
  spacer(100),

  bodyPara("Analice esta perspectiva argumentando sobre: (1) causas profundas vs síntomas, (2) responsabilidad global de naciones ricas, (3) beneficios económicos de migración, (4) costos políticos y sociales de cierre fronterizo vs integración."),
  spacer(160),

  new Paragraph({ children: [new PageBreak()] }),

  pruebaBanner(4, "Expresión e interacción oral", TEAL_DARK),
  spacer(160),
  bodyPara("Duración: 20 minutos de preparación + 20 minutos de examen · 3 tareas", { bold: true, color: "666666" }),
  spacer(160),

  tareaHeader(1, "Presentación/Exposición monológica", "3-4 minutos"),
  spacer(100),
  bodyPara("Presenta uno de los siguientes temas (3-4 minutos de monólogo):"),
  spacer(120),

  new Paragraph({ children: [new TextRun({ text: "TEMA 1:", bold: true, size: 20, font: "Calibri" }), new TextRun({ text: " Describe un proyecto importante que haya liderado o coordinado. Incluya: objetivos, equipo involucrado, desafíos principales, cómo se resolvieron, resultados finales, aprendizajes clave.", size: 20, font: "Calibri" })], spacing: { after: 100 } }),

  new Paragraph({ children: [new TextRun({ text: "TEMA 2:", bold: true, size: 20, font: "Calibri" }), new TextRun({ text: " Analice un cambio significativo en su campo profesional (tecnología, educación, etc.) en los últimos 5-10 años. Explique: qué cambió, por qué fue significativo, consecuencias positivas/negativas, cómo se adaptó Ud., implicaciones futuras.", size: 20, font: "Calibri" })] }),
  spacer(160),

  tareaHeader(2, "Interacción/Conversación", "5-6 minutos"),
  spacer(100),
  bodyPara("El examinador le hace preguntas de seguimiento sobre su presentación anterior. Ejemplos de preguntas típicas:"),
  spacer(120),

  bodyPara("• ¿Qué habría hecho diferente si pudiera empezar de nuevo?"),
  spacer(40),
  bodyPara("• ¿Cómo visualiza esta evolución en los próximos diez años?"),
  spacer(40),
  bodyPara("• ¿Qué consejo daría a alguien en situación similar?"),
  spacer(40),
  bodyPara("• ¿Cuáles son las implicaciones éticas de lo que describe?"),
  spacer(40),
  bodyPara("• ¿Cómo compara su contexto con otros contextos culturales/geográficos?"),
  spacer(160),

  tareaHeader(3, "Defensa/Argumentación", "3-4 minutos"),
  spacer(100),
  bodyPara("El examinador presenta un punto de vista que puede diferir del suyo. Debe defender su posición con argumentos claros."),
  spacer(120),

  bodyPara("ESCENARIO: El examinador dice: \"Muchos argumentan que el cambio tecnológico siempre crea más empleos de los que destruye a largo plazo. Pero otros ven solo desplazamiento permanente de trabajadores. ¿Qué evidencia apoya su visión sobre si el cambio tecnológico es neto positivo o negativo para el empleo?\""),
  spacer(160),

  // PAGE BREAK - SOLUTIONS
  new Paragraph({ children: [new PageBreak()] }),

  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "SOLUCIONES", bold: true, size: 28, color: NAVY, font: "Calibri" })] }),
  spacer(200),

  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PRUEBA 1: COMPRENSIÓN DE LECTURA", bold: true, size: 24, color: NAVY, font: "Calibri" })] }),
  spacer(160),

  answerTable([
    ["1", "b"], ["2", "b"], ["3", "b"], ["4", "b"], ["5", "b"], ["6", "b"],
    ["7", "A"], ["8", "D"], ["9", "D"], ["10", "C"], ["11", "C"], ["12", "B"],
    ["13", "a"], ["14", "a"], ["15", "b"], ["16", "c"], ["17", "a"], ["18", "c"]
  ]),

  spacer(200),

  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PRUEBA 2: COMPRENSIÓN AUDITIVA", bold: true, size: 24, color: NAVY, font: "Calibri" })] }),
  spacer(160),

  bodyPara("Los audios y sus preguntas están disponibles en línea en: spanishmercedes.com/audio-dele-c1"),
  spacer(100),
  bodyPara("Tareas 1-5: Ver respuestas en tabla anterior (preguntas 1-32)"),
  spacer(100),
  bodyPara("Tarea 6 (completar información): 33-b, 34-b, 35-b, 36-b, 37-b, 38-b"),
  spacer(200),

  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "© Spanish with Mercedes · Material educativo", font: "Calibri", size: 18, color: "999999" })] })
];

const doc = new Document({
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: GOLD } },
          children: [new TextRun({ text: "DELE C1 · Examen de Práctica", font: "Calibri", size: 16, color: NAVY })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: GOLD } },
          children: [
            new TextRun({ text: "Página ", font: "Calibri", size: 16, color: "666666" }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 16, color: NAVY }),
            new TextRun({ text: " de ", font: "Calibri", size: 16, color: "666666" }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Calibri", size: 16, color: NAVY }),
            new TextRun({ text: "  ·  Spanish with Mercedes  ·  spanishmercedes.com", font: "Calibri", size: 14, color: "666666" })
          ]
        })]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = "DESCARGABLES_PDF/DELE_C1/EXAMEN_PRACTICA_DELE_C1.docx";
  fs.writeFileSync(outPath, buffer);
  console.log(`✅ DOCX creado: ${outPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}).catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});
