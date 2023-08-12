import React, { useEffect } from 'react'
import './styles.css'
import Form from '../../components/form'
import { CredentialsType, useSignInMutation } from '../../services/auth';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [signIn] = useSignInMutation();
    const currentUser = useSelector((state: RootState) => state.auth.user); 
    const navigate = useNavigate();

    const fields = [
        {
            name: 'username',
            type: 'text',
            placeholder: 'Username',
            label: 'username',
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
        password: ''
    };

    const validations = {
 
        username: (value: string) => {
            if (!value) return 'El username or email is required';
            return '';
        },
        password: (value: string) => {
            if (!value) return 'El password is required';
            return '';
        },
    };

    const handleSubmit = async (values: any) => {
        await signIn(values).unwrap();
    };

    useEffect(() => {
        if (currentUser) {
            navigate('/home');
        }
    }, [navigate, currentUser]);
    return <>
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>
        <Form
            btnProps={{ title: 'Log In' }}
            fields={fields}
            validations={validations}
            initialState={initialState}
            onSubmit={handleSubmit}
            navigateTo='/register'
            titleBackbtn='Register'
        />    
        
        </>
}
export default LoginPage