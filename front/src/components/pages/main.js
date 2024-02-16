import { useState, useCallback, useEffect } from 'react';
// import DropDown from '../interactives/selectPageDropDown';
import DownloadXLSX from '../interactives/download';
import DatePicker from '../interactives/datePicker';
import DisplayUsersReturnRates from '../charts/pageLayouts/testLayouts/displayUsersReturnRates';
import DisplayTimeInteractions from '../charts/pageLayouts/testLayouts/displayTimeInteractions';
import DisplayReviewsUserIssues from '../charts/pageLayouts/testLayouts/displayReviewsUserIssues';
import DisplayCost from '../charts/pageLayouts/testLayouts/displayCost';
import Layout from '../charts/pageLayouts/Layout';
import ResponsiveAppBar from '../interactives/appBar';
import Verifier from '../services/awsJwtVerifier';

export default function Main() {
    const [display, setDisplay] = useState('all');
    const [verified, setVerified] = useState(false);
    const [date, setDate] = useState([
        {
          startDate: null,
          endDate: new Date(),
          key: 'selection'
        }
    ]);

    // const changeDisplay = (newDisplay) => {
    //     setDisplay(newDisplay);
    // }

    const changeDate = (newDate) => {
        setDate(newDate);
    }

    //verify jwt from session storage
    const verify = useCallback(async() => {
        try {
            await Verifier.verify(
                sessionStorage.getItem('jwt')
            )
            setVerified(true)
        } catch(e) {
            console.log(`Invalid jwt token: ${e}`);
        }
    });

    // reload page when verified
    useEffect(() => {
        verify()
            .catch(console.error);
    });

    const renderDisplay = (display) => {
        // only render if valid jwt token exists
        if(verified){
            switch(display) {
                case 'all':
                    return <Layout date={date}/>;
                case 'time':
                    return <DisplayTimeInteractions/>;
                case 'users':
                    return <DisplayUsersReturnRates/>;
                case 'reviews':
                    return <DisplayReviewsUserIssues/>;
                case 'cost':
                    return <DisplayCost/>;
            }
        }
    }

    return(
        <div>
            {/*only render if valid jwt token exists*/}
            {verified ?
                <div>
                    <ResponsiveAppBar/>
                    <div style={{zIndex:'200'}}>
                        {/* <DropDown changeDisplay={changeDisplay}/> */}
                        <DownloadXLSX/>
                        <DatePicker changeDate={changeDate} state={date}/>
                    </div>
                    <div style={graphStyle}>
                        { renderDisplay(display) }
                    </div>
                </div> 
            : null} 
        </div>
        
    );
}

const graphStyle = {
    position: 'relative',
    top: '-3vh',
}