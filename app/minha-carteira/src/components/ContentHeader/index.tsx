import React from 'react';
import { Container, TitleContainer, Controllers } from './styles';

const ContentHeader: React.FC = () => {
    return (
        <Container>
            <TitleContainer>
                <h3>TITULO</h3>
            </TitleContainer>
            <Controllers>
                <button type="button">botão a</button> 
                <button type="button">botão b</button> 
            </Controllers>
        </Container>
    );
}

export default ContentHeader;