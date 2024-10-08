import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Button from '@mui/material/Button';

function DatePicker({changeDate, state}) {
    const [visible, setVisible] = useState(false);

    return(
        <div style={DateRangeStyle}>
            <Button variant='contained' disableElevation sx={DateRangeButtonStyle} onClick={() => setVisible(!visible)}>Change Dates</Button>
            <div>
                {visible ?
                <div style={CalendarStyle}>
                <DateRange
                    editableDateInputs={true}
                    onChange={item => {
                        // setState([item.selection]);
                        changeDate([item.selection]);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                /> </div> : null}
            </div>
            
        </div>
    );
}

const DateRangeStyle = {
    position:'absolute',
    zIndex: '200',
    right: '0.5vw',
    top: '6.75vh',
}

const DateRangeButtonStyle = {
    position: 'absolute',
    top: '-5.4vh',
    right: '10px',
    margin: '1px',
    height: '36px',
    width: '150px',
    background: '#f55353',
    '&:hover': {
        background: '#e01f1f',
    }
}

const CalendarStyle = {
    border: '2px solid black',
}

export default DatePicker;