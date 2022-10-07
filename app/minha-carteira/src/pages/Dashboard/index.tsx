import React, { useState, useMemo } from 'react';
import { Container, Content } from './styles';
import SelectInput from '../../components/SelectInput';
import ContentHeader from '../../components/ContentHeader';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listofmouths from '../../utils/months';
import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';

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

    const totalExpense = useMemo(() => {
        let total: number = 0;

        expenses.forEach(element => {
            const date = new Date(element.date);
            const month = date.getMonth()+1;
            const year = date.getFullYear();

            if(month === monthSelected && year === yearSelected){
                total += Number(element.amount)
            }
        });
        return total;
    },[monthSelected, yearSelected]);

    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(element => {
            const date = new Date(element.date);
            const month = date.getMonth()+1;
            const year = date.getFullYear();

            if(month === monthSelected && year === yearSelected){
                total += Number(element.amount)
            }
        });
        return total;
    },[monthSelected, yearSelected]);

    const totalbalance = useMemo(() => {
        return totalGains - totalExpense;

    },[totalGains, totalExpense]);

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={mounths} change={(e) => setMonthSelected(parseInt(e.target.value))} defaultValue={monthSelected} />
                <SelectInput options={years} change={(e) => setYearhSelected(parseInt(e.target.value)) } defaultValue={yearSelected} />
            </ContentHeader>

            <Content>
                <WalletBox
                    title="Saldo"
                    amount={totalbalance}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    icon="dollar"
                    color="#4E41F0"
                />
                <WalletBox
                    title="Entradas"
                    amount={totalGains}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    icon="arrowUp"
                    color="#F7931B"
                />
                <WalletBox
                    title="Saídas"
                    amount={totalExpense}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    icon="arrowDown"
                    color="#E44C4E"
                />
                <MessageBox 
                    title="Muito bem!"
                    description="Sua carteria está posítiva!"
                    footerText="Continue assim. Considere investir o seu saldo."
                    icon={happyImg}
                />
            </Content>
        </Container>
    );
}

export default Dashboard;