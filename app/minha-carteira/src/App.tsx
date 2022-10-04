import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';

import Routes from './routes';
import dark from './styles/themes/dark';
import light from './styles/themes/light';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={dark}>
            <GlobalStyle />
            <Routes />
        </ThemeProvider>
    );
}

export default App;