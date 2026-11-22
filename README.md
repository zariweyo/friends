# Friends

Aplicación Ionic + Angular standalone + Capacitor. Prototipo web publicado en GitHub Pages.

## Estado actual

**Autenticación simulada**: el botón Entrar abre la portada y Logout vuelve al login. No hay Firebase activo ni se solicitan credenciales. El estado demo dura la sesión de la pestaña (sessionStorage). No usar este guard como seguridad real.

Las carpetas de futuras funcionalidades y los modelos siguen presentes, pero las rutas visibles del prototipo son únicamente login y home.

## Desarrollo local

```bash
npm install
npm start
```

## GitHub Pages (despliegue exclusivamente manual)

1. Ir a **Settings → Pages** y elegir **GitHub Actions** como fuente de publicación.
2. Ir a **Actions → Build and deploy GitHub Pages → Run workflow** y seleccionar `main`.
3. El workflow compila con `--base-href /friends/` y despliega el directorio `www/browser`.
4. Una vez desplegado, la web estará en https://zariweyo.github.io/friends/

No hay triggers de push, pull_request ni programación. Se utiliza routing hash para soportar recargas en GitHub Pages.

## Próximas fases

Configurar Firebase Authentication real con Email/Password, Google, Facebook y Apple; añadir integración nativa para Capacitor. Los futuros módulos están documentados en `docs/product-rules.md`.

> GitHub Pages es alojamiento estático: no ofrece backend seguro ni autenticación por sí mismo.
