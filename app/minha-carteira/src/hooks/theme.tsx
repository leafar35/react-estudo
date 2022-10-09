import React, { createContext, useState, useContext } from 'react';
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';
type Props = {
    children?: React.ReactNode
};

interface IThemeContext {
    toggleTheme(): void;
    theme: ITheme;
}

interface ITheme {
    title: string;

    colors: {
        primary: string;
        secondary: string;
        tertiary: string;

        white: string;
        black: string;
        gray: string;

        success: string;
        info: string;
        warning: string;
    }
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);
const ThemeProvider: React.FC<Props> = ({ children }) => {

    const [theme, setTheme] = useState<ITheme>(() => {
        const themesave = localStorage.getItem('@minha-carteira:theme');
        if(themesave)
            return JSON.parse(themesave);
        return dark;
    });
    const toggleTheme = () => {
        if(theme.title === 'dark'){
            localStorage.setItem('@minha-carteira:theme', JSON.stringify(light));
            return setTheme(light);
        }
        localStorage.setItem('@minha-carteira:theme', JSON.stringify(dark));
        setTheme(dark);
    }

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    )
}

function useTheme(): IThemeContext {
    const context = useContext(ThemeContext);
    return context;
}

export { ThemeProvider, useTheme };