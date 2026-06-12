//pokriva kreiranje nove rezervacije, pregled svih rezervacija 
//ulogovanog korisnika i detalje rezervacija
//createBooking - koristi se za kreiranje nove rezervacije, šalje POST zahtev sa podacima o rezervaciji
//builder.mutation - koristi se za operacije koje menjaju podatke (npr. kreiranje, brisanje, ažuriranje), dok se builder.query koristi za dobijanje podataka
//getMyBookings - koristi se za dobijanje svih rezervacija koje je korisnik napravio, šalje GET zahtev
//getBookingDetails - koristi se za dobijanje detalja jedne rezervacije, šalje GET zahtev sa ID-jem rezervacije

//query - get
//mutation - post, put, delete

import { apiSlice } from './apiSlice';
import { BOOKINGS_URL } from '../constants';

export const bookingsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (data) => ({
                url: BOOKINGS_URL,
                method: 'POST',
                body: data,  //podaci koji se salju backendu
            }),
        }),
        getMyBookings: builder.query({
            query: () => ({
                url: `${BOOKINGS_URL}/mybookings`,
            }),
            providesTags: ['Booking'],
            keepUnusedDataFor: 5,
        }),
        getBookingDetails: builder.query({
            query: (bookingId) => ({
                url: `${BOOKINGS_URL}/${bookingId}`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const {
    useCreateBookingMutation,
    useGetMyBookingsQuery,
    useGetBookingDetailsQuery,
} = bookingsApiSlice;