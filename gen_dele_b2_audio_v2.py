"""
Genera los audios para el Examen de Práctica DELE B2 — versión 2 (nivel real B2)
Estructura: 5 Tareas con scripts auténticos al nivel del Instituto Cervantes.

Voces disponibles:
  es-ES-XimenaNeural  — España, femenina joven
  es-ES-AlvaroNeural  — España, masculino
  es-MX-DaliaNeural   — México, femenina
  es-MX-JorgeNeural   — México, masculino
  es-ES-ElviraNeural  — España, femenina madura

Salida: audio/dele_b2/v2/*.mp3
"""

import asyncio, os, sys, re
import edge_tts

OUT = r"audio\dele_b2\v2"
os.makedirs(OUT, exist_ok=True)

# Voces
NARR   = "es-ES-ElviraNeural"   # Narradora (formal, clara)
ES_F   = "es-ES-XimenaNeural"   # España, mujer joven
ES_M   = "es-ES-AlvaroNeural"   # España, hombre
MX_F   = "es-MX-DaliaNeural"    # México, mujer
MX_M   = "es-MX-JorgeNeural"    # México, hombre
ES_F2  = "es-ES-ElviraNeural"   # España, mujer madura (alternativa)

# Rates y pitches para mayor naturalidad
RATE_CONV   = "-3%"    # Conversación cotidiana
RATE_MONO   = "-5%"    # Monólogo / discurso
RATE_NARR   = "-8%"    # Narradora (más pausada, clara)
RATE_ENTREV = "-4%"    # Entrevista (seminformal)

# --------------------------------------------------------------------------
# CLIPS: lista de (nombre_fichero, voz, texto, rate, pitch)
# --------------------------------------------------------------------------

clips = []

def add(name, voice, text, rate=RATE_CONV, pitch="+0Hz"):
    clips.append((name, voice, text, rate, pitch))


# ==========================================================================
# TAREA 1 — Comprensión de conversaciones (6 conversaciones)
# Formato: NARRADOR presenta, luego 2 personas conversan
# Respuestas por inferencia, vocabulario B2, registro coloquial-culto
# ==========================================================================

# --- Conversación 1 ---
# Dos compañeros de oficina. La mujer no obtuvo un ascenso.
# Inferencia: ella está decepcionada no por el trabajo en sí, sino por no haber sido promovida

add("t1_c1_narr", NARR,
    "Conversación entre dos compañeros de trabajo en una oficina.",
    RATE_NARR)

add("t1_c1_l1", ES_M,
    "Oye, Laura, ¿has visto ya el correo de Recursos Humanos?",
    RATE_CONV)

add("t1_c1_l2", ES_F,
    "Sí, me llegó esta mañana. La verdad es que no me lo esperaba.",
    RATE_CONV)

add("t1_c1_l3", ES_M,
    "Pues en el departamento todos pensábamos que eras la candidata más clara para el puesto.",
    RATE_CONV)

add("t1_c1_l4", ES_F,
    "Supongo que Rodrigo tenía mejor puntuación en la evaluación interna. O eso dice la directora.",
    RATE_CONV)

add("t1_c1_l5", ES_M,
    "Pero si llevas cuatro años más que él en la empresa... Es que no lo entiendo.",
    RATE_CONV)

add("t1_c1_l6", ES_F,
    "Bueno, he pedido una reunión para que me expliquen los criterios. Pero te voy a decir una cosa: esto me hace replantearme si quiero seguir aquí a largo plazo.",
    RATE_CONV)

add("t1_c1_l7", ES_M,
    "Con toda la razón. En tu lugar, yo haría lo mismo.",
    RATE_CONV)

# --- Conversación 2 ---
# Una madre habla con su hijo por teléfono.
# El hijo quiere abandonar la carrera universitaria para montar un negocio.
# Inferencia: la madre no se opone frontalmente pero pone condiciones.

add("t1_c2_narr", NARR,
    "Una madre recibe una llamada de su hijo.",
    RATE_NARR)

add("t1_c2_l1", MX_M,
    "Mamá, te llamo porque quería contarte algo antes de que te enteraras por papá.",
    RATE_CONV)

add("t1_c2_l2", MX_F,
    "Ay, dios mío. ¿Qué ha pasado? Me estás asustando.",
    RATE_CONV)

