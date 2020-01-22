import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyBa-oQs7PNe7ufifUol2SR6c2fv__KNdhw",
    authDomain: "crwn-db-5729f.firebaseapp.com",
    databaseURL: "https://crwn-db-5729f.firebaseio.com",
    projectId: "crwn-db-5729f",
    storageBucket: "crwn-db-5729f.appspot.com",
    messagingSenderId: "78113356718",
    appId: "1:78113356718:web:25aa0c103495894669263f",
    measurementId: "G-VM8X36RE3C"
};


export const createUserProfileDocument = async (userAuth,additionalData)=>{
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const {displayName,email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({displayName,email,createdAt,...additionalData})
        }catch(error){
            console.log(`Error Creating user ${error.message}`)
        }
    }
    return userRef;
}

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
