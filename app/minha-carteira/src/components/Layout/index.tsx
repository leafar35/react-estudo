import * as React from 'react';
import { Grid } from './styles';
import Aside from '../Aside';
import Content from '../Content';
import MainHeader from '../MainHeader';
type Props = {
    children?: React.ReactNode
};

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Content> 
                { children }
            </Content>
        </Grid>
    );
}

export default Layout;