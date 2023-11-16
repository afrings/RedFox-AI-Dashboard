import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate, logout } from '../services/authenticate';

export default function Login() {

    const [state, setState] = useState({username: '', password: ''});

    const handleChangeUsername = (event) => {
        setState({username: event.target.value, password: state.password})
    };

    const handleChangePassword = (event) => {
        setState({username: state.username, password: event.target.value})
    };

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/main');
    };

    const login = async(username, password, tempPassword) => {
        try{
            const response = await authenticate(username, password, tempPassword);
            sessionStorage.setItem('jwt', response.accessToken.jwtToken);
            handleClick();
        } catch(error) {
            console.log(error);
        }
        
    };
    
    return (
        <div style={pageFormat}>
            <input placeholder={"Username"} onChange={handleChangeUsername} style={inputUsernameStyle}></input>
            <input placeholder={"Password"} onChange={handleChangePassword} type='password' style={inputPasswordStyle}></input>
            <button style={loginButtonStyle} onClick={(e) => login('austin.frings@redfox-ai.com', 'Password12345,.')}> Login </button>
        </div>
    );
}

const pageFormat = {
    position: 'absolute',
    display: 'grid',
    gridAutoColumns: '11vw',
    gap: '5px',
    gridAutoRows: '5vh',
};

const inputUsernameStyle = {
    gridColumn: '4/7',
    gridRow: '9',
    textAlign: 'center',
    fontSize: '20px',
};

const inputPasswordStyle = {
    gridColumn: '4/7',
    gridRow: '10',
    textAlign: 'center',
    fontSize: '20px',
};

const loginButtonStyle = {
    gridColumn: '5/6',
    gridRow: '11',
    fontSize: '16px',
};