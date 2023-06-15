

import {
    signInWithGooglePopup,
    createUserFromAuth
} from '../../utils/firebase/firebase.utils';

import './authentication.style.scss';

import SignUp from "../sign-up/sign-up.component";
import SignIn from "../sign-in/sign-in.component";

const Authentication = () => {

    /*
    useEffect(() => {

        const signInRedirect = async() => {

            let response = await getRedirectResult(auth);
            
            if(response){
                let createdUser = await createUserFromAuth(response.user);
                console.log(createdUser);
            }
        }

        signInRedirect();

    },[]);
    */

    return (
        <div className="authentication-container">
            <SignIn />
            <SignUp />
        </div>
    );
}

export default Authentication;