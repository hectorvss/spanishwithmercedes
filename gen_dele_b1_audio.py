# -*- coding: utf-8 -*-
"""
Genera los audios del Examen de Práctica DELE B1 (Prueba 2 — Comprensión auditiva).
Voces neuronales con rates/pitches variados para sonar naturales.
Salida: audio/dele_b1/*.mp3
"""

import asyncio, os, re
import edge_tts

OUT = r"audio\dele_b1"
os.makedirs(OUT, exist_ok=True)

# Voces
NARR  = "es-ES-ElviraNeural"   # Narradora formal
ES_F  = "es-ES-XimenaNeural"   # España, mujer joven
ES_M  = "es-ES-AlvaroNeural"   # España, hombre
MX_F  = "es-MX-DaliaNeural"    # México, mujer
MX_M  = "es-MX-JorgeNeural"    # México, hombre
ES_F2 = "es-ES-ElviraNeural"   # España, mujer madura

clips = []
def add(name, voice, text, rate="-3%", pitch="+0Hz"):
    clips.append((name, voice, text, rate, pitch))

# ==========================================================================
# TAREA 1 — Seis mensajes de voz
# ==========================================================================
add("t1_intro", NARR, "Tarea uno. Va a escuchar seis mensajes de un buzón de voz. Escuchará cada mensaje dos veces.", "-8%")

add("t1_m1_narr", NARR, "Mensaje uno.", "-8%")
add("t1_m1", ES_M,
    "Hola, Marina, soy Sergio. Te llamo porque el sábado que viene celebro mi cumpleaños en casa, nada formal, una cena con los amigos de siempre. Me haría mucha ilusión que vinieras. Es a partir de las nueve. Confírmame si puedes, ¿vale? ¡Un beso!",
    "-2%", "+2Hz")

add("t1_m2_narr", NARR, "Mensaje dos.", "-8%")
add("t1_m2", ES_F2,
    "Buenos días, este mensaje es para Alberto Ríos. Le llamamos de la gestoría Sanz. Ya tenemos preparado el contrato de alquiler. Necesitamos que lo firme y nos lo devuelva esta misma semana; puede mandárnoslo escaneado por correo electrónico. Gracias.",
    "-6%")

add("t1_m3_narr", NARR, "Mensaje tres.", "-8%")
add("t1_m3", ES_F,
    "Hola, buenas tardes. Llamamos de la Clínica Dental Sonrisa. Le recordamos que tiene cita con el doctor Vega mañana jueves a las cinco y media de la tarde. Si no puede venir, por favor, avísenos con tiempo. Muchas gracias.",
    "-5%")

add("t1_m4_narr", NARR, "Mensaje cuatro.", "-8%")
add("t1_m4", ES_F,
    "¡Hola, hermanito! Soy Nuria. Oye, que al final nos vamos el viernes al pueblo y volvemos el lunes. ¿Te importaría pasarte por mi casa y darle de comer a Michu? Ya sabes dónde dejo la llave. Con una vez al día es suficiente. ¡Te debo una cena! Gracias, de verdad.",
    "+2%", "+4Hz")

add("t1_m5_narr", NARR, "Mensaje cinco.", "-8%")
add("t1_m5", ES_M,
    "Diego, soy papá. Mira, me acaba de llamar el mecánico y dice que el coche ya está arreglado. Yo no puedo ir hoy porque salgo tarde de la oficina. ¿Puedes pasarte tú esta tarde a recogerlo antes de que cierren a las ocho? Ya está pagado todo. Luego hablamos.",
    "-5%", "-2Hz")

add("t1_m6_narr", NARR, "Mensaje seis.", "-8%")
add("t1_m6", ES_F,
    "Pablo, soy Carmen. Que ya he comprado las entradas para el cine de mañana por internet, así que no hace falta hacer cola. Eso sí, la película empieza a las siete en punto y ya sabes cómo eres... ¡no llegues tarde, por favor! Nos vemos en la puerta a menos cuarto.",
    "+1%", "+3Hz")

# ==========================================================================
# TAREA 2 — Monólogo de Valentina
# ==========================================================================
add("t2_intro", NARR,
    "Tarea dos. Va a escuchar un fragmento del programa Españoles por el mundo, en el que Valentina, una sevillana que vive en México, cuenta cómo es su vida. Escuchará la audición dos veces.",
    "-8%")

