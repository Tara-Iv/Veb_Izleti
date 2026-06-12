//pravimo Redux store koji ce sadrzati globalno stanje aplikacije
//reduceri su funkcije koje menjaju stanje na osnovu akcija
//Uzmi vrednost iz apiSlice.reducerPath i koristi je kao ime ključa.
//middleware - funkcija koja se poziva pre nego sto akcija stigne do reducer-a, koristi se za logovanje, asinhrone akcije, itd.
//devTools - omogucava nam da koristimo Redux DevTools ekstenziju u browseru za pracenje stanja aplikacije

import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import authSliceReducer from './slices/authSlice';
import bookingSliceReducer from './slices/bookingSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        booking: bookingSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;