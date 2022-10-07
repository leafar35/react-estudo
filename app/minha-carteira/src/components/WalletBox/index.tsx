import React, { useMemo } from 'react';
import { Container } from './styles';
import CountUp from 'react-countup';

import dollarImg from '../../assets/dolar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDowImg from '../../assets/arrow-down.svg';

interface IWalletBox {
    title: string,
    amount: number,
    footerLabel: string,
    icon: 'dollar' | 'arrowUp' | 'arrowDown',
    color: string,
}

const WalletBox: React.FC<IWalletBox> = ({
    title, amount, footerLabel, icon, color
}) => {
    const iconSelected = useMemo(() => {
       switch(icon){
            case 'dollar':
               return dollarImg;
            case 'arrowUp':
                return arrowUpImg;
            case 'arrowDown':
                return arrowDowImg;
            default:
                return undefined;
       }
    },[icon])
    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <CountUp 
                    end={amount}
                    prefix="R$ "
                    separator="."
                    decimal=","
                    decimals={2}
                />
            </h1>
            <small>{footerLabel}</small>
            {iconSelected && <img src={iconSelected} alt={title} />}
        </Container>
    );
}

export default WalletBox;