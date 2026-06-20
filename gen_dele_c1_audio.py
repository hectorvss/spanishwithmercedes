# -*- coding: utf-8 -*-
"""
Genera los audios del Examen de Práctica DELE C1 (Prueba 2 — Comprensión auditiva).
Voces neuronales con rates/pitches variados para sonar naturales y académicos.
Salida: audio/dele_c1/*.mp3
"""

import asyncio, os, re
import edge_tts

OUT = r"audio\dele_c1"
os.makedirs(OUT, exist_ok=True)

# Voces
NARR  = "es-ES-ElviraNeural"   # Narradora formal
ES_F  = "es-ES-XimenaNeural"   # España, mujer culta
ES_M  = "es-ES-AlvaroNeural"   # España, hombre formal
MX_F  = "es-MX-DaliaNeural"    # México, mujer profesional
MX_M  = "es-MX-JorgeNeural"    # México, hombre profesional

clips = []
def add(name, voice, text, rate="-2%", pitch="+0Hz"):
    clips.append((name, voice, text, rate, pitch))

# ==========================================================================
# TAREA 1 — Seis noticias de actualidad y fragmentos de podcasts
# ==========================================================================
add("t1_intro", NARR, "Tarea uno. Va a escuchar seis fragmentos breves sobre temas de actualidad. Escuchará cada fragmento una sola vez.", "-8%")

add("t1_n1", ES_M,
    "Un nuevo estudio del Instituto de Tecnología Sostenible demuestra que la implementación de energías renovables en zonas rurales ha generado mil empleos en los últimos dos años. Los investigadores señalan que estas inversiones no solo reducen emisiones de carbono, sino que revitalizan economías locales deprimidas.",
    "-5%")

add("t1_n2", MX_F,
    "La Universidad Nacional de México acaba de publicar un informe sobre patrones migratorios que desafía las conclusiones previas. Según el análisis de datos de diez años, la inmigración interna genera un efecto positivo en las regiones receptoras, contrario a lo que se creía hace una década.",
    "-3%")

add("t1_n3", ES_F,
    "El Museo del Prado presenta una exposición temporal que reúne obras maestras del Renacimiento nunca antes exhibidas en España. Estos cuadros provienen de colecciones privadas europeas y serán accesibles al público durante solo cuatro meses, lo que ha generado gran expectativa entre críticos y público.",
    "-4%", "+1Hz")

add("t1_n4", MX_M,
    "Un grupo de arqueólogos mexicanos descubre evidencia de un asentamiento prehispánico que desafía las teorías sobre comercio en Mesoamérica. Los artefactos encontrados sugieren conexiones comerciales más complejas de lo que se suponía entre civilizaciones del período clásico.",
    "-5%")

add("t1_n5", ES_M,
    "Neurobiologistas españoles presentan hallazgos sobre la plasticidad cerebral en adultos mayores. Estos descubrimientos abren nuevas perspectivas para el tratamiento de enfermedades neurodegenerativas y desafían la idea de que el cerebro pierde capacidad de adaptación con la edad.",
    "-6%")

add("t1_n6", ES_F,
    "El Parlamento Europeo aprueba nueva legislación sobre protección de datos que entrará en vigor en el próximo trimestre. Los expertos en ciberseguridad señalan que estas normas establecerán estándares internacionales y obligarán a empresas tecnológicas a cambiar sus políticas de privacidad.",
    "-4%", "+1Hz")

# ==========================================================================
# TAREA 2 — Fragmento largo de documental o programa especializado
# ==========================================================================
add("t2_intro", NARR, "Tarea dos. Va a escuchar un fragmento de un documental sobre historia económica. Escuchará la audición una sola vez.", "-8%")

