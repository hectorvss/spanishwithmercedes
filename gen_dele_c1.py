# -*- coding: utf-8 -*-
"""
Genera el Examen de Práctica DELE C1
Estructura oficial: 5 tareas Prueba 1 (90 min, 40 preg.) + 4 tareas Prueba 2 (50 min, 30 preg.)
Color principal: dorado #D4920A (coincide con tarjeta C1 del sitio)
"""

import os, sys
sys.stdout.reconfigure(encoding='utf-8')

from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm, mm
from reportlab.lib import colors
from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.platypus.flowables import Flowable

W, H = A4
C1_BLUE = colors.HexColor('#2885FD')
NAVY   = colors.HexColor('#1C2A4A')
CREAM  = colors.HexColor('#EEF4FF')
LGRAY  = colors.HexColor('#F4F4F4')
MGRAY  = colors.HexColor('#CCCCCC')
WHITE  = colors.white
BLACK  = colors.black

OUT = r'C:\Users\merch\OneDrive\Escritorio\SPANISH\web-final\spanishwithmercedes-main\DESCARGABLES_PDF\DELE_C1\EXAMEN_PRACTICA_DELE_C1.pdf'

def make_styles():
    return {
        'title':   ParagraphStyle('title',   fontName='Helvetica-Bold',   fontSize=26, leading=30, textColor=NAVY,  alignment=TA_CENTER, spaceAfter=4),
        'sub':     ParagraphStyle('sub',     fontName='Helvetica',        fontSize=11, leading=14, textColor=colors.HexColor('#555555'), alignment=TA_CENTER, spaceAfter=2),
        'label':   ParagraphStyle('label',   fontName='Helvetica-Bold',   fontSize=9,  leading=11, textColor=C1_BLUE,  spaceBefore=0),
        'banner':  ParagraphStyle('banner',  fontName='Helvetica-Bold',   fontSize=13, leading=15, textColor=WHITE, spaceBefore=0),
        'instr':   ParagraphStyle('instr',   fontName='Helvetica',        fontSize=10, leading=15, textColor=colors.HexColor('#333333'), spaceAfter=5),
        'body':    ParagraphStyle('body',    fontName='Helvetica',        fontSize=10.5, leading=16, textColor=BLACK, alignment=TA_JUSTIFY, spaceAfter=5),
        'bodybold':ParagraphStyle('bodybold',fontName='Helvetica-Bold',   fontSize=10.5, leading=16, textColor=BLACK, alignment=TA_JUSTIFY, spaceAfter=5),
        'italic':  ParagraphStyle('italic',  fontName='Helvetica-Oblique',fontSize=10, leading=15, textColor=colors.HexColor('#444444'), spaceAfter=4),
        'htask':   ParagraphStyle('htask',   fontName='Helvetica-Bold',   fontSize=12, leading=14, textColor=NAVY),
        'htext':   ParagraphStyle('htext',   fontName='Helvetica-BoldOblique', fontSize=11, leading=13, textColor=NAVY, spaceAfter=3),
        'q':       ParagraphStyle('q',       fontName='Helvetica-Bold',   fontSize=10.5, leading=14, textColor=BLACK, spaceAfter=2),
        'opt':     ParagraphStyle('opt',     fontName='Helvetica',        fontSize=10, leading=14, textColor=BLACK, leftIndent=12, spaceAfter=2),
        'opt_lbl': ParagraphStyle('opt_lbl', fontName='Helvetica-Bold',   fontSize=10, leading=14, textColor=NAVY),
        'frag':    ParagraphStyle('frag',    fontName='Helvetica',        fontSize=10, leading=15, textColor=BLACK, leftIndent=8, spaceAfter=3),
        'fragbold':ParagraphStyle('fragbold',fontName='Helvetica-Bold',   fontSize=10, leading=14, textColor=NAVY, spaceAfter=1),
        'small':   ParagraphStyle('small',   fontName='Helvetica',        fontSize=8.5, leading=12, textColor=colors.HexColor('#666666'), alignment=TA_CENTER),
        'src':     ParagraphStyle('src',     fontName='Helvetica-Oblique',fontSize=8.5, leading=11, textColor=colors.HexColor('#666666'), alignment=TA_RIGHT, spaceAfter=6),
        'answer':  ParagraphStyle('answer',  fontName='Helvetica-Bold',   fontSize=10.5, leading=14, textColor=WHITE),
        'gap_lbl': ParagraphStyle('gap_lbl', fontName='Helvetica-Bold',   fontSize=10, leading=14, textColor=NAVY, spaceAfter=1),
    }

S = make_styles()

# ─── Helpers ────────────────────────────────────────────────────────────────

def sp(n=6): return Spacer(1, n)

def prueba_banner(num, title, mins, questions):
    data = [[
        Paragraph(f'PRUEBA {num}', S['label']),
        Paragraph(title, S['banner']),
        Paragraph(f'{mins} min  ·  {questions} preguntas', S['small']),
    ]]
    t = Table(data, colWidths=[55, 320, 110])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), NAVY),
        ('ROWBACKGROUNDS', (0,0), (-1,-1), [NAVY]),
        ('TOPPADDING',    (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING',   (0,0), (-1,-1), 10),
        ('RIGHTPADDING',  (0,0), (-1,-1), 6),
        ('VALIGN',        (0,0), (-1,-1), 'MIDDLE'),
    ]))
    return t

def tarea_header(num, title, details=''):
    det = f'  ·  {details}' if details else ''
    data = [[
        Paragraph(f'TAREA {num}{det}', S['label']),
    ],[
        Paragraph(title, S['htask']),
    ]]
    t = Table(data, colWidths=[490])
    t.setStyle(TableStyle([
        ('BACKGROUND',    (0,0), (-1,-1), CREAM),
        ('LEFTPADDING',   (0,0), (-1,-1), 10),
        ('TOPPADDING',    (0,0), (0,0), 6),
        ('BOTTOMPADDING', (0,0), (0,0), 2),
        ('TOPPADDING',    (0,1), (0,1), 2),
        ('BOTTOMPADDING', (0,1), (0,1), 8),
        ('LINEAFTER',     (0,0), (0,-1), 4, C1_BLUE),
        ('LINEBEFORE',    (0,0), (0,-1), 4, C1_BLUE),
    ]))
    return t

