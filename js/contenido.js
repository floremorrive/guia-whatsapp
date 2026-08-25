// Contenido de toda la guía, organizado por pantallas y agrupado en 5 etapas
// explícitas: Instalación, Configuración, Qué puede hacer, Mantenimiento y
// Desinstalar. Basado en el documento de referencia (What'sappfinal.md,
// corte 24 de agosto de 2026). Regla fija: en ningún texto de aquí se usa
// el verbo "colocar".

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
function banner(texto) {
  return `<div class="aviso"><strong>${texto}</strong></div>`;
}

const NOMBRE_SO = { android: "Android", iphone: "iPhone" };

const NOMBRES_ETAPA = {
  0: "Antes de empezar",
  1: "Instalación",
  2: "Configuración",
  3: "Qué puede hacer",
  4: "Mantenimiento",
  5: "Desinstalar",
};

function etapaDe(idPantalla) {
  if (["ruta", "so", "mapa-etapas"].includes(idPantalla)) return 0;
  if (["api-uso-requisitos", "api-politico-pregunta", "api-politico-alerta"].includes(idPantalla)) return 2;
  if (idPantalla.indexOf("inst-") === 0) return 1;
  if (idPantalla.indexOf("config-") === 0) return 2;
  if (idPantalla.indexOf("uso-") === 0) return 3;
  if (idPantalla.indexOf("mant-") === 0) return 4;
  if (idPantalla.indexOf("desinstalar-") === 0) return 5;
  if (idPantalla === "fin") return 5;
  return 0;
}

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

  "mapa-etapas": {
    tipo: "contenido",
    titulo: "El camino que vamos a seguir",
    cuerpo: (estado) => {
      if (estado.ruta === "api") {
        return `
          ${p("Vamos a avanzar en cinco partes. Cada pantalla le va a decir en cuál va.")}
          ${lista(
            [
              "<strong>1. Puesta en marcha:</strong> cómo se activa la API y quién queda como propietario del número.",
              "<strong>2. Configuración:</strong> los requisitos de uso y los accesos de quienes la administran.",
              "<strong>3. Qué puede hacer:</strong> categorías de mensajes, inteligencia artificial y cuidado con proveedores externos.",
              "<strong>4. Mantenimiento:</strong> lo que conviene revisar de vez en cuando, no solo una vez.",
              "<strong>5. Dar de baja:</strong> cuándo tendría sentido cerrar ese número o esa cuenta.",
            ],
            true
          )}
        `;
      }
      return `
        ${p("Vamos a avanzar en cinco partes, en este orden. Cada pantalla le va a decir en cuál va.")}
        ${lista(
          [
            "<strong>1. Instalación:</strong> descargar la aplicación y verificar su número. Se hace una sola vez.",
            "<strong>2. Configuración:</strong> su perfil, vincular su computador si quiere, y proteger la cuenta. También se hace una sola vez, justo después de instalar.",
            "<strong>3. Qué puede hacer:</strong> difusiones, grupos, comunidades, canales y más. Aquí empieza a usarlo día a día.",
            "<strong>4. Mantenimiento:</strong> copias de respaldo, actualizaciones y revisiones que conviene repetir cada cierto tiempo, no solo una vez.",
            "<strong>5. Desinstalar:</strong> cuándo y cómo hacerlo, si llega el momento.",
          ],
          true
        )}
      `;
    },
  },

  // ============ ETAPA 1: INSTALACIÓN ============

  "inst-normal-descarga-android": {
    tipo: "contenido",
    titulo: "Instalar WhatsApp normal en Android",
    cuerpo: () => `
      ${ilustracionRuta(["Google Play Store", "Buscar “WhatsApp Messenger”", "Instalar", "Abrir"])}
      ${p("Escriba en la tienda exactamente “WhatsApp Messenger” y confirme que el desarrollador que aparece es <strong>WhatsApp LLC</strong>. No use versiones modificadas: pueden dejar la cuenta suspendida temporalmente y ponen en riesgo su información.")}
      ${aviso("Al abrir la aplicación por primera vez, elija Colombia, escriba su número de teléfono y complete la verificación que WhatsApp le pida (mensaje de texto o llamada). Con esto termina la instalación.")}
      ${alerta("Desde el 8 de septiembre de 2026, WhatsApp exige Android 6 o una versión posterior. Si su celular es muy antiguo, revise esto antes de esa fecha.")}
    `,
  },
  "inst-normal-descarga-iphone": {
    tipo: "contenido",
    titulo: "Instalar WhatsApp normal en iPhone",
    cuerpo: () => `
      ${ilustracionRuta(["App Store", "Buscar “WhatsApp Messenger”", "Obtener", "Abrir"])}
      ${p("Confirme que el desarrollador sea <strong>WhatsApp LLC</strong>. Al abrir la aplicación, elija Colombia, escriba su número de teléfono y complete la verificación que le pida WhatsApp. Con esto termina la instalación.")}
      ${alerta("Desde el 30 de noviembre de 2026, WhatsApp exige iOS 15.5 o una versión posterior. Si su iPhone es antiguo, revise esto antes de esa fecha.")}
    `,
  },
  "inst-business-descarga-android": {
    tipo: "contenido",
    titulo: "Instalar WhatsApp Business en Android",
    cuerpo: () => `
      ${ilustracionRuta(["Google Play Store", "Buscar “WhatsApp Business”", "Instalar", "Abrir", "Aceptar y continuar"])}
      ${p("Escoja el país, ingrese el teléfono del negocio, confirme el número y complete la verificación por mensaje de texto o llamada. Con esto termina la instalación.")}
      ${aviso("Si ya tenía WhatsApp normal, la aplicación le ofrece restaurar esa cuenta. Antes de una migración, haga una copia de respaldo (se lo explicamos en la etapa de mantenimiento).")}
    `,
  },
  "inst-business-descarga-iphone": {
    tipo: "contenido",
    titulo: "Instalar WhatsApp Business en iPhone",
    cuerpo: () => `
      ${ilustracionRuta(["App Store", "Buscar “WhatsApp Business”", "Obtener", "Abrir", "Aceptar y continuar"])}
      ${p("Escoja el país, ingrese el teléfono del negocio, confirme el número y complete la verificación que le pida WhatsApp. Con esto termina la instalación.")}
      ${aviso("Si ya tenía WhatsApp normal, puede restaurar esa cuenta durante el proceso. Antes de migrar, haga una copia de respaldo.")}
    `,
  },
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
      ${p("Con esto termina la puesta en marcha técnica. Antes de usarla, revisemos los requisitos y las reglas de uso, en la siguiente etapa.")}
    `,
  },
  "inst-fin": {
    tipo: "contenido",
    titulo: "Fin de la instalación",
    cuerpo: (estado) =>
      estado.ruta === "api"
        ? `${banner("Etapa 1 completa: puesta en marcha técnica.")}${p("Ya vio cómo se activa la API. Ahora sigue la etapa de configuración: los requisitos de uso y quién queda con acceso de administrador.")}`
        : `${banner("Etapa 1 completa: instalación.")}${p("Ya tiene WhatsApp instalado en su celular y su número verificado. Todavía no ha configurado nada más. Ahora sigue la etapa de configuración, antes de empezar a usarlo.")}`,
  },

  // ============ ETAPA 2: CONFIGURACIÓN ============

  "config-perfil": {
    tipo: "contenido",
    titulo: "Su perfil",
    cuerpo: (estado) =>
      estado.ruta === "business"
        ? `
        ${p("Este es el primer paso de configuración: se hace una sola vez, antes de empezar a atender clientes. Meta pide como mínimo nombre comercial, categoría e imagen o logo.")}
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
      `
        : `
        ${p("Este es el primer paso de configuración: se hace una sola vez, justo después de instalar.")}
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
  "config-vincular-pc": {
    tipo: "contenido",
    titulo: "Conectar WhatsApp a un computador",
    cuerpo: () => `
      ${p("Este paso es opcional. Si quiere escribir desde un computador en vez de depender solo del celular, puede vincularlo. El celular sigue siendo necesario: ahí quedan sus conversaciones, y de vez en cuando debe tener conexión a internet.")}
      ${ilustracionRuta(["En el computador: abrir web.whatsapp.com", "Aparece un código QR en pantalla", "En el celular: Configuración → Dispositivos vinculados", "Vincular un dispositivo", "Apuntar la cámara del celular al código QR"])}
      ${aviso("Puede usar el navegador del computador (web.whatsapp.com) o la aplicación de escritorio oficial de WhatsApp: el proceso para vincularlo es el mismo.")}
      ${alerta("Escanee el código QR únicamente cuando usted mismo abrió esa pantalla en el computador. Nunca escanee un código QR que otra persona le pida escanear por teléfono, mensaje o en persona: eso le puede dar a un desconocido acceso a sus conversaciones.")}
      ${p("Más adelante, en la etapa de mantenimiento, le mostramos cómo revisar y cerrar la sesión de un computador vinculado cuando ya no lo use.")}
    `,
  },
  "config-verificacion": {
    tipo: "contenido",
    titulo: "Verificación en dos pasos",
    cuerpo: () => `
      ${p("Esto se activa una sola vez y protege su cuenta para que nadie más la use desde otro celular.")}
      ${ilustracionRuta(["Configuración", "Cuenta", "Verificación en dos pasos"])}
      ${p("Si su aplicación todavía pide un PIN de seis cifras, no use su fecha de nacimiento, los últimos números de su cédula ni el mismo código de desbloqueo del celular.")}
      ${p("Si ya le ofrece una contraseña, use una propia de WhatsApp, distinta a la del correo o el banco.")}
    `,
  },
  "config-correo": {
    tipo: "contenido",
    titulo: "Correo de recuperación",
    cuerpo: () => `
      ${ilustracionRuta(["Configuración", "Cuenta", "Dirección de correo electrónico", "Añadir correo"])}
      ${p("Use un correo al que usted todavía pueda entrar. No use el correo antiguo de un trabajo anterior ni una dirección cuya contraseña nadie recuerda.")}
    `,
  },
  "config-codigo": {
    tipo: "contenido",
    titulo: "Una regla para recordar siempre",
    cuerpo: () => `
      ${alerta("Nunca comparta su código de registro. Si alguien le escribe o le llama diciendo “le llegó un código por error, ¿me lo dicta?” o “somos soporte de WhatsApp, necesitamos el código”, no lo entregue. WhatsApp nunca lo pide así.")}
      ${p("Con esto termina la configuración de su cuenta.")}
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
  "config-api": {
    tipo: "contenido",
    titulo: "Accesos de quienes administran la cuenta",
    cuerpo: () => `
      ${p("El perfil empresarial y el número ya quedaron definidos en la puesta en marcha. Lo que falta revisar aquí es quién tiene acceso de administrador a la cuenta.")}
      ${aviso("Documente quién controla el número, el correo, la cuenta empresarial de Meta y los accesos de administradores, para que la operación no quede atada al celular o al correo personal de una sola persona.")}
      ${p("Con esto termina la configuración.")}
    `,
  },
  "config-fin": {
    tipo: "contenido",
    titulo: "Fin de la configuración",
    cuerpo: (estado) =>
      estado.ruta === "api"
        ? `${banner("Etapa 2 completa: configuración.")}${p("Su cuenta empresarial ya está lista, con sus requisitos claros y sus accesos definidos. Ahora sigue la etapa de qué puede hacer con la API.")}`
        : `${banner("Etapa 2 completa: configuración.")}${p("Su perfil, la vinculación a un computador (si la hizo) y la protección de su cuenta ya quedaron listos. Todo esto se hace una sola vez. Ahora sigue lo que puede hacer con WhatsApp, que es lo que va a usar día a día.")}`,
  },

  // ============ ETAPA 3: QUÉ PUEDE HACER ============

  "uso-difusion": {
    tipo: "contenido",
    titulo: "Listas de difusión",
    cuerpo: (estado) => `
      ${p("Úsela cuando quiera avisar lo mismo a varias personas, pero sin armar un grupo. Cada una lo recibe en su conversación privada, no en un chat colectivo. Tiene un tope de 256 contactos por lista, y cada persona debe tener guardado su número para poder recibirla.")}
      ${ejemplo("“Buenos días. La reunión de la asociación será el jueves a las 10:00 a. m. Este mensaje se envía a quienes solicitaron recibir nuestros avisos.”")}
      ${aviso("Tener un teléfono guardado en la agenda no significa que esa persona haya autorizado publicidad. Deje siempre una salida sencilla: “Si no desea recibir más avisos por WhatsApp, responda SALIR.”")}
      ${estado.ruta === "business" ? aviso("Durante 2026 algunas cuentas de WhatsApp Business ya ofrecen difusiones pagas (Business Broadcasts), donde solo se cobra por cada mensaje que sí llega. No está disponible para todas las cuentas ni países; si aparece en su aplicación, ella misma muestra el costo antes de confirmar el envío.") : ""}
    `,
  },
  "uso-grupos": {
    tipo: "contenido",
    titulo: "Grupos y la mención @all",
    cuerpo: () => `
      ${p("Úselo cuando todos necesiten hablar con todos: familia, junta de vecinos, equipo de trabajo. Puede tener hasta 1.024 integrantes.")}
      ${ilustracionRuta(["Nuevo chat", "Nuevo grupo", "Escoger participantes", "Escribir nombre", "Crear"])}
      ${p("La mención <strong>@all</strong> avisa a todo el grupo a la vez. En grupos de 32 personas o menos, cualquiera puede usarla; en grupos más grandes, solo los administradores.")}
      ${ejemplo("Uso correcto: “@all La reunión de mañana cambió de sede.”")}
      ${alerta("Evite usar @all para saludos, chistes o promociones repetidas: cada persona puede silenciar esas notificaciones, y su uso constante hace que la gente deje de prestarles atención.")}
      ${p("<strong>Para salir de un grupo sin avisarle a todos:</strong>")}
      ${ilustracionRuta(["Abrir el grupo", "Tocar el nombre del grupo", "Salir del grupo", "Confirmar"])}
      ${aviso("Solo los administradores del grupo reciben el aviso de que usted salió; los demás integrantes no ven un anuncio general en la conversación.")}
    `,
  },
  "uso-comunidades": {
    tipo: "contenido",
    titulo: "Comunidades",
    cuerpo: (estado) => `
      ${p("Úsela cuando necesite organizar varios grupos relacionados bajo una misma organización: hasta 100 grupos y 2.000 integrantes en total. Por ejemplo, un conjunto residencial puede tener Torre A, Torre B, Consejo de administración y Actividades dentro de una sola comunidad.")}
      ${ilustracionRuta(["Comunidades", "Nueva comunidad", "Escribir nombre y descripción", "Agregar o crear grupos"])}
      ${estado.ruta === "business" ? aviso("WhatsApp Business App no permite crear comunidades todavía; sí puede participar en comunidades creadas desde WhatsApp normal.") : ""}
    `,
  },
  "uso-canales": {
    tipo: "contenido",
    titulo: "Canales",
    cuerpo: () => `
      ${p("Úselo cuando quiera publicar novedades a muchos seguidores sin convertir la comunicación en un grupo: una parroquia, asociación, comercio o institución que quiera avisar a muchas personas sin armar una lista de difusión.")}
      ${ilustracionRuta(["Novedades", "Menú", "Crear canal", "Continuar", "Nombre, descripción e imagen"])}
      ${alerta("Los canales son públicos: WhatsApp no permite crear uno privado. Aun así, el número y la foto personal de quien administra el canal quedan protegidos frente a los seguidores.")}
    `,
  },
  "uso-usuario": {
    tipo: "contenido",
    titulo: "Nombre de usuario @",
    cuerpo: () => `
      ${p("Úselo si quiere que lo contacten sin revelar de inmediato su número telefónico, por ejemplo <strong>@MariaGomez</strong>.")}
      ${ilustracionRuta(["Configuración", "Perfil", "Crear nombre de usuario"])}
      ${alerta("No use como nombre de usuario su año de nacimiento, su cédula u otra información personal.")}
    `,
  },
  "uso-respuestas": {
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
  "uso-agente-ia": {
    tipo: "contenido",
    titulo: "Meta Business Agent (inteligencia artificial)",
    cuerpo: (estado) => `
      ${p("Es una función que Meta lanzó en junio de 2026: puede responder preguntas del negocio, recomendar productos del catálogo y ayudar con citas, con la posibilidad de pasar la conversación a una persona.")}
      ${estado.ruta === "api"
        ? p("En cuentas de la API, se configura y se supervisa desde las herramientas empresariales de Meta (WhatsApp Manager), trabajando junto a Cloud API, no desde la aplicación del celular.")
        : ilustracionRuta(["Herramientas", "AI agent / Agente de IA", "Continuar", "Aceptar"])}
      ${p("Antes de activarlo, enséñele con información real: horario, catálogo actualizado, direcciones, políticas de cambios, formas de pago y preguntas frecuentes. Deje fuera lo que no necesita para atender.")}
      ${estado.ruta === "business" ? alerta("Activar Meta Business Agent puede interferir con las listas de difusión y otras funciones de WhatsApp Business App. Antes de activarlo en el número principal de la organización, haga una prueba en otro número si es posible.") : ""}
      ${aviso("Puede pausarse en cualquier momento desde Herramientas → Su agente de IA → AI replies.")}
    `,
  },
  "uso-api-categorias": {
    tipo: "contenido",
    titulo: "Categorías de mensajes y costos",
    cuerpo: () => `
      ${p("Una vez tiene permiso de un contacto y empieza la conversación, cada mensaje que la organización envía primero se clasifica en una de estas categorías:")}
      ${lista([
        "<strong>Marketing:</strong> promociones o novedades, siempre con una forma sencilla de dejar de recibirlas.",
        "<strong>Utilidad:</strong> confirmaciones de citas, pedidos o entregas.",
        "<strong>Autenticación:</strong> códigos de verificación.",
        "<strong>Servicio:</strong> respuestas dentro de una conversación que el contacto inició.",
      ])}
      ${ejemplo("“María, usted autorizó recibir nuestras novedades. Esta semana tenemos [información]. Responda SALIR para dejar de recibir promociones.”")}
      ${aviso("Cada categoría tiene un costo distinto por mensaje entregado, que varía según el país y cambia con el tiempo. Revise la tarifa vigente en la página oficial de precios de WhatsApp Business Platform antes de calcular un presupuesto.")}
      ${alerta("No conviene disfrazar publicidad como “mensaje de servicio” para pagar menos: Meta revisa las plantillas y puede reclasificarlas o restringirlas.")}
    `,
  },
  "uso-apps-externas": {
    tipo: "contenido",
    titulo: "Cuidado con aplicaciones externas de envío masivo",
    cuerpo: () => `
      ${p("Contratar un proveedor externo no es malo en sí mismo: la plataforma empresarial de WhatsApp está pensada precisamente para trabajar con proveedores tecnológicos autorizados.")}
      ${p("El problema aparece cuando una herramienta:")}
      ${lista([
        "usa una versión modificada de WhatsApp;",
        "automatiza WhatsApp Web sin autorización;",
        "promete “mensajes ilimitados sin API”;",
        "promete escribirle a números que nunca dieron permiso;",
        "extrae o “raspa” teléfonos de internet o de otras fuentes;",
        "exige mantener abierta una sesión de navegador todo el tiempo;",
        "promete “anti-ban” o dice que puede “saltarse los límites de WhatsApp”.",
      ])}
      ${p("En el mercado han circulado herramientas con nombres como “WAPI”, “Wappi”, “Sender”, “Rocket” y variantes similares que ofrecen automatizar WhatsApp por fuera de la API oficial. No se trata de juzgar un nombre comercial: lo que importa es cómo se conecta técnicamente a WhatsApp.")}
      ${p("Antes de pagar cualquier herramienta, pregunte por escrito:")}
      ${lista([
        "¿Los mensajes salen mediante WhatsApp Business Platform / Cloud API oficial de Meta?",
        "¿La organización será propietaria de la cuenta y del número?",
        "¿Dónde queda almacenada la base de contactos?",
        "¿Cómo se registra el permiso de cada contacto?",
        "¿Cómo se tramita SALIR o la revocación del permiso?",
        "Si termina el contrato, ¿la organización se lleva su número y su cuenta?",
      ])}
      ${alerta("WhatsApp relaciona las aplicaciones no oficiales y la extracción masiva de contactos con suspensiones temporales de cuenta, incluso cuando la organización no tenía intención de hacer daño. La calidad de los mensajes y la reacción de los destinatarios también importa: muchos bloqueos o denuncias afectan la cuenta.")}
    `,
  },
  "uso-fin": {
    tipo: "contenido",
    titulo: "Fin de “qué puede hacer”",
    cuerpo: () => `
      ${banner("Etapa 3 completa: qué puede hacer.")}
      ${p("No tiene que usar todo esto de una vez: use lo que le sirva según lo que necesite. Ahora sigue el mantenimiento: lo que conviene revisar cada cierto tiempo, no solo una vez.")}
    `,
  },

  // ============ ETAPA 4: MANTENIMIENTO ============

  "mant-respaldo": {
    tipo: "contenido",
    titulo: "Copias de respaldo",
    cuerpo: () => `
      ${p("Esto no es de una sola vez: revíselo cada cierto tiempo, y hágalo siempre antes de cambiar de teléfono.")}
      ${ilustracionRuta(["Configuración", "Chats", "Copia de seguridad", "Copia cifrada de extremo a extremo"])}
      ${p("Active la copia cifrada de extremo a extremo y guarde muy bien la contraseña o mecanismo de recuperación que elija: perderlo puede complicar la recuperación del respaldo.")}
    `,
  },
  "mant-actualizar": {
    tipo: "contenido",
    titulo: "Mantener la aplicación actualizada",
    cuerpo: (estado) => `
      ${p("Revise esto cada cierto tiempo, no solo cuando instaló la aplicación.")}
      ${ilustracionRuta([estado.so === "iphone" ? "App Store" : "Google Play Store", "Mis aplicaciones o Actualizaciones", "Actualizar WhatsApp"])}
      ${p("Las versiones nuevas corrigen fallas de seguridad y agregan funciones como la verificación en dos pasos con contraseña.")}
    `,
  },
  "mant-dispositivos": {
    tipo: "contenido",
    titulo: "Revisar los dispositivos vinculados",
    cuerpo: () => `
      ${p("Revíselo cada cierto tiempo, no solo una vez, y especialmente si vinculó su cuenta a un computador (ver la etapa de configuración).")}
      ${ilustracionRuta(["Configuración o menú", "Dispositivos vinculados"])}
      ${p("Si ve un computador o navegador que no reconoce, tóquelo y escoja <strong>Cerrar sesión</strong>.")}
      ${aviso("Hágalo especialmente después de usar WhatsApp Web en un computador ajeno, un hotel o una oficina compartida.")}
    `,
  },
  "mant-enlaces": {
    tipo: "contenido",
    titulo: "Enlaces sospechosos",
    cuerpo: () => `
      ${p("Esto es un hábito permanente, no algo que se revisa una sola vez.")}
      ${p("Si recibe un mensaje pidiendo dinero urgente desde un “nuevo número” de un familiar, llame primero al número antiguo o a otro familiar para confirmar.")}
      ${p("Si un mensaje dice que su banco bloqueó la cuenta, no entre desde el enlace del mensaje: abra usted mismo la aplicación oficial del banco.")}
      ${aviso("Regla sencilla: no se dé papaya. Ante la duda, verifique por otro medio antes de responder o hacer clic.")}
    `,
  },
  "mant-salida-personas": {
    tipo: "contenido",
    titulo: "Cuando alguien deja la organización",
    cuerpo: () => `
      ${p("Cuando una persona deja de trabajar o colaborar con la organización, retire sus dispositivos vinculados y sus accesos de administración de la cuenta.")}
      ${aviso("Revise esto cada vez que cambie el equipo de personas que atiende WhatsApp, no solo al principio.")}
    `,
  },
  "mant-fin": {
    tipo: "contenido",
    titulo: "Fin del mantenimiento",
    cuerpo: (estado) => `
      ${banner("Etapa 4 completa: mantenimiento.")}
      ${p(`Esto no se hace una sola vez: conviene repetirlo cada cierto tiempo. Por último, veamos cuándo tendría sentido ${estado.ruta === "api" ? "dar de baja el número o la cuenta" : "desinstalar la aplicación"}.`)}
    `,
  },

  // ============ ETAPA 5: DESINSTALAR / DAR DE BAJA ============

  "desinstalar-cuando": {
    tipo: "contenido",
    titulo: "¿Cuándo tiene sentido desinstalar o eliminar la cuenta?",
    cuerpo: () => `
      ${lista([
        "Va a cambiar de teléfono y prefiere no tener la aplicación en el celular viejo.",
        "Va a vender, regalar o reciclar el celular.",
        "Ya no va a usar ese número o esa cuenta.",
      ])}
      ${aviso("Cambiar de teléfono NO obliga a eliminar la cuenta: puede simplemente instalar WhatsApp en el celular nuevo y restaurar la copia de respaldo. Eliminar la cuenta es un paso aparte, solo necesario si de verdad no la va a volver a usar.")}
    `,
  },
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
  "desinstalar-cuando-api": {
    tipo: "contenido",
    titulo: "¿Cuándo tiene sentido dar de baja un número de la API?",
    cuerpo: () => `
      ${lista([
        "La organización deja de usar ese canal de atención.",
        "Cambia de proveedor tecnológico.",
        "Cierra esa línea o ese número.",
      ])}
      ${aviso("Hable primero con el proveedor tecnológico o revise en WhatsApp Manager si puede exportar el historial de conversaciones antes de desactivar el número.")}
    `,
  },
  "desinstalar-pasos-api": {
    tipo: "contenido",
    titulo: "Cómo dar de baja el número",
    cuerpo: () => `
      ${ilustracionRuta(["WhatsApp Manager o el sistema del proveedor", "Administrar cuentas", "Seleccionar el número", "Desactivar o eliminar"])}
      ${alerta("Esto es permanente. Confirme antes que el historial que necesite ya quedó exportado en su CRM o sistema de atención.")}
    `,
  },

  fin: {
    tipo: "final",
    titulo: "Guía terminada",
    cuerpo: (estado) => `
      ${ilustracionTelefono("Listo")}
      ${p(`Terminó las cinco etapas de la guía para ${etiquetaRuta(estado.ruta)}: instalación, configuración, uso, mantenimiento y ${estado.ruta === "api" ? "baja del número" : "desinstalación"}. Puede volver a cualquier sección tocando “Atrás” o recargando la página para empezar de nuevo.`)}
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
  if (ruta === "normal") return [`inst-normal-descarga-${so}`];
  if (ruta === "business") return [`inst-business-descarga-${so}`];
  if (ruta === "api") return ["inst-api-proceso"];
  return [];
}

