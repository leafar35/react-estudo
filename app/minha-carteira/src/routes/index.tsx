import React from 'react';
import { useAuth } from '../hooks/auth';
import App from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
    const { logged } = useAuth();

    return (
        (logged) ? <App /> : <AuthRoutes />
    )
};

export default Routes;