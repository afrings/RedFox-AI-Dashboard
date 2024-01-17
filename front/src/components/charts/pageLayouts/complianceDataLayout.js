import React from 'react';
import TestCompletionChart from '../complianceCharts/testCompletionChart';
import StepTimeChart from '../timeCharts/stepTimeChart';
import { Card, CardContent} from '@mui/material'

export default function ComplianceDataLayout() {
    
    return (
    <div style={{position:'relative', display:'block', marginLeft:'1vw', marginRight:'1vw',}}>    
        <div style={chartsStyle}>
            <div>
                <Card raised >
                    <CardContent
                        sx={{height: '39vh'}}
                    >
                        <TestCompletionChart/>
                    </CardContent>
                </Card>
             </div>
            <div>
                <Card raised >
                    <CardContent
                        sx={{height: '39vh'}}
                    >
                        Graph goes here
                    </CardContent>
                </Card>
            </div>
            <div>

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