add("t2_fragmento", ES_M,
    """El concepto de "disruption" o disrupción tecnológica se popularizó en los años noventa, pero su historia es más antigua de lo que generalmente se cree. Los economistas señalan que revoluciones tecnológicas previas, como la mecanización de la agricultura en el siglo diecinueve, generaron transformaciones sociales comparables a las que experimentamos hoy con la inteligencia artificial. La diferencia fundamental radica en la velocidad de cambio. Mientras que la revolución industrial tardó casi un siglo en transformar completamente las estructuras económicas, las transformaciones digitales ocurren en años. Esta aceleración ha generado desajustes entre capacidad de adaptación humana y demandas del mercado laboral. Los estudios demográficos indican que profesiones que requerían años de especialización ahora se vuelven obsoletas en décadas. La pregunta que los economistas contemporáneos se hacen no es si habrá más disrupciones, sino cuán rápido podrá la sociedad implementar políticas educativas y de reconversión laboral para acompañar estos cambios. Algunos expertos proponen un enfoque de "aprendizaje permanente" donde los trabajadores se recicloan constantemente, mientras otros advierten que esto podría generar mayor desigualdad si no se acompaña de inversión pública significativa.""",
    "-5%")

# ==========================================================================
# TAREA 3 — Conversación académica o debate (fragmento largo)
# ==========================================================================
add("t3_intro", NARR, "Tarea tres. Va a escuchar un fragmento de una conversación académica. Escuchará la audición una sola vez.", "-8%")

add("t3_conv", ES_F,
    """Entrevistadora: Profesor López, usted ha pasado quince años investigando sistemas educativos comparados. Desde esa perspectiva, ¿cuáles cree que son los principales desafíos de la educación en el siglo veintiuno?

Profesor: Principalmente dos. El primero es epistemológico: tenemos un currículo decimonónico tratando de preparar estudiantes para un mundo que no existe aún. Los sistemas educativos se diseñan con retraso respecto a la realidad del mercado laboral. El segundo es más profundo: hemos convertido la educación en un mecanismo de selección social cuando debería ser un instrumento de movilidad social.

Entrevistadora: ¿Qué diferencia hay?

Profesor: En la selección social, el sistema identifica talento existente. En movilidad social, el sistema crea capacidades en poblaciones que previamente no las tenían. Los países con mayores logros en reducción de desigualdad han apostado por movilidad, no por selección. Islandia, Finlandia, algunos países escandinavos, priorizan que todos alcancen un nivel mínimo de excelencia antes de seleccionar a los mejores.""",
    "-4%", "+2Hz")

# ==========================================================================
# TAREA 4 — Monólogo breve sobre tema especializado
# ==========================================================================
add("t4_intro", NARR, "Tarea cuatro. Va a escuchar un monólogo breve de un especialista. Escuchará la audición una sola vez.", "-8%")

add("t4_monologo", MX_M,
    """La sostenibilidad ambiental no es únicamente una cuestión ética o política, sino una cuestión económica fundamental. Durante décadas, los economistas convencionales han externalizado los costos ambientales, es decir, los han trasladado a la sociedad como si no formaran parte del balance contable de las empresas. Cuando una fábrica contamina un río, ese costo no aparece en sus estados financieros, pero sí aparece en los gastos de salud pública, remediación ambiental y pérdida de biodiversidad. La revolución de la contabilidad ambiental consiste precisamente en internizar estos costos. Estudios recientes demuestran que cuando se contabilizan adecuadamente los daños ambientales, muchas industrias que aparentemente eran rentables resultan ser deficitarias. Esto genera presión para modelos empresariales genuinamente sostenibles, no solo cosméticos.""",
    "-5%")

# ==========================================================================
# TAREA 5 — Múltiples fragmentos cortos (debates, opiniones)
# ==========================================================================
add("t5_intro", NARR, "Tarea cinco. Va a escuchar siete fragmentos breves de personas opinando sobre un tema. Escuchará cada fragmento una sola vez.", "-8%")

add("t5_o1", ES_F,
    "Creo que el teletrabajo ha sido una revolución positiva. Ahora tengo más flexibilidad para equilibrar mi vida profesional con mis responsabilidades familiares. Aunque hay desafíos tecnológicos, los beneficios de evitar desplazamientos largos superan cualquier inconveniente.",
    "-3%", "+2Hz")

