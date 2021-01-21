import firebase from 'firebase/app';
import 'firebase/auth';


const app = firebase.initializeApp({
    apiKey: "AIzaSyCHaQpuMa2fH8J98niwtPeD4s4V5K1cN8Q",
    authDomain: "auth-dev-82cae.firebaseapp.com",
    databaseURL: "https://auth-dev-82cae-default-rtdb.firebaseio.com",
    projectId: "auth-dev-82cae",
    storageBucket: "auth-dev-82cae.appspot.com",
    messagingSenderId: "379584520517",
    appId: "1:379584520517:web:9a98db554b28c8b626de2c"
})

export const auth = app.auth();
export default app;