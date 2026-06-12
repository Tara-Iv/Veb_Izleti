//za cuvanje informacija o rezervacijama
//.filter - pravi novi niz u odnosu na uslov koji zadamo, u ovom slucaju uklanja rezervaciju sa odredjenim index-om

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookings: localStorage.getItem('bookings')
        ? JSON.parse(localStorage.getItem('bookings'))
        : [],
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        addBooking: (state, action) => {
            state.bookings.push(action.payload);
            localStorage.setItem('bookings', JSON.stringify(state.bookings));
        },
        cancelBooking: (state, action) => {
            state.bookings = state.bookings.filter((_, index) => index !== action.payload);
            localStorage.setItem('bookings', JSON.stringify(state.bookings));
        },
        clearAllBookings: (state) => {
            state.bookings = [];
            localStorage.removeItem('bookings');
        }
    }
});

export const { addBooking, cancelBooking, clearAllBookings } = bookingSlice.actions;

export default bookingSlice.reducer;