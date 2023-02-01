import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyBvuWO3EXHVC3xZtkfuAaXdUvExJMMBQzQ",
    authDomain: "socidesk.firebaseapp.com",
    projectId: "socidesk",
    storageBucket: "socidesk.appspot.com",
    messagingSenderId: "566505599890",
    appId: "1:566505599890:web:ab84a24b3a88be385ac74b"
})

export const auth = firebase.auth();

auth.onAuthStateChanged((user) => {
    if (user) {
        const uid = user.uid;
        console.log("User is signed in");
        console.log(user)
        console.log(uid)
    } else {
        console.log("User is signed out");
    }
})