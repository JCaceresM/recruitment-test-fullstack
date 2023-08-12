import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store.js';


const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_REACT_APP_API_URL as string,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const { token } = (getState() as RootState).auth;
    if (token) { 
      headers.set('Authorization', `bearer ${token}`);
    }
    return headers;
  }
});

const api = createApi({

  baseQuery,

  tagTypes: [
    'Auth',
    'User',
    'Product',
  ],

  endpoints: () => ({})
});

export default api;
