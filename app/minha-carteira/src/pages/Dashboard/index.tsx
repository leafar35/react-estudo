import React, { useState, useMemo } from 'react';
import { Container } from './styles';
import SelectInput from '../../components/SelectInput';
import ContentHeader from '../../components/ContentHeader';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listofmouths from '../../utils/months';

const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(1);
    const [yearSelected, setYearhSelected] = useState<number>(2020);
    
    const mounths = useMemo(() => {
        return listofmouths.map((value, index) => {
            return {
                value: index+1,
                label: value
            }
        })
    },[]);

    const years = useMemo(() => {
        let uniqueyears: number[] = [];
        [...expenses, ...gains].forEach(item => {
            let year = (new Date(item.date)).getFullYear();
            if(!uniqueyears.includes(year))
                uniqueyears.push(year);
        });
        return uniqueyears.map((year) => {
            return {
                value: year,
                label: year,
            }
        });
    },[]);

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={mounths} change={(e) => setMonthSelected(parseInt(e.target.value))} defaultValue={monthSelected} />
                <SelectInput options={years} change={(e) => setYearhSelected(parseInt(e.target.value)) } defaultValue={yearSelected} />
            </ContentHeader>
        </Container>
    );
}

export default Dashboard;