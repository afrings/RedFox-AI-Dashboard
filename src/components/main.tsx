import React from 'react';
import styled from 'styled-components';
import { ChartComponent } from './chart';

export const Main: React.FC = () => {
    var fr = new FileReader();
    
    return (
        <div>
            <ChartComponent/>
        </div>
        
    )
};

const styles = {
    container: styled.div`
    color: black;
    font-weight: bold;`
};