import api from './api';

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  password?: string;
 
};

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => '/api/v1/auth/whoami',
      providesTags: ['User']
    })
  })
});

export const { useGetCurrentUserQuery } = userApi;
