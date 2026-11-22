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

## Decisiones adicionales (22 noviembre 2026)
13. **Buscar es el home**: eliminar Inicio del menú, redirigir la ruta antigua /home a /discover.
14. **Filtros de búsqueda dentro de Buscar**, no obligar a ir a Ajustes.
15. **Filtros de conversaciones**: búsqueda por nombre y opciones de listado; no inventar estados de lectura inexistentes.
16. **Rechazo múltiple de solicitudes** mediante selección de varias y acción de rechazo en lote.
17. **Rechazos direccionales**: al rechazar a alguien, no debe aparecer más en las búsquedas del usuario que rechazó; si otra persona me rechaza, tampoco debe aparecerme a mí. No mostrar repetidamente perfiles descartados.
18. **Dos motivos de rechazo**: marcar "No es mi tipo" desde Buscar, o rechazar su primer mensaje. Ambos se guardan como rechazo del usuario hacia esa persona.
19. **Dar otra oportunidad**: control en filtros de Buscar para volver a mostrar perfiles rechazados por mí. Nunca anula rechazos que otros me hicieron ni bloqueos.
20. **Boceto sin backend**: los rechazos del otro lado no pueden conocerse realmente; se prevé `rejectedMe` en modelo demo para probar el caso. No afirmar reciprocidad segura en producción sin backend.

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
- `#/home`: redirección a búsqueda; se elimina la portada Inicio.
- `#/discover`: home principal, lista de personas con filtros en la propia pantalla y detalle.
- `#/requests`: solicitudes de primer mensaje, aceptar/rechazar individualmente o rechazar varias marcadas.
- `#/chats`: chats de conversaciones aceptadas, con filtros de nombre y orden; no leídos pendiente de modelo real.
- `#/profile`: perfil propio, una foto, nombre, edad, población y sexo.
- `#/settings`: búsqueda, reglas de recepción, visibilidad global/localidades y bloqueos.
- Navegación común desde la zona autenticada.

## Contrato de datos provisional
Colecciones demo: `profiles`, `messageRequests`, `conversations`, `messages`, `cities`. Estado de rechazo demo: `rejectedByMe` (map persona -> motivo), `rejectedMe` (IDs de quienes rechazaron al usuario), `secondChance` (opción de visualización). En Firestore deberán modelarse eventos de rechazo privados y direccionales. Identificadores de documento string. Los modelos son preliminares, no un diseño definitivo de Firestore. El demo no garantiza seguridad ni persistencia.

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
- 2026-11-22: Buscar pasa a home; filtros en Buscar y Conversaciones; rechazo múltiple, descarte por tipo/mensaje, exclusión de rechazados y opción Dar otra oportunidad.

## Valoraciones por estrellas — 22 noviembre 2026
21. Un usuario puede valorar a otro con un número entero de **1 a 5 estrellas**, independientemente de que le envíe un mensaje, acepte, rechace o marque "No es mi tipo". La valoración no elimina el rechazo.
22. **Una valoración por pareja direccional** `fromId -> toId`; el usuario puede modificar la suya, no acumular votos. No se permite autovaloración.
23. Se muestran **media aritmética** y **número de valoraciones**. Los perfiles sin votos no tienen una media real: se representan como "sin valorar", no como 0 estrellas. Los filtros de mínimo positivo de estrellas los excluyen.
24. Buscar incorpora filtros independientes de **media mínima de estrellas** y **número mínimo de valoraciones**; también se reflejan en Ajustes.
25. En Mi perfil se muestra el listado de **quién me valoró y con cuántas estrellas**, además de la media y el total.
26. Los filtros de recepción de mensajes incorporan **media mínima del remitente** y **número mínimo de valoraciones**; ejemplo: 3 estrellas. En demo se filtran las solicitudes entrantes; en producción se validará el requisito antes de enviar.
27. Los votos demo viven en la colección JSON `ratings` (`id,fromId,toId,stars`). Cambios solo en memoria. Las medias se calculan, no se guardan en perfiles.
28. Pendiente: decidir si las valoraciones son públicas, cómo evitar votaciones abusivas, quién puede valorar, cómo moderar y cómo auditar fraude; antes de producción se necesitarán reglas de seguridad y validación backend.

## Historial adicional
- 2026-11-22: sistema de valoraciones 1-5, medias y recuentos, quién me valoró, filtros por reputación en búsqueda y recepción de mensajes.

## Requisito para valorar — 22 noviembre 2026
29. **Solo pueden valorar los dos participantes de una conversación aceptada cuando ambos han enviado al menos un mensaje en ella.** No se exige un número mayor de mensajes; la aceptación por sí sola no basta.
30. Solicitudes pendientes, rechazadas o sin respuesta no dan derecho a valorar. La misma regla se aplica a todos los sexos.
31. La valoración es de 1–5 estrellas con comentario opcional (máximo 500 caracteres en el boceto). La valoración es independiente del rechazo o bloqueo. Los comentarios demo se guardan en memoria.
32. Los datos ficticios de ratings se han reducido a la pareja con conversación y respuesta recíproca, para no mostrar valoraciones incompatibles con la regla.
33. **Pendiente de producción:** verificar el requisito en backend y garantizar que una conversación no pueda falsificarse; decidir publicación, moderación y derecho de revisión de comentarios. El prototipo no ofrece todavía un mecanismo para publicar comentarios de terceros.

## Historial adicional
- 2026-11-22: valoraciones habilitadas únicamente tras conversación aceptada con mensajes de ambas partes; comentario opcional.
