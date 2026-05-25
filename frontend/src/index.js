//govori nam koje URL putanje vode do kojih screen-ova

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import HomeScreen from './screens/HomeScreen';
import ToursScreen from './screens/ToursScreen';
import TourScreen from './screens/TourScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AboutScreen from './screens/AboutScreen';
import BookingScreen from './screens/BookingScreen';
import MyBookingsScreen from './screens/MyBookingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminToursScreen from './screens/AdminToursScreen';
import AdminBookingsScreen from './screens/AdminBookingsScreen';
import AdminUsersScreen from './screens/AdminUsersScreen';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path='/' element={<HomeScreen />} />
            <Route path='/tours' element={<ToursScreen />} />
            <Route path='/tours/:id' element={<TourScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/about' element={<AboutScreen />} />

            <Route path='' element={<PrivateRoute />}>
                <Route path='/booking/:id' element={<BookingScreen />} />
                <Route path='/mybookings' element={<MyBookingsScreen />} />
                <Route path='/profile' element={<ProfileScreen />} />
            </Route>

            <Route path='' element={<AdminRoute />}>
                <Route path='/admin/tours' element={<AdminToursScreen />} />
                <Route path='/admin/bookings' element={<AdminBookingsScreen />} />
                <Route path='/admin/users' element={<AdminUsersScreen />} />
            </Route>
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();