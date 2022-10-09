import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';

let match = {
    params: {
        type: "entry-balance"
    }
}

const AppRoutes: React.FC = () => {
    match.params.type = window.location.pathname.split('/')[2];
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/list/:type" element={<List match={match} />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    );
};

export default AppRoutes;

