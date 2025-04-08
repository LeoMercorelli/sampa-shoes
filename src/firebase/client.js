import {initializeApp} from "firebase/app"

import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {

    // Aca va el objeto que nos da Firebase:

    apiKey: "AIzaSyCTw5btJdmFR71zaWaNfLAmjYXJmj7nIH4",
    authDomain: "pryoect-react.firebaseapp.com",
    projectId: "pryoect-react",
    storageBucket: "pryoect-react.firebasestorage.app",
    messagingSenderId: "112694110566",
    appId: "1:112694110566:web:228b796bf97a4dfe4bc0a7"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);