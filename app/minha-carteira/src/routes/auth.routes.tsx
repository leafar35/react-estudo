import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingIn from "../pages/SingIn";

const AuthRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SingIn />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AuthRoutes;
