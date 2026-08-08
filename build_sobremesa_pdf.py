# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT

RED = colors.HexColor('#E74C3C')
DARK = colors.HexColor('#121117')
GREY = colors.HexColor('#4D4C5C')
LIGHT = colors.HexColor('#FBEAE8')

styles = getSampleStyleSheet()
title_style = ParagraphStyle('TitleBig', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=30, textColor=DARK, spaceAfter=4, alignment=TA_CENTER)
kicker_style = ParagraphStyle('Kicker', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, textColor=RED, alignment=TA_CENTER, spaceAfter=2)
subtitle_style = ParagraphStyle('Subtitle', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=13, textColor=GREY, alignment=TA_CENTER, spaceAfter=4)
level_style = ParagraphStyle('Level', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=11, textColor=colors.white, alignment=TA_CENTER, backColor=RED, spaceAfter=18)
body_style = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=10.5, leading=15, textColor=DARK, spaceAfter=10, alignment=TA_LEFT)
h1_style = ParagraphStyle('H1', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=16, textColor=RED, spaceBefore=14, spaceAfter=10)
h2_style = ParagraphStyle('H2', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=12, textColor=DARK, spaceBefore=10, spaceAfter=6)
label_style = ParagraphStyle('Label', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, textColor=RED, spaceAfter=2)
item_style = ParagraphStyle('Item', parent=styles['Normal'], fontName='Helvetica', fontSize=10.5, leading=15, textColor=DARK, spaceAfter=10)
quote_style = ParagraphStyle('Quote', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=10.5, leading=15, textColor=DARK, spaceAfter=6, leftIndent=14, borderColor=RED, borderWidth=0, backColor=LIGHT)
note_style = ParagraphStyle('Note', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=DARK, spaceAfter=10, backColor=LIGHT)
toc_style = ParagraphStyle('Toc', parent=styles['Normal'], fontName='Helvetica', fontSize=11, leading=18, textColor=DARK)
footer_style = ParagraphStyle('Footer', parent=styles['Normal'], fontName='Helvetica', fontSize=8, textColor=colors.HexColor('#9B9AAB'), alignment=TA_CENTER)
prompt_label = ParagraphStyle('PromptLabel', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10.5, textColor=RED, spaceBefore=10, spaceAfter=4)
prompt_body = ParagraphStyle('PromptBody', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=10, leading=14, textColor=DARK, spaceAfter=8, backColor=colors.HexColor('#F9F9FB'), borderPadding=8)

