// Ilustraciones esquemáticas propias (no son capturas de WhatsApp/Meta).
// Dibujan una ruta de menús como una serie de recuadros unidos por flechas,
// dentro de un marco de teléfono muy simplificado.

function escaparTexto(t) {
  return String(t)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function svgRutaMenu(pasos, opciones) {
  opciones = opciones || {};
  const ancho = 620;
  const altoPaso = 64;
  const espacio = 26;
  const margenSup = 30;
  const alto = margenSup + pasos.length * altoPaso + (pasos.length - 1) * espacio + 30;
  let y = margenSup;
  let cajas = "";
  let flechas = "";

  pasos.forEach((paso, i) => {
    const esUltimo = i === pasos.length - 1;
    const relleno = esUltimo ? "#1f7a4d" : "#ffffff";
    const trazo = esUltimo ? "#145c39" : "#1f7a4d";
    const colorTexto = esUltimo ? "#ffffff" : "#145c39";
    cajas += `
      <rect x="40" y="${y}" width="${ancho - 80}" height="${altoPaso}" rx="14" fill="${relleno}" stroke="${trazo}" stroke-width="2.5"></rect>
      <text x="${ancho / 2}" y="${y + altoPaso / 2 + 7}" text-anchor="middle" font-size="21" font-family="Segoe UI, Arial, sans-serif" font-weight="600" fill="${colorTexto}">${escaparTexto(paso)}</text>
    `;
    if (!esUltimo) {
      const yFlecha = y + altoPaso;
      flechas += `
        <line x1="${ancho / 2}" y1="${yFlecha + 2}" x2="${ancho / 2}" y2="${yFlecha + espacio - 4}" stroke="#7a8f7f" stroke-width="3"></line>
        <polygon points="${ancho / 2 - 7},${yFlecha + espacio - 6} ${ancho / 2 + 7},${yFlecha + espacio - 6} ${ancho / 2},${yFlecha + espacio + 4}" fill="#7a8f7f"></polygon>
      `;
    }
    y += altoPaso + espacio;
  });

  return `
    <svg viewBox="0 0 ${ancho} ${alto}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escaparTexto(pasos.join(" luego "))}">
      ${cajas}
      ${flechas}
    </svg>
  `;
}

// Teléfono esquemático con una pantalla y un texto central (para portadas de sección).
function svgTelefono(textoPantalla) {
  return `
    <svg viewBox="0 0 320 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escaparTexto(textoPantalla)}">
      <rect x="30" y="10" width="260" height="400" rx="34" fill="#ffffff" stroke="#1f7a4d" stroke-width="4"></rect>
      <rect x="48" y="46" width="224" height="330" rx="10" fill="#eaf4ee" stroke="#c7dccd" stroke-width="2"></rect>
      <circle cx="160" cy="398" r="10" fill="none" stroke="#1f7a4d" stroke-width="3"></circle>
      <rect x="70" y="200" width="180" height="60" rx="12" fill="#1f7a4d"></rect>
      <text x="160" y="236" text-anchor="middle" font-size="19" font-family="Segoe UI, Arial, sans-serif" font-weight="700" fill="#ffffff">${escaparTexto(textoPantalla)}</text>
    </svg>
  `;
}