function idsConfiguracion(estado) {
  if (estado.ruta === "api") {
    const ids = ["api-uso-requisitos", "api-politico-pregunta"];
    if (estado.politico === "si") ids.push("api-politico-alerta");
    ids.push("config-api");
    return ids;
  }
  return ["config-perfil", "config-vincular-pc", "config-verificacion", "config-correo", "config-codigo"];
}

function idsUso(ruta) {
  if (ruta === "api") return ["uso-api-categorias", "uso-agente-ia", "uso-apps-externas"];
  const base = ["uso-difusion", "uso-grupos", "uso-comunidades", "uso-canales", "uso-usuario"];
  if (ruta === "business") base.push("uso-respuestas", "uso-agente-ia", "uso-apps-externas");
  return base;
}

function idsMantenimiento(ruta) {
  if (ruta === "api") return ["mant-salida-personas", "mant-enlaces"];
  const base = ["mant-respaldo", "mant-actualizar", "mant-dispositivos", "mant-enlaces"];
  if (ruta === "business") base.push("mant-salida-personas");
  return base;
}

function idsDesinstalar(ruta, so) {
  if (ruta === "api") return ["desinstalar-cuando-api", "desinstalar-pasos-api"];
  return ["desinstalar-cuando", "desinstalar-diferencia", `desinstalar-pasos-${so || "general"}`];
}

function flujo(estado) {
  let f = ["ruta"];
  if (!estado.ruta) return f;

  if (estado.ruta !== "api") f.push("so");
  const listoParaContinuar = estado.ruta === "api" ? true : Boolean(estado.so);
  if (!listoParaContinuar) return f;

  f.push("mapa-etapas");
  f = f.concat(idsInstalacion(estado.ruta, estado.so), ["inst-fin"]);
  f = f.concat(idsConfiguracion(estado), ["config-fin"]);
  f = f.concat(idsUso(estado.ruta), ["uso-fin"]);
  f = f.concat(idsMantenimiento(estado.ruta), ["mant-fin"]);
  f = f.concat(idsDesinstalar(estado.ruta, estado.so));
  f.push("fin");
  return f;
}
