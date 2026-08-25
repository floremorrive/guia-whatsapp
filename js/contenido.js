// Contenido de toda la guía, organizado por pantallas y agrupado en 5 etapas
// explícitas: Instalación, Configuración, Qué puede hacer, Mantenimiento y
// Desinstalar. Fuentes: What'sappfinal.md (corte 24 de agosto de 2026),
// capturas reales de WhatsApp Business 2026 aportadas por la usuaria, y
// WhatsApp_para_organizaciones_2026.pptx. Regla fija: en ningún texto de
// aquí se usa el verbo "colocar".

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
  if (["estado-whatsapp", "que-hacer-si-ya-tiene", "ruta", "so", "mapa-etapas"].includes(idPantalla)) return 0;
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
  "estado-whatsapp": {
    tipo: "opciones",
    titulo: "¿Ya tiene WhatsApp instalado en este teléfono?",
    intro: "WhatsApp normal y WhatsApp Business sí pueden estar los dos en el mismo celular, pero cada uno necesita su propio número: no pueden compartir el mismo número al mismo tiempo, a menos que uno reemplace al otro. Por eso conviene decidir esto antes de escoger el camino.",
    campo: "tieneWhatsapp",
    opciones: [
      { valor: "no", etiqueta: "No, es la primera vez", descripcion: "Vamos a instalar WhatsApp desde cero, según lo que necesite." },
      { valor: "si", etiqueta: "Sí, ya tengo WhatsApp normal instalado", descripcion: "Le preguntamos qué quiere hacer a partir de ahí." },
    ],
  },

  "que-hacer-si-ya-tiene": {
    tipo: "opciones",
    titulo: "Ya tiene WhatsApp normal. ¿Qué quiere hacer?",
    intro: "Escoja la opción que más se parezca a lo que necesita.",
    campo: "ruta",
    opciones: [
      {
        valor: "normal",
        etiqueta: "Seguir usando este número solo para hablar con familia y amigos",
        descripcion: "No necesita instalar nada más. Revisamos su perfil y su seguridad para dejarlo bien configurado.",
        set: { estadoPrevio: "ya-tiene" },
      },
      {
        valor: "business",
        etiqueta: "Cambiarme a WhatsApp Business con este mismo número",
        descripcion: "Su número deja de ser WhatsApp normal y pasa a ser Business. Ya no tendrá los dos con ese número.",
        set: { estadoPrevio: "migrar" },
      },
      {
        valor: "business",
        etiqueta: "Tener también WhatsApp Business, sin dejar mi WhatsApp personal",
        descripcion: "Necesita un número de teléfono adicional para el Business.",
        set: { estadoPrevio: "ambos" },
      },
      {
        valor: "api",
        etiqueta: "Usar WhatsApp Business Platform (API) para la organización",
        descripcion: "Varios asesores, CRM o campañas grandes. No depende de este número personal.",
        set: {},
      },
    ],
  },

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
        etiqueta: "Organizar contactos de un grupo u organización",
        descripcion: "Usted mismo, u otra persona, organiza contactos y responde mensajes para una organización, fundación, grupo comunitario o negocio pequeño, así no venda nada. Le conviene WhatsApp Business App.",
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
  "inst-normal-ya-tiene": {
    tipo: "contenido",
    titulo: "Ya tiene WhatsApp instalado",
    cuerpo: () => `
      ${p("Como ya tiene WhatsApp normal funcionando en este número, no necesita instalar nada más. Sigamos revisando su perfil y la seguridad de su cuenta, para que todo quede bien configurado.")}
    `,
  },
  "inst-business-segunda-linea": {
    tipo: "contenido",
    titulo: "Tener WhatsApp normal y Business a la vez",
    cuerpo: () => `
      ${p("Sí se puede: las dos aplicaciones funcionan al mismo tiempo en el mismo celular, pero cada una necesita su propio número. No pueden compartir el mismo número a la vez.")}
      ${p("<strong>¿Cuándo cambiarse (migrar) y cuándo conseguir una línea nueva?</strong>")}
      ${tabla(
        ["Su situación", "Qué le conviene"],
        [
          ["Solo necesita un número para todo, y no le importa que su número personal pase a ser el de la organización", "Cambiarse con el mismo número"],
          ["Quiere mantener su número personal separado del número de la organización, y usar las dos aplicaciones a la vez", "Conseguir una línea nueva"],
        ]
      )}
      ${p("Para conseguir la línea nueva, puede usar una segunda tarjeta SIM (si su celular es “dual SIM”), una eSIM, o pedirle a su operador una línea adicional.")}
      ${aviso("Con ese número nuevo, siga los pasos normales de instalación de WhatsApp Business que le mostramos a continuación.")}
    `,
  },
  "inst-business-migrar-android": {
    tipo: "contenido",
    titulo: "Cambiarse a WhatsApp Business con el mismo número",
    cuerpo: () => `
      ${alerta("Al migrar, su número deja de funcionar en WhatsApp normal y pasa a funcionar en WhatsApp Business. Ya no va a tener las dos aplicaciones activas con ese mismo número.")}
      ${lista(
        [
          "En WhatsApp normal: Ajustes → Chats → Copia de seguridad → Copiar ahora.",
          "Instale WhatsApp Business desde Google Play Store.",
          "Ábralo, toque Aceptar y continuar, escoja Colombia e ingrese el mismo número que tenía.",
          "Cuando la aplicación pregunte, toque Restaurar para recuperar sus chats.",
          "Complete la verificación del número (mensaje de texto o llamada). Con esto termina la instalación.",
        ],
        true
      )}
    `,
  },
  "inst-business-migrar-iphone": {
    tipo: "contenido",
    titulo: "Cambiarse a WhatsApp Business con el mismo número",
    cuerpo: () => `
      ${alerta("Al migrar, su número deja de funcionar en WhatsApp normal y pasa a funcionar en WhatsApp Business. Ya no va a tener las dos aplicaciones activas con ese mismo número.")}
      ${lista(
        [
          "En WhatsApp normal: Ajustes → Chats → Copia de seguridad → Copiar ahora.",
          "Instale WhatsApp Business desde App Store.",
          "Ábralo, toque Aceptar y continuar, escoja Colombia e ingrese el mismo número que tenía.",
          "Cuando la aplicación pregunte, toque Restaurar para recuperar sus chats.",
          "Complete la verificación del número que le pida WhatsApp. Con esto termina la instalación.",
        ],
        true
      )}
    `,
  },
  "inst-business-descarga-android": {
    tipo: "contenido",
    titulo: "Instalar WhatsApp Business en Android",
    cuerpo: () => `
      ${ilustracionRuta(["Google Play Store", "Buscar “WhatsApp Business”", "Instalar", "Abrir", "Aceptar y continuar"])}
      ${p("Escoja el país, ingrese el teléfono, confirme el número y complete la verificación por mensaje de texto o llamada. Con esto termina la instalación.")}
    `,
  },
  "inst-business-descarga-iphone": {
    tipo: "contenido",
    titulo: "Instalar WhatsApp Business en iPhone",
    cuerpo: () => `
      ${ilustracionRuta(["App Store", "Buscar “WhatsApp Business”", "Obtener", "Abrir", "Aceptar y continuar"])}
      ${p("Escoja el país, ingrese el teléfono, confirme el número y complete la verificación que le pida WhatsApp. Con esto termina la instalación.")}
    `,
  },
  "inst-codigo-no-llega": {
    tipo: "contenido",
    titulo: "¿No le llegó el código de verificación?",
    cuerpo: () => `
      ${aviso("Esto es normal y le puede pasar a cualquiera. No significa que algo esté mal con su cuenta.")}
      ${lista(
        [
          "Espere el tiempo que indique la pantalla y toque “Reenviar código”.",
          "Si sigue sin llegar, use la opción “Llamarme” para que se lo dicten por una llamada en vez de un mensaje de texto.",
          "Confirme que escribió bien el número, con el indicativo de país (+57 para Colombia).",
          "Revise que el celular tenga señal.",
          "Si nada de esto funciona, apague y encienda el celular, y vuelva a intentar.",
        ],
        true
      )}
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
        ${p("Este es el primer paso de configuración: se hace una sola vez, antes de empezar a usarlo.")}
        ${aviso("Aunque la aplicación se llama “WhatsApp Business”, sirve igual para una organización social, una fundación o un grupo comunitario que no vende nada. Use la categoría que más se le parezca (por ejemplo, “Organización sin fines de lucro” o “Servicio comunitario”) y puede omitir el catálogo si no aplica.")}
        ${p("<strong>Esto sí conviene hacerlo siempre</strong> (Meta lo pide como mínimo):")}
        ${tabla(
          ["Dato", "Qué escribir"],
          [
            ["Nombre", "El nombre real y reconocible de la organización o del negocio."],
            ["Foto", "Logo legible o imagen reconocible."],
            ["Categoría", "La que más se acerque a lo que hace, aunque no venda nada."],
          ]
        )}
        ${p("<strong>Esto es opcional — complételo si le sirve, según lo que necesite:</strong>")}
        ${tabla(
          ["Dato", "Qué escribir"],
          [
            ["Descripción", "Qué hace, para quién y dónde presta el servicio."],
            ["Horario", "Las horas reales en que responde mensajes."],
            ["Dirección", "Solo si le sirve a alguien para visitar el sitio."],
            ["Correo", "Un correo que sí revisen."],
            ["Sitio web", "La página oficial, si existe."],
            ["Catálogo", "Solo si de verdad ofrece productos o servicios para mostrar."],
          ]
        )}
        ${alerta("Evite promesas exageradas, promociones vencidas o una dirección residencial si nadie debe visitarla. El perfil debe ayudar a reconocer con quién se habla, no engañar.")}
      `
        : `
        ${p("Este es el primer paso de configuración: se hace una sola vez, justo después de instalar.")}
        ${p("<strong>Esto sí conviene hacerlo siempre:</strong>")}
        ${tabla(
          ["Campo", "Recomendación"],
          [
            ["Nombre", "El nombre por el que le reconocen su familia y sus amigos."],
            ["Foto", "Una foto clara, si quiere que lo reconozcan fácilmente."],
          ]
        )}
        ${p("<strong>Esto es opcional — decídalo usted, según lo que necesite:</strong>")}
        ${lista([
          "Información (“Acerca de”): puede dejarla como está, o escribir algo breve. No incluya dirección, cédula ni datos bancarios.",
          "Privacidad: usted puede restringir quién ve su foto, su información y quién puede agregarlo a grupos, según lo que necesite.",
        ])}
        ${aviso("Estos ajustes están en Ajustes, tocando su nombre para editar el perfil, y en Ajustes → Privacidad.")}
      `,
  },
  "config-vincular-pc": {
    tipo: "contenido",
    titulo: "Conectar WhatsApp a un computador",
    cuerpo: () => `
      ${p("<strong>Esto es opcional — hágalo solo si lo necesita.</strong> Si quiere escribir desde un computador en vez de depender solo del celular, puede vincularlo. El celular sigue siendo necesario: ahí quedan sus conversaciones, y de vez en cuando debe tener conexión a internet.")}
      ${ilustracionRuta(["En el computador: abrir web.whatsapp.com", "Aparece un código QR en pantalla", "En el celular: Ajustes → Dispositivos vinculados", "Vincular un dispositivo", "Apuntar la cámara del celular al código QR"])}
      ${aviso("Puede usar el navegador del computador (web.whatsapp.com) o la aplicación de escritorio oficial de WhatsApp: el proceso para vincularlo es el mismo.")}
      ${alerta("Escanee el código QR únicamente cuando usted mismo abrió esa pantalla en el computador. Nunca escanee un código QR que otra persona le pida escanear por teléfono, mensaje o en persona: eso le puede dar a un desconocido acceso a sus conversaciones.")}
      ${p("Más adelante, en la etapa de mantenimiento, le mostramos cómo revisar y cerrar la sesión de un computador vinculado cuando ya no lo use.")}
    `,
  },
  "config-verificacion": {
    tipo: "contenido",
    titulo: "Verificación en dos pasos",
    cuerpo: () => `
      ${p("<strong>Esto sí conviene hacerlo siempre.</strong> Se activa una sola vez y protege su cuenta para que nadie más la use desde otro celular.")}
      ${ilustracionRuta(["Ajustes", "Cuenta", "Verificación en dos pasos", "Activar"])}
      ${p("Si su aplicación todavía pide un PIN de seis cifras, no use su fecha de nacimiento, los últimos números de su cédula ni el mismo código de desbloqueo del celular.")}
      ${p("Si ya le ofrece una contraseña, use una propia de WhatsApp, distinta a la del correo o el banco. Use lo que le muestre su teléfono: WhatsApp está pasando del código de seis cifras a una contraseña, y no a todas las cuentas les llega el cambio al mismo tiempo.")}
    `,
  },
  "config-correo": {
    tipo: "contenido",
    titulo: "Correo de recuperación",
    cuerpo: () => `
      ${p("<strong>Esto también conviene hacerlo siempre.</strong>")}
      ${lista(
        [
          "Registre un correo al que usted todavía pueda entrar.",
          "Confirme el mensaje que le llegue a ese correo.",
          "Revíselo si cambia de teléfono.",
        ],
        true
      )}
      ${ilustracionRuta(["Ajustes", "Cuenta", "Dirección de correo electrónico", "Añadir correo"])}
      ${aviso("No use un correo que nadie recuerde o que ya esté abandonado. Este correo sirve para recuperar su cuenta si algún día pierde el acceso.")}
    `,
  },
  "config-codigo": {
    tipo: "contenido",
    titulo: "Una regla para recordar siempre",
    cuerpo: () => `
      ${alerta("Nunca comparta su código de registro. Si alguien le escribe o le llama diciendo “le llegó un código por error, ¿me lo dicta?” o “somos soporte de WhatsApp, necesitamos el código”, no lo entregue. WhatsApp nunca lo pide así.")}
      ${aviso("Si le llega un código que usted no pidió, probablemente alguien más está intentando registrar su número. No lo comparta y esté alerta.")}
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

  "uso-decision": {
    tipo: "contenido",
    titulo: "¿Qué necesita hacer? Elija la herramienta correcta",
    cuerpo: () => `
      ${p("Antes de crear cualquier cosa, decida primero qué necesita: eso le dice qué herramienta usar. No todo mensaje necesita un grupo.")}
      ${tabla(
        ["Si necesita…", "Use…"],
        [
          ["Avisar lo mismo a contactos que ya la reconocen, sin crear un espacio nuevo", "<strong>Difusión</strong>"],
          ["Conversar y coordinar con un equipo sobre una tarea concreta", "<strong>Grupo</strong>"],
          ["Organizar varios grupos relacionados bajo una misma organización", "<strong>Comunidad</strong>"],
          ["Publicar avisos a muchos seguidores, sin que conversen entre ellos", "<strong>Canal</strong>"],
          ["Atender el caso particular de una sola persona", "<strong>Chat individual</strong> (el chat normal, sin nada más)"],
        ]
      )}
      ${aviso("En las próximas pantallas le explicamos cada una con más calma.")}
    `,
  },
  "uso-difusion": {
    tipo: "contenido",
    titulo: "Difusiones: lista tradicional y difusión comercial",
    cuerpo: (estado) => `
      ${p("Úsela cuando quiera avisar lo mismo a varios contactos que ya reconocen a la organización, sin crear un grupo. Hay dos formas, y no son lo mismo:")}
      ${tabla(
        ["", "Lista tradicional", "Difusión comercial"],
        [
          ["Costo", "Gratis", "Paga (se cobra por cada mensaje que sí llega)"],
          ["Contactos", "Hasta 256 por lista", "Depende de la cuenta"],
          ["Requisito del destinatario", "Debe tener guardado el número de la organización", "Puede llegar a quien no guardó el número"],
          ["Disponibilidad", "Todas las cuentas", "Solo en algunos países y cuentas"],
        ]
      )}
      ${p("<strong>Crear una lista tradicional:</strong>")}
      ${ilustracionRuta(["Ajustes", "Difusiones", "Nueva lista de difusión", "Elegir contactos guardados", "Crear"])}
      ${estado.ruta === "business" ? `${p("<strong>Activar difusiones comerciales (si aparece en su cuenta):</strong>")}${ilustracionRuta(["Menú (los tres puntos)", "Difusiones comerciales", "Continuar", "Botón +", "Escribir el mensaje y elegir destinatarios", "Enviar"])}` : ""}
      ${p("Para agregar o quitar contactos de una lista ya creada, ábrala y edite los destinatarios desde ahí.")}
      ${aviso("Antes de cualquier difusión: depure la lista (elimine números antiguos o duplicados), confirme que la persona reconoce a la organización, retire a quien pidió no recibir más mensajes, y envíe solo información que le sirva a esa audiencia. Deje siempre una salida sencilla: “Si no desea recibir más avisos, responda SALIR.”")}
      ${p("<strong>Cómo saber si el mensaje llegó (los “chulos”):</strong>")}
      ${lista([
        "Un solo chulo gris: el mensaje salió, todavía no llegó al teléfono de la persona.",
        "Dos chulos grises: llegó al teléfono de la persona.",
        "Dos chulos azules: la persona lo leyó (solo si tiene activada la confirmación de lectura).",
      ])}
      ${aviso("Un solo chulo no prueba por qué no llegó: puede ser el teléfono apagado, sin señal, o un bloqueo. Antes de culpar al teléfono o seguir enviando, pruebe con 5 personas conocidas y compare el resultado.")}
      ${alerta("Si abusa de las difusiones, el mensaje puede quedar solo con un chulo y no llegar, y la cuenta puede recibir una restricción (no poder escribir a chats nuevos) o terminar suspendida.")}
    `,
  },
  "uso-grupos": {
    tipo: "contenido",
    titulo: "Grupos: crear, ordenar y poner límites",
    cuerpo: () => `
      ${p("Úselo para conversar y coordinar con un equipo sobre una tarea concreta: organizar una reunión, atender un sector, preparar una actividad. No lo use para avisos generales: ahí sirve mejor un canal o una difusión.")}
      ${ilustracionRuta(["Nuevo chat", "Nuevo grupo", "Tocar cada contacto que quiera agregar", "Tocar la flecha para continuar", "Escribir el nombre del grupo", "Crear"])}
      ${p("<strong>Para que no se vuelva un caos:</strong>")}
      ${lista([
        "Defina un propósito claro para el grupo, y dígaselo a los integrantes.",
        "Fije reglas: horario, temas permitidos, cómo se responde.",
        "Rote la moderación entre varias personas, no la deje en una sola.",
        "Si el grupo es solo para anuncios, restrinja quién puede escribir a “solo administradores”.",
        "Fije los mensajes importantes (hasta 4) para que no se pierdan entre la conversación.",
      ])}
      ${aviso("Como referencia práctica, no un límite oficial de WhatsApp: si un grupo supera unas 50 personas activas o mezcla varios temas, considere organizar una comunidad con subgrupos por territorio, sector o tarea.")}
      ${p("Cuando entra alguien nuevo, se le pueden compartir hasta 100 mensajes de los últimos 14 días, para que no llegue perdido.")}
      ${p("<strong>Permisos del grupo, y por qué importa configurarlos:</strong> en la información del grupo puede definir quién puede enviar mensajes (todos, o solo administradores) y quién puede editar el nombre y la foto del grupo (todos, o solo administradores). Configurarlo bien evita que cualquiera cambie la información sin permiso, o que el grupo se llene de mensajes fuera de lugar.")}
      ${p("<strong>Agregar o quitar personas:</strong>")}
      ${lista(["Para agregar: abra la información del grupo → Añadir participante → elija de sus contactos.", "Para quitar: abra la información del grupo → toque el nombre de la persona → Quitar del grupo."])}
      ${p("<strong>La mención @all:</strong> avisa a todo el grupo a la vez, incluso a quien tiene el grupo silenciado. En grupos de 32 personas o menos, cualquiera puede usarla; en grupos más grandes, solo los administradores.")}
      ${ejemplo("Uso correcto: “@all La reunión de mañana cambió de sede.”")}
      ${alerta("Evite usar @all para saludos, chistes o promociones repetidas: el abuso hace que la gente también silencie esas menciones, y pierde su utilidad justo cuando de verdad la necesite.")}
      ${p("<strong>Para salir de un grupo sin avisarle a todos:</strong>")}
      ${ilustracionRuta(["Abrir el grupo", "Tocar el nombre del grupo", "Salir del grupo", "Confirmar"])}
      ${aviso("Solo los administradores del grupo reciben el aviso de que usted salió; los demás integrantes no ven un anuncio general en la conversación.")}
    `,
  },
  "uso-comunidades": {
    tipo: "contenido",
    titulo: "Comunidades: organizar varios grupos",
    cuerpo: (estado) => `
      ${p("Úsela para reunir varios grupos relacionados bajo una misma organización, con un espacio de anuncios generales que solo los administradores usan para avisar a todos a la vez.")}
      ${p("Por ejemplo: una comunidad puede tener grupos por Territorios (municipios o regiones), por Organizaciones (asociaciones o sindicatos) y por Sectores (docentes, trabajadores, campesinos), además del espacio de Anuncios generales.")}
      ${estado.ruta === "business"
        ? `${alerta("WhatsApp Business no permite crear comunidades. Si su organización necesita esta herramienta, alguien debe crearla desde una cuenta de WhatsApp normal; desde ahí puede agregar como miembros a quienes usan WhatsApp Business.")}${aviso("Si a usted lo agregan a una comunidad creada desde WhatsApp normal, sí puede participar en ella y en sus grupos con su cuenta de Business.")}`
        : `
          ${ilustracionRuta(["Comunidades", "Nueva comunidad", "Escribir nombre y descripción", "Agregar grupos existentes o crear grupos nuevos", "Crear"])}
          ${p("<strong>Agregar o quitar un grupo de la comunidad:</strong>")}
          ${lista(["Para agregar: dentro de la comunidad → Añadir grupos existentes o Crear grupo nuevo.", "Para quitar: dentro de la comunidad, abra las opciones de ese grupo → Quitar de la comunidad."])}
          ${aviso("Solo los administradores de la comunidad pueden enviar anuncios generales a todos los grupos a la vez; revise quién tiene ese permiso.")}
        `}
    `,
  },
  "uso-canales": {
    tipo: "contenido",
    titulo: "Canales: publicar sin conversar",
    cuerpo: () => `
      ${p("Úselo cuando quiera publicar avisos a muchos seguidores, sin que ellos conversen entre sí ni vean los números de los demás.")}
      ${tabla(["Quién administra", "Quién sigue"], [["Publica texto, fotos, enlaces, videos y encuestas.", "Lee las publicaciones, reacciona con símbolos y vota en encuestas. No puede escribir mensajes que otros vean, ni ver el número de nadie."]])}
      ${ilustracionRuta(["Novedades", "Menú", "Crear canal", "Continuar", "Nombre, descripción e imagen"])}
      ${alerta("Los canales son públicos: WhatsApp no permite crear uno privado. Aun así, el número y la foto personal de quien administra el canal quedan protegidos frente a los seguidores.")}
    `,
  },
  "uso-usuario": {
    tipo: "contenido",
    titulo: "Nombre de usuario @: dejar de mostrar su número",
    cuerpo: () => `
      ${p("<strong>Esto es opcional.</strong> Antes había que dar el número de teléfono para que alguien le escribiera. Cuando esta función esté activa en su país, puede compartir su @usuario y mantener el número privado en el primer contacto.")}
      ${ilustracionRuta(["Actualizar WhatsApp a la versión más reciente", "Ajustes", "Cuenta", "Nombre de usuario"])}
      ${p("Pruebe tres opciones de nombre: entre 3 y 35 caracteres, solo minúsculas, números, punto y guion bajo, sin mayúsculas ni espacios. Anote cuál quedó reservado y quién lo administra.")}
      ${alerta("No use como nombre de usuario su año de nacimiento, su cédula u otra información personal.")}
      ${aviso("Si todavía no le aparece la opción de crear nombre de usuario, es porque la función no ha llegado a su país o a su cuenta. Espere y revise más adelante.")}
    `,
  },
  "uso-meta-verified": {
    tipo: "contenido",
    titulo: "La insignia azul (Meta Verified)",
    cuerpo: () => `
      ${p("Es una suscripción paga y opcional de Meta. Da una insignia de cuenta verificada y algunos beneficios adicionales, como más protección contra cuentas falsas que se hagan pasar por la suya.")}
      ${aviso("No es necesaria para usar WhatsApp Business normalmente. Actívela solo si de verdad la necesita y está dispuesto a pagarla.")}
      ${ilustracionRuta(["Herramientas", "Meta Verified"])}
    `,
  },
  "uso-respuestas": {
    tipo: "contenido",
    titulo: "Bienvenida, ausencia y respuestas guardadas",
    cuerpo: () => `
      ${p("Hay dos respuestas automáticas y una ayuda manual. Las tres funcionan en chats individuales, no en grupos:")}
      ${tabla(
        ["Herramienta", "Cuándo se envía", "Para qué sirve"],
        [
          ["Bienvenida", "Con el primer mensaje de una persona, o si pasaron 14 días sin conversar", "Confirma que su consulta llegó"],
          ["Ausencia", "Fuera del horario que usted defina", "Le dice a la persona cuándo habrá atención"],
          ["Respuesta guardada", "Cuando quien atiende escribe “/” y elige el atajo", "Responde una pregunta que se repite mucho"],
        ]
      )}
      ${p("<strong>Cómo configurar bienvenida o ausencia:</strong>")}
      ${ilustracionRuta(["Herramientas para la empresa", "Bienvenida o Ausencia", "Escribir el texto", "Definir horario y destinatarios", "Probar desde otro teléfono"])}
      ${p("Un buen texto de ausencia dice tres cosas: confirma que el mensaje llegó, da un plazo real, y ofrece una alternativa si es urgente.")}
      ${tabla(
        ["No ayuda", "Sí orienta"],
        [["“Gracias por escribir. En breve le responderemos.” No dice horario, plazo ni otra vía.", "“Recibimos su mensaje. Respondemos de lunes a viernes de 8 a. m. a 5 p. m., en un día hábil. Si es urgente, escriba a [otro contacto].”"]]
      )}
      ${aviso("Pruebe la respuesta desde otro teléfono antes de dejarla activa, y no la deje encendida durante el horario normal de atención.")}
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
      ${p("Antes de activarlo, enséñele con información real: horario, catálogo actualizado, direcciones, políticas de cambios, formas de pago y preguntas frecuentes. Deje fuera lo que no necesita para atender. Si su organización no vende productos ni recibe muchas preguntas repetidas, puede que no necesite esta función.")}
      ${estado.ruta === "business" ? alerta("Activar Meta Business Agent puede interferir con las listas de difusión y otras funciones de WhatsApp Business App. Antes de activarlo en el número principal de la organización, haga una prueba en otro número si es posible.") : ""}
      ${aviso("Puede pausarse en cualquier momento desde Herramientas → Su agente de IA → AI replies.")}
    `,
  },
  "uso-otras-funciones-2026": {
    tipo: "contenido",
    titulo: "Otras funciones de 2026: no todas están en su cuenta",
    cuerpo: () => `
      ${aviso("Estas funciones no aparecen en todas las cuentas ni en todos los países. No prometa ninguna hasta verla activa en la cuenta que va a usar.")}
      ${lista([
        "<strong>Difusión comercial:</strong> paga, exige permiso previo del contacto, disponibilidad limitada.",
        "<strong>Conectar con la plataforma para empresas:</strong> en cuentas habilitadas, WhatsApp Business puede compartir el mismo número con un servicio conectado (se ve en Ajustes → Cuenta → Plataforma para empresas). Sirve si más adelante la organización necesita varios asesores atendiendo a la vez, sin dejar de usar la aplicación del celular. Al conectarla, pregunta si quiere compartir el historial de chats (hasta 6 meses, sin incluir grupos) o empezar de cero con los clientes actuales; elija según si necesita conservar las conversaciones anteriores.",
        "<strong>Historial de grupo:</strong> comparte hasta 100 mensajes de los últimos 14 días con quien se une.",
        "<strong>Archivos PDF:</strong> se pueden marcar y devolver desde el computador.",
        "<strong>Grabación de llamadas:</strong> solo para el servicio conectado (plataforma para empresas), no para la aplicación normal.",
        "<strong>Anuncios en Estados y Canales:</strong> disponibilidad y controles distintos según la región.",
      ])}
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
      ${p("En el mercado han circulado herramientas con nombres como “SendRocket”, “Wappi” y extensiones de navegador similares que ofrecen automatizar WhatsApp por fuera de la API oficial. No se trata de juzgar un nombre comercial: lo que importa es cómo se conecta técnicamente a WhatsApp.")}
      ${p("Antes de pagar cualquier herramienta, pregunte por escrito:")}
      ${lista([
        "¿Los mensajes salen mediante WhatsApp Business Platform / Cloud API oficial de Meta?",
        "¿La organización será propietaria de la cuenta y del número?",
        "¿Dónde queda almacenada la base de contactos?",
        "¿Cómo se registra el permiso de cada contacto?",
        "¿Cómo se tramita SALIR o la revocación del permiso?",
        "Si termina el contrato, ¿la organización se lleva su número y su cuenta?",
      ])}
      ${tabla(
        ["Riesgo para el mensaje", "Riesgo para la cuenta"],
        [["Puede quedar con un solo chulo y no llegar; la difusión pierde alcance.", "Puede recibir una restricción, no poder escribir a chats nuevos, o terminar suspendida."]]
      )}
      ${alerta("WhatsApp relaciona las aplicaciones no oficiales y la extracción masiva de contactos con estas restricciones y suspensiones, incluso cuando la organización no tenía intención de hacer daño.")}
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
      ${ilustracionRuta(["Ajustes", "Chats", "Copia de seguridad", "Copia cifrada de extremo a extremo"])}
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
      ${p("Revíselo cada mes, y siempre después de prestar su teléfono, especialmente si vinculó su cuenta a un computador (ver la etapa de configuración).")}
      ${ilustracionRuta(["Ajustes", "Dispositivos vinculados"])}
      ${p("Si ve un computador o navegador que no reconoce, tóquelo y escoja <strong>Cerrar sesión</strong>.")}
      ${aviso("Hágalo especialmente después de usar WhatsApp Web en un computador ajeno, un hotel o una oficina compartida.")}
    `,
  },
  "mant-cuenta-comprometida": {
    tipo: "contenido",
    titulo: "¿Sospecha que le hackearon la cuenta?",
    cuerpo: (estado) =>
      estado.ruta === "api"
        ? `${p("En una cuenta empresarial, esto casi siempre es un problema de accesos, no del número: revise quién tiene permisos de administrador en la cuenta empresarial de Meta y retire los que no reconozca.")}`
        : `
        ${aviso("Muchas personas creen que si les “hackean” WhatsApp, tienen que cambiar de SIM o de número. Casi nunca es así: son dos problemas distintos.")}
        ${p("<strong>Si ve mensajes que usted no envió, le llegó un código que no pidió, o encuentra un dispositivo vinculado que no reconoce:</strong> eso es alguien usando su cuenta, no su línea telefónica.")}
        ${lista(["Reinstale WhatsApp con su mismo número (esto cierra la sesión de quien tenga acceso).", "Active la verificación en dos pasos de inmediato.", "Revise los dispositivos vinculados y cierre los que no reconozca."], true)}
        ${aviso("Ninguno de estos pasos requiere cambiar de número ni de SIM.")}
        ${p("<strong>Si el celular se queda sin señal de un momento a otro y no puede hacer ni recibir llamadas:</strong> eso sí es un problema con la línea (posible robo o clonación de la SIM), y ahí sí debe contactar de inmediato a su operador de telefonía, no a WhatsApp.")}
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
      ${p("Si en cambio quiere eliminar la cuenta por completo: Ajustes → Cuenta → Eliminar cuenta → escribir el número → confirmar.")}
      ${alerta("Eliminar la cuenta es permanente. Revise primero que su copia de respaldo esté al día.")}
    `,
  },
  "desinstalar-pasos-iphone": {
    tipo: "contenido",
    titulo: "Pasos para iPhone",
    cuerpo: () => `
      ${ilustracionRuta(["Mantener presionado el ícono de WhatsApp", "Eliminar aplicación", "Confirmar"])}
      ${p("Si en cambio quiere eliminar la cuenta por completo: Ajustes → Cuenta → Eliminar cuenta → escribir el número → confirmar.")}
      ${alerta("Eliminar la cuenta es permanente. Revise primero que su copia de respaldo esté al día.")}
    `,
  },
  "desinstalar-pasos-general": {
    tipo: "contenido",
    titulo: "Cómo eliminar la cuenta",
    cuerpo: () => `
      ${ilustracionRuta(["Ajustes", "Cuenta", "Eliminar cuenta", "Escribir el número", "Confirmar"])}
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

function idsInstalacion(estado) {
  const { ruta, so } = estado;
  if (ruta === "normal") {
    if (estado.estadoPrevio === "ya-tiene") return ["inst-normal-ya-tiene"];
    return [`inst-normal-descarga-${so}`];
  }
  if (ruta === "api") return ["inst-api-proceso"];
  if (ruta === "business") {
    if (estado.estadoPrevio === "migrar") return [`inst-business-migrar-${so}`];
    if (estado.estadoPrevio === "ambos") return ["inst-business-segunda-linea", `inst-business-descarga-${so}`];
    return [`inst-business-descarga-${so}`];
  }
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
  const base = ["uso-decision", "uso-difusion", "uso-grupos", "uso-comunidades", "uso-canales", "uso-usuario"];
  if (ruta === "business") base.push("uso-meta-verified", "uso-respuestas", "uso-agente-ia", "uso-otras-funciones-2026", "uso-apps-externas");
  return base;
}

function idsMantenimiento(ruta) {
  if (ruta === "api") return ["mant-salida-personas", "mant-enlaces", "mant-cuenta-comprometida"];
  const base = ["mant-respaldo", "mant-actualizar", "mant-dispositivos", "mant-cuenta-comprometida", "mant-enlaces"];
  if (ruta === "business") base.push("mant-salida-personas");
  return base;
}

function idsDesinstalar(ruta, so) {
  if (ruta === "api") return ["desinstalar-cuando-api", "desinstalar-pasos-api"];
  return ["desinstalar-cuando", "desinstalar-diferencia", `desinstalar-pasos-${so || "general"}`];
}

function flujo(estado) {
  let f = ["estado-whatsapp"];
  if (!estado.tieneWhatsapp) return f;

  f.push(estado.tieneWhatsapp === "si" ? "que-hacer-si-ya-tiene" : "ruta");
  if (!estado.ruta) return f;

  if (estado.ruta !== "api") f.push("so");
  const listoParaContinuar = estado.ruta === "api" ? true : Boolean(estado.so);
  if (!listoParaContinuar) return f;

  f.push("mapa-etapas");
  f = f.concat(idsInstalacion(estado));
  if (estado.ruta !== "api" && estado.estadoPrevio !== "ya-tiene") f.push("inst-codigo-no-llega");
  f.push("inst-fin");
  f = f.concat(idsConfiguracion(estado), ["config-fin"]);
  f = f.concat(idsUso(estado.ruta), ["uso-fin"]);
  f = f.concat(idsMantenimiento(estado.ruta), ["mant-fin"]);
  f = f.concat(idsDesinstalar(estado.ruta, estado.so));
  f.push("fin");
  return f;
}
