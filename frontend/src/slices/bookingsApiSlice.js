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
            invalidatesTags: ['Availability'],
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
        cancelBooking: builder.mutation({
            query: (bookingId) => ({
                url: `${BOOKINGS_URL}/${bookingId}/cancel`,
                method: 'PUT',
            }),
            invalidatesTags: ['Booking', 'Availability'],
        }),
        getBookings: builder.query({
            query: () => ({
                url: BOOKINGS_URL,
            }),
            providesTags: ['Booking'],
            keepUnusedDataFor: 5,
        }),
        confirmBooking: builder.mutation({
            query: (bookingId) => ({
                url: `${BOOKINGS_URL}/${bookingId}/confirm`,
                method: 'PUT',
            }),
            invalidatesTags: ['Booking'],
        }),
        deleteBooking: builder.mutation({
            query: (bookingId) => ({
                url: `${BOOKINGS_URL}/${bookingId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Booking'],
        }),
        completeExpiredBookings: builder.mutation({
            query: () => ({
                url: `${BOOKINGS_URL}/complete-expired`,
                method: 'PUT',
            }),
            invalidatesTags: ['Booking'],
        }),
       getTourAvailability: builder.query({
            query: ({ tourId, date }) => ({
                url: `${BOOKINGS_URL}/availability/${tourId}?date=${date}`,
            }),
            providesTags: ['Availability'],
        }),
        createTourReview: builder.mutation({
            query: ({ bookingId, rating, comment }) => ({
                url: `${BOOKINGS_URL}/${bookingId}/review`,
                method: 'POST',
                body: { rating, comment },
            }),
            invalidatesTags: ['Booking', 'Tour'],
        }),
    }),
});

export const {
    useCreateBookingMutation,
    useGetMyBookingsQuery,
    useGetBookingDetailsQuery,
    useCancelBookingMutation,
    useGetBookingsQuery,
    useConfirmBookingMutation,
    useDeleteBookingMutation,
    useCompleteExpiredBookingsMutation,
    useGetTourAvailabilityQuery,
    useCreateTourReviewMutation,
} = bookingsApiSlice;