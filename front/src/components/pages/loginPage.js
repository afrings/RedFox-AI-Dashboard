import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signOut, confirmSignIn, fetchAuthSession } from 'aws-amplify/auth';
import QRCode from 'react-qr-code';
import isPasswordValid from '../services/isPasswordValid';

export default function Login() {

    const [state, setState] = useState({username: 'austin.frings@redfox-ai.com', password: 'Password12,.', newPassword: ''});
    const [requestNewPassword, setRequestNewPassword] = useState(false);
    const [passwordWarning, setPasswordWarning] = useState({showPasswordWarning: false, passwordWarningMessage: ''});
    const [savedPassword, setSavedPassword] = useState({useSavedPassword: false, savedPassword: ''});
    const [mfa, setMfa] = useState('');

    const handleChangeUsername = (event) => {
        setState({username: event.target.value, password: state.password, newPassword: state.newPassword});
    };

    const handleChangePassword = (event) => {
        setState({username: state.username, password: event.target.value, newPassword: state.newPassword});
        if (requestNewPassword) checkPasswords(event.target.value, state.newPassword);
    };

    const handleChangeNewPassword = (event) => {
        setState({username: state.username, password: state.password, newPassword: event.target.value});
        if (requestNewPassword) checkPasswords(state.password, event.target.value);
    }

    const checkPasswords = (password, newPassword) => {
        if (password !== newPassword && password.length > 0 && newPassword.length > 0) {
            setPasswordWarning({showPasswordWarning: true, passwordWarningMessage: "Passwords Do Not Match"});
        } else if (!isPasswordValid(password) && password.length > 0 || !isPasswordValid(newPassword) && newPassword.length > 0){
            setPasswordWarning({showPasswordWarning: true, passwordWarningMessage: "Passwords Must Have A Minimum of 8 Characters, Contain at least 1 Number, 1 Special Character, 1 Uppercase Letter, and 1 Lowercase Letter"});
        } else {
            setPasswordWarning({showPasswordWarning: false, passwordWarningMessage: ''});
        }
    }

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/main');
    };

    const login = async(username, password, tempPassword) => {
        try{
            console.log(`Username: ${username} Password: ${savedPassword.useSavedPassword ? savedPassword.savedPassword : password}`);
            const { isSignedIn, nextStep } = await signIn({ username: username, password: savedPassword.useSavedPassword ? savedPassword.savedPassword : password });
            const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
            console.log(nextStep)
            switch (nextStep.signInStep) {
                case 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED':
                    // store the temporary password
                    setSavedPassword({useSavedPassword: true, savedPassword: password});
                    setNewPassword();

                case 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP':
                    const totpSetupDetails = nextStep.totpSetupDetails;
                    const appName = 'RedFox-AI Logistics Dashboard';
                    const setupUri = totpSetupDetails.getSetupUri(appName);
                    setMfa(setupUri.href);
            }
            if (accessToken) {
                sessionStorage.setItem('jwt', accessToken.toString());
                handleClick();
            }
        } catch(error) {
            if (error.name === 'UserAlreadyAuthenticatedException') {
                try {
                    await signOut();
                    login(username, password, tempPassword);
                } catch(error) {
                    console.log(error)
                }
                
            } else {
                console.log(error);
            }
        }
        
    };

    const setNewPassword = async() => {
        setRequestNewPassword(true);
        setState({username: state.username, password: '', newPassword: state.newPassword});
        if (isPasswordValid(state.newPassword) && isPasswordValid(state.password) && state.newPassword === state.password){
            try {
                const response = await confirmSignIn({challengeResponse: state.password});
                setState({username: state.username, password: '', newPassword: ''});
                setSavedPassword({useSavedPassword: false, savedPassword: ''});
                setRequestNewPassword(false);
            } catch(e) {
                console.log(e);
            }
        }
    }
    
    return (
        <div style={pageFormat}>
            <QRCode value={mfa} />
            {passwordWarning.showPasswordWarning ?
            <div style={passwordWarningStyle}> {passwordWarning.passwordWarningMessage} </div>
            : null}
            <input placeholder={"Username"} value={state.username} onChange={handleChangeUsername} style={inputUsernameStyle}></input>
            <input placeholder={requestNewPassword ? "New Password " : "Password"} value={state.password} onChange={handleChangePassword} /*type='password'*/ style={inputPasswordStyle}></input>
            {requestNewPassword ? 
            <input placeholder={"New Password"} value={state.newPassword} onChange={handleChangeNewPassword} type='password' style={inputNewPasswordStyle}></input>    
            : null}
            <button style={loginButtonStyle} onClick={(e) => login(state.username, state.password, state.newPassword)}> Login </button>
        </div>
    );
}

// Styling

const pageFormat = {
    position: 'absolute',
    display: 'grid',
    gridAutoColumns: '11vw',
    gap: '5px',
    gridAutoRows: '5vh',
};

const passwordWarningStyle = {
    gridColumn: '4/7',
    gridRow: '6',
    textAlign: 'center',
    fontSize: '20px',
}

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

const inputNewPasswordStyle = {
    gridColumn: '4/7',
    gridRow: '11',
    textAlign: 'center',
    fontSize: '20px',
};

const loginButtonStyle = {
    gridColumn: '5/6',
    gridRow: '12',
    fontSize: '16px',
};

const logoutButtonStyle = {
    gridColumn: '5/6',
    gridRow: '13',
    fontSize: '16px',
};