import React from 'react';
import { Container, SideLeft, SideRight, LegendContainer, Legend } from './styles';
import { BarChart, Bar, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import formatCurrency from '../../utils/formatcurrency';

interface IBarcharBoxProps {
    title: string,
    data: {
        name: string,
        amount: number,
        percent: number,
        color: string,
    }[],
}

const BarChartBox: React.FC<IBarcharBoxProps> = ({
    title, data
}) => {
    return (
        <Container>
            <SideLeft>
                <h2>{title}</h2>
                <LegendContainer>
                    { 
                        data.map(indication => (
                            <Legend key={indication.name} color={indication.color}>
                                <div>{indication.percent}%</div>
                                <span>{indication.name}%</span>
                            </Legend>
                        ))
                    }
                </LegendContainer>
            </SideLeft>
            <SideRight>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <Bar dataKey="amount" name='Valor'>
                            {data.map((item) => (
                                <Cell 
                                    key={item.name}
                                    fill={item.color}
                                    cursor="pointer"                                    
                                />
                            ))}
                        </Bar>
                        <Tooltip 
                            cursor={{ fill: 'none'}}
                            formatter={(value) => formatCurrency(Number(value)) }
                        />
                    </BarChart>
                </ResponsiveContainer>
            </SideRight>
        </Container>
    )
}

export default BarChartBox;