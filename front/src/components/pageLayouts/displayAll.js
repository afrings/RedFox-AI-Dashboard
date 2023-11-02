import React from 'react';
import UserChart from '../charts/usersChart';
import ReturnsChart from '../charts/returnsChart';
import ReviewsChart from '../charts/reviewsChart';
import IssuesChart from '../charts/issuesChart';
import TimeChart from '../charts/timeChart';
import InteractionsChart from '../charts/interactionsChart';
import CostChart from '../charts/costChart';

export default function DisplayAll() {
    
    return (
    <div>    
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
            <div style={issuesChartStyle}>
                <IssuesChart/>
            </div>
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

const usersChartStyle = {
    gridColumn: '1',
    gridRow: '1/9',
    backgroundColor: 'white',
    paddingBottom: '10px',
};

const returnsChartStyle = {
    gridColumn: '2',
    gridRow: '1/9',
    backgroundColor: 'white',
};

const timeChartStyle = {
    gridColumn: '3',
    gridRow: '1/7',
    backgroundColor: 'white',
    paddingBottom: '10px',
};

const interactionsChartStyle = {
    gridColumn: '4',
    gridRow: '1/7',
    backgroundColor: 'white',
};

const reviewsChartStyle = {
    gridColumn: '1',
    gridRow: '9/16',
    backgroundColor: 'white',
};

const issuesChartStyle = {
    gridColumn: '2',
    gridRow: '9/16',
    backgroundColor: 'white',
    objectFit: 'fill',
};

const costChartStyle = {
    gridColumn: '3/5',
    gridRow: '7/16',
    backgroundColor: 'white',
};