add("t2_monologo", ES_F,
    """Me llamo Valentina, soy de Sevilla y llevo ocho años viviendo en Ciudad de México.
    Vine porque la empresa donde trabajaba me ofreció un puesto en su oficina mexicana,
    y acepté casi sin pensarlo, aunque mi familia al principio no entendía la decisión.
    Lo primero que me impresionó al llegar fue lo enorme que es la ciudad:
    en mi primer fin de semana intenté recorrerla a pie... ¡qué ingenua!
    Al final aprendí a moverme en metro como todo el mundo.
    Estuve cinco años en aquella empresa, pero hace tres decidí independizarme
    y monté mi propia consultora con una socia mexicana, y la verdad es que no puedo estar más contenta.
    Con la comida tuve una historia curiosa: yo no estaba acostumbrada al picante,
    pero me gustó tanto la cocina de aquí que me apunté a clases,
    y ahora preparo unos chiles en nogada que ya quisieran muchos restaurantes.
    Lo más duro de estos años fue la primera Navidad:
    toda mi familia reunida en Sevilla y yo aquí sola. Lo pasé fatal, no paré de llorar por videollamada.
    Pero todo cambió cuando empecé a hacer amigos de verdad.
    Ahora tengo un grupo de amigos mexicanos que son como una segunda familia:
    celebramos juntos los cumpleaños, los buenos momentos y también los malos.
    Por eso, cuando me preguntan si volveré a España... ya no sé qué contestar.""",
    "-4%", "+2Hz")

# ==========================================================================
# TAREA 3 — Seis noticias
# ==========================================================================
add("t3_intro", NARR, "Tarea tres. Va a escuchar seis noticias en un programa de radio. Escuchará el programa dos veces.", "-8%")

add("t3_n1", ES_M,
    "La nueva biblioteca municipal abrirá finalmente sus puertas el próximo mes de octubre, tras dos años de obras. El edificio, de cuatro plantas, contará con salas de estudio, una zona infantil y un auditorio para presentaciones de libros. El horario será de lunes a sábado.",
    "-6%")
add("t3_n2", ES_M,
    "Mañana comienza el festival de teatro de calle, que este año celebra su décima edición. Durante cuatro días, más de treinta compañías, todas ellas nacionales, llenarán de espectáculos las plazas del casco antiguo. Todas las actuaciones serán gratuitas.",
    "-5%")
add("t3_n3", ES_M,
    "El cocinero Andrés Soler ha sido galardonado en París con el premio al mejor chef europeo del año, un reconocimiento que recibe por primera vez un cocinero de nuestra región. Soler, que regenta su restaurante en el mercado viejo, dedicó el premio a su madre, de quien aprendió a cocinar.",
    "-6%")
add("t3_n4", ES_M,
    "Desde hoy puede visitarse la exposición Mar adentro, con más de cien fotografías históricas de la vida de los pescadores. La muestra, organizada por el museo provincial, se exhibe en el centro cultural del puerto y permanecerá abierta hasta finales de mes. La entrada es libre.",
    "-5%")
add("t3_n5", ES_M,
    "Y en deportes, victoria agónica del equipo de baloncesto de la ciudad, que ayer ganó su partido con una canasta espectacular en el último segundo. Con este triunfo, el equipo se clasifica para las semifinales, que se disputarán dentro de dos semanas.",
    "-2%", "+2Hz")
add("t3_n6", ES_M,
    "En cuanto al tiempo, hoy seguiremos con cielos despejados y temperaturas agradables. Eso sí, atención al fin de semana: se esperan lluvias intensas tanto el sábado como el domingo, así que si tienen planes al aire libre, mejor cambiarlos.",
    "-5%")

# ==========================================================================
# TAREA 4 — Seis personas hablan de sus vacaciones
# ==========================================================================
add("t4_intro", NARR, "Tarea cuatro. Va a escuchar a seis personas que cuentan recuerdos de sus vacaciones. Escuchará a cada persona dos veces.", "-8%")

add("t4_p1_narr", NARR, "Persona uno.", "-8%")
add("t4_p1", ES_F2,
    "¿Mis vacaciones más inolvidables? Hace dos veranos, en Galicia. Habíamos alquilado una casa rural por las fotos de internet: piscina, jardín precioso... Pues llegamos y nada que ver: la piscina llevaba años vacía y las habitaciones olían a humedad. Pedimos que nos devolvieran el dinero y acabamos en un hostal del pueblo, que por cierto era encantador.",
    "-3%")

