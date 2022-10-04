import React from 'react';
import { Container } from './styles';

interface ISelectInputProps {
    options: {
        value: string | number,
        label: string | number,
    }[],
}

const SelectInput: React.FC<ISelectInputProps> = ({ options }) => {
    return (
        <Container>
            <select>
                {
                    options.map(option => (
                        <option key={option.value} value={option.value.toString()}>{option.label.toString()}</option>
                    ))
                }
            </select>
        </Container>
    );
}

export default SelectInput;