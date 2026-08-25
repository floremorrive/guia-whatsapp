// Máquina de estados del wizard. No usa frameworks: solo reconstruye el
// contenido de <main id="pantalla"> según el estado actual.

const estado = {
  pantalla: "registro",
  nombre: "",
  correo: "",
  telefono: "",
  ruta: null,
  so: null,
  politico: null,
};

const nodoApp = document.getElementById("app");

function avanzar() {
  const f = flujo(estado);
  const i = f.indexOf(estado.pantalla);
  estado.pantalla = i >= 0 && i + 1 < f.length ? f[i + 1] : "fin";
  render();
}

function retroceder() {
  const f = flujo(estado);
  const i = f.indexOf(estado.pantalla);
  if (i > 0) {
    estado.pantalla = f[i - 1];
    render();
  }
}

function elegirOpcion(campo, valor, extra) {
  estado[campo] = valor;
  if (extra) Object.assign(estado, extra);
  avanzar();
}

function reiniciarRuta() {
  estado.tieneWhatsapp = null;
  estado.ruta = null;
  estado.so = null;
  estado.estadoPrevio = null;
  estado.politico = null;
  estado.pantalla = "estado-whatsapp";
  render();
}

function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
}

function validarTelefono(telefono) {
  const digitos = telefono.replace(/\D/g, "");
  return digitos.length >= 7;
}

async function manejarEnvioRegistro(evento) {
  evento.preventDefault();
  const nombre = document.getElementById("campo-nombre").value.trim();
  const correo = document.getElementById("campo-correo").value.trim();
  const telefono = document.getElementById("campo-telefono").value.trim();
  const errorNodo = document.getElementById("error-registro");
  const estadoNodo = document.getElementById("estado-registro");
  const boton = document.getElementById("boton-registro");

  if (!nombre || !validarCorreo(correo) || !validarTelefono(telefono)) {
    errorNodo.textContent = "Revise los tres datos: escriba su nombre, un correo válido (con @) y un número de teléfono.";
    return;
  }
  errorNodo.textContent = "";
  boton.disabled = true;
  estadoNodo.textContent = "Un momento, estamos revisando…";

  const datos = { nombre, correo, telefono, fecha: new Date().toISOString() };
  const yaExiste = await consultarSiYaExiste(correo, telefono);

  estado.nombre = nombre;
  estado.correo = correo;
  estado.telefono = telefono;

  if (yaExiste) {
    guardarRegistroLocal(datos);
  } else {
    await registrarParticipante(datos);
  }

  estado.pantalla = "estado-whatsapp";
  render();
}

function renderCabecera(titulo) {
  return `
    <header class="cabecera">
      <svg class="logo" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="#1f7a4d"></circle>
        <path d="M24 12c-6.6 0-12 5.2-12 11.6 0 2.4.7 4.6 2 6.5L12.8 36l6.2-1.9c1.5.8 3.2 1.3 5 1.3 6.6 0 12-5.2 12-11.6S30.6 12 24 12z" fill="#ffffff"></path>
      </svg>
      <h1>${titulo}</h1>
    </header>
  `;
}

function renderProgreso() {
  const f = flujo(estado);
  let i = f.indexOf(estado.pantalla);
  if (i < 0) i = 0;
  const porcentaje = Math.round(((i + 1) / f.length) * 100);
  const n = etapaDe(estado.pantalla);
  const etiquetaEtapa = n > 0 ? `Etapa ${n} de 5 · ${NOMBRES_ETAPA[n]}` : NOMBRES_ETAPA[0];
  return `
    <div class="progreso">
      <div class="texto-progreso"><strong>${etiquetaEtapa}</strong> — paso ${i + 1} de ${f.length} en total</div>
      <div class="barra"><span style="width:${porcentaje}%"></span></div>
    </div>
  `;
}

