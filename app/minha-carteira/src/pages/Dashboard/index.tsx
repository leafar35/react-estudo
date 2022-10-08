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
import grining from '../../assets/grinning.svg';
import opsImg from '../../assets/ops.svg';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/historyBox';
import BarChartBox from '../../components/BarChartBox';

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

    const message = useMemo(() => {
        if(totalbalance < 0){
            return {
                title: 'Que triste!',
                description: 'Nesse mês, você gastou mais do que deveria.',
                footerText: 'Verifique seus gastos e tente cortar algumas coisas desncessárias!',
                icon: sadImg
            }
        }else if(totalbalance === 0){
            return {
                title: 'Ufa!',
                description: 'Nesse mês ganhou exatamente o que ganhou',
                footerText: 'Tenha cuidado, no próximo mês tente poupar o seu dinheiro.',
                icon: grining
            }
        } else if(totalGains === 0 && totalExpense === 0){
            return {
                title: 'Ops!',
                description: 'Nesse mês, não á entradas ou saídas',
                footerText: 'Parece que você não fez nenhum registro no mês e ano selecionado!',
                icon: opsImg
            }
        } else {
            return {
                title: 'Muito bem!',
                description: 'Sua carteira está positiva',
                footerText: 'Continue assim. considere investir seu saldo!',
                icon: happyImg
            }
        }
    },[totalbalance, totalGains, totalExpense]);

    const relationExpansiveGains = useMemo(() => {
        const total = totalGains + totalExpense;
        const percentGains = Number(((totalGains / total) * 100).toFixed(1));
        const percentExpenses = Number(((totalExpense / total) * 100).toFixed(1));

        const data = [
            {
                name: 'Entradas',
                value: totalGains,
                percent: percentGains ? percentGains : 0,
                color: '#E44C4E'
            },
            {
                name: 'Saídas',
                value: totalExpense,
                percent: percentExpenses ? percentExpenses : 0,
                color: '#F7931B'
            },
        ];
        return data;
    },[totalGains, totalExpense]);

    const historydata = useMemo(() => {        
        return listofmouths.map((_,month) => {
            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYEar = date.getFullYear();
                if(gainMonth === month && gainYEar === yearSelected){
                    amountEntry += Number(gain.amount);
                }
            });
            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const gainMonth = date.getMonth();
                const gainYEar = date.getFullYear();
                if(gainMonth === month && gainYEar === yearSelected){
                    amountOutput += Number(expense.amount);
                }
            });
            return {
                monthNumber: month,
                month: listofmouths[month].substr(0,3),
                amountEntry,
                amountOutput 
            }   
        }).filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
        });
    },[yearSelected]);

    const relationExpanseRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;
        expenses.filter(expense => {
            const date = new Date(expense.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return (month === monthSelected && year === yearSelected);
        }).forEach(expense => {
            if(expense.frequency === 'recorrente'){
                return amountRecurrent += Number(expense.amount);
            }

            if(expense.frequency === 'eventual'){
                return amountEventual += Number(expense.amount);
            }
        });
        const total = amountRecurrent + amountEventual;
        const recurrentPercent = Number(((amountRecurrent /  total) * 100).toFixed(1));
        const eventualPercent = Number(((amountEventual /  total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrente',
                amount: amountRecurrent,
                percent: recurrentPercent ? recurrentPercent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventual',
                amount: amountEventual,
                percent: eventualPercent ? eventualPercent : 0,
                color: "#E44C4E"
            },
        ]
    },[monthSelected, yearSelected]);

    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains
        .filter((gain) => {
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
        })
        .forEach((gain) => {
            if(gain.frequency === 'recorrente'){
                return amountRecurrent += Number(gain.amount);
            }

            if(gain.frequency === 'eventual'){
                return amountEventual += Number(gain.amount);
            }
        });

        const total = amountRecurrent + amountEventual;

        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }
        ];
    },[monthSelected, yearSelected]);

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
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

                <PieChartBox 
                    data={relationExpansiveGains}
                />

                <HistoryBox 
                    data={historydata}
                    lineCOlorAmountEntry="#F7931B"
                    lineCOlorAmountOutput="#E44C4E"
                />

                <BarChartBox
                    title="Saídas" 
                    data={relationExpanseRecurrentVersusEventual}
                />

                <BarChartBox
                    title="Entradas" 
                    data={relationGainsRecurrentVersusEventual}
                />

            </Content>
        </Container>
    );
}

export default Dashboard;