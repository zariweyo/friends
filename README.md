# Friends

Ionic + Angular standalone + Capacitor. Prototipo de app de citas, con navegación y datos JSON ficticios.

**Leer y mantener actualizado [codex.md](codex.md) en todos los cambios de decisiones o funcionalidades.** Las reglas de producto también están en [docs/product-rules.md](docs/product-rules.md).

## Estado
- Login y registro fake; sin Firebase Authentication activo.
- Pantallas de portada, búsqueda, detalle, solicitudes, chats, perfil y ajustes.
- Colecciones demo en `src/assets/mock/collections.json`; sin Firestore, backend ni persistencia de datos de usuario.
- Imágenes de ejemplo desde pravatar.cc; dependen de conexión a Internet.
- Cambios en perfiles, solicitudes, filtros y chats solo en memoria.
- Distancia y última conexión simuladas; aún no hay GPS.
- Las restricciones de visibilidad y recepción de mensajes no son seguridad real; no usar en producción.

## Desarrollo
```bash
npm install
npm start
```

## Despliegue exclusivamente manual
1. Configurar **Settings → Pages → Source: GitHub Actions**.
2. En **Actions → Build and deploy GitHub Pages → Run workflow**, seleccionar main.
3. Web: https://zariweyo.github.io/friends/

El workflow usa `workflow_dispatch` sin triggers automáticos, compila con `--base-href /friends/` y despliega `www/browser`. El routing utiliza hashes para funcionar en Pages.

## Futuro
Firebase Authentication (email/password, Google, Facebook, Apple), Firestore, reglas de seguridad, fotos y geolocalización real. No implementados aún.
