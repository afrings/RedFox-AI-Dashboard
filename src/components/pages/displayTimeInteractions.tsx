import React from 'react';
import { TimeChart } from '../charts/timeChart';
import { InteractionsChart } from '../charts/interactionsChart';

export const DisplayTimeInteractions: React.FC = () => {
    
    return (
    <div>    
        <div style={chartsStyle}>
            <div style={timeChartStyle}>
                <TimeChart/>
            </div>
            <div style={interactionsChartStyle}>
                <InteractionsChart/>
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

const timeChartStyle = {
    gridColumn: '1/4',
    gridRow: '1/16',
    backgroundColor: 'white',
    paddingBottom: '10px',
} as React.CSSProperties;

const interactionsChartStyle = {
    gridColumn: '4',
    gridRow: '1/16',
    backgroundColor: 'white',
} as React.CSSProperties;