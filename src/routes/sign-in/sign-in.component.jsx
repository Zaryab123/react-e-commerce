
import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';

import { 
    auth, 
    signInWithGooglePopup, 
    signInWithGoogleRedirect, 
    createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {


    useEffect(() => {

        const getAuthResult = async () => {
            let response  = await getRedirectResult(auth);

            if(response){
                  
                    await createUserDocumentFromAuth(response.user);
            }
        }
        
        getAuthResult();
    }, []);

    const logGoogleUser = async () => {

        const { user } = await signInWithGooglePopup();
        const loggedInUser = await createUserDocumentFromAuth(user);

        console.log(loggedInUser);
    }

    return (
        <div>
            <h1>Sign In Button</h1>

            <button onClick={logGoogleUser}>
                Login With Google Popup
            </button>
            <button onClick={signInWithGoogleRedirect}>
                Login With Google Redirect
            </button>
        </div>
    );
}

export default SignIn;