add("t1_c2_l3", MX_M,
    "No, no pasa nada grave. Es que... he tomado una decisión sobre la carrera. Creo que voy a dejarla.",
    RATE_CONV)

add("t1_c2_l4", MX_F,
    "¿Cómo que dejarla? ¡Si te quedan solo dos años para terminar!",
    RATE_CONV)

add("t1_c2_l5", MX_M,
    "Ya lo sé, mamá. Pero llevo mucho tiempo dándole vueltas. Esto no es lo que quiero para mi vida. Quiero montar algo propio.",
    RATE_CONV)

add("t1_c2_l6", MX_F,
    "Tu padre y yo nos hemos sacrificado mucho para que estudiaras. Esto no es una decisión que puedas tomar a la ligera.",
    RATE_CONV)

add("t1_c2_l7", MX_M,
    "Lo sé, y precisamente por eso quería hablar con vosotros antes que nadie.",
    RATE_CONV)

add("t1_c2_l8", MX_F,
    "Pues mira, ven el fin de semana y lo hablamos los tres. Pero hijo, piénsatelo muy bien, ¿eh?",
    RATE_CONV)

# --- Conversación 3 ---
# Dos vecinas después de una reunión de comunidad de propietarios.
# La queja: los vecinos no llegan a acuerdos; inferencia = frustración con el proceso, no con una persona.

add("t1_c3_narr", NARR,
    "Dos vecinas coinciden en el portal de su edificio al salir de una reunión.",
    RATE_NARR)

add("t1_c3_l1", ES_F,
    "Uf, qué reunión más larga. Una hora y media para llegar a absolutamente nada.",
    RATE_CONV)

add("t1_c3_l2", ES_F2,
    "Hombre, al menos aprobaron presupuesto para arreglar la fachada.",
    RATE_CONV)

add("t1_c3_l3", ES_F,
    "Con cuatro votos a favor y ocho abstenciones. Eso no es tomar una decisión, es ir tirando.",
    RATE_CONV)

add("t1_c3_l4", ES_F2,
    "Pero algo es algo, el año pasado ni eso conseguimos.",
    RATE_CONV)

add("t1_c3_l5", ES_F,
    "Es que llevamos meses con el tema del ascensor sobre la mesa y seguimos igual. Y los que vivimos arriba lo necesitamos.",
    RATE_CONV)

add("t1_c3_l6", ES_F2,
    "El señor Fuentes volvió a votar en contra. Lo entiendo, tiene miedo de que le suban la cuota.",
    RATE_CONV)

add("t1_c3_l7", ES_F,
    "Mira, voy a escribir un escrito formal al administrador. Estoy harta de que las reuniones sirvan solo para hablar sin decidir nada. ¿Me firmas tú también?",
    RATE_CONV)

add("t1_c3_l8", ES_F2,
    "Claro que sí. Adelante.",
    RATE_CONV)

# --- Conversación 4 ---
# Una mujer habla con su amiga sobre una oferta de trabajo en el extranjero.
# La amiga la anima a aceptar; inferencia: la mujer duda por su relación de pareja.

add("t1_c4_narr", NARR,
    "Dos amigas hablan en una cafetería.",
    RATE_NARR)

add("t1_c4_l1", ES_F2,
    "Pero espera, ¿que te han ofrecido el puesto en Berlín y no me lo habías dicho hasta ahora?",
    RATE_CONV)

add("t1_c4_l2", ES_F,
    "Es que acabo de recibir la oferta definitiva esta semana. Contrato de dos años con posibilidad de renovar.",
    RATE_CONV)

add("t1_c4_l3", ES_F2,
    "Silvia, eso es increíble. ¿Por qué lo dudas siquiera?",
    RATE_CONV)

add("t1_c4_l4", ES_F,
    "Porque Marcos no puede venirse. Su madre está muy enferma y no puede dejarla.",
    RATE_CONV)

add("t1_c4_l5", ES_F2,
    "Ah, vaya. Eso lo complica. ¿Y él qué dice?",
    RATE_CONV)

add("t1_c4_l6", ES_F,
    "Dice que lo entiende, que no quiere que yo renuncie por él. Pero eso lo dice ahora...",
    RATE_CONV)

