import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

export default defineNuxtPlugin(async nuxtApp => {

    const firebaseConfig = {
        apiKey: "AIzaSyCpxUO961WqrGUVEB3QcjhGJ852qPyYzn8",
        authDomain: "polihack-beab6.firebaseapp.com",
        projectId: "polihack-beab6",
        storageBucket: "polihack-beab6.appspot.com",
        messagingSenderId: "764787793799",
        appId: "1:764787793799:web:c0cd345f81651a15263d22",
        measurementId: "G-5LNSMTS433"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app)
    const analytics = getAnalytics(app);

    nuxtApp.vueApp.provide('auth', auth);
    nuxtApp.provide('auth', auth);

    nuxtApp.vueApp.provide('db', db);
    nuxtApp.provide('db', db);

    await initializeUser();
  })