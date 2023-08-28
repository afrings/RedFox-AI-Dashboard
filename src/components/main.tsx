import React from 'react';
import styled from 'styled-components';
import { UserChart } from './usersChart';

export const Main: React.FC = () => {
    var fr = new FileReader();
    
    return (
        <div style={usersChartStyle}>
            <UserChart/>
        </div>
        
    )
};

const usersChartStyle = {
    maxWidth: '50%'
};
