import React, { createContext, useState, useContext } from 'react';
type Props = {
    children?: React.ReactNode
};

interface IAuthContext {
    logged: Boolean,
    signIn(email: string, password: string): void,
    sigOuth(): void,
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged');
        return !!isLogged;
    });

    const signIn = (email: string, password: string) => {
        console.log(email, password);
        if(email === 'rafael@rafael.com.br' && password === '123'){
            setLogged(true);
            return localStorage.setItem('@minha-carteira:logged', 'true');
        }
        setLogged(false);
        alert('Senha ou password Incorreto');
    }

    const sigOuth = () => {
        localStorage.removeItem('@minha-carteira:logged');
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{logged, signIn, sigOuth}}>
            {children}
        </AuthContext.Provider>
    )

}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext)
    return context;
}

export {AuthProvider, useAuth};