def foot(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(colors.HexColor('#9B9AAB'))
    canvas.drawCentredString(A4[0] / 2, 1.2 * cm, "SPANISH LESSONS with Mercedes  ·  spanishmercedes.com  ·  © Spanish Lessons with Mercedes")
    canvas.restoreState()

story = []

# ---------- PORTADA ----------
story.append(Spacer(1, 1.2 * cm))
story.append(Paragraph("SPANISH LESSONS — with Mercedes", kicker_style))
story.append(Spacer(1, 0.6 * cm))
story.append(Paragraph("LA SOBREMESA", title_style))
story.append(Paragraph("Una palabra española que no existe en otras lenguas", subtitle_style))
story.append(Spacer(1, 0.3 * cm))
story.append(Paragraph("NIVEL A2&ndash;B1", level_style))
story.append(Spacer(1, 0.4 * cm))
story.append(Paragraph(
    "¡Bienvenido/a! · Welcome · Bienvenue. Esta guía explora una de las palabras más "
    "queridas del español &mdash; &laquo;la sobremesa&raquo; &mdash; y te enseña a usarla de forma natural. "
    "Es una palabra sin traducción exacta en inglés, francés, chino, japonés o alemán, y entenderla te "
    "acerca a la cultura española.", body_style))
story.append(Paragraph(
    "<b>Objetivo de la lección.</b> Al terminar esta guía sabrás qué es la sobremesa, por qué es un "
    "concepto único de la cultura española, y podrás usar cinco expresiones naturales relacionadas con "
    "la palabra en una conversación real.", body_style))
story.append(Spacer(1, 0.3 * cm))
story.append(Paragraph("Contenido de esta guía", h2_style))
story.append(Paragraph("01 &nbsp;&nbsp; El concepto &mdash; ¿Qué es la sobremesa?", toc_style))
story.append(Paragraph("02 &nbsp;&nbsp; Expresiones &mdash; vocabulario clave", toc_style))
story.append(Paragraph("03 &nbsp;&nbsp; Practica con IA &mdash; 2 prompts listos para usar", toc_style))
story.append(PageBreak())

# ---------- 01 EL CONCEPTO ----------
story.append(Paragraph("01 &middot; EL CONCEPTO &mdash; ¿QUÉ ES LA SOBREMESA?", h1_style))
story.append(Paragraph(
    "En España, comer no termina cuando se acaba la comida. Después de comer, es muy normal quedarse en "
    "la mesa &mdash; sin prisa, sin plato delante &mdash; solo para hablar, reír y tomar un café. Ese "
    "tiempo tiene un nombre propio: &laquo;la sobremesa&raquo;.", body_style))
story.append(Paragraph(
    "No es solo una costumbre &mdash; es una forma de entender la comida como algo social, no solo como "
    "alimento. Por eso muchos hispanohablantes consideran la sobremesa uno de los mejores momentos del "
    "día.", body_style))

story.append(Paragraph("¿Cómo lo dirían en otros idiomas?", h2_style))
idiomas = [
    ("EN &middot; English", "No existe una palabra única. Se necesita una frase completa, como &laquo;after-dinner conversation&raquo;, y no transmite lo mismo."),
    ("FR &middot; Français", "Tampoco hay equivalente directo. &laquo;Rester à table&raquo; describe la acción, pero no el concepto cultural completo."),
    ("DE &middot; Deutsch", "&laquo;Tischgespräch&raquo; se acerca, pero no incluye la idea de quedarse sin prisa durante horas."),
    ("CN &middot; Chino", "No hay una palabra que combine sobremesa y conversación de esta forma; se necesitan varias palabras para describirlo."),
    ("JP &middot; Japonés", "El concepto de quedarse charlando después de comer no tiene una palabra fija equivalente en japonés."),
]
for lang, text in idiomas:
    story.append(Paragraph(lang, label_style))
    story.append(Paragraph(text, item_style))

story.append(Paragraph("Así se usa", h2_style))
story.append(Paragraph("&laquo;Después de comer, siempre hacemos sobremesa.&raquo;", quote_style))
story.append(Paragraph("&laquo;Nos quedamos de sobremesa hasta las cuatro.&raquo;", quote_style))
story.append(Spacer(1, 0.2 * cm))
story.append(Paragraph("La regla es simple: <b>sobremesa</b> = quedarse en la mesa, sin prisa, solo para hablar.", note_style))
story.append(PageBreak())

# ---------- 02 EXPRESIONES ----------
story.append(Paragraph("02 &middot; EXPRESIONES CON &laquo;SOBREMESA&raquo;", h1_style))

grupos = [
    ("La palabra", "Sobremesa &middot; Hacer sobremesa &middot; Quedarse de sobremesa"),
    ("Expresiones relacionadas", "Alargar la sobremesa &middot; Sobremesa animada &middot; Sobremesa interminable"),
    ("Cuándo se hace", "Después de comer &middot; Los domingos &middot; En Navidad"),
    ("Con quién", "Con la familia &middot; Con amigos &middot; Con compañeros de trabajo"),
]
for label, text in grupos:
    story.append(Paragraph(label, label_style))
    story.append(Paragraph(text, item_style))

story.append(Paragraph("Contraste: sobremesa vs. comida rápida", h2_style))
contrastes = [
    ("Sin prisa", "Se come rápido"),
    ("Se prolonga con conversación", "Se termina y te vas"),
    ("Es un momento social", "Es solo nutrición"),
    ("Puede durar horas", "Dura minutos"),
    ("Café o copa incluidos", "Sin sobremesa"),
    ("Típica en comidas familiares", "Típica en el trabajo o de paso"),
]
story.append(Paragraph("<b>SOBREMESA</b> &nbsp;&nbsp;|&nbsp;&nbsp; <b>COMIDA RÁPIDA</b>", item_style))
for a, b in contrastes:
    story.append(Paragraph("✓ " + a + " &nbsp;&nbsp;&mdash;&nbsp;&nbsp; ✗ " + b, item_style))
story.append(PageBreak())

# ---------- 03 PRACTICA CON IA ----------
story.append(Paragraph("03 &middot; PRACTICA CON INTELIGENCIA ARTIFICIAL", h1_style))
story.append(Paragraph(
    "Copia cualquiera de estos prompts y pégalo en ChatGPT, Claude o Gemini. Practica todas las veces "
    "que quieras. Recuerda: la IA acelera tu práctica &mdash; tu profesora la hace correcta.", body_style))

story.append(Paragraph("01 PROMPT &mdash; Conversación sobre la sobremesa", prompt_label))
story.append(Paragraph(
    "Voy a hablar contigo sobre la sobremesa en España. Tú eres un hispanohablante nativo. Pregúntame "
    "qué suelo hacer después de comer, cuánto dura mi sobremesa normalmente y qué se dice en esos "
    "momentos. Corrígeme con naturalidad si cometo un error. Empieza tú.", prompt_body))

story.append(Paragraph("02 PROMPT &mdash; Crea tus propias frases", prompt_label))
story.append(Paragraph(
    "Actúa como mi profesor de español. Dame 5 situaciones diferentes y pídeme que forme una frase con "
    "una expresión de &laquo;sobremesa&raquo; (hacer sobremesa, quedarse de sobremesa, alargar la "
    "sobremesa, sobremesa animada, sobremesa interminable). Corrígeme si el uso no es natural.", prompt_body))

story.append(Paragraph("03 PROMPT &mdash; Comparación cultural &mdash; sobremesa vs. tu país", prompt_label))
story.append(Paragraph(
    "Te voy a explicar en qué consiste &laquo;la sobremesa&raquo; en España. Después, pregúntame si "
    "existe una costumbre parecida en mi país y ayúdame a describirla en español usando el vocabulario "
    "de esta guía.", prompt_body))

story.append(Spacer(1, 0.4 * cm))
story.append(Paragraph("OTRAS LECCIONES &mdash; Spanish Lessons with Mercedes", h2_style))
otras = [
    ("Presentarte en español", "LLAMARSE, SER, TENER, VIVIR — los 4 verbos del primer día."),
    ("VER / MIRAR / OBSERVAR", "Tres verbos para los ojos. Por qué la TV siempre es VER."),
    ("SER y ESTAR", "Dos verbos para lo que en tu idioma es uno solo."),
    ("Tardear · Ir de tardeo", "Un plan español sin traducción — tapas, sol y sin prisa."),
    ("El complemento directo (CD)", "El truco del pronombre: lo, la, los, las."),
    ("GUSTAR y verbos similares", "Me gusta, me encanta, me molesta — la estructura que confunde a todos."),
]
for title, desc in otras:
    story.append(Paragraph("<b>" + title + "</b> &mdash; " + desc, item_style))

story.append(Spacer(1, 0.4 * cm))
story.append(Paragraph("Suscríbete al canal Spanish Lessons with Mercedes para no perderte ninguna lección.", footer_style))

doc = SimpleDocTemplate(
    "DESCARGABLES_PDF/SOBREMESA/SOBREMESA_DESCARGABLE.pdf",
    pagesize=A4,
    topMargin=1.6 * cm, bottomMargin=1.8 * cm, leftMargin=2 * cm, rightMargin=2 * cm,
)
doc.build(story, onFirstPage=foot, onLaterPages=foot)
print("PDF generado correctamente")
