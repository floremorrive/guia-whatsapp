// Contenido de toda la guía, organizado por pantallas. Basado en el
// documento de referencia (What'sappfinal.md, corte 24 de agosto de 2026).
// Regla fija: en ningún texto de aquí se usa el verbo "colocar".

function p(texto) { return `<p>${texto}</p>`; }
function lista(items, ordenada) {
  const etiqueta = ordenada ? "ol" : "ul";
  return `<${etiqueta}>${items.map((i) => `<li>${i}</li>`).join("")}</${etiqueta}>`;
}
function aviso(texto) { return `<div class="aviso">${texto}</div>`; }
function alerta(texto) { return `<div class="alerta">${texto}</div>`; }
function ejemplo(texto) { return `<div class="ejemplo">${texto}</div>`; }
function tabla(encabezados, filas) {
  const th = encabezados.map((e) => `<th>${e}</th>`).join("");
  const tr = filas.map((f) => `<tr>${f.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("");
  return `<table class="tabla-guia"><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`;
}
function ilustracionRuta(pasos) {
  return `<div class="ilustracion">${svgRutaMenu(pasos)}</div>`;
}
function ilustracionTelefono(texto) {
  return `<div class="ilustracion">${svgTelefono(texto)}</div>`;
}

const NOMBRE_SO = { android: "Android", iphone: "iPhone" };

const PANTALLAS = {
  ruta: {
    tipo: "opciones",
    titulo: "¿Qué quiere hacer con WhatsApp?",
    intro: "Escoja la opción que más se parezca a lo que necesita. Más adelante le explicamos cada una con calma.",
    campo: "ruta",
    opciones: [
      {
        valor: "normal",
        etiqueta: "Hablar con familia y amigos",
        descripcion: "Conversaciones, llamadas, videollamadas y grupos personales. Le conviene el WhatsApp normal (WhatsApp Messenger).",
      },
      {
        valor: "business",
        etiqueta: "Atender un negocio pequeño",
        descripcion: "Usted mismo, o una persona, responde a los clientes de una tienda, consultorio o emprendimiento. Le conviene WhatsApp Business App.",
      },
      {
        valor: "api",
        etiqueta: "Varios asesores, CRM o campañas grandes",
        descripcion: "Varias personas atendiendo a la vez, integraciones o envíos autorizados a cientos de contactos. Le conviene WhatsApp Business Platform (API).",
      },
    ],
  },

  so: {
    tipo: "opciones",
    titulo: "¿Su teléfono es Android o iPhone?",
    intro: "Con esto le mostramos la ruta exacta de instalación en su celular.",
    campo: "so",
    opciones: [
      { valor: "android", etiqueta: "Android", descripcion: "Celulares Samsung, Motorola, Xiaomi, Huawei y la mayoría de marcas que usan la tienda Google Play." },
      { valor: "iphone", etiqueta: "iPhone", descripcion: "Celulares de Apple, que usan la tienda App Store." },
    ],
  },

  // ---------- INSTALACIÓN: WHATSAPP NORMAL ----------
  "inst-normal-descarga-android": {
    tipo: "contenido",
    titulo: "Instalar WhatsApp normal en Android",
    cuerpo: () => `
      ${ilustracionRuta(["Google Play Store", "Buscar “WhatsApp Messenger”", "Instalar", "Abrir"])}
      ${p("Escriba en la tienda exactamente “WhatsApp Messenger” y confirme que el desarrollador que aparece es <strong>WhatsApp LLC</strong>. No use versiones modificadas: pueden dejar la cuenta suspendida temporalmente y ponen en riesgo su información.")}
      ${aviso("Al abrir la aplicación por primera vez, elija Colombia, escriba su número de teléfono y complete la verificación que WhatsApp le pida (mensaje de texto o llamada).")}
      ${alerta("Desde el 8 de septiembre de 2026, WhatsApp exige Android 6 o una versión posterior. Si su celular es muy antiguo, revise esto antes de esa fecha.")}
    `,
  },
  "inst-normal-descarga-iphone": {
    tipo: "contenido",
    titulo: "Instalar WhatsApp normal en iPhone",
    cuerpo: () => `
      ${ilustracionRuta(["App Store", "Buscar “WhatsApp Messenger”", "Obtener", "Abrir"])}
      ${p("Confirme que el desarrollador sea <strong>WhatsApp LLC</strong>. Al abrir la aplicación, elija Colombia, escriba su número de teléfono y complete la verificación que le pida WhatsApp.")}
      ${alerta("Desde el 30 de noviembre de 2026, WhatsApp exige iOS 15.5 o una versión posterior. Si su iPhone es antiguo, revise esto antes de esa fecha.")}
    `,
  },
  "inst-normal-perfil": {
    tipo: "contenido",
    titulo: "Su perfil personal",
    cuerpo: () => `
      ${p("Un perfil bien hecho ayuda a que sus conocidos lo reconozcan y protege su información.")}
      ${tabla(
        ["Campo", "Recomendación"],
        [
          ["Nombre", "El nombre por el que le reconocen su familia y sus amigos."],
          ["Foto", "Una foto clara, si quiere que lo reconozcan fácilmente."],
          ["Información (“Acerca de”)", "Algo breve. No escriba dirección, cédula ni datos bancarios."],
          ["Privacidad", "Restrinja quién ve su foto, su información y quién puede agregarlo a grupos, según lo que usted necesite."],
        ]
      )}
      ${aviso("Estos ajustes están en Configuración → Perfil, y en Configuración → Privacidad.")}
    `,
  },

  // ---------- INSTALACIÓN: WHATSAPP BUSINESS APP ----------
  "inst-business-descarga-android": {
    tipo: "contenido",
    titulo: "Instalar WhatsApp Business en Android",
    cuerpo: () => `
      ${ilustracionRuta(["Google Play Store", "Buscar “WhatsApp Business”", "Instalar", "Abrir", "Aceptar y continuar"])}
      ${p("Escoja el país, ingrese el teléfono del negocio, confirme el número y complete la verificación por mensaje de texto o llamada.")}
      ${aviso("Si ya tenía WhatsApp normal, la aplicación le ofrece restaurar esa cuenta. Antes de una migración, haga una copia de respaldo (más adelante le explicamos cómo).")}
    `,
  },
  "inst-business-descarga-iphone": {
    tipo: "contenido",
    titulo: "Instalar WhatsApp Business en iPhone",
    cuerpo: () => `
      ${ilustracionRuta(["App Store", "Buscar “WhatsApp Business”", "Obtener", "Abrir", "Aceptar y continuar"])}
      ${p("Escoja el país, ingrese el teléfono del negocio, confirme el número y complete la verificación que le pida WhatsApp.")}
      ${aviso("Si ya tenía WhatsApp normal, puede restaurar esa cuenta durante el proceso. Antes de migrar, haga una copia de respaldo.")}
    `,
  },
  "inst-business-perfil": {
    tipo: "contenido",
    titulo: "Su perfil comercial",
    cuerpo: () => `
      ${p("Meta pide como mínimo nombre comercial, categoría e imagen o logo. El resto ayuda a que el cliente confíe en con quién está hablando.")}
      ${tabla(
        ["Dato", "Qué escribir"],
        [
          ["Nombre", "El nombre real y reconocible del negocio."],
          ["Foto", "Logo legible o imagen comercial reconocible."],
          ["Categoría", "La actividad que más se acerque a lo que hace el negocio."],
          ["Descripción", "Qué hace, para quién y dónde presta el servicio."],
          ["Horario", "Horas reales de atención."],
          ["Dirección", "Solo si le sirve al cliente para visitar el sitio."],
          ["Correo", "Un correo empresarial que sí revisen."],
          ["Sitio web", "La página oficial, si existe."],
          ["Catálogo", "Productos o servicios vigentes, si aplica."],
        ]
      )}
      ${alerta("Evite promesas exageradas, promociones vencidas o una dirección residencial si los clientes nunca deben ir allí. El perfil debe ayudar a reconocer con quién se habla, no engañar.")}
    `,
  },

  // ---------- INSTALACIÓN: API / BUSINESS PLATFORM ----------
  "inst-api-proceso": {
    tipo: "contenido",
    titulo: "Cómo se pone en marcha la API",
    cuerpo: () => `
      ${aviso("La API no se instala como una aplicación en el celular. Es infraestructura empresarial de Meta que se conecta a un sistema de atención (CRM, bandeja de atención o software propio).")}
      ${lista(
        [
          "Definir quién será el propietario empresarial del número (a nombre de la organización, no de una persona).",
          "Crear o usar el entorno empresarial de Meta y configurar la cuenta de WhatsApp Business.",
          "Registrar el número, directamente con Meta o mediante el registro integrado de un proveedor autorizado (Embedded Signup).",
          "Definir el nombre para mostrar, el perfil empresarial y quién administra la cuenta.",
          "Conectar Cloud API con la bandeja de atención, CRM o sistema que va a recibir y enviar los mensajes.",
          "Preparar las plantillas autorizadas que se usarán cuando la organización inicie conversaciones.",
          "Probar respuestas, permisos, bajas de suscripción y el paso de chatbot a persona antes de un envío grande.",
        ],
        true
      )}
      ${p("Antes de contratar un proveedor externo, pregúntele por escrito:")}
      ${lista([
        "¿Los mensajes salen mediante WhatsApp Business Platform / Cloud API oficial de Meta?",
        "¿La organización será propietaria de la cuenta y del número?",
        "¿Dónde queda almacenada la base de contactos?",
        "¿Cómo se registra el permiso de cada contacto?",
        "¿Cómo se tramita SALIR o la revocación del permiso?",
        "Si termina el contrato, ¿la organización se lleva su número y su cuenta?",
      ])}
      ${alerta("Desconfíe de cualquiera que ofrezca “mensajes ilimitados sin API”, “anti-ban” o que promete “saltarse los límites de WhatsApp”: son señales de herramientas no oficiales que pueden terminar en cuentas suspendidas.")}
    `,
  },

  "api-uso-requisitos": {
    tipo: "contenido",
    titulo: "Uso y requisitos de la API",
    cuerpo: () => `
      ${p("<strong>Para qué la va a usar la organización:</strong> gestión de contactos en actividades sociales, no ventas. Eso quiere decir organizar y responder conversaciones con personas que ya tienen relación con la organización, no vender productos ni hacer publicidad masiva a desconocidos.")}
      ${p("<strong>Requisitos para poder usarla:</strong>")}
      ${lista([
        "Cuenta empresarial de Meta verificada.",
        "Un número dedicado para la organización (no el celular personal de un empleado).",
        "Plantillas de mensaje aprobadas por Meta para iniciar conversaciones.",
        "Permiso previo, expreso e informado de cada contacto antes de escribirle primero.",
        "Un mecanismo claro para que la persona pida dejar de recibir mensajes, y que la organización lo respete.",
        "Un paso definido hacia atención humana para quejas, emergencias o casos delicados.",
      ])}
      ${aviso("En Colombia, ese permiso previo debe cumplir la Ley 1581 de 2012 sobre tratamiento de datos personales: autorización previa, expresa e informada, con registro de cuándo y cómo se obtuvo, y la posibilidad de retirarla en cualquier momento.")}
    `,
  },

  "api-politico-pregunta": {
    tipo: "opciones",
    titulo: "Una pregunta más sobre este uso",
    intro: "Esto cambia las restricciones que debe tener en cuenta.",
    campo: "politico",
    opciones: [
      { valor: "no", etiqueta: "No es para uso político", descripcion: "Es para gestión de contactos en actividades sociales, sin relación con una campaña o candidato." },
      { valor: "si", etiqueta: "Sí, es para un candidato o campaña política", descripcion: "Vamos a mostrarle las restricciones adicionales que puede llegar a tener este uso." },
    ],
  },

  "api-politico-alerta": {
    tipo: "contenido",
    titulo: "Restricciones si el uso es político",
    cuerpo: () => `
      ${alerta("Este es un resumen informativo, no asesoría jurídica electoral. Para una campaña o candidato específico, consulte a un abogado con experiencia en derecho electoral y protección de datos.")}
      ${lista([
        "La opinión política de una persona es un dato sensible bajo la Ley 1581 de 2012: pedir su autorización debe ser explícito sobre ese uso, no basta una autorización genérica de datos.",
        "La Ley 2300 de 2023 fija franjas de contacto para comunicaciones comerciales o de campaña: de lunes a viernes de 7:00 a. m. a 7:00 p. m. y sábados de 8:00 a. m. a 3:00 p. m., sin domingos ni festivos, salvo las excepciones que la propia ley prevea.",
        "La política de mensajería empresarial de WhatsApp exige permiso previo antes de iniciar conversaciones y respeto inmediato a quien pida dejar de recibir mensajes.",
        "Los envíos masivos, la compra de bases de teléfonos o el uso de listas sin autorización expresa pueden llevar a la suspensión de la cuenta, además de las sanciones que contemple la normativa electoral vigente.",
        "Conviene llevar un registro verificable de quién autorizó qué y cuándo, ya que en un proceso electoral ese registro puede ser pedido por una autoridad.",
      ])}
    `,
  },

  // ---------- GESTIÓN ----------
  "gestion-difusion": {
    tipo: "contenido",
    titulo: "Listas de difusión",
    cuerpo: (estado) => `
      ${p("Una difusión envía el mismo mensaje a varias personas, pero cada una lo recibe en su conversación privada, no en un chat colectivo. Tiene un tope de 256 contactos por lista, y cada persona debe tener guardado su número para poder recibirla.")}
      ${ejemplo("“Buenos días. La reunión de la asociación será el jueves a las 10:00 a. m. Este mensaje se envía a quienes solicitaron recibir nuestros avisos.”")}
      ${aviso("Tener un teléfono guardado en la agenda no significa que esa persona haya autorizado publicidad. Deje siempre una salida sencilla: “Si no desea recibir más avisos por WhatsApp, responda SALIR.”")}
      ${estado.ruta !== "normal" ? aviso("Durante 2026 algunas cuentas de WhatsApp Business ya ofrecen difusiones pagas (Business Broadcasts), donde solo se cobra por cada mensaje que sí llega. No está disponible para todas las cuentas ni países; si aparece en su aplicación, ella misma muestra el costo antes de confirmar el envío.") : ""}
    `,
  },
  "gestion-grupos": {
    tipo: "contenido",
    titulo: "Grupos y la mención @all",
    cuerpo: () => `
      ${p("Un grupo sirve cuando todos necesitan hablar con todos: familia, junta de vecinos, equipo de trabajo. Puede tener hasta 1.024 integrantes.")}
      ${ilustracionRuta(["Nuevo chat", "Nuevo grupo", "Escoger participantes", "Escribir nombre", "Crear"])}
      ${p("La mención <strong>@all</strong> avisa a todo el grupo a la vez. En grupos de 32 personas o menos, cualquiera puede usarla; en grupos más grandes, solo los administradores.")}
      ${ejemplo("Uso correcto: “@all La reunión de mañana cambió de sede.”")}
      ${alerta("Evite usar @all para saludos, chistes o promociones repetidas: cada persona puede silenciar esas notificaciones, y su uso constante hace que la gente deje de prestarles atención.")}
    `,
  },
  "gestion-comunidades": {
    tipo: "contenido",
    titulo: "Comunidades",
    cuerpo: (estado) => `
      ${p("Una comunidad reúne varios grupos relacionados bajo una misma organización, hasta 100 grupos y 2.000 integrantes en total. Por ejemplo, un conjunto residencial puede tener Torre A, Torre B, Consejo de administración y Actividades dentro de una sola comunidad.")}
      ${ilustracionRuta(["Comunidades", "Nueva comunidad", "Escribir nombre y descripción", "Agregar o crear grupos"])}
      ${estado.ruta === "business" ? aviso("WhatsApp Business App no permite crear comunidades todavía; sí puede participar en comunidades creadas desde WhatsApp normal.") : ""}
    `,
  },
  "gestion-canales": {
    tipo: "contenido",
    titulo: "Canales",
    cuerpo: () => `
      ${p("Un canal sirve para publicar novedades a seguidores sin convertir la comunicación en un grupo. Es útil para una parroquia, asociación, comercio o institución que quiera avisar a muchas personas sin armar una lista de difusión.")}
      ${ilustracionRuta(["Novedades", "Menú", "Crear canal", "Continuar", "Nombre, descripción e imagen"])}
      ${alerta("Los canales son públicos: WhatsApp no permite crear uno privado. Aun así, el número y la foto personal de quien administra el canal quedan protegidos frente a los seguidores.")}
    `,
  },
  "gestion-respuestas": {
    tipo: "contenido",
    titulo: "Mensajes de bienvenida, ausencia y respuestas rápidas",
    cuerpo: () => `
      ${p("<strong>Mensaje de bienvenida:</strong> se activa desde Herramientas del negocio.")}
      ${ejemplo("“Hola. Gracias por comunicarse con [nombre del negocio]. Nuestro horario es de lunes a viernes de 8:00 a. m. a 5:00 p. m. Cuéntenos su nombre y qué está buscando.”")}
      ${p("<strong>Mensaje de ausencia:</strong> Herramientas → Mensaje de ausencia → activar → editar texto → Programar.")}
      ${ejemplo("“Gracias por escribirnos. En este momento estamos fuera del horario de atención. Revisaremos su mensaje a partir de las 8:00 a. m. del siguiente día hábil.”")}
      ${p("<strong>Respuestas rápidas:</strong> textos guardados que se insertan con un atajo, desde Herramientas → Respuestas rápidas → Añadir.")}
      ${aviso("No pida datos sensibles sin necesidad (cédula completa, tarjetas, contraseñas) y, ante quejas, emergencias o fallecimientos, pase la conversación a una persona en vez de usar una respuesta automática.")}
    `,
  },
  "gestion-agente-ia": {
    tipo: "contenido",
    titulo: "Meta Business Agent (inteligencia artificial)",
    cuerpo: () => `
      ${p("Es una función que Meta lanzó en junio de 2026: puede responder preguntas del negocio, recomendar productos del catálogo y ayudar con citas, con la posibilidad de pasar la conversación a una persona.")}
      ${ilustracionRuta(["Herramientas", "AI agent / Agente de IA", "Continuar", "Aceptar"])}
      ${p("Antes de activarlo, enséñele con información real: horario, catálogo actualizado, direcciones, políticas de cambios, formas de pago y preguntas frecuentes. Deje fuera lo que no necesita para atender.")}
      ${alerta("Activar Meta Business Agent puede interferir con las listas de difusión y otras funciones de WhatsApp Business App. Antes de activarlo en el número principal de la organización, haga una prueba en otro número si es posible.")}
      ${aviso("Puede pausarse en cualquier momento desde Herramientas → Su agente de IA → AI replies.")}
    `,
  },

  // ---------- MANTENIMIENTO ----------
  "mant-respaldo": {
    tipo: "contenido",
    titulo: "Copias de respaldo",
    cuerpo: () => `
      ${ilustracionRuta(["Configuración", "Chats", "Copia de seguridad", "Copia cifrada de extremo a extremo"])}
      ${p("Active la copia cifrada de extremo a extremo y guarde muy bien la contraseña o mecanismo de recuperación que elija: perderlo puede complicar la recuperación del respaldo.")}
      ${aviso("Haga una copia siempre antes de cambiar de teléfono o antes de migrar de WhatsApp normal a WhatsApp Business.")}
    `,
  },
  "mant-actualizar": {
    tipo: "contenido",
    titulo: "Mantener la aplicación actualizada",
    cuerpo: (estado) => `
      ${ilustracionRuta([estado.so === "iphone" ? "App Store" : "Google Play Store", "Mis aplicaciones o Actualizaciones", "Actualizar WhatsApp"])}
      ${p("Revise cada cierto tiempo si hay una actualización disponible. Las versiones nuevas corrigen fallas de seguridad y agregan funciones como la verificación en dos pasos con contraseña.")}
    `,
  },
  "mant-dispositivos": {
    tipo: "contenido",
    titulo: "Revisar los dispositivos vinculados",
    cuerpo: () => `
      ${ilustracionRuta(["Configuración o menú", "Dispositivos vinculados"])}
      ${p("Revise periódicamente qué computadores o navegadores aparecen ahí. Si ve uno que no reconoce, tóquelo y escoja <strong>Cerrar sesión</strong>.")}
      ${aviso("Hágalo especialmente después de usar WhatsApp Web en un computador ajeno, un hotel o una oficina compartida.")}
    `,
  },
  "mant-salida-personas": {
    tipo: "contenido",
    titulo: "Cuando alguien deja la organización",
    cuerpo: () => `
      ${p("Cuando una persona deja de trabajar o colaborar con la organización, retire sus dispositivos vinculados y sus accesos de administración de la cuenta empresarial.")}
      ${aviso("Documente quién controla el número, el correo, la cuenta empresarial de Meta y los accesos de administradores, para que la operación no quede atada al celular personal de una sola persona.")}
    `,
  },

  // ---------- SEGURIDAD ----------
  "seg-verificacion": {
    tipo: "contenido",
    titulo: "Verificación en dos pasos",
    cuerpo: () => `
      ${ilustracionRuta(["Configuración", "Cuenta", "Verificación en dos pasos"])}
      ${p("Si su aplicación todavía pide un PIN de seis cifras, no use su fecha de nacimiento, los últimos números de su cédula ni el mismo código de desbloqueo del celular.")}
      ${p("Si ya le ofrece una contraseña, use una propia de WhatsApp, distinta a la del correo o el banco.")}
    `,
  },
  "seg-correo": {
    tipo: "contenido",
    titulo: "Correo de recuperación",
    cuerpo: () => `
      ${ilustracionRuta(["Configuración", "Cuenta", "Dirección de correo electrónico", "Añadir correo"])}
      ${p("Use un correo al que usted todavía pueda entrar. No use el correo antiguo de un trabajo anterior ni una dirección cuya contraseña nadie recuerda.")}
    `,
  },
  "seg-codigo": {
    tipo: "contenido",
    titulo: "Nunca comparta el código de registro",
    cuerpo: () => `
      ${alerta("Si alguien le escribe o le llama diciendo “le llegó un código por error, ¿me lo dicta?” o “somos soporte de WhatsApp, necesitamos el código”, no lo entregue. WhatsApp nunca lo pide así.")}
    `,
  },
  "seg-dispositivos": {
    tipo: "contenido",
    titulo: "Enlaces sospechosos",
    cuerpo: () => `
      ${p("Si recibe un mensaje pidiendo dinero urgente desde un “nuevo número” de un familiar, llame primero al número antiguo o a otro familiar para confirmar.")}
      ${p("Si un mensaje dice que su banco bloqueó la cuenta, no entre desde el enlace del mensaje: abra usted mismo la aplicación oficial del banco.")}
      ${aviso("Regla sencilla: no se dé papaya. Ante la duda, verifique por otro medio antes de responder o hacer clic.")}
    `,
  },
  "seg-enlaces": {
    tipo: "contenido",
    titulo: "Nombre de usuario @",
    cuerpo: () => `
      ${ilustracionRuta(["Configuración", "Perfil", "Crear nombre de usuario"])}
      ${p("El nombre de usuario permite que lo contacten sin revelar de inmediato su número telefónico, por ejemplo <strong>@MariaGomez</strong>.")}
      ${alerta("No use como nombre de usuario su año de nacimiento, su cédula u otra información personal.")}
    `,
  },
  "seg-usuario": {
    tipo: "contenido",
    titulo: "Salir de un grupo en silencio",
    cuerpo: () => `
      ${ilustracionRuta(["Abrir el grupo", "Tocar el nombre del grupo", "Salir del grupo", "Confirmar"])}
      ${aviso("Solo los administradores del grupo reciben el aviso de que usted salió; los demás integrantes no ven un anuncio general en la conversación.")}
    `,
  },
  "seg-salir-grupo": {
    tipo: "contenido",
    titulo: "Repaso de seguridad",
    cuerpo: () => `
      ${p("Con estos cinco hábitos, su cuenta queda bastante más protegida:")}
      ${lista([
        "Verificación en dos pasos activada.",
        "Correo de recuperación configurado.",
        "El código de registro nunca se comparte con nadie.",
        "Los dispositivos vinculados se revisan cada cierto tiempo.",
        "Los enlaces sospechosos se verifican antes de abrirlos.",
      ])}
    `,
  },

  // ---------- DESINSTALAR ----------
  "desinstalar-diferencia": {
    tipo: "contenido",
    titulo: "Desinstalar la aplicación no es lo mismo que eliminar la cuenta",
    cuerpo: () => `
      ${p("<strong>Desinstalar la aplicación</strong> solo la retira del celular: su cuenta sigue existiendo y puede reinstalarla más adelante con el mismo número.")}
      ${p("<strong>Eliminar la cuenta</strong> borra su perfil, sus chats en la nube (si no tiene copia) y lo saca de sus grupos, de forma permanente.")}
      ${aviso("Haga una copia de respaldo antes de cualquiera de las dos acciones, especialmente antes de eliminar la cuenta.")}
    `,
  },
  "desinstalar-pasos-android": {
    tipo: "contenido",
    titulo: "Pasos para Android",
    cuerpo: () => `
      ${ilustracionRuta(["Mantener presionado el ícono de WhatsApp", "Desinstalar", "Confirmar"])}
      ${p("Si en cambio quiere eliminar la cuenta por completo: Configuración → Cuenta → Eliminar mi cuenta → escribir el número → confirmar.")}
      ${alerta("Eliminar la cuenta es permanente. Revise primero que su copia de respaldo esté al día.")}
    `,
  },
  "desinstalar-pasos-iphone": {
    tipo: "contenido",
    titulo: "Pasos para iPhone",
    cuerpo: () => `
      ${ilustracionRuta(["Mantener presionado el ícono de WhatsApp", "Eliminar aplicación", "Confirmar"])}
      ${p("Si en cambio quiere eliminar la cuenta por completo: Configuración → Cuenta → Eliminar mi cuenta → escribir el número → confirmar.")}
      ${alerta("Eliminar la cuenta es permanente. Revise primero que su copia de respaldo esté al día.")}
    `,
  },
  "desinstalar-pasos-general": {
    tipo: "contenido",
    titulo: "Cómo eliminar la cuenta",
    cuerpo: () => `
      ${ilustracionRuta(["Configuración", "Cuenta", "Eliminar mi cuenta", "Escribir el número", "Confirmar"])}
      ${alerta("Eliminar la cuenta es permanente. Revise primero que su copia de respaldo esté al día.")}
    `,
  },

  fin: {
    tipo: "final",
    titulo: "Guía terminada",
    cuerpo: (estado) => `
      ${ilustracionTelefono("Listo")}
      ${p(`Terminó la guía para ${etiquetaRuta(estado.ruta)}. Puede volver a cualquier sección tocando “Atrás” o recargando la página para empezar de nuevo.`)}
      ${aviso("Gracias por completar esta formación.")}
    `,
  },
};

function etiquetaRuta(ruta) {
  if (ruta === "normal") return "WhatsApp normal";
  if (ruta === "business") return "WhatsApp Business";
  if (ruta === "api") return "WhatsApp Business Platform (API)";
  return "WhatsApp";
}

function idsInstalacion(ruta, so) {
  if (ruta === "normal") return [`inst-normal-descarga-${so}`, "inst-normal-perfil"];
  if (ruta === "business") return [`inst-business-descarga-${so}`, "inst-business-perfil"];
  if (ruta === "api") return ["inst-api-proceso"];
  return [];
}

function idsGestion(ruta) {
  const base = ["gestion-difusion", "gestion-grupos", "gestion-comunidades", "gestion-canales"];
  if (ruta !== "normal") base.push("gestion-respuestas", "gestion-agente-ia");
  return base;
}

function idsMantenimiento(ruta) {
  const base = ["mant-respaldo", "mant-actualizar", "mant-dispositivos"];
  if (ruta !== "normal") base.push("mant-salida-personas");
  return base;
}

function idsSeguridad() {
  return ["seg-verificacion", "seg-correo", "seg-codigo", "seg-dispositivos", "seg-enlaces", "seg-usuario", "seg-salir-grupo"];
}

function idsDesinstalar(ruta, so) {
  return ["desinstalar-diferencia", `desinstalar-pasos-${so || "general"}`];
}

function flujo(estado) {
  let f = ["ruta"];
  if (!estado.ruta) return f;

  if (estado.ruta !== "api") f.push("so");
  const listoParaContinuar = estado.ruta === "api" ? true : Boolean(estado.so);
  if (!listoParaContinuar) return f;

  f = f.concat(idsInstalacion(estado.ruta, estado.so));
  if (estado.ruta === "api") {
    f = f.concat(["api-uso-requisitos", "api-politico-pregunta"]);
    if (estado.politico === "si") f.push("api-politico-alerta");
  }
  f = f.concat(idsGestion(estado.ruta));
  f = f.concat(idsMantenimiento(estado.ruta));
  f = f.concat(idsSeguridad());
  f = f.concat(idsDesinstalar(estado.ruta, estado.so));
  f.push("fin");
  return f;
}
