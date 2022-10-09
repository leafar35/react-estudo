import React from 'react';
import logoImg from '../../assets/logo.svg';
import { MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp } from 'react-icons/md';
import { Container, Header, LogImg, Title, MenuContainer, MenuItemLink, MenuItemButtom } from './styles';
import { useAuth } from '../../hooks/auth';

const Aside: React.FC = () => {
    const { sigOuth } = useAuth();
    return (
        <Container>
            <Header>
                <LogImg src={logoImg} alt="Logo Minha Carteira" />
                <Title>Minha Carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href="/">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>
                <MenuItemLink href="/list/entry-balance">
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>
                <MenuItemLink href="/list/exit-balance">
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>
                <MenuItemButtom onClick={() => sigOuth()}>
                    <MdExitToApp />
                    Sair
                </MenuItemButtom>
            </MenuContainer>
        </Container>
    );
}

export default Aside;