import React from 'react';
import styled from 'styled-components';
import { UserChart } from './usersChart';
import { ReturnsChart } from './returnsChart';

export const Main: React.FC = () => {
    var fr = new FileReader();
    
    return (
        <div style={topLeft}>
            <div style={usersChartStyle}>
                <UserChart/>
            </div>
            <div style={returnsChartStyle}>
                <ReturnsChart/>
            </div>
        </div>
    )
};

const usersChartStyle = {
    maxWidth: '35%',
    float: 'left',
} as React.CSSProperties;

const returnsChartStyle = {
    maxWidth: '100%',
    minWidth: '65%',
    float: 'left',
} as React.CSSProperties;

const topLeft = {
    maxWidth: '50%',
    minWidth: '30%',
} as React.CSSProperties;