add("t1_c4_l7", ES_F2,
    "Mira, yo que tú lo aceptaba sin dudarlo. Estas oportunidades no se repiten. Dos años pasan volando, y podríais veros los fines de semana.",
    RATE_CONV)

add("t1_c4_l8", ES_F,
    "Ya, pero me da miedo que esto nos acabe afectando.",
    RATE_CONV)

add("t1_c4_l9", ES_F2,
    "Puede. Pero renunciar a esto también te va a pesar. Piénsalo bien.",
    RATE_CONV)

# --- Conversación 5 ---
# Dos amigos comentan noticias sobre una reforma laboral.
# El hombre está claramente en contra; inferencia: la razón principal es el impacto en la vida personal.

add("t1_c5_narr", NARR,
    "Dos amigos desayunan y comentan las noticias.",
    RATE_NARR)

add("t1_c5_l1", ES_M,
    "¿Has leído lo de la nueva reforma laboral?",
    RATE_CONV)

add("t1_c5_l2", ES_F,
    "Por encima. Que amplían el período de prueba, ¿no?",
    RATE_CONV)

add("t1_c5_l3", ES_M,
    "Hasta seis meses en empresas grandes. Y en las pequeñas, un año.",
    RATE_CONV)

add("t1_c5_l4", ES_F,
    "Hombre, yo tampoco estoy muy a favor, pero entiendo que quieran dar más margen a las empresas para contratar.",
    RATE_CONV)

add("t1_c5_l5", ES_M,
    "Más margen para ellas, más precariedad para nosotros. Un año sin derechos reales, sin poder pedir una hipoteca, sin planear nada.",
    RATE_CONV)

add("t1_c5_l6", ES_F,
    "Lo del acceso al crédito sí que es un problema, no había pensado en eso.",
    RATE_CONV)

add("t1_c5_l7", ES_M,
    "Es que el impacto va mucho más allá del trabajo. Afecta a toda tu vida.",
    RATE_CONV)

# --- Conversación 6 ---
# Una vecina avisa a un vecino de que no puede cuidarle el perro como habían acordado.
# Inferencia: el vecino queda en una situación difícil pero la vecina ofrece una solución.

add("t1_c6_narr", NARR,
    "Una mujer se encuentra con su vecino en el rellano.",
    RATE_NARR)

add("t1_c6_l1", ES_F,
    "Carlos, qué alegría encontrarte. Llevo dos días intentando localizarte.",
    RATE_CONV)

add("t1_c6_l2", ES_M,
    "Perdona, he tenido el móvil sin batería. ¿Ha pasado algo?",
    RATE_CONV)

add("t1_c6_l3", ES_F,
    "Es por lo de Rufus. Que el mes que viene ya no voy a poder quedarme con él cuando viajéis.",
    RATE_CONV)

add("t1_c6_l4", ES_M,
    "¿En serio? Pero pensaba que no había problema...",
    RATE_CONV)

add("t1_c6_l5", ES_F,
    "Es que mi hija ha traído al bebé a casa una temporada y, con el perro además, la casa se me queda pequeña. Lo siento muchísimo.",
    RATE_CONV)

add("t1_c6_l6", ES_M,
    "No, te entiendo, pero es que nos vamos el día quince y ahora tengo que buscar una alternativa de urgencia.",
    RATE_CONV)

add("t1_c6_l7", ES_F,
    "Precisamente por eso quería avisarte cuanto antes. Hay una guardería canina en la calle Alcalá que dicen que está muy bien. Te paso el teléfono si quieres.",
    RATE_CONV)

add("t1_c6_l8", ES_M,
    "Sí, pásame el contacto. Ojalá tengan plaza todavía.",
    RATE_CONV)


# ==========================================================================
# TAREA 2 — Conversación larga (formato A/B/Ninguno)
# Pablo y Cristina se encuentran en la boda de un amigo común después de 6 años.
# Inferencia necesaria para asignar afirmaciones a cada persona.
# ==========================================================================

