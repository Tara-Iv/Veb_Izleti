// ako korisnik nije ulogovan, automatski ga prebacuje na stranicu za prijavu

import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);

    return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;