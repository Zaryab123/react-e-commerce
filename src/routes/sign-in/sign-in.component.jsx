
import { useState } from "react";

import { 
    signInUserUsingEmailAndPassword,
    signInWithGooglePopup,
    createUserFromAuth } from '../../utils/firebase/firebase.utils';

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import './sign-in.style.scss';

const defaultFields = {
    email: '',
    password: ''
}

const SignIn = () => {

    const [formFields, setFormFields] = useState(defaultFields);

    const onSubmitHandler = async (event) => {

        event.preventDefault();

        try{

            let {user} = await signInUserUsingEmailAndPassword(email,password);
            console.log(user);
            resetFormFields();

        }catch(error){

            switch(error.code){
                case "auth/wrong-password":
                    alert("Please provide a correct password");
                    break;
                case "auth/user-not-found":
                    alert("No User Exists Against This Email");
                    break;
                case "auth/network-request-failed":
                    alert("Netowrk issue while quering db");
                    break;
                default:
                    console.log("Error while creating user ", error);
            }
            
        }

    }

    const resetFormFields = () => {

        setFormFields(defaultFields);
    }

    const onChangeHandler = (event) => {

        const { name, value } = event.target;

        setFormFields({...formFields, [name]:value});
    }

    const googlePopUpSignIn = async () => {
        
        let { user } = await signInWithGooglePopup();
        let createdUser = await createUserFromAuth(user);
    }

    const {
        email,
        password
    } = formFields;

    const formFieldsData = [
        {
            id: 1,
            label: "Email",
            formProps: { type:"email", name:"email", onChange:onChangeHandler, value:email, required:true }
        },
        {
            id: 2,
            label: "Password",
            formProps: { type:"password", name:"password", onChange:onChangeHandler, value:password, required:true }
        }
    
    ]

    const buttonFields = [
        {
            id: 1,
            buttonType: '',
            buttonProps: {
                type: 'submit'
            },
            children: 'Sign In'
        },
        {
            id: 2,
            buttonType: 'google',
            buttonProps: {
                type: 'button',
                onClick: googlePopUpSignIn
            },
            children: 'Google Sign In'
        }
    ]

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={onSubmitHandler}>
            {
                formFieldsData.map(formField => {
                    return <FormInput key={formField.id} label={formField.label} formProps={formField.formProps} />
                })
            }
            <div className="buttons-container">
                {
                    buttonFields.map(buttonField => {
                        return (<Button key={buttonField.id}
                            buttonType={buttonField.buttonType}
                            buttonProps={buttonField.buttonProps}
                        >{ buttonField.children }</Button>)
                    })
                }
            </div>
            </form>
        </div>
    );
}

export default SignIn;