add("t4_p2_narr", NARR, "Persona dos.", "-8%")
add("t4_p2", ES_M,
    "Yo nunca olvidaré el viaje a Ibiza con mis amigos al acabar el instituto. El segundo día me apunté a una clase de buceo sin haberlo hecho nunca, ¡con el miedo que me daba a mí el mar! Y resultó que me encantó. Tanto que ahora tengo el título de buceador y voy siempre que puedo.",
    "+1%", "+3Hz")

add("t4_p3_narr", NARR, "Persona tres.", "-8%")
add("t4_p3", MX_F,
    "Pues mira, yo el año pasado fui a la boda de mi prima en Argentina. Fue un viaje larguísimo, pero no podíamos faltar: era la primera boda en la familia en muchos años y estábamos todos invitados. Fue precioso reencontrarme con mis tíos y primos después de tanto tiempo.",
    "-3%", "+2Hz")

add("t4_p4_narr", NARR, "Persona cuatro.", "-8%")
add("t4_p4", MX_M,
    "Mi peor anécdota fue en Roma. Segundo día de viaje, en el autobús del centro, me distraje un momento con el móvil haciendo fotos y, cuando fui a pagar en una cafetería... la cartera había desaparecido. Documentos, tarjetas, dinero, todo. Me pasé la tarde en comisaría en vez de viendo el Coliseo.",
    "-4%", "-2Hz")

add("t4_p5_narr", NARR, "Persona cinco.", "-8%")
add("t4_p5", ES_F,
    "El verano pasado volví al pueblo de mis abuelos, donde pasaba todos los veranos de pequeña. Hacía más de veinte años que no iba. Paseé por las mismas calles, me bañé en el mismo río... Fue muy emocionante: no había cambiado casi nada, hasta la panadería seguía siendo de la misma familia.",
    "-5%", "+1Hz")

add("t4_p6_narr", NARR, "Persona seis.", "-8%")
add("t4_p6", ES_M,
    "¿Vacaciones complicadas? Las del año pasado. Teníamos planeada una semana de senderismo en los Pirineos, con las rutas estudiadas y todo. Pues llegamos y empezó a llover... y no paró en cinco días. Al final dejamos la montaña y nos fuimos a San Sebastián: museos, pintxos y paseos con paraguas. Distinto, pero estupendo.",
    "-3%")

# ==========================================================================
# TAREA 5 — Conversación Isabel y Fernando
# ==========================================================================
add("t5_intro", NARR,
    "Tarea cinco. Va a escuchar una conversación entre dos amigos, Isabel y Fernando, que están organizando un viaje a Lisboa. Escuchará la conversación dos veces.",
    "-8%")

add("t5_l01", ES_F, "¡Fernando! Ya tengo los resultados de la búsqueda. El vuelo del viernes a las seis de la tarde es el más barato. ¿Lo reservo?", "+2%", "+4Hz")
add("t5_l02", ES_M, "Perfecto, ese mismo. Oye, ¿y el hotel? He visto uno baratísimo, pero está a las afueras de Lisboa.", "-2%")
add("t5_l03", ES_F, "Uy, no, mira, yo prefiero pagar un poco más y estar en el centro. Son solo treinta euros más por persona y nos ahorramos transportes y tiempo.", "+1%", "+3Hz")
add("t5_l04", ES_M, "Bueno, visto así, tienes razón. Tú que controlas más de hoteles, ¿te encargas de la reserva?", "-3%")
add("t5_l05", ES_F, "Vale, esta noche lo reservo yo. Ah, y tenemos que comprar las entradas para el espectáculo de fado, que se agotan enseguida. Mi compañera de trabajo me lo advirtió: ella se quedó sin verlas.", "-1%", "+2Hz")
add("t5_l06", ES_M, "De eso me ocupo yo, que ya he visto una página donde venden las entradas oficiales. ¿Y qué más quieres visitar? Yo había pensado el barrio de Alfama y, por supuesto, probar los famosos pasteles de Belém.", "-2%", "+1Hz")
add("t5_l07", ES_F, "¡Sí, sí, los pasteles son obligatorios! Pero una cosa, Fernando: no quiero un viaje con horarios para todo. Me gustaría dejar alguna tarde libre, sin nada planeado, para pasear y perdernos por ahí.", "+2%", "+4Hz")
add("t5_l08", ES_M, "Totalmente de acuerdo. Lo mejor de viajar es improvisar de vez en cuando. Bueno, pues ya casi lo tenemos todo, ¿no?", "-3%")
add("t5_l09", ES_F, "Casi. Solo falta decidir cómo vamos al aeropuerto... ¡pero eso lo hablamos mañana con un café!", "+1%", "+3Hz")

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