t2_lines = [
    (ES_M, "¿Cristina? ¡No me lo puedo creer! ¿Cuánto tiempo sin vernos?"),
    (MX_F, "Pablo, ¡hola! Pues... seis años, por lo menos. Desde la graduación de Javier."),
    (ES_M, "Exacto. Oye, qué bien que estéis todos esta noche aquí. ¿Viniste sola?"),
    (MX_F, "No, vine con Sergio. Está en la barra, ahora viene. ¿Y tú?"),
    (ES_M, "Yo sí vine solo. Tenía un proyecto hasta esta semana que me ha tenido ocupadísimo."),
    (MX_F, "¿Qué es eso de proyectos? ¿A qué te dedicas ahora?"),
    (ES_M, "Pues... después de dos años intentando encontrar trabajo en arquitectura y no conseguirlo, me lancé a hacer diseño web por mi cuenta."),
    (MX_F, "¿En serio? ¿Desde cuándo?"),
    (ES_M, "Poco más de un año. Al principio fue bastante complicado porque los clientes son irregulares: hay meses que van bien y otros que... bueno, no tanto. Pero poco a poco voy teniendo cartera de clientes fija."),
    (MX_F, "Ya, esa inseguridad económica del trabajo autónomo es lo peor."),
    (ES_M, "Totalmente. Además me mudé a Madrid hace unos meses, que en mi pueblo había muy poco mercado."),
    (MX_F, "¿Te viniste a Madrid? ¡Qué valiente! ¿Y cómo lo llevas?"),
    (ES_M, "Al principio todo era nuevo, pero ya me he adaptado. ¿Y tú? ¿Sigues en Valencia?"),
    (MX_F, "Sí, sigo aquí. Oye, yo también cambié bastante. Estudié traducción, como sabes, pero al final acabé dando clases de inglés."),
    (ES_M, "¿Inglés? Pero si eras de traducción..."),
    (MX_F, "Sí, pero cuando terminé la carrera hice un máster de metodología de enseñanza de idiomas, y me encantó. Ahora trabajo en una academia y la verdad es que me apasiona."),
    (ES_M, "Qué curioso. Yo también me salí de lo mío. Parece que ninguno de los dos acabó donde pensaba."),
    (MX_F, "Ja, ja. Es que la vida te va llevando. Yo estoy muy contenta, la verdad. Tengo un trabajo estable, a Sergio..."),
    (ES_M, "¿Sois pareja?"),
    (MX_F, "Llevamos tres años. Nos conocimos a través del trabajo."),
    (ES_M, "Qué bien. Yo en cambio llevo una temporada tan metido en sacar el negocio adelante que no he tenido tiempo para mucho más."),
    (MX_F, "Bueno, cuando se estabilice todo, ya llegará. Oye, me está llamando Ana para sentarnos. ¿Seguimos luego?"),
    (ES_M, "Claro, luego hablamos más tranquilamente."),
]

for i, (voice, text) in enumerate(t2_lines, 1):
    add(f"t2_l{i:02d}", voice, text, RATE_CONV)


# ==========================================================================
# TAREA 3 — Entrevista a una emprendedora (formato entrevista radiofónica)
# Marta Rueda, fundadora de "Inclúyeme", empresa de moda adaptada.
# Vocabulario B2-C1, estructura narrativa, cronología y datos específicos.
# ==========================================================================

