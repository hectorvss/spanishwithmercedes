"""
Generate DELE B2 Prueba 2 audio with natural multi-voice dialogue.
Each speaker line = one MP3 clip. HTML player chains them sequentially.
Voices:
  VOZ_F1 = es-ES-XimenaNeural    (Spain female, standard speaker A)
  VOZ_M1 = es-ES-AlvaroNeural    (Spain male,   standard speaker B)
  VOZ_F2 = es-MX-DaliaNeural     (Mexico female, Amelia)
  VOZ_M2 = es-MX-JorgeNeural     (Mexico male,   Rodrigo)
  VOZ_RPT= es-ES-ElviraNeural    (Spain female, news reportage)
"""
import asyncio, os, sys
import edge_tts

OUT = "audio/dele_b2"
os.makedirs(OUT, exist_ok=True)

VOZ_F1  = "es-ES-XimenaNeural"   # Spain female
VOZ_M1  = "es-ES-AlvaroNeural"   # Spain male
VOZ_F2  = "es-MX-DaliaNeural"    # Mexico female (Amelia)
VOZ_M2  = "es-MX-JorgeNeural"    # Mexico male   (Rodrigo)
VOZ_RPT = "es-ES-ElviraNeural"   # Spain female reporter

RATE   = "-8%"    # slightly measured, clear
PITCH  = "+0Hz"

# ─────────────────────────────────────────────────────────────────────────────
# AUDIO CLIPS DEFINITION
# Each clip: (filename_stem, voice, text)
# ─────────────────────────────────────────────────────────────────────────────
clips = []

# ── TAREA 1: 6 Conversaciones breves ─────────────────────────────────────────

# Conversación 1 – urbanismo
clips += [
    ("t1_c1_a1", VOZ_F1, "Oye, ¿has visto lo que ha dicho el alcalde sobre el nuevo parque?"),
    ("t1_c1_b1", VOZ_M1, "Sí, que van a derribar el edificio abandonado y plantar árboles en su lugar."),
    ("t1_c1_a2", VOZ_F1, "Pues me parece muy bien. Ese barrio necesita zonas verdes."),
]

# Conversación 2 – entrevista de trabajo
clips += [
    ("t1_c2_a1", VOZ_F2, "¿Cómo te fue en la entrevista de trabajo?"),
    ("t1_c2_b1", VOZ_F1, "Regular. Me preguntaron cosas que no esperaba sobre experiencia en gestión de equipos."),
    ("t1_c2_a2", VOZ_F2, "Pero si tienes muchos años de coordinación de proyectos..."),
    ("t1_c2_b2", VOZ_F1, "Ya, pero no lo había preparado bien."),
]

# Conversación 3 – centro comercial
clips += [
    ("t1_c3_a1", VOZ_M1, "¿Sabes cuándo abren el nuevo centro comercial?"),
    ("t1_c3_b1", VOZ_F1, "El mes que viene, creo. Van a tener una inauguración con descuentos del treinta por ciento."),
    ("t1_c3_a2", VOZ_M1, "¿En todo?"),
    ("t1_c3_b2", VOZ_F1, "Solo en las tiendas de ropa, creo."),
]

# Conversación 4 – impuestos gasolina
clips += [
    ("t1_c4_a1", VOZ_F1, "He leído que van a subir los impuestos sobre la gasolina."),
    ("t1_c4_b1", VOZ_M1, "Sí, para incentivar el uso del transporte público."),
    ("t1_c4_a2", VOZ_F1, "Pero para los que vivimos en el campo no hay alternativa..."),
    ("t1_c4_b2", VOZ_M1, "Es verdad, no han pensado en todos."),
]

# Conversación 5 – concierto
clips += [
    ("t1_c5_a1", VOZ_M2, "¿Vas al concierto de esta noche?"),
    ("t1_c5_b1", VOZ_F1, "Iba a ir, pero se me ha puesto malo el niño."),
    ("t1_c5_a2", VOZ_M2, "Vaya, qué mala suerte. ¿Quieres que te coja la entrada yo?"),
    ("t1_c5_b2", VOZ_F1, "No, no te preocupes."),
]

