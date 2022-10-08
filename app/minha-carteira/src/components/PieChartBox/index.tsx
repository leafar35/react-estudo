import React from 'react';
import { Container, SideLeft, LegendContainer, Legend, SideRight } from './styles';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface IPieChartBoxProps {
    data: {
        name: string,
        value: number,
        percent: number,
        color: string
    }[]
}

const PieChartBox: React.FC<IPieChartBoxProps> = ({data}) => (
    <Container>
        <SideLeft>
            <h2>Relação</h2>
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
                <PieChart>
                    <Pie data={data} dataKey="percent">
                        { 
                            data.map(indication => (
                               <Cell key={indication.name} fill={indication.color} />
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </SideRight>
    </Container>
)

export default PieChartBox;