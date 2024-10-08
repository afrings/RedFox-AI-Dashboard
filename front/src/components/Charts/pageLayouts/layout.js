import React from 'react';
import TestCompletionChart from '../complianceCharts/testCompletionChart';
import BarcodeScanTimeChart from '../complianceCharts/barcodeScanTimeChart';
import StepTimeChart from '../timeCharts/stepTimeChart';
import TestTimeChart from '../timeCharts/testTimeChart';
import TroubleShootingRequestsChart from '../customerSupportCharts/troubleShootingRequestsChart';
import PatientFeedbackChart from '../customerSupportCharts/patientFeedbackChart';
import { Card, CardContent} from '@mui/material'

export default function Layout({date, apiUrl}) {
    
    return (
    <div style={{position:'relative', display:'block', marginLeft:'1vw', marginRight:'1vw',}}>    
        <div style={chartsStyle}>
            <div>
                <Card raised >
                    <CardContent
                        sx={{height: '39vh'}}
                    >
                        <TestCompletionChart date={date} apiUrl={apiUrl}/>
                    </CardContent>
                </Card>
             </div>
            <div>
                <Card raised >
                    <CardContent
                        sx={{height: '39vh'}}
                    >
                        <BarcodeScanTimeChart date={date} apiUrl={apiUrl}/>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card raised >
                    <CardContent
                        sx={{height: '39vh'}}
                    >
                        <StepTimeChart date={date} apiUrl={apiUrl}/>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card raised >
                    <CardContent
                        sx={{height: '39vh'}}
                    >
                        <TestTimeChart date={date} apiUrl={apiUrl}/>
                    </CardContent>
                </Card>
            </div>
            <div style={troubleShootingRequestsChartStyle}>
                <Card raised >
                    <CardContent
                        sx={{height: '39vh'}}
                    >
                        <TroubleShootingRequestsChart date={date} apiUrl={apiUrl}/>
                    </CardContent>
                </Card>
            </div>
            {/* <div style={issuesChartStyle}>
                <Card raised >
                    <CardContent
                        sx={{height: '39vh'}}
                    >
                        <PatientFeedbackChart date={date}/>
                    </CardContent>
                </Card>
            </div> */}
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

const troubleShootingRequestsChartStyle = {
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