add("t5_o2", ES_M,
    "El teletrabajo ha acentuado las desigualdades. Solo algunos trabajos pueden hacerse remotamente; los trabajadores de servicios, construcción, agricultura, siguen siendo vulnerables a explotación. Hemos creado una clase de trabajadores digitales privilegiados y otra precarizada.",
    "-4%")

add("t5_o3", MX_F,
    "La verdadera transformación no es el lugar donde trabajamos, sino la desconexión. Si trabajas desde casa pero tu jefe espera que atiendas mensajes a las diez de la noche, no hay libertad. Los marcos legales de desconexión digital son urgentes.",
    "-3%")

add("t5_o4", MX_M,
    "Como empleador, la productividad en teletrabajo ha sido sorprendentemente alta. He notado que el estrés por desplazamientos disminuye significativamente. El reto ahora es mantener la cohesión de equipo sin encuentros presenciales regulares.",
    "-5%")

add("t5_o5", ES_F,
    "Pienso que es fundamental diferenciar sectores. Para trabajos intelectuales, creativos, el teletrabajo funciona. Para labores que requieren colaboración práctica constante, los encuentros presenciales siguen siendo insustituibles.",
    "-4%")

add("t5_o6", ES_M,
    "La pandemia nos forzó a experimentar algo que las empresas resistían. Ahora que sabemos que funciona, muchas institutos vuelven a presencialidad más por tradición que por lógica. Eso refleja resistencia al cambio, no necesidad real.",
    "-3%")

add("t5_o7", MX_F,
    "Mi preocupación es que se privatice la tecnología de teletrabajo. Si solo empresas grandes tienen acceso a infraestructura digital robusta, creamos brechas. La conectividad de calidad debería ser un bien público, no privado.",
    "-4%", "+1Hz")

# ==========================================================================
# TAREA 6 — Fragmento con información para completar huecos
# ==========================================================================
add("t6_intro", NARR, "Tarea seis. Va a escuchar un fragmento de una conferencia académica. Escuchará la audición una sola vez.", "-8%")

add("t6_fragmento", ES_F,
    """La inteligencia artificial es quizás el desarrollo tecnológico más transformador desde la imprenta. Sin embargo, su impacto dependerá crucialmente de cómo la regulemos. Los sistemas de inteligencia artificial actuales son capaces de realizar tareas sofisticadas, pero carecen de comprensión genuina. Esto plantea un problema ético fundamental: cuando delegamos decisiones importantes a algoritmos que no comprenden sus propias decisiones, ¿quién es responsable si algo sale mal? Las regulaciones emergentes en Europa buscan establecer responsabilidad clara para algoritmos de alto riesgo, particularmente en sectores como salud, justicia y empleo. Un algoritmo que rechaza solicitudes de crédito sin poder explicar por qué es problemático. Uno que diagnostica enfermedades sin transparencia es peligroso. La verdadera revolución de la inteligencia artificial no será tecnológica, sino legal y ética. Necesitamos marcos de gobernanza que equilibren innovación con protección ciudadana.""",
    "-4%", "+1Hz")

# ==========================================================================
# GENERAR
# ==========================================================================
async def generate_one(name, voice, text, rate, pitch):
    out_path = os.path.join(OUT, f"{name}.mp3")
    if os.path.exists(out_path):
        print(f"  [ya existe] {name}.mp3")
        return
    text_clean = re.sub(r'\n\s+', ' ', text).strip()
    text_clean = re.sub(r'\s{2,}', ' ', text_clean)
    communicate = edge_tts.Communicate(text_clean, voice, rate=rate, pitch=pitch)
    await communicate.save(out_path)
    size = os.path.getsize(out_path) // 1024
    print(f"  [OK {size}KB] {name}.mp3")

async def main():
    print(f"\nGenerando {len(clips)} audios en {OUT}...\n")
    for i, (name, voice, text, rate, pitch) in enumerate(clips, 1):
        print(f"[{i}/{len(clips)}] {name} ({voice})")
        try:
            await generate_one(name, voice, text, rate, pitch)
        except Exception as e:
            print(f"  [ERROR] {e}")
    print("\nListo.")

asyncio.run(main())
