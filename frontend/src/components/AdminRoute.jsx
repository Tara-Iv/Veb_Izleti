// štiti rute koje su samo za administratora 
// ako korisnik nije admin, prebacuje ga na login stranicu

import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);

    return userInfo && userInfo.isAdmin 
        ? <Outlet /> 
        : <Navigate to='/login' replace />;
};

export default AdminRoute;