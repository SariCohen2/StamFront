import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const token = sessionStorage.getItem('authToken');

    return token ? Component : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
