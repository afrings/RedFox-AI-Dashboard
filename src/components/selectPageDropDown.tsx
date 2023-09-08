import React from 'react';

const DropDown = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div>
            <button onClick={handleOpen}>Dropdown</button>
            {open ? (
                <ul style={menu}>
                    <li style={menuLi}>
                        <button>Menu 1</button>
                    </li>
                    <li style={menuLi}>
                        <button>Menu 2</button>
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
    width: '150px',
} as React.CSSProperties;

const menuLi = {
    margin: '1px',
    backgroundColor: 'white',
} as React.CSSProperties;

const menuButton = {
    width: '100%',
    height: '100%',
    textAlign: 'left',

    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: '5px',
    margin: '0',
    font: 'inherit',
    cursor: 'pointer',
} as React.CSSProperties;

export default DropDown;