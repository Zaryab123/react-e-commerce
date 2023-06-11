// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//Auth From Firebase
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider
} from 'firebase/auth'

//DB Setup
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqx4tjBMOccVAwN6gbnH91ZHLl6SnFjsw",
  authDomain: "ecommerce-clothing-db-ca128.firebaseapp.com",
  projectId: "ecommerce-clothing-db-ca128",
  storageBucket: "ecommerce-clothing-db-ca128.appspot.com",
  messagingSenderId: "850637467269",
  appId: "1:850637467269:web:c1aed447984636864583ec"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuthData) => {
    
    //Getting the unique reference to check whether user exists in users collection using uid. 
    let userDocument = await doc(db, 'users', userAuthData.uid);

    //Now, since we have reference, we can use reference to get the relavant record from document
    let userSnapShot = await getDoc(userDocument);

    //If user doesn't exist then create one
    if(!userSnapShot.exists()){

        let { displayName, email } = userAuthData;
        let createdAt = new Date();

        try{

            let createUser = await setDoc(userDocument, {
                displayName,
                email,
                createdAt
            });

            return createUser;

        }catch(error){
            console.log("Error while creating User ", error);
        }
        
    }

    return userSnapShot;
}