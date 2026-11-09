# Portafolio — hoja de plano

Landing estática con los proyectos web de Luis Bizarro Ortiz publicados en Vercel.
HTML, CSS y JavaScript sin build. Bilingüe ES/EN.

## Verlo en local

Doble clic en `index.html`, o:

```bash
npx serve .
```

## Proyectos publicados

| Placa | Proyecto | Sitio | Stack | Año |
|---|---|---|---|---|
| 01 | Norioma | https://web-norioma.vercel.app/index.html | html, css, vanilla js | 2026 |
| 02 | Atelier Senda | https://ropagestionluisus.vercel.app/ | react, vite | 2026 |
| 03 | Lumbre | https://cafe-web-iota-ashen.vercel.app/ | react, vite | 2026 |

Las capturas se tomaron de cada sitio en producción a 1600 × 1000.

## Cambiar tus datos

Todo el contenido está en `index.html`:

| Qué | Dónde |
|---|---|
| Nombre | `h1.hero__name` (dos líneas con `<br>`) |
| Rol | `data-i18n="specs.roleValue"` |
| Número de sitios | el `<dd>` de la fila `sitios` |
| Enlace de contacto | `a.colophon__cta` (texto y `href`) |
| GitHub | fila `github` del `.colophon__meta` |
| Fecha de actualización | el `<dd>` de la fila `actualizado` |
| Extremos de la cota del hero | los dos `span.measure__end` |

## Añadir un proyecto

Copia un bloque `<article class="plate">` completo y ajusta:

1. `data-i18n="plateN.no"` → número de placa (añade también la clave en `main.js`).
2. El `<img>`: `src`, `srcset`, `alt` y `data-i18n-alt`.
3. El `href` del `<a>` dentro de `.plate__title`. Ese enlace cubre toda la placa
   con su `::after`, así que **solo hay un enlace por placa**.
4. El año y el stack en `.plate__dim`.
5. El stack y el año del `span.visually-hidden` dentro del enlace (lectores de pantalla).
6. Suma el proyecto en el `<dd>` de `sitios`.

Composición de la rejilla de 12 columnas (solo en pantallas ≥ 900 px):

| Clase | Ocupa |
|---|---|
| `plate--wide` | columnas 1–7 |
| `plate--narrow` | columnas 8–12 |
| sin clase | las 12 columnas |

Con tres placas: `wide`, `narrow` y la tercera a ancho completo. Con cuatro: `wide`, `narrow`, `narrow`, `wide`.

## Capturas

- Tamaño base: **1600 × 1000** (16:10). Versión ligera: **800 × 500**.
- Lumbre se capturó a **1600 × 800** para que el corte del pliegue caiga bajo la banda
  inferior; el marco 16:10 recorta los laterales, así que el alto puede variar.
- Formato WebP, calidad ~82.
- Nombres: `assets/proyectos/<slug>-1600.webp` y `<slug>-800.webp`.
- El `<img>` ya usa `srcset` con ambas versiones y `sizes`; si cambias la proporción,
  ajusta también `width` y `height`.

Para actualizar una captura, abre el sitio a 1600 × 1000 en el navegador, captura la
ventana (no la página completa) y exporta a WebP. Que todas compartan encuadre.

## Textos en inglés

Los textos viven en el objeto `STRINGS` de `main.js`, bajo `es` y `en`.
Cada elemento traducible del HTML lleva `data-i18n="clave"` (texto) o
`data-i18n-alt="clave"` (atributo `alt`). El título de la página y la
`meta description` se actualizan con `meta.title` y `meta.description`.

El idioma se guarda en `localStorage` (`plano-lang`). Sin JavaScript, la página
queda en español y el selector se oculta.

## Desplegar en Vercel

1. Sube el repo a GitHub.
2. En Vercel: **Add New → Project**, importa el repo.
3. Framework preset: **Other**. Build command: vacío. Output directory: vacío.
4. Deploy. `vercel.json` ya fija caché larga para `/assets` y cabeceras
   de seguridad básicas.

## Estructura

```
index.html
styles.css
main.js
vercel.json
robots.txt
sitemap.xml
google57900884de3fd1c5.html   (verificación de Google Search Console)
assets/
  favicon.svg
  proyectos/
    norioma-1600.webp · norioma-800.webp
    atelier-senda-1600.webp · atelier-senda-800.webp
    lumbre-1600.webp · lumbre-800.webp
```

## Verificación e indexación

- `google57900884de3fd1c5.html` verifica la propiedad en Search Console.
- `robots.txt` permite el rastreo y apunta al sitemap.
- `sitemap.xml` declara la portada como única URL.

La URL canónica aparece en dos sitios: la línea `Sitemap:` de `robots.txt` y el
`<loc>` de `sitemap.xml`. Si cambias de dominio, actualiza esas dos líneas.

En Vercel, la **Deployment Protection** debe estar desactivada para el dominio
público; si no, Google recibe la pantalla de login y no puede verificar ni rastrear.

## Verificación rápida

- Tab desde el inicio: enlace "Saltar al contenido" → selector de idioma → placas → contacto.
- Cambia a English y recarga: el idioma se conserva.
- DevTools → Rendering → `prefers-reduced-motion: reduce`: la retícula aparece ya trazada.
- 375 px y 1440 px sin scroll horizontal.
