import React, { useMemo, useState } from 'react';
import emojis from '../../utils/emogis';
import { Container, Profile, Welcome, UserName } from './styles';
import { useTheme } from '../../hooks/theme';
import Toggle from '../Toggle';

const MainHeader: React.FC = () => {

    const { toggleTheme, theme } = useTheme();
    const [ dartkTheme, setDarkTheme ] = useState(() => theme.title === 'dark' ? true : false);
    const handleChangeTheme = () => {
        setDarkTheme(!dartkTheme);
        toggleTheme();
    }
    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length);
        return emojis[indice];
    }, []);

    return (
        <Container>
            <Toggle 
                labelLeft='Light'
                labelRight='Dark'
                checked={dartkTheme}
                onChangeParam={handleChangeTheme}
            />
            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <UserName>Rafael Vianini</UserName>
            </Profile>
        </Container>
    );
}

export default MainHeader;