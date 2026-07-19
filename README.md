# Punto Smart OS — Rebuild

Versión corregida y testeable de Punto Smart OS. El repositorio original permanece intacto.

## Estado

- Free Argentina: funcional.
- Global Free: presets para US, ES, MX, BR y FR con clima y moneda live.
- Plus: respaldo en Google Drive, dos meses gratis y USD 3,99 por mes desde el tercero, sin cobro automático.
- Facturación y suscripciones: no implementadas ni anunciadas como activas.

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
