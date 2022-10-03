import React from 'react';
import { Container } from './styles';
import SelectInput from '../../components/SelectInput';
import ContentHeader from '../../components/ContentHeader';

const Dashboard: React.FC = () => {

    const options = [
        {value: 'Rogrido', label: 'Rodrigo'},
        {value: 'JOão', label: 'João'},
        {value: 'Test', label: 'test'},
    ]

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={options} />
            </ContentHeader>
        </Container>
    );
}

export default Dashboard;