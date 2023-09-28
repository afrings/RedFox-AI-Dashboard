import React from 'react';

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
        <div>
            <button onClick={handleOpen}>Change Display</button>
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

const menu = {
    position: 'absolute',
    listStyleType: 'none',
    margin: '5px 0',
    padding: '0',
    border: '2px solid black',
    backgroundColor: 'white',
    zIndex:'200',
} as React.CSSProperties;

const menuLi = {
    margin: '3px',
    backgroundColor: 'white',
    zIndex:'200',
} as React.CSSProperties;

const menuButton = {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    backgroundColor: 'white',
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: '5px',
    margin: '0',
    font: 'inherit',
    cursor: 'pointer',
    zIndex:'200',
} as React.CSSProperties;

export default DropDown;