import React from 'react';
import Button from '@mui/material/Button';

const DropDown = ({changeDisplay}) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const changeDisplayHandlerAll = () => {
        changeDisplay('all')
        handleOpen();
    }

    const changeDisplayHandlerTime = () => {
        changeDisplay('time')
        handleOpen();
    }

    const changeDisplayHandlerUsers = () => {
        changeDisplay('users')
        handleOpen();
    }

    const changeDisplayHandlerReviews = () => {
        changeDisplay('reviews')
        handleOpen();
    }

    const changeDisplayHandlerCost = () => {
        changeDisplay('cost')
        handleOpen();
    }

    return (
        <div style={DropDownStyle}>
            <Button variant='contained' disableElevation onClick={handleOpen}>Change Display</Button>
            {open ? (
                <ul style={menu}>
                    <li style={menuLi}>
                        <button onClick={changeDisplayHandlerAll}>Display All</button>
                    </li>
                    <li style={menuLi}>
                        <button onClick={changeDisplayHandlerUsers}>Users/Return Rates</button>
                    </li>
                    <li style={menuLi}>
                        <button onClick={changeDisplayHandlerTime}>Time Spent/Successful Interactions</button>
                    </li>
                    <li style={menuLi}>
                        <button onClick={changeDisplayHandlerReviews}>Reviews/User Issues</button>
                    </li>
                    <li style={menuLi}>
                        <button onClick={changeDisplayHandlerCost}>Cost Per Month</button>
                    </li>
                </ul>
            ) : null}
        </div>
    );
};

const DropDownStyle = {
    position: 'absolute',
    top: '1.5vh',
    right: '200px',
};

const menu = {
    position: 'absolute',
    listStyleType: 'none',
    margin: '5px 0',
    padding: '0',
    border: '2px solid black',
    backgroundColor: 'white',
    zIndex:'200',
    top: '4.5vh',
};

const menuLi = {
    margin: '3px',
    backgroundColor: 'white',
    zIndex:'200',
};

export default DropDown;