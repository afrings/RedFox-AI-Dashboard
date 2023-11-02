import React from 'react';
import CostChart from '../charts/costChart';

export default function DisplayCost() {
    
    return (
    <div>    
        <div style={chartsStyle}>
            <div style={costChartStyle}>
                <CostChart/>
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
};

const costChartStyle = {
    gridColumn: '1/5',
    gridRow: '1/16',
    backgroundColor: 'white',
};