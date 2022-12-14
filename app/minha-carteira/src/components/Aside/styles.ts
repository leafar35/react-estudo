import styled, {css} from 'styled-components';

interface IContainerProps {
    menuIsOpen: boolean;
}

interface IThemeToggleFooter {
    menuIsOpen: boolean;
}

export const Container = styled.div<IContainerProps>`

    grid-area: AS;
    background-color: ${props => props.theme.colors.secondary};
    padding-left: 20px;
    border-radius: 1px solid ${props => props.theme.colors.gray};
    position: relative;

    @media(max-width: 600px){
        padding-left: 20px;
        position: fixed;
        z-index: 2;
        width: 170px;
        height: ${props => props.menuIsOpen ? '100vh' : '70px'};
        overflow: hidden;
        ${props => !props.menuIsOpen && css`
            border: none;
            border-bottom: 1px solid ${props => props.theme.colors.gray}
        `};
    }
`;


export const Header = styled.header`
    height: 70px;
    display: flex;
    align-items: center;
`;

export const LogImg = styled.img`
    height: 40px;
    width: 45px;
    @media(max-width: 800px){
        display: none;
    }
`;

export const Title = styled.h3`
    color: ${props => props.theme.colors.white};
    margin-left: 10px;
    @media(max-width: 600px){
        display: none;
    }
`;

export const MenuContainer = styled.nav`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`;

export const MenuItemLink = styled.a`
    margin: 7px 0;
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.info};
    text-decoration: none;
    transition: opacity .3s;
    &:hover {
        opacity: .7;
    }

    > svg{
        font-size: 18px;
        margin-right: 5px;
    }
`;

export const MenuItemButtom = styled.button`
    font-size: 16px;
    color: ${props => props.theme.colors.info};    
    border: none;
    background: none;
    margin: 7px 0;
    display: flex;
    align-items: center;
    transition: opacity .3s;
    &:hover {
        opacity: .7;
    }
    > svg {
        font-size: 18px;
        margin-right: 5px;
    }
`;

export const ToggleMenu = styled.button`
    width: 40px;
    height: 40px;
    font-size: 22px;
    border-radius: 5px;
    background-color: ${props => props.theme.colors.warning};
    transition: opacity .3s;
    a:hover {
        opacity: 0.7;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.white};
    display: none;
    @media(max-width: 600px){
        display: block;
    }
`;

export const ThemeToggleFooter = styled.footer<IThemeToggleFooter>`
    display: none;
    position: absolute;
    bottom: 30px;

    @media(max-width: 470px){
        display: ${props => props.menuIsOpen ? 'flex' : 'none'};
    }
    
`;