# Conversación 6 – clases de tenis
clips += [
    ("t1_c6_a1", VOZ_F1, "Este verano me apunto a clases de tenis."),
    ("t1_c6_b1", VOZ_M1, "¿En serio? Yo llevo dos años y ya soy bastante decente."),
    ("t1_c6_a2", VOZ_F1, "¿Dónde vas tú? Porque el club de aquí está muy caro."),
    ("t1_c6_b2", VOZ_M1, "Tengo un amigo que da clases en el parque, sale mucho más barato."),
]

# ── TAREA 2: Monólogos sobre teletrabajo ─────────────────────────────────────

clips += [
    ("t2_julia", VOZ_F1,
     "Yo llevo tres años trabajando desde casa y no cambiaría nada. "
     "Al principio me costó organizarme, pero ahora tengo unas rutinas que me permiten ser mucho más productiva. "
     "Lo que más valoro es no perder dos horas al día en el transporte."),
]
clips += [
    ("t2_carlos", VOZ_M1,
     "El teletrabajo me afecta negativamente. Echo de menos el contacto con mis compañeros. "
     "En casa me distraigo con facilidad y noto que me cuesta más concentrarme en tareas largas. "
     "Además, siento que mi jefe no confía en mí si no me ve."),
]
clips += [
    ("t2_amelia", VOZ_F2,
     "Depende del día, la verdad. Algunos días soy muy productiva y otros, una catástrofe. "
     "Lo bueno es que puedo cuidar de mis hijos sin pagar a una cuidadora. "
     "Lo malo, que a veces se borran las fronteras entre vida personal y profesional."),
]
clips += [
    ("t2_rodrigo", VOZ_M2,
     "En mi empresa hacemos un modelo híbrido: dos días en casa, tres en la oficina. "
     "Creo que es lo mejor. Tienes lo mejor de los dos mundos: "
     "la flexibilidad del teletrabajo y la conexión humana de la oficina."),
]

# ── TAREA 3: Reportaje – salud mental ────────────────────────────────────────

clips += [
    ("t3_reportaje", VOZ_RPT,
     "La salud mental en España ha cobrado una relevancia sin precedentes en los últimos años. "
     "Según datos del Ministerio de Sanidad, uno de cada cinco españoles sufrirá algún trastorno mental a lo largo de su vida. "
     "La ansiedad y la depresión son los diagnósticos más frecuentes, y su prevalencia aumentó notablemente durante la pandemia de COVID-19. "
     "Sin embargo, a pesar de su importancia, la salud mental sigue siendo un tema tabú en muchos círculos sociales. "
     "Las personas con trastornos mentales a menudo enfrentan estigma y discriminación, lo que dificulta que busquen ayuda. "
     "El sistema público de salud cuenta con un psicólogo por cada dieciséis mil habitantes, "
     "muy por debajo de la media europea de uno por cada cinco mil. "
     "Esta escasez de recursos provoca listas de espera de meses para acceder a atención especializada. "
     "El Gobierno ha anunciado un plan de inversión de cien millones de euros para reforzar la atención en salud mental, "
     "aunque los profesionales del sector consideran que la cifra es insuficiente. "
     "La concienciación social ha mejorado, especialmente entre los jóvenes, que hablan más abiertamente sobre sus emociones. "
     "Las redes sociales juegan un papel ambivalente: por un lado, normalizan la conversación sobre salud mental; "
     "por otro, pueden ser fuente de comparación negativa y ansiedad."),
]

# ─────────────────────────────────────────────────────────────────────────────
async def gen(stem, voice, text):
    path = f"{OUT}/{stem}.mp3"
    if os.path.exists(path):
        print(f"  SKIP {stem}.mp3 (exists)")
        return
    com = edge_tts.Communicate(text, voice, rate=RATE, pitch=PITCH)
    await com.save(path)
    size = os.path.getsize(path)
    print(f"  OK   {stem}.mp3  {size//1024}KB  [{voice}]")

async def main():
    total = len(clips)
    print(f"Generating {total} audio clips...\n")
    for i, (stem, voice, text) in enumerate(clips, 1):
        print(f"[{i}/{total}]", end=" ")
        await gen(stem, voice, text)
    print(f"\nDone. Files in: {OUT}/")

if __name__ == "__main__":
    asyncio.run(main())
