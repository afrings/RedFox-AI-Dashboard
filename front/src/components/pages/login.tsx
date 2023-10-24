import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/main');
    }

    const login = async(username, password) => {
        const response = await fetch(`http://localhost:3000/login?username=${username}&password=${password}`);
        const res = await response.json();
        console.log(res);
    }
    
    return (
        <div style={pageFormat}>
            <input placeholder={"Username"} style={inputUsernameStyle}></input>
            <input placeholder={"Password"} type='password' style={inputPasswordStyle}></input>
            <button style={loginButtonStyle} onClick={handleClick/**(e:any) => login('', '')**/}> Login </button>
        </div>
    )
};

const pageFormat = {
    position: 'absolute',
    display: 'grid',
    gridAutoColumns: '11vw',
    gap: '5px',
    gridAutoRows: '5vh',
} as React.CSSProperties;

const inputUsernameStyle = {
    gridColumn: '4/7',
    gridRow: '9',
    textAlign: 'center',
    fontSize: '20px',
} as React.CSSProperties;

const inputPasswordStyle = {
    gridColumn: '4/7',
    gridRow: '10',
    textAlign: 'center',
    fontSize: '20px',
} as React.CSSProperties;

const loginButtonStyle = {
    gridColumn: '5/6',
    gridRow: '11',
    fontSize: '16px',
} as React.CSSProperties;