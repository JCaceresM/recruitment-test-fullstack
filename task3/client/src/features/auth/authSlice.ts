/* eslint-disable no-param-reassign */
import { AsyncThunk, createAction, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { authAPI } from '../../services/auth';
import { User } from '../../services/user';
import { showAlert } from '../../components/alert';
export const TOKEN = "TOKEN"
export const USER_INFO = "USER_INFO"

export type AuthState = {
    token?: string;
    user: User | null;
};

const executeQuery = createAction('baseApi/executeQuery');

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

const initialState: AuthState = {
    user: localStorage.getItem(USER_INFO) === 'undefined'
        ? null
        : JSON.parse(localStorage.getItem(USER_INFO) as string) || null,
    token: localStorage.getItem(TOKEN) || '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, { payload }) => {
            state.token = payload;
        },
        resetToken: (state, ) => {
            state.token = '';
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(executeQuery, () => { })
            .addMatcher(
                (action): action is RejectedAction => action.type.endsWith('/rejected'),
                (state, data) => {
                    const payloadData = data.payload as  { message: string }
                    showAlert({ message: payloadData?.message, type: 'error', onClose: () => { } });
                }
            );

        builder
            .addMatcher(authAPI.endpoints.signIn.matchFulfilled, (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.user;
                localStorage.setItem(TOKEN, payload.token);
                localStorage.setItem(USER_INFO, JSON.stringify(payload.user));

            }).addMatcher(authAPI.endpoints.signUp.matchFulfilled, (state, data) => {
                state.token = '';
                state.user = null;
                localStorage.removeItem(TOKEN);
                localStorage.removeItem(USER_INFO);
                    showAlert({ message: 'Could no create', type: 'success', onClose: () => { } });

            });
    }
});

export const { setToken, resetToken } = authSlice.actions;
export default authSlice.reducer;
