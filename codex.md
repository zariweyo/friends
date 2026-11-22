# Friends — contexto vivo y contrato de desarrollo

> **Obligatorio:** en cada cambio futuro del repositorio, leer este fichero antes de modificar código y **actualizarlo en el mismo commit** si se añaden, cambian o descartan decisiones, funcionalidades, modelos, navegación, limitaciones o estado técnico. No sustituir decisiones acordadas por suposiciones. Registrar fecha, alcance y estado. Mantener coherente `docs/product-rules.md`.

## Objetivo
Friends es una aplicación de citas minimalista, centrada en descubrir personas y enviar mensajes sin mecánicas de swipe, likes o matches. La privacidad y el control sobre quién descubre o contacta al usuario son prioritarios.

## Decisiones de producto (22 noviembre 2026)
1. **Una sola foto** por perfil; no hay galerías.
2. **Sin likes** ni corazones. El primer contacto es un mensaje.
3. **Solicitud de conversación**: el destinatario acepta o rechaza el primer mensaje. El chat solo se abre tras aceptar.
4. **Perfil mínimo**: nombre, edad, población obtenida por GPS y sexo. No exponer coordenadas precisas. La orientación sexual se configura en preferencias, no en la ficha pública.
5. **Preferencias de búsqueda**: sexo(s) buscado(s), orientación sexual, rango de edad y distancia máxima.
6. **Modo invisible global**: se puede explorar y escribir sin aparecer en resultados.
7. **Sin swipe**: descubrimiento como lista, ordenada combinando cercanía y última conexión. Algoritmo exacto pendiente.
8. **Filtros de recepción de mensajes independientes** de los filtros de búsqueda: sexo, edad y distancia. Se aplican al inicio de conversación.
9. **Bloqueo** privado y reversible: impedir descubrir o contactar mutuamente mientras dure el bloqueo.
10. **Visibilidad por localidad**: ocultarse ante personas de determinadas poblaciones, p. ej. Sevilla, manteniendo capacidad de explorar.
11. **Firestore** será el almacenamiento definitivo. **Todavía no integrarlo**. Usar JSON local de colecciones de prueba.
12. **Primera iteración**: bocetos funcionales de navegación, registro, perfil, filtros, visibilidad, descubrimiento, solicitudes y chats; priorizar flujo sobre estética.

## Arquitectura y despliegue
- Ionic Angular standalone, TypeScript, Capacitor, Firebase Authentication planificado, Firestore planificado.
- Repositorio: `zariweyo/friends`; rama principal `main`.
- GitHub Pages en `https://zariweyo.github.io/friends/` con base href `/friends/` y hash routing.
- Workflow `.github/workflows/deploy-pages.yml` **solo manual** (`workflow_dispatch`). No añadir push/cron/PR triggers sin petición expresa.
- En noviembre de 2026 el build falló porque `@ionic/angular@9` no exportaba `@ionic/angular/standalone`; se corrigió fijando `@ionic/angular` a `^8.7.0`. El usuario confirmó que ya compila.
- Login **fake** temporal; no hay autenticación real, no pedir ni validar contraseña. La sesión demo se guarda en `sessionStorage`.
- Firebase Authentication futuro: email/password, Google, Facebook y Apple. Los proveedores sociales necesitarán configuración externa y adaptadores nativos Capacitor en Android/iOS.
- No habilitar Firestore, Storage, Cloud Functions ni backend sin confirmación.
- Datos demo: `src/assets/mock/collections.json`, tipados y consumidos desde Angular mediante import JSON. Son datos ficticios; cambios de UI se guardan únicamente en memoria salvo sesión fake.
- Las fotos demo son imágenes de ejemplo remotas; no implican usuarios reales.

## Navegación del boceto
- `#/login`: acceso demo.
- `#/register`: formulario de alta de perfil demo.
- `#/home`: portada.
- `#/discover`: lista de personas con filtros y detalle.
- `#/requests`: solicitudes de primer mensaje, aceptar/rechazar.
- `#/chats`: chats de conversaciones aceptadas.
- `#/profile`: perfil propio, una foto, nombre, edad, población y sexo.
- `#/settings`: búsqueda, reglas de recepción, visibilidad global/localidades y bloqueos.
- Navegación común desde la zona autenticada.

## Contrato de datos provisional
Colecciones demo: `profiles`, `messageRequests`, `conversations`, `messages`, `cities`. Identificadores de documento string. Los modelos son preliminares, no un diseño definitivo de Firestore. El demo no garantiza seguridad ni persistencia.

## Seguridad y privacidad antes de producción
- App para mayores de 18 años, definir controles de edad, denuncias, prevención de spam y abuso.
- Reglas de Firestore y/o backend para autorizar lecturas, visibilidad, bloqueos, solicitudes y mensajes: **nunca confiar en filtros del cliente**.
- RGPD: geolocalización mínima, consentimiento y tratamiento especial de orientación sexual, políticas de conservación/borrado, evitar filtraciones de localidad/actividad.
- Revisar visibilidad del perfil en solicitudes y chats existentes; definir reciprocidad de filtros.
- La ubicación demo es simulada y no solicita permiso GPS.

## Pendientes
- Ordenación exacta distancia/última conexión.
- Diseño visual definitivo y onboarding.
- Esquema Firestore definitivo, índices, reglas y backend para filtros.
- Auth real y gestión de cuenta.
- Almacenamiento de fotos y geolocalización.
- Notificaciones, denuncias y moderación.

## Historial
- 2026-11-22: scaffold Ionic Angular y Firebase planificado; login fake, portada, GitHub Pages manual.
- 2026-11-22: corregida dependencia Ionic a ^8.7.0; usuario confirma build.
- 2026-11-22: boceto de pantallas y datos JSON demo; Firestore pospuesto.
