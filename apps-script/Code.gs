/**
 * Código para Google Apps Script (Extensiones → Apps Script, dentro de una
 * hoja de Google nueva). Registra a los participantes de la guía de
 * WhatsApp y evita pedirles otra vez el correo o el teléfono si ya existen.
 *
 * Columnas esperadas en la hoja (fila 1, encabezados):
 * Fecha | Nombre | Correo | Teléfono | Ruta | Completó la guía | Última visita
 *
 * Después de pegar este código: Implementar → Nueva implementación →
 * tipo "Aplicación web" → Ejecutar como "Yo" → Quién tiene acceso
 * "Cualquier usuario". Copiar la URL resultante en js/config.js
 * (SHEETS_API_URL).
 */

const NOMBRE_HOJA = "Registros";

function obtenerHoja_() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(NOMBRE_HOJA);
  if (!hoja) {
    hoja = libro.insertSheet(NOMBRE_HOJA);
    hoja.appendRow(["Fecha", "Nombre", "Correo", "Teléfono", "Ruta", "Completó la guía", "Última visita"]);
  }
  return hoja;
}

function encontrarFila_(hoja, correo, telefono) {
  const datos = hoja.getDataRange().getValues();
  for (let i = 1; i < datos.length; i++) {
    const filaCorreo = String(datos[i][2] || "").trim().toLowerCase();
    const filaTelefono = String(datos[i][3] || "").replace(/\D/g, "");
    if (correo && filaCorreo === correo.trim().toLowerCase()) return i + 1;
    if (telefono && filaTelefono && filaTelefono === telefono.replace(/\D/g, "")) return i + 1;
  }
  return -1;
}

function doGet(e) {
  const parametros = e.parameter || {};
  const salida = { existe: false };
  if (parametros.action === "check") {
    const hoja = obtenerHoja_();
    const fila = encontrarFila_(hoja, parametros.correo || "", parametros.telefono || "");
    salida.existe = fila > -1;
  }
  return ContentService.createTextOutput(JSON.stringify(salida)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const cuerpo = JSON.parse(e.postData.contents || "{}");
  const hoja = obtenerHoja_();
  const fila = encontrarFila_(hoja, cuerpo.correo || "", cuerpo.telefono || "");
  const ahora = new Date();

  if (fila > -1) {
    if (cuerpo.ruta) hoja.getRange(fila, 5).setValue(cuerpo.ruta);
    if (cuerpo.completado) hoja.getRange(fila, 6).setValue("Sí");
    hoja.getRange(fila, 7).setValue(ahora);
  } else {
    hoja.appendRow([ahora, cuerpo.nombre || "", cuerpo.correo || "", cuerpo.telefono || "", cuerpo.ruta || "", cuerpo.completado ? "Sí" : "No", ahora]);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
