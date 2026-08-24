// Registro de participantes: consulta y guarda en la hoja de Google (vía el
// Web App de Apps Script) cuando SHEETS_API_URL está configurada; si no,
// funciona en modo local con localStorage para poder probar la app.

const CLAVE_LOCAL = "guia_whatsapp_registro";

function leerRegistroLocal() {
  try {
    const datos = localStorage.getItem(CLAVE_LOCAL);
    return datos ? JSON.parse(datos) : null;
  } catch (err) {
    return null;
  }
}

function guardarRegistroLocal(registro) {
  try {
    localStorage.setItem(CLAVE_LOCAL, JSON.stringify(registro));
  } catch (err) {
    // Si el navegador bloquea localStorage, la app sigue funcionando,
    // solo que puede volver a pedir los datos en la próxima visita.
  }
}

async function consultarSiYaExiste(correo, telefono) {
  if (!SHEETS_API_URL) return false;
  try {
    const parametros = new URLSearchParams({ action: "check", correo, telefono });
    const respuesta = await fetch(`${SHEETS_API_URL}?${parametros.toString()}`);
    if (!respuesta.ok) return false;
    const datos = await respuesta.json();
    return Boolean(datos.existe);
  } catch (err) {
    return false;
  }
}

async function registrarParticipante(datos) {
  guardarRegistroLocal(datos);
  if (!SHEETS_API_URL) return;
  try {
    await fetch(SHEETS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(datos),
    });
  } catch (err) {
    // Si falla el envío a la hoja, el dato ya quedó en localStorage
    // y no se le pide de nuevo a la persona en este mismo navegador.
  }
}

async function marcarGuiaCompletada(datos) {
  if (!SHEETS_API_URL) return;
  try {
    await fetch(SHEETS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(Object.assign({}, datos, { completado: true })),
    });
  } catch (err) {
    // No es crítico para la experiencia de la persona si esto falla.
  }
}
