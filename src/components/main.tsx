import React from 'react';
import { UserChart } from './charts/usersChart';
import { ReturnsChart } from './charts/returnsChart';
import { ReviewsChart } from './charts/reviewsChart';
import { IssuesChart } from './charts/issuesChart';
import { TimeChart } from './charts/timeChart';
import { InteractionsChart } from './charts/interactionsChart';
import { CostChart } from './charts/costChart';
import DropDown from './selectPageDropDown';

export const Main: React.FC = () => {
    var fr = new FileReader();
    
    return (
        <div>
            <DropDown/>
            <div style={chartsStyle}>
            <div style={usersChartStyle}>
                <UserChart/>
            </div>
            <div style={returnsChartStyle}>
                <ReturnsChart/>
            </div>
            <div style={timeChartStyle}>
                <TimeChart/>
            </div>
            <div style={interactionsChartStyle}>
                <InteractionsChart/>
            </div>
            <div style={reviewsChartStyle}>
                <ReviewsChart/>
            </div>
            <div style={problemsChartStyle}>
                <IssuesChart/>
            </div>
            <div style={costChartStyle}>
                <CostChart/>
            </div>
        </div>
    </div>
    )
};

let topLeftWidth = 40;
let topLeftHeight = 30;
let topRightWidth = 100-topLeftWidth-5;
let topRightHeight = 40;

const chartsStyle = {
    position: 'absolute',
    top: '5vh',
    display: 'grid',
    gridTemplateColumns: '25vw 25vw 25vw 20vw',
    gap: '10px',
    gridAutoRows: '45vh 45vh',
} as React.CSSProperties;

const usersChartStyle = {
    gridColumn: '1',
    gridRow: '1',
} as React.CSSProperties;

const returnsChartStyle = {
    gridColumn: '2',
    gridRow: '1',
} as React.CSSProperties;

const timeChartStyle = {
    gridColumn: '3',
    gridRow: '1',
} as React.CSSProperties;

const interactionsChartStyle = {
    gridColumn: '4',
    gridRow: '1',
} as React.CSSProperties;

const reviewsChartStyle = {
    gridColumn: '1',
    gridRow: '2',
} as React.CSSProperties;

const problemsChartStyle = {
    gridColumn: '2',
    gridrow: '2',
} as React.CSSProperties;

const costChartStyle = {
    gridColumn: '3/5',
    gridRow: '2',
} as React.CSSProperties;