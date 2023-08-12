import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {useHasAuthorization} from '../hooks/useToken';

const PrivateRoutes = () => {
    const location = useLocation();
    const {isTokenValid}  =  useHasAuthorization();
    if (!isTokenValid) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return  <Outlet />
};

export default PrivateRoutes;
