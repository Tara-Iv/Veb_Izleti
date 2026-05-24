//za cuvanje informacija o rezervacijama

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookingInfo: localStorage.getItem('bookingInfo')
        ? JSON.parse(localStorage.getItem('bookingInfo'))
        : null,
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookingInfo: (state, action) => {
            state.bookingInfo = action.payload;
            localStorage.setItem('bookingInfo', JSON.stringify(action.payload));
        },
        clearBookingInfo: (state) => {
            state.bookingInfo = null;
            localStorage.removeItem('bookingInfo');
        }
    }
});

export const { setBookingInfo, clearBookingInfo } = bookingSlice.actions;

export default bookingSlice.reducer;