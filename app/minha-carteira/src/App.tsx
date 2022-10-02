import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import dark from './styles/themes/dark';
import light from './styles/themes/light';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={dark}>
            <GlobalStyle />
            <Layout> 
                <Dashboard />
            </Layout>
        </ThemeProvider>
    );
}

export default App;