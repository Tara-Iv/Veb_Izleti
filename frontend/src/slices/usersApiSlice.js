//pokriva sve što korisnik može da radi — prijava, registracija, odjava i upravljanje profilom.
//login, post: salje login podatke serveru i obradjuje zahtev za prijavu
//profile, get: dobija informacije o profilu sa servera od ulogovanog korisnika
//updateProfile, put: salje azurirane podatke profila serveru

import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        getProfile: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        getUserById: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data._id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation,
} = usersApiSlice;