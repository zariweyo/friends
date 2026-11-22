import { FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const options: FirebaseOptions = { apiKey: 'REPLACE_ME', authDomain: 'REPLACE_ME.firebaseapp.com', projectId: 'REPLACE_ME', appId: 'REPLACE_ME' };
export const firebaseConfigured = options.apiKey !== 'REPLACE_ME';
export const firebaseApp = getApps().length ? getApp() : initializeApp(options);
export const firebaseAuth = getAuth(firebaseApp);
