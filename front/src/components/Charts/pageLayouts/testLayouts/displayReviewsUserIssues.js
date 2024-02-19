import React from 'react';
import ReviewsChart from '../../testCharts/reviewsChart';
import IssuesChart from '../../testCharts/issuesChart';

export default function DisplayReviewsUserIssues() {
    
    return (
    <div>    
        <div style={chartsStyle}>
            <div style={reviewsChartStyle}>
                <ReviewsChart/>
            </div>
            <div style={issuesChartStyle}>
                <IssuesChart/>
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

const reviewsChartStyle = {
    gridColumn: '1/3',
    gridRow: '1/16',
    backgroundColor: 'white',
};

const issuesChartStyle = {
    gridColumn: '3/5',
    gridRow: '1/16',
    backgroundColor: 'white',
    objectFit: 'fill',
};