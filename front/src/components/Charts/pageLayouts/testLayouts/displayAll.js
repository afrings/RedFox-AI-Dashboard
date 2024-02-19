import React from 'react';
import UserChart from '../../testCharts/usersChart';
import ReturnsChart from '../../testCharts/returnsChart';
import ReviewsChart from '../../testCharts/reviewsChart';
import IssuesChart from '../../testCharts/issuesChart';
import TimeChart from '../../testCharts/timeChart';
import InteractionsChart from '../../testCharts/interactionsChart';
import CostChart from '../../testCharts/costChart';
import { Card, CardContent} from '@mui/material'

export default function DisplayAll() {
    
    return (
    <div style={{position:'relative', display:'block', marginLeft:'1vw', marginRight:'1vw',}}>    
        <div style={chartsStyle}>
            <div>
                <Card raised >
                    <CardContent
                        sx={{height: '39vh'}}
                    >
                        <UserChart/>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card raised >
                    <CardContent
                        sx={{height: '39vh'}}
                    >
                        <ReturnsChart/>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card raised >
                    <CardContent
                        sx={{height: '28vh'}}
                    >
                        <TimeChart/>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card raised >
                    <CardContent
                        sx={{height: '28vh'}}
                    >
                        <InteractionsChart/>
                    </CardContent>
                </Card>
            </div>
            <div style={reviewsChartStyle}>
                <Card raised >
                    <CardContent
                        sx={{height: '35vh'}}
                    >
                        <ReviewsChart/>
                    </CardContent>
                </Card>
            </div>
            <div style={issuesChartStyle}>
                <Card raised >
                    <CardContent
                        sx={{height: '35vh'}}
                    >
                        <IssuesChart/>
                    </CardContent>
                </Card>
            </div>
            <div style={costChartStyle}>
                <Card raised >
                    <CardContent
                        sx={{height: '46vh'}}
                    >
                        <CostChart/>
                    </CardContent>
                </Card>
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