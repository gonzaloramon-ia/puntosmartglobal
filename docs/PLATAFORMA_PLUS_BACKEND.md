# Plataforma Plus — backend, prueba y cobros

## Objetivo

Controlar de forma central y segura quién usa Punto Smart OS Plus, cuándo comenzó su período gratuito, cuánto tiempo le queda, si tiene el servicio activo y qué ocurrió con sus pagos.

Esta lógica no debe vivir en `localStorage` ni dentro del JavaScript público de GitHub Pages. El navegador solamente muestra el estado que devuelve el servidor.

## Flujo previsto

1. El usuario inicia sesión con Google.
2. El backend valida la identidad y crea o recupera su cuenta.
3. Si es un usuario nuevo, inicia una prueba gratuita con duración configurable.
4. En cada apertura, Punto Smart OS consulta al backend el estado real del plan.
5. Antes del vencimiento se muestra un aviso dentro de la plataforma.
6. Al vencer, la cuenta pasa a `expired` salvo que exista una suscripción o activación manual vigente.
7. El medio de pago informa los cambios mediante webhooks firmados.
8. El backend actualiza el acceso a Plus; el frontend nunca decide por sí solo si alguien pagó.

## Estados de cuenta

- `free`: cuenta sin acceso Plus.
- `trial`: prueba gratuita vigente.
- `active`: servicio pago o activado manualmente.
- `past_due`: pago pendiente o rechazado.
- `expired`: prueba o período pago vencido.
- `cancelled`: cancelación solicitada; conserva acceso hasta la fecha correspondiente.
- `suspended`: bloqueo administrativo.

## Datos mínimos

### Usuarios

- ID interno.
- ID estable del proveedor de identidad.
- Nombre visible.
- Correo electrónico.
- Fecha de alta.
- Último acceso.
- País e idioma elegidos.
- Estado administrativo.

### Acceso Plus

- Usuario.
- Estado del plan.
- Inicio y fin de la prueba.
- Inicio y fin del período activo.
- Duración de prueba aplicada.
- Fuente de activación: prueba, pago, cortesía o administración.
- Fecha de última modificación.

### Pagos

- Usuario.
- Proveedor de pago.
- ID externo de cliente, suscripción y operación.
- Importe y moneda.
- Estado.
- Período cubierto.
- Fecha del último webhook procesado.

### Auditoría

Registrar cambios sensibles: extensión de prueba, activación manual, suspensión, reactivación, cambio de plan y procesamiento de webhooks.

## API mínima

- `POST /auth/google`: validar el inicio de sesión y devolver una sesión propia.
- `GET /me`: devolver perfil y estado real de Plus.
- `POST /trial/start`: iniciar la prueba una sola vez, si corresponde.
- `POST /billing/checkout`: crear el proceso de pago.
- `POST /billing/webhook`: recibir y validar notificaciones del proveedor.
- `POST /logout`: cerrar la sesión.

Las operaciones administrativas deben estar en rutas separadas y exigir un rol administrativo real.

## Panel administrativo

Debe permitir:

- buscar usuarios por nombre o correo;
- ver altas, usuarios activos y últimos accesos;
- ver fecha de inicio, vencimiento y días restantes de cada prueba;
- filtrar por `trial`, `active`, `expired`, `past_due` o `suspended`;
- extender una prueba;
- otorgar o quitar Plus manualmente;
- suspender o reactivar una cuenta;
- revisar pagos y webhooks;
- exportar datos operativos;
- consultar el historial de cambios.

## Reglas de seguridad

- Las claves privadas y administrativas nunca van en GitHub Pages.
- El servidor valida todos los tokens de identidad.
- La fecha del navegador no determina el vencimiento.
- Una prueba gratuita se vincula a una identidad estable y no se reinicia borrando cookies.
- Los webhooks deben validarse y procesarse de forma idempotente.
- El panel administrativo debe usar control de acceso por roles y segundo factor.
- Los datos de Google Drive del usuario siguen guardándose en su propio Drive; la base central solo conserva lo necesario para identidad, acceso y facturación.

## Privacidad y mensaje comercial

Cuando esta capa esté activa, Punto Smart OS sí conservará datos personales mínimos, como correo, nombre, fechas de acceso y estado de suscripción. Antes del lanzamiento deberá reemplazarse la promesa absoluta “No recopilamos tu información personal” por una formulación verdadera, por ejemplo:

> Tus datos son tuyos. Solo usamos lo necesario para prestar el servicio.

La política de privacidad debe detallar qué se almacena, para qué, durante cuánto tiempo y cómo solicitar su eliminación.

## Decisiones pendientes antes de programar esta fase

- duración definitiva de la prueba;
- precio y moneda por mercado;
- proveedor de autenticación y backend;
- proveedor de cobros;
- política de vencimiento y conservación de configuraciones;
- canales de aviso antes del vencimiento;
- dominio donde se alojarán la API y el panel administrativo.
