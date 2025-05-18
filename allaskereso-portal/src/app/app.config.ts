import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({ 
      projectId: "webfejl-7977f", 
      appId: "1:968397338432:web:c49186eef3af7ed31f6ca5", 
      storageBucket: "webfejl-7977f.firebasestorage.app", 
      apiKey: "AIzaSyCPbWx9lYWCo0xPmXChwAhBBvDt3n8jeHQ", 
      authDomain: "webfejl-7977f.firebaseapp.com",
      messagingSenderId: "968397338432" })), 
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "webfejl-7977f", appId: "1:968397338432:web:c49186eef3af7ed31f6ca5", storageBucket: "webfejl-7977f.firebasestorage.app", apiKey: "AIzaSyCPbWx9lYWCo0xPmXChwAhBBvDt3n8jeHQ", authDomain: "webfejl-7977f.firebaseapp.com", messagingSenderId: "968397338432" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
    ]
};
