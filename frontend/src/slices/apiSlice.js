//kreiramo apiSlice koji ce sadrzati sve API pozive koje aplikacija koristi
//fetchBaseQuery - funkcija koja definise osnovni nacin komunikacije sa API-jem
//createApi - funkcija koja kreira API slice
//BASE_URL - pocetna URL adresa naseg backend servera
//tagTypes - za refresovanje podataka, kada se doda novi tour, svi tour-ovi ce biti ponovo ucitani

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Tour', 'Booking', 'User'],
    endpoints: (builder) => ({}),
});