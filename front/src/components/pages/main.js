import React, { useState, useCallback, useEffect } from 'react';
import DropDown from '../interactives/selectPageDropDown';
import DatePicker from '../interactives/datePicker';
import DisplayAll from '../pageLayouts/displayAll';
import DisplayUsersReturnRates from '../pageLayouts/displayUsersReturnRates';
import DisplayTimeInteractions from '../pageLayouts/displayTimeInteractions';
import DisplayReviewsUserIssues from '../pageLayouts/displayReviewsUserIssues';
import DisplayCost from '../pageLayouts/displayCost';
import ResponsiveAppBar from '../interactives/appBar';
import Verifier from '../services/awsJwtVerifier';

export default function Main() {
    const [display, setDisplay] = useState('all');
    const [verified, setVerified] = useState(false);

    const changeDisplay = (newDisplay) => {
        setDisplay(newDisplay);
    }

    //verify jwt from session storage
    const verify = useCallback(async() => {
        try {
            const payload = await Verifier.verify(
                sessionStorage.getItem('jwt')
            )
            setVerified(true)
        } catch(e) {
            console.log(`Invalid jwt token: ${e}`);
        }
    },[]);

    //reload page when verified
    useEffect(() => {
        verify()
            .catch(console.error);
    }, []);

    const renderDisplay = (display) => {
        // only render if valid jwt token exists
        if(verified){
            switch(display) {
                case 'all':
                    return <DisplayAll/>;
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
            {verified ? (
                <div>
                    <ResponsiveAppBar/>
                    <div style={{zIndex:'200'}}>
                        <DropDown changeDisplay={changeDisplay}/>
                        <DatePicker/>
                    </div>
                    <div style={graphStyle}>
                        { renderDisplay(display) }
                    </div>
                </div> 
            ) : null}
        </div>
        
    );
}

const graphStyle = {
    position: 'relative',
    top: '-3vh',
}