t3_lines = [
    (ES_M,  "Buenos días y bienvenidos a Emprende Hoy. Hoy hablo con Marta Rueda, fundadora de Inclúyeme, una empresa de moda adaptada para personas con discapacidad física. Marta, buenos días."),
    (ES_F,  "Buenos días, gracias por la invitación."),
    (ES_M,  "Marta, cuéntanos: ¿cómo surgió la idea de crear esta empresa?"),
    (ES_F,  "Pues surgió de una experiencia muy personal. Mi hermano tuvo un accidente cuando tenía veintidós años y quedó en silla de ruedas. Y a partir de ahí, yo empecé a darme cuenta de todos los problemas cotidianos que él tenía. Uno de los más frustrantes era la ropa: encontrar ropa funcional, que se pudiera poner de manera autónoma y que además tuviera buen diseño era prácticamente imposible."),
    (ES_M,  "¿Y cuándo decidiste que eso podía convertirse en un negocio?"),
    (ES_F,  "Tardé un tiempo, la verdad. Yo tenía formación en diseño de moda pero no en empresa. Así que primero investigué: hablé con personas con diversidad funcional, con sus familias, con fisioterapeutas. Y vi que había un nicho de mercado enorme y completamente desatendido."),
    (ES_M,  "¿Y cuándo diste el paso definitivo?"),
    (ES_F,  "En dos mil dieciséis. Pedí una excedencia en la empresa donde trabajaba y me lancé. Los primeros dos años fueron muy difíciles porque no tenía financiación y tuve que ir muy despacio. Pero en dos mil dieciocho conseguimos la primera ronda de inversión y ahí ya pudimos crecer de verdad."),
    (ES_M,  "¿En qué consiste exactamente vuestro producto?"),
    (ES_F,  "Hacemos ropa cotidiana, desde camisetas y pantalones hasta ropa de trabajo, con adaptaciones técnicas que la mayoría de la gente no nota a simple vista pero que marcan una diferencia enorme. Por ejemplo: cierres magnéticos en lugar de botones, costuras mínimas para evitar rozaduras, o aberturas estratégicas para facilitar la ayuda de un cuidador. Todo con diseño actual, no ropa de hospital."),
    (ES_M,  "¿Cuál es hoy vuestra principal fuente de clientes?"),
    (ES_F,  "Al principio eran derivaciones de centros de rehabilitación. Ahora el canal principal es online, con mucho peso de las redes sociales. La comunidad que hemos generado en torno a la marca es increíble. Las propias personas con discapacidad son nuestros mejores embajadores."),
    (ES_M,  "¿Y cuáles son los planes de futuro?"),
    (ES_F,  "Estamos trabajando en expandirnos a Francia y Portugal, mercados con una sensibilidad parecida a la española. Y también desarrollamos una línea para personas mayores con movilidad reducida, que es un segmento muy grande con necesidades similares."),
    (ES_M,  "Marta, ha sido un placer. Mucho éxito."),
    (ES_F,  "Muchas gracias a vosotros."),
]

for i, (voice, text) in enumerate(t3_lines, 1):
    rate = RATE_NARR if i == 1 else RATE_ENTREV
    add(f"t3_l{i:02d}", voice, text, rate)


# ==========================================================================
# TAREA 4 — Seis personas dan consejos sobre cómo mantener la motivación
#            al aprender un idioma (monólogos cortos, ~40-50 segundos c/u)
# Formato: emparejar cada persona con un enunciado (A-J, 4 distractores)
# ==========================================================================

t4_personas = [
    # (nombre_fichero, voz, texto)
    ("t4_p1", ES_F,
     "Yo llevo cinco años estudiando alemán y lo que más me ha ayudado es no plantearme metas demasiado grandes. Al principio quería, entre comillas, aprender el idioma, y claro, eso es tan vago que nunca sabes si avanzas. Ahora me pongo objetivos pequeños: esta semana voy a entender una canción, este mes voy a ver un capítulo sin subtítulos. Cuando los cumples, la motivación vuelve sola."),

    ("t4_p2", ES_M,
     "Lo mío es el japonés, que es de los más complicados, y reconozco que hay rachas en las que me canso y lo dejo semanas. Pero lo que me ha salvado es tener a alguien con quien practicar. Tengo un intercambio con un chico de Osaka, nos escribimos todos los días. Saber que alguien al otro lado espera tu mensaje te obliga a no abandonar."),

    ("t4_p3", MX_F,
     "A mí me parece fundamental rodearte del idioma en el día a día. Cambié el idioma de mi teléfono al inglés, escucho podcasts en inglés cuando hago deporte, veo series en versión original. Al principio cuesta, pero tu cerebro acaba procesándolo de forma natural. Ya no lo siento como estudiar, es simplemente mi rutina."),

    ("t4_p4", ES_F2,
     "Lo que yo haría diferente si empezara de nuevo es perder el miedo al ridículo antes. Estuve dos años estudiando francés sin atreverme a hablarlo porque tenía pánico a equivocarme. Hasta que me fui una semana a París y no me quedó otra. Equivocarse es la forma más rápida de aprender. Ahora no me importa nada cometer errores."),

    ("t4_p5", ES_M,
     "Yo soy muy clásico en esto. Tengo un profesor, una clase semanal, deberes, exámenes. Esa estructura para mí es fundamental, porque si me lo dejo a mi voluntad, no lo hago. El hecho de tener que rendir cuentas a alguien me mantiene constante. Y además el profesor te corrige cosas que tú solo nunca detectarías."),

    ("t4_p6", MX_F,
     "Lo que a mí me cambió la perspectiva fue entender que aprender un idioma no es solo aprender palabras. Cuando empecé a interesarme por la cultura francesa, por su historia, su cine, su gastronomía, el idioma dejó de ser una obligación y se convirtió en una ventana. Ahora aprendo porque quiero entender algo que me atrae, no para pasar un examen."),
]

