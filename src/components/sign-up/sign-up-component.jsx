import React from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-up.styles.scss';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';


export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    
    handleSubmit = async event => {
        alert("hh")
        const { displayName, email, password, confirmPassword } = this.state
        event.preventDefault();
        if(password!==confirmPassword){
            alert("Password doesn't match")
            return;
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            createUserProfileDocument(user,{displayName});

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        }catch(error){
            console.log(error)
        }
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state
        return (
            <div className="sign-up">
                <h2 className="title">I do not have a account</h2>
                <span>Sign up with your email and password</span>

                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput name='displayName' type='text'
                        value={displayName} required
                        handleChange={this.handleChange}
                        label="Display Name"
                    />
                    <FormInput name='email' type='email'
                        value={email} required
                        handleChange={this.handleChange}
                        label="Email"
                    />
                    <FormInput name='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        required
                        handleChange={this.handleChange}
                        label="Confirm Password"
                    />

                    <FormInput name='password'
                        type='password'
                        value={password}
                        required
                        handleChange={this.handleChange}
                        label="Password"
                    />
                    <div className="buttons">
                        <CustomButton onSubmit = {this.handleSubmit} type='submit' value='Submit Form'>
                            SIGN UP
                      </CustomButton>
                    </div>
                </form>

            </div>
        )
    }
}