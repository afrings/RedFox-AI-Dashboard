import React, { useState } from 'react';
import DropDown from './selectPageDropDown';
import { DisplayAll } from './pages/displayAll';
import { DisplayUsersReturnRates } from './pages/displayUsersReturnRates';
import { DisplayTimeInteractions } from './pages/displayTimeInteractions';
import { DisplayReviewsUserIssues } from './pages/displayReviewsUserIssues';
import { DisplayCost } from './pages/displayCost';

export const Main: React.FC = () => {
    
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

    return (
    <div>
        <div style={{zIndex:'200',}}>
            <DropDown changeDisplay={changeDisplay}/>
        </div>
        {
           renderDisplay(display)
        }
    </div>
    )
};