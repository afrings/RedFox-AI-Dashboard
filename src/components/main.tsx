import React from 'react';
import styled from 'styled-components';
import { UserChart } from './usersChart';
import { ReturnsChart } from './returnsChart';
import { ReviewsChart } from './reviewsChart';
import { ProblemsChart } from './problemsChart';

export const Main: React.FC = () => {
    var fr = new FileReader();
    
    return (
        <div>
            <div style={topLeft}>
                <div style={usersChartStyle}>
                    <UserChart/>
                </div>
                <div style={returnsChartStyle}>
                    <ReturnsChart/>
                </div>
            </div>
            <div>
                
            </div>
            <div style={bottomLeft}>
                <div style={reviewsChartStyle}>
                    <ReviewsChart/>
                </div>
                <div style={problemsChartStyle}>
                    <ProblemsChart/>
                </div>
            </div>
        </div>
        
    )
};

let height = window.innerHeight/2.2;
const usersChartStyle = {
    maxWidth: '33%',
    minHeight: height,
    float: 'left',
    marginBottom: '15px'
} as React.CSSProperties;

const returnsChartStyle = {
    maxWidth: '100%',
    minHeight: height,
    minWidth: '65%',
    float: 'left',
} as React.CSSProperties;

const topLeft = {
    maxWidth: '50%',
    minWidth: '30%',
    overflow: 'auto',
    border: '2px solid black',
    borderBottom: '1px solid black',
} as React.CSSProperties;

const reviewsChartStyle = {
    maxWidth: '100%',
    minWidth: '49%',
    minHeight: height,
    border: '2px solid black',
    borderTop: '1px solid black',
    borderRight: '1px solid black',
    float: 'left',
} as React.CSSProperties;

const problemsChartStyle = {
    maxWidth: '100%',
    minWidth: '49%',
    minHeight: height,
    border: '2px solid black',
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    float: 'left',
} as React.CSSProperties;

const bottomLeft = {
    maxWidth: '50.9%',
    minWidth: '30%',
    overflow: 'auto',
} as React.CSSProperties;