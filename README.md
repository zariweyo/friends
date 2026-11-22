# Friends

App de citas minimalista con **Ionic, Angular standalone, Capacitor y Firebase Authentication**.

## Arranque local

```bash
npm install
npm start
```

Antes del login, editar `src/app/core/firebase/firebase.config.ts` con la configuración de tu **Firebase Web App**.

## Firebase Authentication

En Firebase Console, activar los proveedores **Email/Password, Google, Facebook y Apple**. Registrar dominios autorizados. Facebook requiere configuración de Meta Developers; Apple requiere Apple Developer y sus credenciales OAuth. Nunca subir secretos privados a GitHub.

Esta estructura implementa email/password y los botones OAuth vía `signInWithPopup` para **web**. Para Android/iOS nativos falta integrar un adaptador Capacitor de login social con SDK nativo. Los métodos no funcionarán hasta configurar Firebase y cada proveedor.

## Preparación de Capacitor

```bash
npm run build
npx cap add android
npx cap add ios
npx cap sync
```

Cambiar `com.example.friends` por el ID definitivo antes de publicar. Las carpetas nativas se generarán más adelante.

## Organización

- `src/app/core`: configuración Firebase, servicio de sesión, guards y modelos.
- `src/app/features/auth`: login y registro.
- `src/app/features/discover`: descubrimiento.
- `src/app/features/requests`: peticiones de conversación.
- `src/app/features/chats`: chats.
- `src/app/features/profile`: perfil.
- `src/app/features/settings`: privacidad y filtros.
- `docs/product-rules.md`: decisiones de producto.

Es **solo la estructura inicial**: no incluye implementación de backend de perfiles, GPS, Firestore, almacenamiento, chat ni privacidad server-side. Compilación no verificada en esta entrega.
