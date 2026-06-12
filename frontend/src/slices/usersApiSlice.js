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
                url: `${USERS_URL}/auth`,
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
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
} = usersApiSlice;