# Punto Smart OS — Rebuild

Versión corregida y testeable de Punto Smart OS. El repositorio original permanece intacto.

## Estado

- Free Argentina: funcional.
- Global Free: presets para US, ES, MX, BR y FR con clima y moneda live.
- Plus: respaldo y sincronización en Google Drive.
- Prueba, permisos centrales, facturación y suscripciones: todavía requieren la fase de backend documentada en `docs/PLATAFORMA_PLUS_BACKEND.md`.

## Correcciones principales

- IDs estables por grupo y migración versionada de configuraciones antiguas.
- Reordenamiento por drag-and-drop y por clic/touch sin colisiones.
- Listeners de drop registrados una sola vez.
- Sanitización de nombres, URLs, iconos e importaciones de Drive.
- Archivo de Drive separado por país y validación de esquema/país.
- Estado OAuth coherente después de recargar, revocación y recuperación ante `401`.
- Cámara y bloc de notas conectados a funciones reales.
- Clima, moneda y metadata para Brasil y Francia.
- Reset visible y sin borrar datos antes de confirmar.
- Correcciones responsive compartidas y política CSP en las aplicaciones principales.

## Pruebas

```bash
npm ci
npm test
```

La suite valida sintaxis JavaScript, rutas locales, contratos de seguridad, DOM, IDs únicos, reordenamiento táctil, sanitización y estados globales BR/FR.

## Publicación

Es un sitio estático compatible con GitHub Pages. La raíz del repositorio debe publicarse desde la rama `main`.

Para Drive, el origen publicado debe estar autorizado en el cliente OAuth configurado en `plus-config.js`.


## Punto Smart OS v2 — interfaz

- Header más compacto y cotización Blue prioritaria en Argentina.
- Buscador reducido a Web, IA, Videos, Comprar, Noticias y Maps.
- Selector por categoría con iconos de cada proveedor y preferencias persistentes.
- Comandos rápidos (`yt`, `gpt`, `bing`, `maps`, etc.).
- Bloque de beneficios en reemplazo del slogan y la frase del día.
- Plus restaura la autorización de Drive cuando Google lo permite, muestra la cuenta conectada y sincroniza cambios automáticamente.

## Administración, prueba y cobros

El sitio sigue siendo estático. El control central de usuarios, vencimiento de pruebas, permisos Plus y cobros requiere un backend con autenticación, base de datos y webhooks del medio de pago. No debe simularse con `localStorage`, porque el usuario podría modificarlo. Esta capa se implementará como fase separada sin exponer claves administrativas en GitHub Pages.
