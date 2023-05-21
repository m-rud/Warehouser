import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD8XfkFjdZ_ishx-OBDNDsyu3JIiXkFllw",
    authDomain: "magazyn-9e5eb.firebaseapp.com",
    databaseURL: "https://magazyn-9e5eb-default-rtdb.firebaseio.com",
    projectId: "magazyn-9e5eb",
    storageBucket: "magazyn-9e5eb.appspot.com",
    messagingSenderId: "176736615162",
    appId: "1:176736615162:web:4c4294f4a5a9fa622e2743",
    measurementId: "G-GGGNV4HCE6"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
