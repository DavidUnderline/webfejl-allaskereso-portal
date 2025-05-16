import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "webfejl-allaskereso-portal", appId: "1:841692814098:web:add1e85196c21f66e5f1cb", storageBucket: "webfejl-allaskereso-portal.firebasestorage.app", apiKey: "AIzaSyBRLZr978xLiet5cxDctSCWqRo90cZJASs", authDomain: "webfejl-allaskereso-portal.firebaseapp.com", messagingSenderId: "841692814098" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
