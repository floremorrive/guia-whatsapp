# Guía de WhatsApp

App web que guía paso a paso a una persona en instalar, gestionar, mantener, proteger y desinstalar WhatsApp (normal, Business o API), según lo que necesite.

Sitio publicado: https://floremorrive.github.io/guia-whatsapp/

## Cómo funciona

Sitio estático (HTML/CSS/JS, sin frameworks). Primero pide nombre, correo y teléfono; si el correo o el teléfono ya están registrados, no los vuelve a pedir. Después pregunta qué quiere hacer con WhatsApp (normal, Business o API), su sistema operativo cuando aplica, y arma una ruta de pasos: instalación, gestión, mantenimiento, seguridad y desinstalación.

## Conectar el registro a una hoja de Google (recomendado antes de usar la app con personas reales)

Mientras no se haga este paso, la app solo recuerda a cada persona en su propio navegador (con `localStorage`), sin compartir esa información entre dispositivos ni guardar un registro centralizado.

1. Cree una hoja de cálculo nueva en Google Sheets.
2. Extensiones → Apps Script.
3. Borre el contenido de `Código.gs` y pegue el contenido de [`apps-script/Code.gs`](apps-script/Code.gs) de este repositorio.
4. Guarde el proyecto.
5. Implementar → Nueva implementación → tipo **Aplicación web**.
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier usuario**.
6. Autorice los permisos que pida Google.
7. Copie la URL que termina en `/exec`.
8. Ábrala en `js/config.js` y reemplace:
   ```js
   const SHEETS_API_URL = "PEGUE_AQUÍ_LA_URL_DEL_WEB_APP";
   ```
9. Publique el cambio (ver abajo) y pruebe registrando un dato de prueba: debe aparecer una fila nueva en la pestaña "Registros" de la hoja.

La hoja queda con las columnas: Fecha, Nombre, Correo, Teléfono, Ruta elegida, Completó la guía, Última visita.

## Publicar cambios

```bash
git add -A
git commit -m "Actualiza contenido"
git push
```

GitHub Pages vuelve a publicar el sitio automáticamente (puede tardar alrededor de un minuto).

**Importante:** los navegadores (sobre todo en celular) guardan en caché los archivos `.js`. Cada vez que se edite algo dentro de `js/`, hay que subir en 1 el número `?v=` de esos archivos en `index.html`, o quienes ya abrieron la app antes pueden seguir viendo la versión vieja durante un tiempo.

## Estructura

```
index.html            Estructura de la página
css/estilos.css        Estilos (tipografía grande, alto contraste)
js/config.js            URL del Web App de Google Apps Script
js/sheets.js             Registro/consulta de participantes
js/ilustraciones.js       Generador de ilustraciones esquemáticas (SVG)
js/contenido.js           Todo el texto y la lógica de la ruta de pasos
js/app.js                 Wizard: estados, navegación, formulario
apps-script/Code.gs        Código para pegar en Google Apps Script
```

## Notas importantes

- Las ilustraciones son esquemas propios (recuadros con flechas), no capturas reales de WhatsApp o Meta.
- El bloque de restricciones para candidatos o campañas políticas es un resumen informativo, no asesoría jurídica electoral.
- El texto de consentimiento en el formulario de registro es un borrador: revíselo y ajústelo con el área encargada del tratamiento de datos de la organización antes de usar la app con personas reales.
