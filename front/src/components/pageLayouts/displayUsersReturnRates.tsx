import React from 'react';
import { UserChart } from '../charts/usersChart';
import { ReturnsChart } from '../charts/returnsChart';

export const DisplayUsersReturnRates: React.FC = () => {

    return (
    <div>    
        <div style={chartsStyle}>
            <div style={usersChartStyle}>
                <UserChart/>
            </div>
            <div style={returnsChartStyle}>
                <ReturnsChart/>
            </div>
        </div>
    </div>
    )
};

const chartsStyle = {
    position: 'absolute',
    top: '5vh',
    display: 'grid',
    gridTemplateColumns: '25vw 25vw 25vw 22vw',
    gap: '5px',
    gridAutoRows: '5vh',
    backgroundColor: 'black',
    border: '5px solid black',
} as React.CSSProperties;

const usersChartStyle = {
    gridColumn: '1/3',
    gridRow: '1/16',
    backgroundColor: 'white',
    paddingBottom: '10px',
} as React.CSSProperties;

const returnsChartStyle = {
    gridColumn: '3/5',
    gridRow: '1/16',
    backgroundColor: 'white',
} as React.CSSProperties;