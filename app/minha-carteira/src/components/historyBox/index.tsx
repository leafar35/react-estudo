import React from 'react';
import { Container, ChartContainer, LegendContainer, Legend, Header } from './styles';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import formatCurrency from '../../utils/formatcurrency';

interface IHistoryBoxProps {
    data: {
        month: string,
        amountEntry: number,
        amountOutput: number,
    }[],
    lineCOlorAmountEntry: string,
    lineCOlorAmountOutput: string,
}

const HistoryBox: React.FC<IHistoryBoxProps> = ({
    data, lineCOlorAmountEntry, lineCOlorAmountOutput
}) => (
    <Container>
        <Header>
            <h2>Histórico de saldo</h2>

            <LegendContainer>
                <Legend color={lineCOlorAmountEntry}>
                    <div></div>
                    <span>Entradas</span>
                </Legend>
           
                <Legend color={lineCOlorAmountOutput}>
                    <div></div>
                    <span>Saídas</span>
                </Legend>
            </LegendContainer>
        </Header>

        <ChartContainer>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
                    <XAxis dataKey="month" stroke="#cecece" />
                    <Tooltip formatter={(value) => formatCurrency(Number(value)) }  />
                    <Line 
                        type="monotone"                
                        dataKey="amountEntry"
                        name="Entradas"
                        stroke={lineCOlorAmountEntry}
                        strokeWidth={5}
                        dot={{ r: 5}}
                        activeDot={{ r: 8}}
                    />
                    <Line 
                        type="monotone"                
                        dataKey="amountOutput"
                        name="Saídas"
                        stroke={lineCOlorAmountOutput}
                        strokeWidth={5}
                        dot={{ r: 5}}
                        activeDot={{ r: 8}}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    </Container>
)

export default HistoryBox;