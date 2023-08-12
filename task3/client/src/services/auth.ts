import api from './api';
import { User } from './user';

export type CredentialsType = {
    username: string;
    password: string;
};

export type AuthResponse = {
    user: User;
    token: string;
};

export const authAPI = api.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<AuthResponse, CredentialsType>({
            query: (credentials) => ({
                url: '/api/v1/auth/login',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ['Auth']
        }),
        signUp: builder.mutation<void, void>({
            query: (credentials) => ({
                url: '/api/v1/auth/signup',
                method: 'POST',
                body: credentials

            }),
            invalidatesTags: ['Auth']
        })
    })
});

export const { useSignInMutation, useSignUpMutation } = authAPI;
