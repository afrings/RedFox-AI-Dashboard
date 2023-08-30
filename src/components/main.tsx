import React from 'react';
import styled from 'styled-components';
import { UserChart } from './usersChart';
import { ReturnsChart } from './returnsChart';
import { ReviewsChart } from './reviewsChart';
import { IssuesChart } from './issuesChart';
import { TimeChart } from './timeChart';
import { InteractionsChart } from './interactionsChart';

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
            
            <div style={topRight}>
                <div style={timeChartStyle}>
                    <TimeChart/>
                </div>
                <div style={interactionsChartStyle}>
                    <InteractionsChart/>
                </div>
            </div>

            </div>
            <div style={bottomLeft}>
                <div style={reviewsChartStyle}>
                    <ReviewsChart/>
                </div>
                <div style={problemsChartStyle}>
                    <IssuesChart/>
                </div>
            </div>
        </div>
        
    )
};

let height = window.innerHeight;
let width = window.innerWidth;
let heightConst = 2.1;
const usersChartStyle = {
    height: height/heightConst,
    float: 'left',
    marginBottom: '15px',
    marginLeft: '10px',
} as React.CSSProperties;

const returnsChartStyle = {
    height: height/heightConst,
    minWidth: '65%',
    float: 'left',
    marginLeft: '10px',
} as React.CSSProperties;

const topLeft = {
    width: '50%',
    overflow: 'auto',
    border: '2px solid black',
    borderBottom: '1px solid black',
    float: 'left',
    borderRadius: '25px 0px 0px 0px',
} as React.CSSProperties;

const timeChartStyle = {
    float: 'left',
    height: height/heightConst,
    marginLeft: '10px',
    marginBottom: '15px',
} as React.CSSProperties;

const interactionsChartStyle = {
    float: 'left',
    height: height/heightConst,
    marginLeft: '10px',
} as React.CSSProperties;

const topRight = {
    border: '2px solid black',
    borderLeft: '1px solid black',
    borderBottom: '1px solid black',
    float: 'left',
} as React.CSSProperties;

const reviewsChartStyle = {
    maxWidth: '100%',
    minWidth: '49%',
    height: height/heightConst,
    border: '2px solid black',
    borderTop: '1px solid black',
    borderRight: '1px solid black',
    float: 'left',
} as React.CSSProperties;

const problemsChartStyle = {
    maxWidth: '100%',
    minWidth: '49%',
    height: height/heightConst,
    border: '2px solid black',
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    float: 'left',
} as React.CSSProperties;

const bottomLeft = {
    maxWidth: '50.9%',
    minWidth: '30%',
    overflow: 'auto',
    float: 'left',
    clear: 'left',
} as React.CSSProperties;