function renderRegistro() {
  nodoApp.innerHTML = `
    ${renderCabecera("Guía de WhatsApp")}
    <main class="pantalla">
      <h2>Bienvenido o bienvenida</h2>
      <p class="intro">Antes de empezar, escriba sus datos. Si ya se había registrado antes con este correo o este número, no se los volveremos a pedir.</p>
      <form class="formulario" id="formulario-registro">
        <div>
          <label for="campo-nombre">Nombre completo</label>
          <input id="campo-nombre" name="nombre" type="text" autocomplete="name" required />
        </div>
        <div>
          <label for="campo-correo">Correo electrónico</label>
          <input id="campo-correo" name="correo" type="email" autocomplete="email" required />
        </div>
        <div>
          <label for="campo-telefono">Número de teléfono</label>
          <input id="campo-telefono" name="telefono" type="tel" autocomplete="tel" required />
        </div>
        <p class="mensaje-error" id="error-registro"></p>
        <p class="mensaje-estado" id="estado-registro"></p>
        <p class="pie-registrado">Estos datos permiten identificar su ingreso a esta guía, dentro del tratamiento de datos personales que usted ya autorizó con la organización.</p>
        <button class="btn" type="submit" id="boton-registro">Continuar</button>
      </form>
    </main>
  `;
  document.getElementById("formulario-registro").addEventListener("submit", manejarEnvioRegistro);
}

function renderOpciones(def) {
  const botones = def.opciones
    .map(
      (op) => `
      <button class="opcion" type="button" data-valor="${op.valor}">
        <strong>${op.etiqueta}</strong>
        ${op.descripcion}
      </button>`
    )
    .join("");

  nodoApp.innerHTML = `
    ${renderCabecera("Guía de WhatsApp")}
    ${renderProgreso()}
    <main class="pantalla">
      <h2>${def.titulo}</h2>
      ${def.intro ? `<p class="intro">${def.intro}</p>` : ""}
      <div class="opciones">${botones}</div>
    </main>
    ${renderNavInferior({ ocultarSeguir: true })}
  `;

  nodoApp.querySelectorAll(".opcion").forEach((boton, i) => {
    boton.addEventListener("click", () => elegirOpcion(def.campo, def.opciones[i].valor, def.opciones[i].set));
  });
  enlazarNav();
}

function renderContenido(def, esFinal) {
  nodoApp.innerHTML = `
    ${renderCabecera("Guía de WhatsApp")}
    ${renderProgreso()}
    <main class="pantalla">
      <h2>${def.titulo}</h2>
      ${def.cuerpo(estado)}
      ${esFinal ? `<div class="opciones"><button class="opcion" type="button" id="boton-reiniciar"><strong>Aprender otra ruta de WhatsApp</strong>Vuelve a la pregunta inicial sin pedirle otra vez sus datos.</button></div>` : ""}
    </main>
    ${renderNavInferior({ ocultarSeguir: esFinal })}
  `;
  enlazarNav();
  if (esFinal) {
    document.getElementById("boton-reiniciar").addEventListener("click", reiniciarRuta);
    marcarGuiaCompletada({ correo: estado.correo, telefono: estado.telefono, ruta: estado.ruta });
  }
}

function renderNavInferior(opciones) {
  opciones = opciones || {};
  const f = flujo(estado);
  const i = f.indexOf(estado.pantalla);
  const puedeRetroceder = i > 0;
  return `
    <div class="nav-pasos">
      <div class="contenedor">
        <button class="btn secundario" id="boton-atras" ${puedeRetroceder ? "" : "disabled"}>Atrás</button>
        ${opciones.ocultarSeguir ? "" : `<button class="btn" id="boton-seguir">Seguir</button>`}
      </div>
    </div>
  `;
}

function enlazarNav() {
  const atras = document.getElementById("boton-atras");
  const seguir = document.getElementById("boton-seguir");
  if (atras) atras.addEventListener("click", retroceder);
  if (seguir) seguir.addEventListener("click", avanzar);
}

function render() {
  if (estado.pantalla === "registro") {
    renderRegistro();
    return;
  }
  const def = PANTALLAS[estado.pantalla];
  if (!def) {
    renderRegistro();
    return;
  }
  if (def.tipo === "opciones") {
    renderOpciones(def);
  } else if (def.tipo === "final") {
    renderContenido(def, true);
  } else {
    renderContenido(def, false);
  }
  window.scrollTo(0, 0);
}

(function iniciar() {
  const registroPrevio = leerRegistroLocal();
  if (registroPrevio) {
    estado.nombre = registroPrevio.nombre || "";
    estado.correo = registroPrevio.correo || "";
    estado.telefono = registroPrevio.telefono || "";
    estado.pantalla = "estado-whatsapp";
  }
  render();
})();
