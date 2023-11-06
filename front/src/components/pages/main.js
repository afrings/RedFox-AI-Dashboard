import React, {useState} from 'react';
import DropDown from '../interactives/selectPageDropDown';
import DatePicker from '../interactives/datePicker';
import DisplayAll from '../pageLayouts/displayAll';
import DisplayUsersReturnRates from '../pageLayouts/displayUsersReturnRates';
import DisplayTimeInteractions from '../pageLayouts/displayTimeInteractions';
import DisplayReviewsUserIssues from '../pageLayouts/displayReviewsUserIssues';
import DisplayCost from '../pageLayouts/displayCost';

export default function Main() {
    const [display, setDisplay] = useState('all');

    const changeDisplay = (newDisplay) => {
        setDisplay(newDisplay);
    }

    const renderDisplay = (display) => {
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

    return(
        <div>
            <div style={{zIndex:'200',}}>
                <DropDown changeDisplay={changeDisplay}/>
                <DatePicker/>
            </div>
            {
            renderDisplay(display)
            }
        </div>
    );
}