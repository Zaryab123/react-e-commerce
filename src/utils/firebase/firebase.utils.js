
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//Auth functions
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

//DB functions
import {
    doc,
    getDoc,
    setDoc,
    getFirestore
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm5Z9xwOmA16m85Wv4AFYsH8q8hUx0bQ8",
  authDomain: "e-commerce-db-4f284.firebaseapp.com",
  projectId: "e-commerce-db-4f284",
  storageBucket: "e-commerce-db-4f284.appspot.com",
  messagingSenderId: "639927537406",
  appId: "1:639927537406:web:dd5d1b22cf916486985faf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

//Auth Setup
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>  signInWithRedirect(auth, provider);

export const createAuthUserUsingEmailAndPassword = async (email, password) => {

    if(!email || !password){
        alert("Email and Password not provided");
        return;
    }

    return await createUserWithEmailAndPassword(auth, email, password);

}

export const signInUserUsingEmailAndPassword = async (email, password) => {

    if(!email || !password){
        alert("Email and Password not provided");
        return;
    }

    return await signInWithEmailAndPassword(auth, email, password);

}

//DB Setup
export const db = getFirestore();

export const createUserFromAuth = async (userAuthData, additionalData = {}) => {

    if(!userAuthData) return;

    //Get the document structure of Auth user.
    let userDocumentRef = await doc(db,'users', userAuthData.uid);

    //Once we have user document, now search for exact user
    let searchUser = await getDoc(userDocumentRef);


    if(!searchUser.exists()){

        let { displayName, email } = userAuthData;
        let createdAt = new Date();

        try{

            await setDoc(userDocumentRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });

        }catch(error){

            console.log("Error while creating user from Auth Data ", error);
        }
    }
}



