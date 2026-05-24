//pokriva kreiranje nove rezervacije, pregled svih rezervacija 
// ulogovanog korisnika i detalje jedne rezervacije

import { apiSlice } from './apiSlice';
import { BOOKINGS_URL } from '../constants';

export const bookingsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (data) => ({
                url: BOOKINGS_URL,
                method: 'POST',
                body: data,
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