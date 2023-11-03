import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function DatePicker() {
    const [visible, setVisible] = useState(false);

    // const 

    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
    ]);

    return(
        <div style={DateRangeStyle}>
            <button style={DateRangeButtonStyle} onClick={() => setVisible(!visible)}>Change Dates</button>
            <div>
                {visible ?
                <DateRange
                    editableDateInputs={true}
                    onChange={item => {
                        setState([item.selection]); 
                        console.log(`Start Date: ${state[0].startDate} \n End Date: ${state[0].endDate}`);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                /> : null}
            </div>
            
        </div>
    );
}

const DateRangeStyle = {
    position:'absolute',
    zIndex: '200',
    right: '0vw',
    top: '1.3vw',
}

const DateRangeButtonStyle = {
    position: 'absolute',
    top: '-2.5vh',
    right: '0px',
    margin: '1px',
}

export default DatePicker;