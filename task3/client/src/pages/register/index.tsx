import React from 'react'
import Form from '../../components/form'
import { useSignUpMutation } from '../../services/auth';
import { showAlert } from '../../components/alert';

const RegisterPage = () => {
    const [signUp, { isLoading }] = useSignUpMutation();

    const fields = [
        {
            name: 'username',
            type: 'text',
            placeholder: 'Username or Email',
            label: 'username',
        },
        {
            name: 'name',
            type: 'text',
            placeholder: 'Full name',
            label: 'Full name',
        },
        {
            name: 'email',
            type: 'text',
            placeholder: 'Username or Email',
            label: 'Email',
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Enter your password',
            label: 'Password',
        }
    ]
    const initialState = {
        username: '',
        name: '',
        email: '',
        password: ''
    };

    const validations = {
        username: (value: any) => {
            if (!value) return 'Field username is required';
            return '';
        },
        name: (value: any) => {
            if (!value) return 'Field name is required';
            return '';
        },
        email: (value: string) => {
            if (!value) return 'Field email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email';
            return '';
        },
        password: (value: string) => {
            if (!value) return 'Field password is required';
            if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
                .test(value)) return 'password too weak';
            return '';
        },
    };

    const handleSubmit = async (values: any) => {
        await signUp(values).unwrap();
    };
    
    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <Form
                btnProps={{ title: 'Sign Up', disabled: isLoading }}
                formTitle='Sign Up'
                fields={fields}
                validations={validations}
                initialState={initialState}
                onSubmit={handleSubmit}
                navigateTo='/login'
                titleBackbtn='Login'
            />


        </div>
    )
}

export default RegisterPage