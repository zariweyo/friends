# Friends — reglas de producto

1. Una única foto por persona.
2. Sin likes: el contacto se inicia con un mensaje.
3. Destinatario acepta o rechaza el primer mensaje; chat solo tras aceptación.
4. Perfil mínimo: nombre, edad, población derivada de GPS y sexo. No publicar coordenadas precisas.
5. Filtros de búsqueda: sexo, orientación sexual, edad y distancia.
6. Modo invisible: oculto en resultados sin impedir buscar o escribir.
7. Lista de búsqueda sin swipe, ordenada combinando distancia y última conexión.
8. Filtros separados de quién puede enviar mensajes: edad, distancia y sexo.
9. Bloqueo privado y reversible de otras personas.
10. Visibilidad individual por localidades (p.ej. invisible en Sevilla).

## Cuestiones por definir

- Fórmula exacta de ordenación por proximidad/actividad.
- Reciprocidad entre filtros y tratamiento del contacto iniciado por usuarios invisibles.
- Edad mínima 18+, denuncias, prevención de acoso y protección frente a spam.
- Reglas Firestore/backend obligatorias para bloquear accesos, incluso manipulando el cliente.
- Protección RGPD de geolocalización y orientación sexual.

## Decisiones adicionales — 22 noviembre 2026
11. Buscar es la pantalla de inicio; no existe pestaña Inicio.
12. Filtros de búsqueda accesibles directamente desde Buscar.
13. Conversaciones tiene filtros propios.
14. Solicitudes permite seleccionar varias y rechazarlas de una vez.
15. Rechazos privados y direccionales: al rechazar por "No es mi tipo" o por primer mensaje, esa persona deja de salir en mi búsqueda. Si alguien me rechaza, también desaparece de mis resultados. Evitar ciclos de reaparición.
16. El botón "Dar otra oportunidad" de los filtros de Buscar permite volver a ver perfiles que **yo** rechacé; no levanta bloqueos ni rechazos recibidos.
17. En el prototipo no hay backend, por lo que el rechazo remoto solo puede simularse y el estado se pierde al recargar.

## Valoraciones — 22 noviembre 2026
18. Valoración de perfiles entre 1 y 5 estrellas, independiente de rechazar o contactar.
19. Una valoración por emisor y destinatario; se puede cambiar. Nunca autovaloración.
20. Mostrar media y número de votos, y en Mi perfil quién me valoró.
21. Filtrar búsqueda por media mínima y número mínimo de valoraciones.
22. Exigir media mínima y opcionalmente número mínimo de valoraciones para recibir primeros mensajes.
23. No atribuir media de cero a perfiles sin votos; los mínimos positivos los excluyen.
24. En producción, permisos, prevención de abuso y cálculo confiable deberán implementarse en backend.

25. Solo se puede valorar tras conversación aceptada en la que ambas personas hayan escrito al menos un mensaje. No basta aceptar, no vale solicitud sin respuesta o rechazada.
26. Misma regla para todos los sexos. Comentario opcional con la valoración; pendiente moderación y visibilidad.

## Denuncias y roles — 22 noviembre 2026
27. Roles: user, moderator, admin. Solo moderator/admin revisan denuncias; solo admin gestiona roles.
28. Denunciar perfiles y mensajes; motivos tipificados y descripción. Denuncias separadas de las valoraciones, sin penalización automática.
29. Estados de denuncia: pending, reviewing, resolved, dismissed. Registrar revisor y resolución.
30. Prototipo sin autorización real: proteger roles y denuncias en backend antes de producción; privacidad, auditoría, sanciones y apelaciones pendientes.

## Cierre de flujo — 22 noviembre 2026
31. Cualquier participante puede finalizar una conversación; queda archivada y de solo lectura. Si ambos han escrito, la valoración sigue permitida.
32. Rechazar solicitudes con o sin mensaje de cortesía (sin derecho a respuesta ni valoración). Rechazo múltiple sin mensaje.
33. Retirar solicitudes pendientes; límite inicial demo de cinco solicitudes activas.
34. Notificaciones internas y contador de no leídas; las notificaciones a otras cuentas requieren backend.
35. Bloquear impide contacto, cierra y archiva chats, sin borrar evidencia de denuncias. Desbloquear no reabre conversaciones.
36. No sancionar por dejar de responder. Limitar denuncias repetidas; moderación, apelaciones y controles de seguridad reales pendientes de backend.
