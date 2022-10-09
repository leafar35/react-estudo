import React from 'react';
import { Container, ToggleLabel, ToggleSelector } from './style';

interface IToggleProps {
    labelLeft: string,
    labelRight: string,
    checked: boolean,
    onChangeParam(): void,
}

const Toggle: React.FC<IToggleProps> = ({
    labelLeft, labelRight, checked, onChangeParam
}) => (

    <Container>
        <ToggleLabel>{labelLeft}</ToggleLabel>
        <ToggleSelector 
            checked={checked}
            uncheckedIcon={false}
            checkedIcon={false} 
            onChange={onChangeParam} />
        <ToggleLabel>{labelRight}</ToggleLabel>
    </Container>

)

export default Toggle;