def instr_box(text):
    data = [[Paragraph('<b>INSTRUCCIONES</b>', S['label'])],
            [Paragraph(text, S['instr'])]]
    t = Table(data, colWidths=[490])
    t.setStyle(TableStyle([
        ('BACKGROUND',    (0,0), (-1,-1), LGRAY),
        ('LEFTPADDING',   (0,0), (-1,-1), 10),
        ('TOPPADDING',    (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('BOX',           (0,0), (-1,-1), 0.5, MGRAY),
    ]))
    return t

def question_block(num, qtext, options):
    """Render a numbered question with a/b/c options."""
    prefix = f'<b>{num}.</b>  ' if num else ''
    rows = [Paragraph(f'{prefix}{qtext}', S['q'])]
    for opt in options:
        rows.append(Paragraph(opt, S['opt']))
    return KeepTogether(rows + [sp(6)])

def answer_key_table(answers):
    """answers = list of (num, letter) tuples."""
    cols = 10
    rows_data = []
    header = [Paragraph(f'<b>{i+1}</b>', ParagraphStyle('ah', fontName='Helvetica-Bold', fontSize=9, alignment=TA_CENTER)) for i in range(cols)]
    rows_data.append(header)
    for chunk_start in range(0, len(answers), cols):
        chunk = answers[chunk_start:chunk_start+cols]
        row = []
        for (_, letter) in chunk:
            row.append(Paragraph(f'<b>{letter}</b>', ParagraphStyle('av', fontName='Helvetica-Bold', fontSize=10, alignment=TA_CENTER, textColor=NAVY)))
        while len(row) < cols:
            row.append(Paragraph('', S['small']))
        rows_data.append(row)
    col_w = 49
    t = Table(rows_data, colWidths=[col_w]*cols)
    t.setStyle(TableStyle([
        ('BACKGROUND',    (0,0), (-1,0), NAVY),
        ('TEXTCOLOR',     (0,0), (-1,0), WHITE),
        ('BACKGROUND',    (0,1), (-1,-1), LGRAY),
        ('ROWBACKGROUNDS',(0,1), (-1,-1), [LGRAY, WHITE]),
        ('BOX',           (0,0), (-1,-1), 0.5, MGRAY),
        ('INNERGRID',     (0,0), (-1,-1), 0.3, MGRAY),
        ('TOPPADDING',    (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    return t

def tarea4_texts(texts):
    """texts = list of (label, title, body) tuples."""
    elems = []
    for label, title, body in texts:
        data = [[Paragraph(label, ParagraphStyle('tl', fontName='Helvetica-Bold', fontSize=10, textColor=C1_BLUE)),
                 Paragraph(f'<b>{title}</b>  {body}', S['body'])]]
        t = Table(data, colWidths=[30, 460])
        t.setStyle(TableStyle([
            ('TOPPADDING',    (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
            ('LEFTPADDING',   (0,0), (0,-1), 4),
            ('LEFTPADDING',   (1,0), (1,-1), 4),
            ('LINEBELOW',     (0,0), (-1,-1), 0.3, MGRAY),
        ]))
        elems.append(t)
    return elems

def gap_options_table(gap_num, opts):
    """opts = (a_text, b_text, c_text)"""
    a, b, c = opts
    data = [[
        Paragraph(f'<b>{gap_num}.</b>', S['gap_lbl']),
        Paragraph(f'<b>a)</b> {a}', S['opt']),
        Paragraph(f'<b>b)</b> {b}', S['opt']),
        Paragraph(f'<b>c)</b> {c}', S['opt']),
    ]]
    t = Table(data, colWidths=[24, 152, 152, 162])
    t.setStyle(TableStyle([
        ('TOPPADDING',    (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING',   (0,0), (-1,-1), 4),
        ('VALIGN',        (0,0), (-1,-1), 'TOP'),
        ('LINEBELOW',     (0,0), (-1,-1), 0.3, MGRAY),
    ]))
    return t

def header_footer(canvas, doc):
    canvas.saveState()
    # Header
    canvas.setStrokeColor(C1_BLUE)
    canvas.setLineWidth(1.5)
    canvas.line(2*cm, H - 1.8*cm, W - 2*cm, H - 1.8*cm)
    canvas.setFont('Helvetica-Bold', 8)
    canvas.setFillColor(NAVY)
    canvas.drawString(2*cm, H - 1.5*cm, 'DELE C1  ·  Examen de Práctica')
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(C1_BLUE)
    canvas.drawRightString(W - 2*cm, H - 1.5*cm, 'spanishmercedes.com')
    # Footer
    canvas.setStrokeColor(C1_BLUE)
    canvas.line(2*cm, 1.6*cm, W - 2*cm, 1.6*cm)
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(colors.HexColor('#666666'))
    canvas.drawCentredString(W/2, 1.1*cm, f'Página {doc.page}')
    canvas.restoreState()

# ============================================================================
# CONTENIDO
# ============================================================================

story = []

# ─── PORTADA ────────────────────────────────────────────────────────────────
story.append(sp(50))
story.append(Paragraph('Diplomas de Español como Lengua Extranjera', ParagraphStyle('dlg', fontName='Helvetica', fontSize=13, leading=18, textColor=NAVY, alignment=TA_CENTER)))
story.append(sp(24))
story.append(HRFlowable(width='100%', thickness=2, color=C1_BLUE))
story.append(sp(24))

# Logo DELE
data = [[Paragraph('<b>DELE</b>', ParagraphStyle('logo', fontName='Helvetica-Bold', fontSize=56, leading=64, textColor=C1_BLUE, alignment=TA_CENTER))]]
t = Table(data, colWidths=[490])
t.setStyle(TableStyle([
    ('TOPPADDING',    (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 0),
]))
story.append(t)
story.append(sp(24))
story.append(HRFlowable(width='100%', thickness=2, color=C1_BLUE))
story.append(sp(28))

story.append(Paragraph('Examen de Práctica', ParagraphStyle('ep', fontName='Helvetica-Bold', fontSize=28, leading=34, textColor=BLACK, alignment=TA_CENTER)))
story.append(sp(16))

# Nivel badge
data = [[Paragraph('<b>NIVEL C1</b>', ParagraphStyle('nb', fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=WHITE, alignment=TA_CENTER))]]
t = Table(data, colWidths=[260])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), C1_BLUE),
    ('TOPPADDING', (0,0), (-1,-1), 12),
    ('BOTTOMPADDING', (0,0), (-1,-1), 12),
    ('ROUNDEDCORNERS', [8]),
]))
story.append(Table([[t]], colWidths=[490]))
story.append(sp(10))
story.append(Paragraph('Usuario competente / dominio operativo eficaz — MCER Nivel C1', ParagraphStyle('mcer', fontName='Helvetica', fontSize=10, leading=14, textColor=colors.HexColor('#555555'), alignment=TA_CENTER)))
story.append(sp(30))

# Tabla de pruebas
cover_data = [
    [Paragraph('<b>Prueba</b>', ParagraphStyle('ch', fontName='Helvetica-Bold', fontSize=10, textColor=WHITE)),
     Paragraph('<b>Nombre</b>', ParagraphStyle('ch', fontName='Helvetica-Bold', fontSize=10, textColor=WHITE)),
     Paragraph('<b>Tiempo</b>', ParagraphStyle('ch', fontName='Helvetica-Bold', fontSize=10, textColor=WHITE)),
     Paragraph('<b>Preguntas</b>', ParagraphStyle('ch', fontName='Helvetica-Bold', fontSize=10, textColor=WHITE))],
    ['1', Paragraph('Comprensión de lectura y uso de la lengua', S['body']),  '90 min', '40'],
    ['2', Paragraph('Comprensión auditiva y uso de la lengua',   S['body']),  '50 min', '30'],
    ['3', Paragraph('Expresión e interacción escritas',          S['body']),  '80 min', '2 tareas'],
    ['4', Paragraph('Expresión e interacción orales',            S['body']),  '20+20 min', '3 tareas'],
]
ct = Table(cover_data, colWidths=[40, 260, 90, 100])
ct.setStyle(TableStyle([
    ('BACKGROUND',    (0,0), (-1,0), NAVY),
    ('TEXTCOLOR',     (0,0), (-1,0), WHITE),
    ('ROWBACKGROUNDS',(0,1), (-1,-1), [LGRAY, WHITE]),
    ('BOX',           (0,0), (-1,-1), 0.5, MGRAY),
    ('INNERGRID',     (0,0), (-1,-1), 0.3, MGRAY),
    ('ALIGN',         (0,0), (-1,-1), 'CENTER'),
    ('VALIGN',        (0,0), (-1,-1), 'MIDDLE'),
    ('TOPPADDING',    (0,0), (-1,-1), 7),
    ('BOTTOMPADDING', (0,0), (-1,-1), 7),
    ('FONTNAME',      (0,1), (-1,-1), 'Helvetica'),
    ('FONTSIZE',      (0,1), (-1,-1), 10),
]))
story.append(ct)
story.append(sp(30))
story.append(Paragraph(
    'Este modelo de examen de práctica ha sido elaborado con fines didácticos y sigue la estructura '
    'oficial del examen DELE C1 del Instituto Cervantes. Los textos son de carácter académico, literario '
    'y periodístico de alta complejidad, propios del nivel de dominio operativo eficaz: registro culto, '
    'vocabulario sofisticado, estructuras sintácticas complejas y referencias culturales. '
    'Las soluciones se incluyen al final del examen.',
    S['italic']))
story.append(sp(10))
story.append(Paragraph('spanishmercedes.com', ParagraphStyle('web', fontName='Helvetica-BoldOblique', fontSize=10, textColor=C1_BLUE, alignment=TA_CENTER)))
story.append(PageBreak())

# ============================================================================
# PRUEBA 1: COMPRENSIÓN DE LECTURA Y USO DE LA LENGUA
# ============================================================================

story.append(prueba_banner(1, 'Comprensión de lectura y uso de la lengua', 90, 40))
story.append(sp(8))
story.append(Paragraph(
    'Esta prueba contiene cinco tareas. Usted debe responder a 40 preguntas. '
    'Duración: 90 minutos. Marque sus opciones únicamente en la Hoja de respuestas.',
    S['instr']))
story.append(sp(12))

# ── TAREA 1 ──────────────────────────────────────────────────────────────────
story.append(tarea_header(1, 'Localizar información en un texto narrativo', '~18 min · 6 preguntas'))
story.append(sp(8))
story.append(instr_box(
    'A continuación, leerá un fragmento de novela. Conteste a las preguntas (1-6). '
    'Seleccione la opción correcta (a / b / c). Marque las opciones elegidas en la Hoja de respuestas.'))
story.append(sp(8))
story.append(Paragraph('<b>Fragmento de novela: El historiador</b>', S['htext']))
story.append(sp(4))

t1_text = """La tarde en que Claudio decidió que ya no podía seguir mintiendo, el cielo sobre Sevilla tenía ese tono
anaranjado que solo aparece cuando el viento de levante arrastra consigo el polvo del Sáhara. Salió del despacho
sin despedirse de nadie y caminó durante horas por calles que conocía de memoria pero que esa tarde le resultaban
extrañas, como si pertenecieran a otra ciudad soñada en un idioma que no era el suyo.

Había dedicado veinte años a construir una reputación cuya solidez dependía, en última instancia, de que nadie
hiciera las preguntas correctas. Era un historiador respetado, autor de tres libros que la crítica había calificado
de "rigurosamente documentados", cuando en realidad el primero de ellos descansaba sobre una falsificación que
él mismo había perpetrado siendo todavía un estudiante desesperado y ambicioso. Una carta, una sola carta
atribuida a un general decimonónico, que nunca existió.

Lo curioso —pensó mientras cruzaba el puente de Triana sin detenerse a mirar el río— era que la mentira había
generado tanta verdad. Los artículos que rebatían su tesis habían aportado perspectivas nuevas; los que la
defendían habían iluminado aspectos reales de la historia que sin su invención habrían permanecido en la sombra.
¿Podía una falsificación ser fecunda? ¿Tenía eso algún valor o era simplemente la racionalización de un cobarde?

Se detuvo ante un bar de barrio y pidió una cerveza que bebió de pie en la barra, entre desconocidos que hablaban
de fútbol y de sus vidas cotidianas con una despreocupación que él envidiaba profundamente. Nadie le conocía allí.
Por un momento fantaseó con quedarse: abandonar el apartamento céntrico, el cargo universitario, los congresos,
los alumnos que le miraban con admiración inmerecida. Empezar desde cero con un nombre que no cargara con el
peso de lo que él había construido sobre arena."""

for para in t1_text.strip().split('\n\n'):
    story.append(Paragraph(para.replace('\n', ' '), S['body']))
    story.append(sp(3))

story.append(Paragraph('<i>(Texto de elaboración propia para uso didáctico)</i>', S['src']))
story.append(sp(6))
story.append(Paragraph('<b>PREGUNTAS</b>', S['label']))
story.append(sp(4))

t1_qs = [
    ("1. ¿Qué detalle ambiental acompaña la decisión de Claudio al comienzo del fragmento?",
     ["a) Una tormenta que simboliza su estado de ánimo turbulento.",
      "b) Un cielo anaranjado producido por el viento de levante con polvo sahariano.",
      "c) Un atardecer rojizo sobre el río Guadalquivir."]),
    ("2. ¿En qué consiste la falsificación que Claudio cometió en su juventud?",
     ["a) Plagio de un libro de otro historiador sin citar la fuente.",
      "b) Alteración de datos estadísticos en su investigación doctoral.",
      "c) Atribución a un general de una carta que nunca existió."]),
    ("3. ¿Cómo describe el narrador los libros de Claudio?",
     ["a) Como obras brillantes que transformaron la disciplina histórica.",
      "b) Como trabajos mediocres que pasaron desapercibidos para la crítica.",
      "c) Como obras elogiadas por su rigor, aunque sustentadas en una base falsa."]),
    ("4. ¿Qué reflexión paradójica hace Claudio sobre su mentira?",
     ["a) Que la mentira no tuvo ninguna consecuencia real en el campo histórico.",
      "b) Que su falsificación generó investigaciones y perspectivas genuinamente valiosas.",
      "c) Que nadie podría descubrir su error porque los documentos estaban destruidos."]),
    ("5. ¿Qué siente Claudio al estar entre desconocidos en el bar?",
     ["a) Angustia, porque teme que alguien lo reconozca y lo delate.",
      "b) Alivio, porque nadie lo conoce ni espera nada de él.",
      "c) Nostalgia por la vida sencilla que no pudo tener."]),
    ("6. ¿Qué función tiene la descripción del cielo anaranjado al inicio del fragmento?",
     ["a) Informar al lector sobre las condiciones meteorológicas de Sevilla.",
      "b) Crear un ambiente de tensión y extrañeza acorde con el estado emocional del protagonista.",
      "c) Anunciar metafóricamente que el protagonista viajará al norte de África."]),
]
for qtext, opts in t1_qs:
    story.append(question_block('', qtext, opts))

story.append(PageBreak())

# ── TAREA 2 ──────────────────────────────────────────────────────────────────
story.append(tarea_header(2, 'Reponer párrafos extraídos de un ensayo', '~18 min · 6 preguntas'))
story.append(sp(8))
story.append(instr_box(
    'Lea el siguiente texto del que se han extraído seis párrafos. A continuación, lea los siete '
    'fragmentos propuestos (A - G) y decida en qué lugar del texto (7 - 12) hay que colocar cada '
    'uno de ellos. HAY UN FRAGMENTO QUE NO TIENE QUE ELEGIR. '
    'Marque las opciones elegidas en la Hoja de respuestas.'))
story.append(sp(8))
story.append(Paragraph('<b>La verdad en la era de la desinformación</b>', S['htext']))
story.append(Paragraph('Guillermo Morales', S['italic']))
story.append(sp(6))

t2_paras = [
    ("El siglo XXI podría pasar a la historia como el período en que la humanidad alcanzó "
     "simultáneamente los más altos niveles de conocimiento acumulado y los índices más preocupantes "
     "de desinformación generalizada. Esta paradoja no es accidental: emerge de las mismas estructuras "
     "que hicieron posible la democratización del conocimiento."),
    ("<b>7. ________________</b>",),
    ("La respuesta más extendida apunta a los algoritmos de recomendación, diseñados para maximizar "
     "el tiempo de atención del usuario. Al priorizar el contenido emocionalmente impactante sobre el "
     "informativo, crean burbujas informativas donde la confirmación de los prejuicios existentes "
     "prevalece sobre la confrontación con la evidencia."),
    ("<b>8. ________________</b>",),
    ("Pero reducir el problema a la tecnología sería un error. Los investigadores en psicología cognitiva "
     "llevan décadas documentando los mecanismos por los que los humanos preferimos la información "
     "coherente con nuestras creencias previas, independientemente de su veracidad. Internet no inventó "
     "estos sesgos: los amplificó."),
    ("<b>9. ________________</b>",),
    ("Las instituciones educativas han respondido con iniciativas de \"alfabetización mediática\" cuya "
     "eficacia real está siendo objeto de debate. Algunos estudios sugieren que enseñar a verificar "
     "fuentes puede ser contraproducente si no va acompañado de un cambio en la actitud general hacia "
     "la incertidumbre y la complejidad."),
    ("<b>10. ________________</b>",),
    ("Lo que parece claro es que el problema no tiene solución tecnológica. Las plataformas han "
     "implementado etiquetas, filtros y sistemas de verificación con resultados modestos. La "
     "desinformación se adapta a los mecanismos de control con una agilidad que estos no pueden igualar."),
    ("<b>11. ________________</b>",),
    ("Algunos filósofos proponen recuperar la tradición retórica clásica: no para manipular, sino para "
     "aprender a discriminar los argumentos sólidos de los sofísticos. Una ciudadanía capaz de "
     "distinguir la evidencia del testimonio, la correlación de la causalidad, estaría mejor equipada."),
    ("<b>12. ________________</b>",),
    ("Lo que parece evidente es que el problema de la desinformación no es un problema técnico sino "
     "filosófico: requiere repensar qué entendemos por conocimiento, por evidencia y por verdad en el "
     "contexto de las democracias liberales contemporáneas."),
]
for p in t2_paras:
    text = p if isinstance(p, str) else p[0]
    story.append(Paragraph(text, S['body'] if '<b>' not in text else S['bodybold']))
    story.append(sp(3))

story.append(sp(6))
story.append(Paragraph('<b>FRAGMENTOS</b>', S['label']))
story.append(sp(4))

t2_frags = [
    ("A.", "El sociólogo del conocimiento Mike Lynch señala que vivimos en una era de \"epistemología política\": "
     "los debates sobre hechos han dejado de ser debates sobre evidencias para convertirse en debates "
     "sobre qué fuentes tienen autoridad legítima."),
    ("B.", "Cabría preguntarse, entonces, si las soluciones deben buscarse en el ámbito regulatorio: leyes "
     "que establezcan obligaciones de transparencia para los algoritmos o que responsabilicen a las "
     "plataformas por la desinformación que distribuyen."),
    ("C.", "La cuestión fundamental es por qué, teniendo acceso a más información que ninguna generación "
     "anterior, tendemos a tomar peores decisiones epistémicas: a confiar en fuentes no verificadas "
     "y a rechazar el consenso científico."),
    ("D.", "Esta actitud implica asumir que no todo lo que es incierto es igualmente incierto, y que la "
     "tolerancia a la ambigüedad es una virtud epistémica, no una debilidad."),
    ("E.", "El acceso universal a la información ha eliminado muchos de los filtros institucionales que, con "
     "todas sus imperfecciones, garantizaban ciertos estándares mínimos de verificación: los editores, "
     "los revisores académicos, los gatekeepers de los medios tradicionales."),
    ("F.", "Las iniciativas de \"periodismo lento\" o \"periodismo de soluciones\" apuestan por la profundidad "
     "y la contextualización frente a la velocidad y el impacto emocional como criterios de valor."),
    ("G.", "Determinadas industrias financiaron durante décadas campañas de confusión deliberada sobre "
     "las evidencias científicas; este patrón de desinformación organizada se ha extendido ahora a "
     "múltiples ámbitos del debate público."),
]
for lbl, text in t2_frags:
    data = [[Paragraph(f'<b>{lbl}</b>', S['opt_lbl']), Paragraph(text, S['frag'])]]
    t = Table(data, colWidths=[20, 470])
    t.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t)

story.append(PageBreak())

# ── TAREA 3 ──────────────────────────────────────────────────────────────────
story.append(tarea_header(3, 'Seleccionar opción correcta en texto de divulgación', '~18 min · 6 preguntas'))
story.append(sp(8))
story.append(instr_box(
    'Lea el texto y responda a las preguntas (13-18). Seleccione la opción correcta (a / b / c). '
    'Marque las opciones elegidas en la Hoja de respuestas.'))
story.append(sp(8))
story.append(Paragraph('<b>La microbiota intestinal y la salud mental</b>', S['htext']))
story.append(sp(4))

t3_text = """El intestino alberga aproximadamente 38 billones de microorganismos, una cifra comparable al número
total de células del organismo humano. Esta comunidad microbiana, denominada microbiota intestinal, desempeña
funciones cruciales en la digestión, el metabolismo y el sistema inmunológico, pero las investigaciones más
recientes apuntan a un vínculo sorprendente: su influencia sobre el cerebro y el comportamiento.

El eje intestino-cerebro es un sistema de comunicación bidireccional que utiliza diversas vías: el nervio vago,
el sistema endocrino y el sistema inmunológico. Estudios en ratones han demostrado que los animales criados en
condiciones de esterilidad, sin microbiota, presentan alteraciones conductuales significativas, incluyendo mayor
ansiedad y déficits en el comportamiento social. Cuando se les trasplanta microbiota de ratones con
comportamiento normal, algunas de estas alteraciones se revierten parcialmente.

En humanos, la evidencia es todavía correlacional, no causal. Se ha observado que pacientes con depresión o
trastorno del espectro autista presentan perfiles de microbiota diferentes a los de la población general. Sin
embargo, no está claro si las alteraciones en la microbiota son causa o consecuencia de los trastornos
psiquiátricos, o si ambas condiciones responden a factores subyacentes comunes.

Los llamados "psicobióticos" —probióticos con efectos sobre el sistema nervioso— han generado gran interés
clínico, aunque su eficacia en ensayos controlados aleatorizados sigue siendo modesta. Los expertos señalan que
las conclusiones exageradas sobre esta área de investigación, frecuentes en la prensa de divulgación, pueden
generar expectativas poco realistas en pacientes con trastornos graves."""

for para in t3_text.strip().split('\n\n'):
    story.append(Paragraph(para.replace('\n', ' '), S['body']))
    story.append(sp(3))

story.append(Paragraph('<i>(Adaptado de fuentes de divulgación científica)</i>', S['src']))
story.append(sp(6))
story.append(Paragraph('<b>PREGUNTAS</b>', S['label']))
story.append(sp(4))

t3_qs = [
    ("13. Según el texto, ¿qué aspecto de la microbiota constituye el hallazgo más reciente e inesperado?",
     ["a) Su influencia sobre el sistema inmunológico y la digestión.",
      "b) Su capacidad para afectar al cerebro y al comportamiento.",
      "c) El enorme número de microorganismos que contiene el intestino."]),
    ("14. ¿Qué demuestran los estudios con ratones mencionados en el texto?",
     ["a) Que la microbiota humana puede trasplantarse a roedores con éxito total.",
      "b) Que la ausencia de microbiota produce alteraciones de conducta que pueden revertirse parcialmente.",
      "c) Que los ratones son el modelo animal más adecuado para estudiar trastornos psiquiátricos."]),
    ("15. ¿Por qué el texto afirma que, en humanos, la evidencia es todavía «correlacional, no causal»?",
     ["a) Porque los experimentos no han sido suficientemente rigurosos en su metodología.",
      "b) Porque aún no se sabe si la microbiota alterada es causa o efecto de los trastornos psiquiátricos.",
      "c) Porque los resultados obtenidos en animales no se han replicado nunca en personas."]),
    ("16. ¿Cuál es la valoración del texto sobre los psicobióticos?",
     ["a) Son un tratamiento consolidado y de eficacia probada para la depresión.",
      "b) Generan interés científico pero sus resultados en ensayos rigurosos son limitados.",
      "c) Han sido descartados por la comunidad médica como ineficaces."]),
    ("17. Según el texto, ¿qué problema presenta la divulgación científica en este campo?",
     ["a) Que ignora los descubrimientos más recientes sobre el eje intestino-cerebro.",
      "b) Que tiende a presentar conclusiones más rotundas de lo que los datos justifican.",
      "c) Que no está al alcance de pacientes con trastornos graves."]),
    ("18. ¿Qué estructura utiliza el texto para organizar la información?",
     ["a) Una comparación entre animales y humanos que concluye con una síntesis.",
      "b) Una progresión desde los datos más generales hacia las implicaciones clínicas.",
      "c) Un debate entre dos posturas científicas irreconciliables sobre la microbiota."]),
]
for qtext, opts in t3_qs:
    story.append(question_block('', qtext, opts))

story.append(PageBreak())

# ── TAREA 4 ──────────────────────────────────────────────────────────────────
story.append(tarea_header(4, 'Relacionar textos con enunciados', '~18 min · 8 preguntas'))
story.append(sp(8))
story.append(instr_box(
    'A continuación tiene seis textos (A - F) y ocho enunciados (19 - 26). '
    'Léalos y elija el texto que corresponde a cada enunciado. '
    'RECUERDE QUE HAY TEXTOS QUE DEBEN SER ELEGIDOS MÁS DE UNA VEZ. '
    'Marque las opciones elegidas en la Hoja de respuestas.'))
story.append(sp(8))
story.append(Paragraph('<b>Perspectivas sobre lenguaje, pensamiento y sociedad</b>', S['htext']))
story.append(sp(4))

t4_texts_data = [
    ("A", "Dr. Alonso — Filósofo del lenguaje:",
     "«El lenguaje no es solo un instrumento de comunicación: es la condición de posibilidad del pensamiento "
     "abstracto. Ninguna mente sin lenguaje puede concebir la causalidad, la temporalidad o la negación en "
     "su forma pura. Negar esto es malentender la naturaleza del pensamiento.»"),
    ("B", "Dra. Martín — Neurociéntifica:",
     "«Nuestros experimentos con pacientes que han perdido el lenguaje por lesión cerebral muestran que "
     "ciertos tipos de razonamiento abstracto se preservan. Esto sugiere que el pensamiento y el lenguaje "
     "son disociables a nivel neurológico, al menos parcialmente. Los datos empíricos deben guiar el debate.»"),
    ("C", "Prof. García — Sociólogo:",
     "«Lo relevante no es si se puede pensar sin lenguaje en abstracto, sino cómo el lenguaje compartido "
     "crea las categorías mediante las que una comunidad organiza su percepción de la realidad social. "
     "El debate filosófico tradicional ignora esta dimensión colectiva del pensamiento.»"),
    ("D", "Dra. Ibáñez — Lingüista cognitiva:",
     "«La metáfora conceptual revela que el pensamiento abstracto está estructurado por experiencias "
     "corporales y lingüísticas. El lenguaje no solo expresa ideas: las moldea. Cambiamos el lenguaje "
     "y cambiamos la manera en que concebimos el mundo.»"),
    ("E", "Prof. Ramírez — Psicólogo del desarrollo:",
     "«Los estudios con niños sordos en entornos sin acceso a lengua de señas muestran que desarrollan "
     "sistemas gestuales propios y cierta capacidad de razonamiento secuencial. Esto sugiere que existe "
     "pensamiento prelinguístico, aunque limitado en su alcance.»"),
    ("F", "Dra. Vega — Antropóloga:",
     "«Las lenguas que carecen de términos para conceptos como la izquierda/derecha o el tiempo pasado "
     "muestran que sus hablantes organizan espacial y temporalmente la experiencia de modo distinto. "
     "La diversidad lingüística es, en ese sentido, una diversidad de mundos cognitivos.»"),
]

for label, title, body in t4_texts_data:
    data = [[
        Paragraph(f'<b>{label}</b>', ParagraphStyle('tl4', fontName='Helvetica-Bold', fontSize=11, textColor=C1_BLUE, alignment=TA_CENTER)),
        Paragraph(f'<b>{title}</b> {body}', S['body'])
    ]]
    t = Table(data, colWidths=[22, 468])
    t.setStyle(TableStyle([
        ('TOPPADDING',    (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING',   (0,0), (0,-1), 4),
        ('LEFTPADDING',   (1,0), (1,-1), 6),
        ('VALIGN',        (0,0), (-1,-1), 'TOP'),
        ('LINEBELOW',     (0,0), (-1,-1), 0.3, MGRAY),
    ]))
    story.append(t)
    story.append(sp(2))

story.append(sp(8))
story.append(Paragraph('<b>ENUNCIADOS</b>', S['label']))
story.append(sp(4))

t4_qs = [
    "19. Afirma que determinados tipos de pensamiento pueden existir sin lenguaje.",
    "20. Defiende que sin lenguaje no es posible concebir relaciones abstractas como la causalidad.",
    "21. Cuestiona la pertinencia del debate filosófico clásico sobre pensamiento y lenguaje.",
    "22. Basa sus afirmaciones en evidencia empírica obtenida con pacientes.",
    "23. Sostiene que el lenguaje estructura la manera en que un grupo social percibe el mundo.",
    "24. Argumenta que las metáforas reflejan cómo el lenguaje moldea el pensamiento.",
    "25. Afirma que el lenguaje es más que una herramienta: es el fundamento del pensamiento mismo.",
    "26. Utiliza la diversidad lingüística como argumento para defender distintos modos de cognición.",
]
for q in t4_qs:
    data = [[Paragraph(q, S['body']), Paragraph('A)  B)  C)  D)  E)  F)', S['instr'])]]
    t = Table(data, colWidths=[340, 150])
    t.setStyle(TableStyle([
        ('TOPPADDING',    (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('VALIGN',        (0,0), (-1,-1), 'MIDDLE'),
        ('LINEBELOW',     (0,0), (-1,-1), 0.2, MGRAY),
    ]))
    story.append(t)

story.append(PageBreak())

# ── TAREA 5 ──────────────────────────────────────────────────────────────────
story.append(tarea_header(5, 'Seleccionar la opción correcta para completar el texto', '~18 min · 14 preguntas'))
story.append(sp(8))
story.append(instr_box(
    'Lea el texto y rellene los huecos (27-40) con la opción correcta (a / b / c). '
    'Marque las opciones elegidas en la Hoja de respuestas.'))
story.append(sp(8))
story.append(Paragraph('<b>El concepto de agencia moral</b>', S['htext']))
story.append(Paragraph('Texto de divulgación filosófica', S['italic']))
story.append(sp(4))

t5_text = (
    "El concepto de «agencia moral» ha <b>___27___</b> un papel central en la filosofía ética contemporánea. "
    "Se entiende por agente moral todo ser capaz de actuar guiado por razones y de <b>___28___</b> sus acciones "
    "ante sí mismo y ante los demás. Esta definición, <b>___29___</b> sencilla, entraña una serie de "
    "presupuestos filosóficos que conviene examinar con detenimiento. El primero de ellos es la existencia de "
    "una voluntad libre: la capacidad de elegir entre cursos de acción <b>___30___</b> sin estar "
    "<b>___31___</b> por factores externos o internos que escapen al control racional del sujeto. El "
    "determinismo radical, en sus diversas variantes, niega esta posibilidad, lo que <b>___32___</b> "
    "consecuencias directas sobre la atribución de responsabilidad moral."
    "\n\n"
    "La neurociencia contemporánea ha añadido una capa de complejidad adicional a este debate al demostrar "
    "que muchas de nuestras decisiones son <b>___33___</b> a nivel cerebral antes de que seamos conscientes "
    "de haberlas tomado. Si esto es así, el libre albedrío tal y como lo <b>___34___</b> podría ser una ilusión "
    "retrospectiva que el cerebro construye para mantener la coherencia narrativa del yo. Algunos filósofos "
    "interpretan estos datos como una refutación del libre albedrío; otros los consideran <b>___35___</b> con "
    "nociones compatibilistas de la libertad."
    "\n\n"
    "Un tercer <b>___36___</b> es el de la racionalidad: ¿en qué medida nuestras decisiones responden "
    "realmente a razones y no a impulsos, emociones o condicionamientos <b>___37___</b>? La psicología "
    "cognitiva ha documentado una larga lista de sesgos que afectan al razonamiento humano, lo que "
    "<b>___38___</b> la imagen del agente moral como ser plenamente racional. Sin embargo, reconocer "
    "las limitaciones de la racionalidad no equivale a <b>___39___</b>: incluso un agente con capacidades "
    "cognitivas limitadas puede actuar de manera <b>___40___</b> si orienta su conducta según principios "
    "que ha reflexionado e interiorizado."
)

for para in t5_text.split('\n\n'):
    story.append(Paragraph(para.strip(), S['body']))
    story.append(sp(3))

story.append(Paragraph('<i>(Texto de elaboración propia para uso didáctico)</i>', S['src']))
story.append(sp(8))
story.append(Paragraph('<b>OPCIONES</b>', S['label']))
story.append(sp(4))

t5_opts = [
    (27, 'desempeñado', 'tenido', 'jugado'),
    (28, 'justificar', 'explicar', 'argumentar'),
    (29, 'aparentemente', 'supuestamente', 'ciertamente'),
    (30, 'alternativos', 'distintos', 'diversos'),
    (31, 'condicionado', 'determinado', 'forzado'),
    (32, 'acarrea', 'implica', 'tiene'),
    (33, 'iniciadas', 'procesadas', 'desencadenadas'),
    (34, 'concebimos', 'entendemos', 'percibimos'),
    (35, 'compatibles', 'acordes', 'coherentes'),
    (36, 'presupuesto', 'elemento', 'requisito'),
    (37, 'inconscientes', 'irracionales', 'automáticos'),
    (38, 'cuestiona', 'refuta', 'matiza'),
    (39, 'negarla', 'suprimirla', 'eliminarla'),
    (40, 'responsable', 'moral', 'correcta'),
]
for num, a, b, c in t5_opts:
    story.append(gap_options_table(num, (a, b, c)))

story.append(PageBreak())

# ============================================================================
# PRUEBA 2: COMPRENSIÓN AUDITIVA Y USO DE LA LENGUA
# ============================================================================

story.append(prueba_banner(2, 'Comprensión auditiva y uso de la lengua', 50, 30))
story.append(sp(8))
story.append(Paragraph(
    'Esta prueba contiene cuatro tareas. Usted debe responder a 30 preguntas. '
    'Duración: 50 minutos. Marque sus opciones únicamente en la Hoja de respuestas.',
    S['instr']))
story.append(sp(8))
story.append(Paragraph(
    '🔊  Los audios están disponibles en: <b>spanishmercedes.com/audio-dele-c1</b>',
    ParagraphStyle('audio', fontName='Helvetica-Bold', fontSize=10, textColor=colors.HexColor('#0D7A6A'), spaceAfter=5)))
story.append(sp(12))

# ── PRUEBA 2 TAREA 1 ─────────────────────────────────────────────────────────
story.append(tarea_header(1, 'Seleccionar opciones de una entrevista', '~12 min · 6 preguntas'))
story.append(sp(8))
story.append(instr_box(
    'Usted va a escuchar un fragmento de una conferencia de filosofía política. Entre las doce opciones '
    'que aparecen debajo (A - L) deberá elegir las seis que se mencionan en la conferencia. '
    'Escuchará la audición dos veces. Marque las opciones elegidas en la Hoja de respuestas. '
    'Ahora dispone de un minuto para leer las opciones.'))
story.append(sp(8))

p2t1_opts = [
    ("A.", "La tradición liberal parte de Locke y llega hasta Rawls en su defensa del individuo."),
    ("B.", "La crisis climática pone de manifiesto los límites del individualismo liberal."),
    ("C.", "Hans Jonas propuso en los años ochenta el concepto de «ética de la responsabilidad futura»."),
    ("D.", "La obligación moral hacia generaciones futuras desafía el contractualismo clásico."),
    ("E.", "El ponente propone abandonar completamente la noción de autonomía individual."),
    ("F.", "El problema del cambio climático es que el daño es global pero las decisiones son fragmentadas."),
    ("G.", "El Estado existe para imponer una concepción del bien a los ciudadanos."),
    ("H.", "El ponente apuesta por un «liberalismo ecológico» que preserve la autonomía individual."),
    ("I.", "La reciprocidad entre participantes es el fundamento del contrato social clásico."),
    ("J.", "Las democracias liberales deben delegar sus decisiones en organismos supranacionales."),
    ("K.", "El ponente rechaza redefinir los límites de la libertad individual bajo ninguna circunstancia."),
    ("L.", "En sociedades plurales, ninguna autoridad puede imponer una visión única del bien."),
]
for lbl, text in p2t1_opts:
    data = [[Paragraph(f'<b>{lbl}</b>', S['opt_lbl']), Paragraph(text, S['body'])]]
    t = Table(data, colWidths=[20, 470])
    t.setStyle(TableStyle([
        ('TOPPADDING',    (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('VALIGN',        (0,0), (-1,-1), 'TOP'),
        ('LINEBELOW',     (0,0), (-1,-1), 0.2, MGRAY),
    ]))
    story.append(t)

story.append(sp(8))
data = [[Paragraph('<b>Marque únicamente seis opciones en la Hoja de respuestas.</b>', S['instr']),
         Paragraph('A  B  C  D  E  F  G  H  I  J  K  L', ParagraphStyle('abcd', fontName='Helvetica-Bold', fontSize=11, textColor=NAVY, alignment=TA_RIGHT))]]
t = Table(data, colWidths=[250, 240])
t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('TOPPADDING', (0,0), (-1,-1), 4)]))
story.append(t)
story.append(sp(8))
story.append(Paragraph('<b>Preguntas 1 - 6</b>', S['label']))

story.append(PageBreak())

# ── PRUEBA 2 TAREA 2 ─────────────────────────────────────────────────────────
story.append(tarea_header(2, 'Escuchar cuatro conversaciones y responder preguntas', '~14 min · 8 preguntas'))
story.append(sp(8))
story.append(instr_box(
    'Usted va a escuchar cuatro conversaciones. Escuchará cada conversación dos veces. '
    'Debe contestar a las preguntas (7-14). Seleccione la opción correcta (a / b / c). '
    'Marque las opciones elegidas en la Hoja de respuestas.'))
story.append(sp(8))
story.append(Paragraph('<b>PREGUNTAS</b>', S['label']))
story.append(sp(4))

p2t2_data = [
    ("Conversación 1 — Crítica literaria", [
        ("7. ¿Qué aspecto de la novela de Clara Vidal destaca el jurado?",
         ["a) La ambientación histórica en el período de la Transición española.",
          "b) La precisión y la ironía sin caer en el cinismo.",
          "c) El retrato psicológico de personajes de clase obrera."]),
        ("8. ¿Qué marco temporal abarca la novela premiada?",
         ["a) Los años de la Transición democrática española.",
          "b) El período de la crisis económica de 2008 a 2014.",
          "c) Las décadas de posguerra en la España franquista."]),
    ]),
    ("Conversación 2 — Historia del arte", [
        ("9. ¿Cuál es la postura de los expertos respecto a la atribución del cuadro adquirido por el Prado?",
         ["a) Confirman que la obra es de la mano del propio Velázquez.",
          "b) Señalan que se necesitan más análisis para una atribución definitiva.",
          "c) Descartan que la obra pertenezca al taller sevillano de Velázquez."]),
        ("10. ¿Qué información no ha revelado el museo en relación con la adquisición?",
         ["a) El período artístico al que corresponde la obra.",
          "b) La procedencia anterior de la pintura.",
          "c) El precio pagado por la obra."]),
    ]),
    ("Conversación 3 — Ciencias sociales", [
        ("11. ¿Cuál es el dato más llamativo del informe del CIS mencionado en la conversación?",
         ["a) Que la desconfianza institucional es especialmente alta entre menores de 35 años.",
          "b) Que España tiene el nivel más alto de confianza institucional de toda Europa.",
          "c) Que el índice de confianza ha mejorado ligeramente desde 2020."]),
        ("12. ¿Qué matización añade el texto sobre el fenómeno de la desconfianza institucional?",
         ["a) Que se trata de un fenómeno exclusivamente español.",
          "b) Que no es un fenómeno específico de España.",
          "c) Que afecta sobre todo a personas mayores de 50 años."]),
    ]),
    ("Conversación 4 — Arquitectura", [
        ("13. ¿Qué reconoce el premio recibido por Rafael Moneo en Tokio?",
         ["a) Una obra arquitectónica concreta de especial impacto urbano.",
          "b) Una trayectoria completa de contribución a la arquitectura.",
          "c) Su labor como docente e investigador en universidades internacionales."]),
        ("14. ¿Cuál es la posición de Moneo entre los arquitectos españoles premiados?",
         ["a) Es el primer arquitecto español en recibir este galardón.",
          "b) Es el segundo arquitecto español en recibirlo.",
          "c) Es el tercer arquitecto español en recibir el premio."]),
    ]),
]

for conv_title, qs in p2t2_data:
    story.append(Paragraph(f'<b>{conv_title}</b>', S['fragbold']))
    story.append(sp(3))
    for qtext, opts in qs:
        story.append(question_block('', qtext, opts))

story.append(PageBreak())

# ── PRUEBA 2 TAREA 3 ─────────────────────────────────────────────────────────
story.append(tarea_header(3, 'Escuchar un debate y responder preguntas', '~12 min · 6 preguntas'))
story.append(sp(8))
story.append(instr_box(
    'Usted va a escuchar un fragmento de un debate académico. Debe contestar a las preguntas '
    '(15-20). Seleccione la opción correcta (a / b / c). Escuchará el debate dos veces. '
    'Marque las opciones elegidas en la Hoja de respuestas. '
    'Ahora dispone de un minuto para leer las opciones.'))
story.append(sp(8))
story.append(Paragraph('<b>PREGUNTAS</b>', S['label']))
story.append(sp(4))

p2t3_qs = [
    ("15. ¿Cuál es el tema central del debate?",
     ["a) La historia del Estado-nación desde la Revolución Francesa.",
      "b) La pertinencia del Estado-nación como marco de organización política en la era global.",
      "c) Las propuestas de la Unión Europea para reformar las instituciones supranacionales."]),
    ("16. ¿Qué distinción establece Pedro al inicio de su intervención?",
     ["a) Entre el Estado-nación democrático y el Estado-nación autoritario.",
      "b) Entre estar en crisis y estar obsoleto.",
      "c) Entre la soberanía nacional y la soberanía popular."]),
    ("17. Según Isabel, ¿cuál es el principal argumento a favor de instituciones supranacionales?",
     ["a) Que los desafíos más urgentes no respetan las fronteras nacionales.",
      "b) Que los Estados-nación han fracasado en garantizar la paz.",
      "c) Que la ciudadanía ya no se identifica con sus gobiernos nacionales."]),
    ("18. ¿Cómo valora Isabel la Unión Europea?",
     ["a) Como un modelo perfecto de gobernanza multinivel.",
      "b) Como un experimento con logros reales pero aquejado de un déficit democrático.",
      "c) Como una institución que debe desaparecer para ceder poder a los Estados."]),
    ("19. ¿Cuál es la postura de Natalia en el debate?",
     ["a) Apoya incondicionalmente la posición de Pedro sobre el Estado-nación.",
      "b) Propone articular múltiples niveles de gobernanza en lugar de elegir entre extremos.",
      "c) Defiende que la Unión Europea debe convertirse en un Estado federal."]),
    ("20. ¿Qué conclusión comparte Natalia al final del debate?",
     ["a) Que tanto Pedro como Isabel tienen razón en parte y hay que inventar nuevas formas institucionales.",
      "b) Que el Estado-nación debe reformarse desde dentro sin abandonar el modelo.",
      "c) Que la globalización hace inevitablemente obsoleto al Estado-nación."]),
]
for qtext, opts in p2t3_qs:
    story.append(question_block('', qtext, opts))

story.append(PageBreak())

# ── PRUEBA 2 TAREA 4 ─────────────────────────────────────────────────────────
story.append(tarea_header(4, 'Escuchar diez diálogos breves y responder preguntas', '~12 min · 10 preguntas'))
story.append(sp(8))
story.append(instr_box(
    'Usted va a escuchar diez breves diálogos. Escuchará cada diálogo dos veces. '
    'Debe contestar a las preguntas (21-30). Seleccione la opción correcta (a / b / c). '
    'Marque las opciones elegidas en la Hoja de respuestas.'))
story.append(sp(8))
story.append(Paragraph('<b>PREGUNTAS</b>', S['label']))
story.append(sp(4))

p2t4_qs = [
    ("Diálogo 1", "21. De la conversación se deduce que la mujer…",
     ["a) acepta ampliar el plazo de entrega del informe.",
      "b) rechaza modificar los términos acordados inicialmente.",
      "c) propone retrasar la reunión hasta la semana siguiente."]),
    ("Diálogo 2", "22. Estas dos personas coinciden en que el proyecto…",
     ["a) necesita más financiación antes de continuar.",
      "b) ha mejorado notablemente desde la última revisión.",
      "c) debería presentarse en el congreso del mes próximo."]),
    ("Diálogo 3", "23. Respecto a la solicitud de beca, la mujer piensa que…",
     ["a) cumple con todos los requisitos establecidos en la convocatoria.",
      "b) la documentación presentada es insuficiente.",
      "c) pueden haberse modificado los criterios de selección."]),
    ("Diálogo 4", "24. El hombre le advierte a la mujer que…",
     ["a) hay que abonar un importe adicional al renovar el contrato.",
      "b) es necesario presentar la solicitud antes del viernes.",
      "c) debe modificar los datos bancarios en el sistema."]),
    ("Diálogo 5", "25. Ante la sugerencia del hombre, la mujer muestra…",
     ["a) alivio ante la solución propuesta.",
      "b) escepticismo sobre la viabilidad de la propuesta.",
      "c) entusiasmo sin reservas por la iniciativa."]),
    ("Diálogo 6", "26. El hombre se queja de que…",
     ["a) los resultados del estudio no coinciden con sus hipótesis.",
      "b) no ha podido dormir bien en los últimos días.",
      "c) le han cambiado el horario de tutorías sin previo aviso."]),
    ("Diálogo 7", "27. La mujer dice que la actitud de su compañera es…",
     ["a) comprensible dadas las circunstancias del departamento.",
      "b) decepcionante e injustificada.",
      "c) fruto de un malentendido que se resolverá pronto."]),
    ("Diálogo 8", "28. El hombre ha recibido la noticia…",
     ["a) con gran entusiasmo y orgullo.",
      "b) con cierta desconfianza hacia su veracidad.",
      "c) con resignación ante lo inevitable."]),
    ("Diálogo 9", "29. Por la conversación se sabe que…",
     ["a) la mujer ya ha pasado antes por una situación similar.",
      "b) el hombre se siente muy presionado por los plazos.",
      "c) es imposible prorrogar la fecha límite establecida."]),
    ("Diálogo 10", "30. El hombre responde a la mujer…",
     ["a) indicando el motivo del cambio de sala.",
      "b) señalando la localización exacta del aula.",
      "c) remitiéndola a la secretaría para más información."]),
]

for dial, qtext, opts in p2t4_qs:
    story.append(Paragraph(f'<b>{dial}</b>', S['fragbold']))
    story.append(question_block('', qtext, opts))

story.append(PageBreak())

# ============================================================================
# PRUEBA 3: EXPRESIÓN E INTERACCIÓN ESCRITAS
# ============================================================================

story.append(prueba_banner(3, 'Expresión e interacción escritas', 80, '2 tareas'))
story.append(sp(8))
story.append(Paragraph(
    'Esta prueba contiene dos tareas. Duración: 80 minutos. Se valorarán la argumentación '
    'sofisticada, la riqueza léxica, el control de estructuras complejas y la adecuación al '
    'registro académico o formal.', S['instr']))
story.append(sp(12))

story.append(tarea_header(1, 'Ensayo de opinión académica', '~40 min · 220-250 palabras'))
story.append(sp(8))
story.append(Paragraph(
    'Lea el siguiente fragmento. Escribe un ensayo argumentado en el que desarrolles tu posición '
    'ante las ideas planteadas (220-250 palabras).', S['instr']))
story.append(sp(6))

data = [[Paragraph(
    '«La inteligencia artificial ha hecho que la creatividad humana pase de ser un don raro e '
    'incomprensible a ser un proceso técnico reproducible. Pronto no habrá ninguna actividad '
    'creativa —escritura, música, diseño, pintura— que no pueda ser imitada y superada por una '
    'máquina. Esto no representa el fin del arte; representa el fin del artista.»\n\n'
    '<i>Fuente: artículo de opinión, suplemento cultural de un diario nacional.</i>', S['body'])]]
t = Table(data, colWidths=[490])
t.setStyle(TableStyle([
    ('BACKGROUND',    (0,0), (-1,-1), LGRAY),
    ('BOX',           (0,0), (-1,-1), 1, C1_BLUE),
    ('TOPPADDING',    (0,0), (-1,-1), 10),
    ('BOTTOMPADDING', (0,0), (-1,-1), 10),
    ('LEFTPADDING',   (0,0), (-1,-1), 12),
    ('RIGHTPADDING',  (0,0), (-1,-1), 12),
]))
story.append(t)
story.append(sp(8))

story.append(Paragraph('<b>Tu ensayo debe:</b>', S['instr']))
for item in [
    'Presentar una tesis clara y matizada sobre las ideas del texto.',
    'Desarrollar al menos dos argumentos bien fundamentados.',
    'Incorporar al menos una refutación del argumento contrario.',
    'Concluir con una propuesta o reflexión de apertura.',
    'Usar un registro académico: conectores discursivos variados y vocabulario preciso.',
]:
    story.append(Paragraph(f'•  {item}', S['opt']))
story.append(sp(6))
story.append(Paragraph('<i>Escribe tu ensayo aquí (220-250 palabras):</i>', S['italic']))
story.append(sp(120))
story.append(HRFlowable(width='100%', thickness=0.5, color=MGRAY))
story.append(sp(120))
story.append(HRFlowable(width='100%', thickness=0.5, color=MGRAY))
story.append(sp(12))

story.append(tarea_header(2, 'Artículo para una revista especializada', '~40 min · 220-250 palabras'))
story.append(sp(8))
story.append(Paragraph(
    'Elija solo una de las dos opciones que se le ofrecen a continuación. '
    'Número de palabras: entre 220 y 250.', S['instr']))
story.append(sp(6))

story.append(Paragraph('<b>OPCIÓN 1</b>', S['label']))
story.append(sp(4))
story.append(Paragraph(
    'Una revista de humanidades le invita a escribir un artículo sobre el tema siguiente: '
    '«Las redes sociales han transformado fundamentalmente el concepto de identidad: el yo contemporáneo '
    'es una construcción permanentemente renegociada en el espacio público digital. '
    '¿Es esto una amenaza para la autenticidad o una nueva forma de libertad?»',
    S['body']))
story.append(sp(6))
story.append(Paragraph('<b>OPCIÓN 2</b>', S['label']))
story.append(sp(4))
story.append(Paragraph(
    'Usted trabaja en un portal académico y le han pedido un informe breve sobre el impacto del '
    'cambio climático en la salud pública, destinado a responsables de políticas universitarias. '
    'En su informe deberá: hacer una introducción al tema; describir dos consecuencias concretas '
    'para la salud; proponer medidas que las universidades pueden adoptar.',
    S['body']))

story.append(PageBreak())

# ============================================================================
# PRUEBA 4: EXPRESIÓN E INTERACCIÓN ORALES
# ============================================================================

story.append(prueba_banner(4, 'Expresión e interacción orales', '20+20', '3 tareas'))
story.append(sp(8))
story.append(Paragraph(
    'Duración: 20 minutos de preparación + 20 minutos con el entrevistador. '
    'Se valorarán la fluidez, la precisión léxica y gramatical, la capacidad de argumentación '
    'sofisticada y la adecuación al registro formal-académico.', S['instr']))
story.append(sp(12))

story.append(tarea_header(1, 'Valorar y negociar propuestas', '~6-8 min'))
story.append(sp(8))
story.append(Paragraph(
    'Observe las propuestas para reformar el sistema universitario de investigación. Valórelas, '
    'defienda las más adecuadas y debate con el entrevistador.', S['instr']))
story.append(sp(6))

prop_data = [
    [Paragraph('<b>A</b>', S['opt_lbl']), Paragraph('<b>Evaluación por impacto social</b>', S['q']),
     Paragraph('La investigación universitaria debe evaluarse no solo por publicaciones, sino por su impacto medible en la sociedad.', S['body'])],
    [Paragraph('<b>B</b>', S['opt_lbl']), Paragraph('<b>Interdisciplinariedad obligatoria</b>', S['q']),
     Paragraph('Todo proyecto de investigación debe incluir colaboradores de al menos dos disciplinas diferentes.', S['body'])],
    [Paragraph('<b>C</b>', S['opt_lbl']), Paragraph('<b>Acceso abierto universal</b>', S['q']),
     Paragraph('Todos los resultados de investigación pública deben ser de acceso libre y gratuito desde su publicación.', S['body'])],
    [Paragraph('<b>D</b>', S['opt_lbl']), Paragraph('<b>Movilidad internacional remunerada</b>', S['q']),
     Paragraph('Los investigadores deben pasar uno o dos años en instituciones extranjeras para acceder a categorías superiores.', S['body'])],
    [Paragraph('<b>E</b>', S['opt_lbl']), Paragraph('<b>Financiación ciudadana participativa</b>', S['q']),
     Paragraph('Una parte de los presupuestos de investigación debe decidirse mediante consultas a la ciudadanía.', S['body'])],
]
pt = Table(prop_data, colWidths=[22, 160, 308])
pt.setStyle(TableStyle([
    ('BACKGROUND',    (0,0), (-1,-1), LGRAY),
    ('ROWBACKGROUNDS',(0,0), (-1,-1), [LGRAY, WHITE]),
    ('BOX',           (0,0), (-1,-1), 0.5, MGRAY),
    ('INNERGRID',     (0,0), (-1,-1), 0.3, MGRAY),
    ('TOPPADDING',    (0,0), (-1,-1), 6),
    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ('LEFTPADDING',   (0,0), (-1,-1), 6),
    ('VALIGN',        (0,0), (-1,-1), 'TOP'),
]))
story.append(pt)
story.append(sp(8))

story.append(tarea_header(2, 'Analizar y debatir a partir de una imagen', '~6-8 min'))
story.append(sp(8))
story.append(Paragraph(
    'Describa y analice la imagen que le proporciona el entrevistador. Responda a las preguntas '
    'y participe en el debate. Hable durante 6-8 minutos.', S['instr']))
story.append(sp(6))

for q in [
    '¿Qué observas en la imagen? ¿Qué historia podría estar contando esta escena?',
    '¿Cómo interpretas la coexistencia de elementos tradicionales y digitales en el mismo espacio?',
    '¿Crees que la inteligencia artificial va a sustituir al libro como espacio de conocimiento?',
    '¿Qué papel tiene el libro físico en la formación intelectual en la era digital?',
    '¿Qué perdemos, si es que perdemos algo, cuando el conocimiento se digitaliza completamente?',
]:
    story.append(Paragraph(f'•  {q}', S['opt']))

story.append(sp(12))
story.append(tarea_header(3, 'Debate a partir de un texto filosófico', '~6-8 min'))
story.append(sp(8))
story.append(Paragraph(
    'Lea el siguiente fragmento. Exprese su posición con argumentos complejos y debata con el '
    'entrevistador.', S['instr']))
story.append(sp(6))

data = [[Paragraph(
    '«El mayor peligro de la democracia contemporánea no es la tiranía sino la mediocridad: '
    'el gobierno de personas ordinarias que toman decisiones ordinarias sobre problemas '
    'extraordinarios. Necesitamos no tanto más democracia, sino mejor democracia: instituciones '
    'que filtren la demagogia y promuevan a quienes tienen las capacidades y el conocimiento '
    'para gobernar bien.»', S['body'])]]
t = Table(data, colWidths=[490])
t.setStyle(TableStyle([
    ('BACKGROUND',    (0,0), (-1,-1), LGRAY),
    ('BOX',           (0,0), (-1,-1), 1, C1_BLUE),
    ('TOPPADDING',    (0,0), (-1,-1), 10),
    ('BOTTOMPADDING', (0,0), (-1,-1), 10),
    ('LEFTPADDING',   (0,0), (-1,-1), 12),
    ('RIGHTPADDING',  (0,0), (-1,-1), 12),
]))
story.append(t)
story.append(sp(8))

arg_data = [
    [Paragraph('<b>A favor de la idea</b>', S['q']), Paragraph('<b>En contra de la idea</b>', S['q'])],
    [Paragraph('•  La democracia requiere ciudadanos informados para funcionar bien.', S['opt']),
     Paragraph('•  La meritocracia epistémica tiene precedentes históricos peligrosos.', S['opt'])],
    [Paragraph('•  Decisiones técnicas complejas exigen competencia específica.', S['opt']),
     Paragraph('•  Quién define «conocimiento» o «competencia» es ya una decisión política.', S['opt'])],
    [Paragraph('•  Hay precedentes: bancos centrales, tribunales constitucionales.', S['opt']),
     Paragraph('•  La legitimidad democrática deriva del consentimiento, no de la capacidad.', S['opt'])],
]
at = Table(arg_data, colWidths=[245, 245])
at.setStyle(TableStyle([
    ('BOX',         (0,0), (-1,-1), 0.5, MGRAY),
    ('INNERGRID',   (0,0), (-1,-1), 0.5, MGRAY),
    ('TOPPADDING',  (0,0), (-1,-1), 5),
    ('BOTTOMPADDING',(0,0),(-1,-1), 5),
    ('BACKGROUND',  (0,0), (-1,0), LGRAY),
    ('VALIGN',      (0,0), (-1,-1), 'TOP'),
]))
story.append(at)

story.append(PageBreak())

# ============================================================================
# SOLUCIONES
# ============================================================================

story.append(Paragraph('<b>SOLUCIONES</b>', ParagraphStyle('sol', fontName='Helvetica-Bold', fontSize=22, textColor=NAVY, alignment=TA_CENTER, spaceAfter=10)))
story.append(HRFlowable(width='100%', thickness=2, color=C1_BLUE))
story.append(sp(12))

story.append(Paragraph('<b>PRUEBA 1 — Comprensión de lectura y uso de la lengua</b>', S['htask']))
story.append(sp(6))

p1_answers = [
    (1,'b'),(2,'c'),(3,'c'),(4,'b'),(5,'b'),(6,'b'),
    (7,'c'),(8,'e'),(9,'a'),(10,'d'),(11,'b'),(12,'g'),
    (13,'b'),(14,'b'),(15,'b'),(16,'b'),(17,'b'),(18,'b'),
    (19,'e'),(20,'a'),(21,'c'),(22,'b'),(23,'c'),(24,'d'),(25,'a'),(26,'f'),
    (27,'a'),(28,'a'),(29,'a'),(30,'a'),(31,'c'),(32,'a'),(33,'c'),(34,'a'),
    (35,'a'),(36,'a'),(37,'c'),(38,'c'),(39,'a'),(40,'a'),
]
story.append(answer_key_table(p1_answers))
story.append(sp(10))

# Nota sobre Tarea 2 y 4
story.append(Paragraph(
    '<b>Tarea 2 (7-12):</b> 7-C · 8-E · 9-A · 10-D · 11-B · 12-G  '
    '(Fragmento sobrante: F)',
    S['instr']))
story.append(Paragraph(
    '<b>Tarea 4 (19-26):</b> 19-E · 20-A · 21-C · 22-B · 23-C · 24-D · 25-A · 26-F',
    S['instr']))
story.append(sp(12))

story.append(Paragraph('<b>PRUEBA 2 — Comprensión auditiva y uso de la lengua</b>', S['htask']))
story.append(sp(6))

p2_answers = [
    (1,'a'),(2,'b'),(3,'c'),(4,'d'),(5,'f'),(6,'h'),
    (7,'b'),(8,'b'),(9,'b'),(10,'c'),(11,'a'),(12,'b'),
    (13,'b'),(14,'b'),(15,'b'),(16,'b'),(17,'a'),(18,'b'),
    (19,'b'),(20,'a'),(21,'b'),(22,'b'),(23,'c'),(24,'b'),
    (25,'b'),(26,'b'),(27,'b'),(28,'b'),(29,'a'),(30,'b'),
]
story.append(answer_key_table(p2_answers))
story.append(sp(6))
story.append(Paragraph(
    '<b>Tarea 1 (1-6):</b> Opciones correctas: A, B, C, D, F, H, I, L — elegir las 6 correctas según el audio.',
    S['instr']))
story.append(sp(12))

story.append(Paragraph('<b>PRUEBA 3 y PRUEBA 4 — Expresión e interacción</b>', S['htask']))
story.append(sp(6))
story.append(Paragraph(
    'La evaluación sigue los criterios oficiales del Instituto Cervantes para el nivel C1. '
    'En la Prueba 3 se valoran: control de estructuras sintácticas complejas (subordinación, '
    'modalización, voz pasiva), riqueza y precisión léxica de registro culto, cohesión discursiva '
    'y profundidad argumentativa (220-250 palabras). En la Prueba 4 se evalúan: fluidez y naturalidad '
    'del discurso elaborado, amplitud léxica y precisión semántica en contexto académico, control '
    'morfosintáctico de estructuras complejas, pronunciación culta y capacidad de argumentación '
    'y negociación discursiva de alto nivel.',
    S['italic']))
story.append(sp(16))
story.append(Paragraph('© Spanish with Mercedes · Material educativo · spanishmercedes.com', S['small']))

# ============================================================================
# GENERAR PDF
# ============================================================================

doc = SimpleDocTemplate(
    OUT,
    pagesize=A4,
    leftMargin=2*cm,
    rightMargin=2*cm,
    topMargin=2.4*cm,
    bottomMargin=2.2*cm,
    title='Examen de Práctica DELE C1',
    author='Spanish with Mercedes',
)
doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
print(f'PDF generado: {OUT}')
print(f'Tamaño: {os.path.getsize(OUT) // 1024} KB')