for (fname, voice, text) in t4_personas:
    add(fname, voice, text, RATE_MONO)


# ==========================================================================
# TAREA 5 — Monólogo largo: empresaria que creó empresa de logística social
# Vocabulario de negocios, datos concretos, reflexión personal.
# ~3-4 minutos.
# ==========================================================================

add("t5_monologo", MX_F,
    """
    Bueno, pues yo diría que el gran giro de mi vida llegó de una forma bastante inesperada.
    Yo había trabajado durante más de quince años en el sector del transporte de mercancías,
    primero como conductora, luego como jefa de flota de una empresa mediana en Guadalajara.
    Tenía estabilidad, un sueldo razonable, y sin embargo sentía que faltaba algo.

    El detonante fue conocer a un grupo de mujeres en un barrio periférico de la ciudad
    que fabricaban artesanías increíbles: bolsas, textiles, cerámica.
    Pero no podían venderlas fuera de su mercado local porque no tenían cómo distribuirlas.
    No era falta de producto ni de calidad. Era falta de logística.

    Así que en dos mil quince, con los ahorros de varios años y un préstamo de mi hermano,
    monté Entrega Justa.
    La idea era sencilla: ofrecer servicios de distribución de pequeño formato
    a productores locales, cooperativas y empresas sociales, a precios que ellos pudieran pagar.

    Los primeros seis meses fueron muy duros.
    No teníamos nombre en el mercado, y hubo momentos en que dudé si había tomado la decisión correcta.
    Pero cuando empezamos a ver que las artesanas multiplicaban sus ventas,
    que los productores agrícolas llegaban a restaurantes de la ciudad... eso no tiene precio.

    Hoy Entrega Justa tiene cuarenta y dos empleados,
    la mitad de ellos personas en riesgo de exclusión social
    que han pasado por nuestro programa de formación interna.
    Operamos en cinco estados de México y el año pasado facturamos muy por encima de lo esperado.

    Lo que más me ha enseñado esta experiencia es que el éxito empresarial y el impacto social
    no son contradictorios.
    De hecho, somos más competitivos porque nuestros clientes nos eligen no solo por precio,
    sino por lo que representamos.

    Si tuviera que darle un consejo a alguien que quiere emprender algo así, le diría:
    busca el problema real, no el producto.
    El producto viene solo cuando entiendes bien qué necesita la gente.
    """,
    RATE_MONO)


# ==========================================================================
# GENERAR TODOS LOS AUDIOS
# ==========================================================================

async def generate_one(name, voice, text, rate, pitch):
    out_path = os.path.join(OUT, f"{name}.mp3")
    if os.path.exists(out_path):
        print(f"  [OK existente] {name}.mp3")
        return
    # Limpiar texto (eliminar sangría y saltos múltiples)
    text_clean = re.sub(r'\n\s+', ' ', text).strip()
    text_clean = re.sub(r'\s{2,}', ' ', text_clean)
    communicate = edge_tts.Communicate(text_clean, voice, rate=rate, pitch=pitch)
    await communicate.save(out_path)
    size = os.path.getsize(out_path) // 1024
    print(f"  [OK {size}KB] {name}.mp3")

async def main():
    print(f"\nGenerando {len(clips)} audios en {OUT}...\n")
    total = len(clips)
    for i, (name, voice, text, rate, pitch) in enumerate(clips, 1):
        print(f"[{i}/{total}] {name} ({voice})", end=" ")
        try:
            await generate_one(name, voice, text, rate, pitch)
        except Exception as e:
            print(f"\n  [ERROR] {e}")
    print(f"\nListo. {total} clips procesados.")

asyncio.run(main())
