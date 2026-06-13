//API pozivi za izlete — getTours vraća listu svih izleta, 
// a getTourDetails vraća detalje jednog izleta.

import { apiSlice } from './apiSlice';
import { TOURS_URL } from '../constants';

export const toursApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTours: builder.query({
            query: () => ({
                url: TOURS_URL,
            }),
            providesTags: ['Tour'],
            keepUnusedDataFor: 5,
        }),
        getTourDetails: builder.query({
            query: (tourId) => ({
                url: `${TOURS_URL}/${tourId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createTour: builder.mutation({
            query: (data) => ({
                url: TOURS_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Tour'],
        }),
        updateTour: builder.mutation({
            query: (data) => ({
                url: `${TOURS_URL}/${data._id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Tour'],
        }),
        deleteTour: builder.mutation({
            query: (tourId) => ({
                url: `${TOURS_URL}/${tourId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tour'],
        }),
    }),
});

export const {
    useGetToursQuery,
    useGetTourDetailsQuery,
    useCreateTourMutation,
    useUpdateTourMutation,
    useDeleteTourMutation,
} = toursApiSlice;