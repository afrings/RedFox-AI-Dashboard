import React from 'react';
import { UserChart } from './usersChart';
import { ReturnsChart } from './returnsChart';
import { ReviewsChart } from './reviewsChart';
import { IssuesChart } from './issuesChart';
import { TimeChart } from './timeChart';
import { InteractionsChart } from './interactionsChart';
import { CostChart } from './costChart';

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
            <div style={topRight}>
                <div style={timeChartStyle}>
                    <TimeChart/>
                </div>
                <div style={interactionsChartStyle}>
                    <InteractionsChart/>
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
            {/* <div>
                <div style={costChartStyle}>
                    <CostChart/>
                </div>
            </div> */}
        </div>
        
    )
};

let topLeftWidth = 40;
let topLeftHeight = 30;
let topRightWidth = 100-topLeftWidth-5;
let topRightHeight = 40;


const topLeft = {
    position: 'absolute',
    width: topLeftWidth + 'vw',
    height: topLeftHeight + 'vh',
    overflow: 'auto',
    border: '0.2vmin solid black',
    borderBottom: '0.1vmin solid black',
    borderRadius: '25px 0px 0px 0px',
} as React.CSSProperties;

const usersChartStyle = {
    height: (topLeftHeight - 2) + 'vh',
    width: (topLeftWidth - 25) + 'vw',
    float: 'left',
    marginBottom: '1vh',
    marginLeft: '1vw',
} as React.CSSProperties;

const returnsChartStyle = {
    height: (topLeftHeight-2) + 'vh',
    width: (topLeftWidth - 75) + 'vw',
    float: 'left',
    marginLeft: '10px',
} as React.CSSProperties;

const topRight = {
    position: 'absolute',
    left: (topLeftWidth+0.7) + 'vw',
    width: topRightWidth + 'vw',
    height: topRightHeight + 'vh',
    overflow: 'auto',
    border: '0.2vmin solid black',
    borderLeft: '0.1vmin transparent',
    borderBottom: '0.1vmin solid black',
    flexGrow: '1',
    borderRadius: '0px 25px 0px 0px',
} as React.CSSProperties;

const timeChartStyle = {
    width: '50%',
    height: '95%',
    float: 'left',
    marginLeft: '1vw',
    marginBottom: '1vh',
} as React.CSSProperties;

const interactionsChartStyle = {
    width: '45%',
    height: '100%',
    float: 'left',
    marginLeft: '1vw',
} as React.CSSProperties;

const bottomLeft = {
    position: 'absolute',
    top: (topLeftHeight+1) + 'vh',
    width: topLeftWidth + 'vw',
    height: (100-topLeftHeight - 10) + 'vh',
    overflow: 'auto',
    float: 'left',
    clear: 'left',
    border: '0.2vmin solid black',
    borderRadius: '0px 0px 0px 25px',
} as React.CSSProperties;

const reviewsChartStyle = {
    width: '49%',
    height: '100%',
    borderRight: '0.1vmin solid black',
    float: 'left',
} as React.CSSProperties;

const problemsChartStyle = {
    flexGrow:'1',
    height: '100%',
    borderLeft: '0.1vmin solid black',
    float: 'left',
} as React.CSSProperties;

const costChartStyle = {
    height: '50vh',
    width: '60%',
    float: 'left',
} as React.CSSProperties;