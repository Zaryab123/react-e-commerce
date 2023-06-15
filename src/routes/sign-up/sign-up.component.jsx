
import { useState } from "react";
import { 
    createAuthUserUsingEmailAndPassword,
    createUserFromAuth } from '../../utils/firebase/firebase.utils';

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import './sign-up.style.scss';

const defaultFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {

    const [formFields, setFormFields] = useState(defaultFields);

    const onSubmitHandler = async (event) => {

        event.preventDefault();

        if(password !== confirmPassword){
            alert("Password and Confirm Password doesn't match");
            return;
        }

        try{

            let {user} = await createAuthUserUsingEmailAndPassword(email,password);
            await createUserFromAuth(user,{displayName});
            resetFormFields();

        }catch(error){

            switch(error.code){
                case "auth/weak-password":
                    alert("Password should be at least 6 characters");
                    break;
                case "auth/email-already-in-use":
                    alert("Email Already Registered, Use Another Email");
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

    const {
        displayName,
        email,
        password,
        confirmPassword
    } = formFields;

    const formFieldsData = [
        {
            id: 1,
            label: "Display Name",
            formProps: { type:"text", name:"displayName", onChange:onChangeHandler, value:displayName, required:true }
        },
        {
            id: 2,
            label: "Email",
            formProps: { type:"email", name:"email", onChange:onChangeHandler, value:email, required:true }
        },
        {
            id: 3,
            label: "Password",
            formProps: { type:"password", name:"password", onChange:onChangeHandler, value:password, required:true }
        },
        {
            id: 4,
            label: "Confirm Password",
            formProps: { type:"password", name:"confirmPassword", onChange:onChangeHandler, value:confirmPassword, required:true }
        },
    
    ]

   return (
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={onSubmitHandler}>

            {
                formFieldsData.map(formField => {
                   return <FormInput key={formField.id} label={formField.label} formProps={formField.formProps} />
                })
            }

            <Button buttonProps={{
                type:"submit"
            }}>
                SIGN UP
            </Button>
        </form>
    </div>
   )
}

export default SignUp;