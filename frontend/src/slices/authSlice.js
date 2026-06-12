//čuva informacije o ulogovanom korisniku
//initialState - kako UI izgleda kada aplikacija startuje, proverava ako je korisnik ranije loginovan, učitaj ga iz localStorage-a
//setCredentials - reducer koji postavlja userInfo u state i localStorage
//action.payload - podaci koje dobijemo od API-ja nakon uspešne prijave (npr. token, ime, email, itd.)
//logout - reducer koji brise userInfo iz state-a i localStorage

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo')) 
        : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;