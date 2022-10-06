import React, { useMemo, useState, useEffect } from 'react';
import { Container, Content, Filters } from './styles';
import SelectInput from '../../components/SelectInput';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import formatCurrency from '../../utils/formatcurrency';
import formatDate from '../../utils/formatDate';
import listofmouths from '../../utils/months';

interface IRouteParams {
    match: {
        params: {
            type: string
        }
    }
}

interface IData {
    id: string,
    description: string,
    amountFormatted: string,
    frequency: string,
    dateFormatted: string,
    tagColor: string,
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(1);
    const [yearSelected, setYearhSelected] = useState<number>(2020);
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState<string[]>(['recorrente', 'eventual']);

    const { type } = match.params;

    const pageData = useMemo(() => {
        if(type === 'entry-balance'){
            return {
                title: 'Entradas',
                lineColor: '#F7931B',
                data: gains
            }
        }
        return {
            title: 'Saídas',
            lineColor: '#E44C4E',
            data: expenses
        }
    },[type]);

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
        const { data } = pageData;
        data.forEach(item => {
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
    },[pageData]);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);
        if(alreadySelected >= 0){
            const filtered = frequencyFilterSelected.filter(item => item !== frequency);
            return setFrequencyFilterSelected(filtered);
        }
        setFrequencyFilterSelected((prev) => [...prev, frequency]);
    }
    
    useEffect(() => {
        const { data } = pageData;
        const filter = data.filter((item) =>{
            const date = new Date(item.date);
            const mouth = date.getMonth();
            const year = date.getFullYear();
            return mouth === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
        });
        const response = filter.map((item, index) => {
            return {
                id: String(index),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
            }
        })
        setData(response);
    }, [pageData, monthSelected, yearSelected, frequencyFilterSelected])

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput options={mounths} change={(e) => setMonthSelected(parseInt(e.target.value))} defaultValue={monthSelected} />
                <SelectInput options={years} change={(e) => setYearhSelected(parseInt(e.target.value)) } defaultValue={yearSelected} />
            </ContentHeader>

            <Filters>
                <button 
                    type="button" 
                    className={`tag-filter tag-filter-recurrent
                    ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`} 
                    onClick={() => handleFrequencyClick('recorrente') }>Recorrents</button>

                <button 
                    type="button" 
                    className={`tag-filter tag-filter-eventual
                    ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`} 
                    onClick={() => handleFrequencyClick('eventual') }>Eventuais</button>
            </Filters>

            <Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}
                        />
                    ))
                }
            </Content>

        </Container>
    );
}

export default List;