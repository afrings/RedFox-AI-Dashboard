import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signOut, confirmSignIn, fetchAuthSession } from 'aws-amplify/auth';
import { Box, Card, CardContent, CardMedia} from '@mui/material';
import QRCode from 'react-qr-code';
// import ReCAPTCHA from 'react-google-recaptcha';
import isPasswordValid from '../services/isPasswordValid';
import imageUrl from '../assets/Secondary-CMYK.png'

export default function Login() {

    const navigate = useNavigate();
    const [state, setState] = useState({
        username: 'austin.frings@redfox-ai.com', 
        password: 'Pass12,.', 
        newPassword: '', 
        useSavedPassword: false, 
        savedPassword: '',
    });
    const [loginStage, setLoginStage] = useState('login');
    const [passwordWarning, setPasswordWarning] = useState({passwordWarningMessage: ''});
    const [mfa, setMfa] = useState({mfaCode: '', mfaUri: ''});

    // custom event and promise to pass totp to the login function
    const event = new Event('totp');
    var totpPromise = new Promise((resolve) => {
        document.addEventListener('totp', (e) => {
            // get totp directly from element rather than state object bc state will not be updated immediately
            resolve(document.getElementById('mfaInput').value);
        });
    });
    
    // give value to the button once the correct part of the login stage has been reached
    var button;
    useEffect(() => {
        if (loginStage === 'mfaSetup' || loginStage === 'mfa'){
            button = document.getElementById('button');
            if (button) {
                // button click event triggers custom event declared above, resolving the promise in
                // CONTINUE_SIGN_IN_WITH_TOTP_SETUP or CONFIRM_SIGN_IN_WITH_TOTP_CODE
                button.addEventListener('click', function() {
                    document.dispatchEvent(event);
                });
            }
        }
    });

    const handleChangeMfaCode = (event) => {
        setMfa((prevState) => ({...prevState, mfaCode: event.target.value,}));
    };

    const handleChangeUsername = (event) => {
        setState((prevState) => ({...prevState, username: event.target.value,}));
    };

    const handleChangePassword = (event) => {
        setState((prevState) => ({...prevState, password: event.target.value,}));
        if (loginStage === 'requestNewPassword') checkPasswords(event.target.value, state.newPassword);
    };

    const handleChangeNewPassword = (event) => {
        setState((prevState) => ({...prevState, newPassword: event.target.value}));
        if (loginStage === 'requestNewPassword') checkPasswords(state.password, event.target.value);
    }

    const checkPasswords = (password, newPassword) => {
        if (password !== newPassword && password.length > 0 && newPassword.length > 0) {
            setPasswordWarning({showPasswordWarning: true, passwordWarningMessage: "Passwords Do Not Match"});
        } else if (!isPasswordValid(password) && password.length > 0 || !isPasswordValid(newPassword) && newPassword.length > 0){
            setPasswordWarning({showPasswordWarning: true, passwordWarningMessage: "Passwords Must Have A Minimum of 8 Characters, Contain at least 1 Number, 1 Special Character, 1 Uppercase Letter, and 1 Lowercase Letter"});
        } else {
            setPasswordWarning({showPasswordWarning: true, passwordWarningMessage: ''});
        }
    }

    const onChange = (value) => {
        console.log('Captcha value: ', value);
    }

    const signInWithNewPassword = async(password) => {
        // store the temporary password to be used automatically with next signIn
        setState((prevState) => ({...prevState, useSavedPassword: true, savedPassword: password}));
        setLoginStage('requestNewPassword');
        setState((prevState) => ({...prevState, password: ''}));
        if (isPasswordValid(state.newPassword) && isPasswordValid(state.password) && state.newPassword === state.password){
            try {
                var response = await confirmSignIn({challengeResponse: state.password});
                console.log(response);
                setState((prevState) => ({...prevState, password: '', newPassword: ''}));
                setState((prevState) => ({...prevState, useSavedPassword: false, savedPassword: ''}));
                setLoginStage('login');
            } catch(e) {
                console.log(e);
            }
        }
    };

    const signInWithTotpSetup = async(nextStep) => {
        const totpSetupDetails = nextStep.totpSetupDetails;
        const appName = 'RedFox AI Dashboard';
        const setupUri = totpSetupDetails.getSetupUri(appName);
        setMfa((prevState) => ({...prevState, mfaUri: setupUri.href,}));

        setLoginStage('mfaSetup');

        var totp = await totpPromise;
        console.log('TOTP RESPONSE: ', totp);
        var needTotp = true;
        while (needTotp) {
            try {
                var response = await confirmSignIn({challengeResponse: totp});
                needTotp = false;
            } catch (e) {
                totpPromise = new Promise((resolve) => {
                    document.addEventListener('totp', (e) => {
                        resolve(document.getElementById('mfaInput').value);
                    });
                });
                totp = await totpPromise;
            }
        }
    };

    const signInWithTotpCode = async() => {
        var totp = await totpPromise;
        console.log('TOTP RESPONSE: ', totp);
        var needTotp = true;
        while (needTotp) {
            try {
                var response = await confirmSignIn({challengeResponse: totp});
                needTotp = false;
            } catch (e) {
                totpPromise = new Promise((resolve) => {
                    document.addEventListener('totp', (e) => {
                        resolve(document.getElementById('mfaInput').value);
                    });
                });
                totp = await totpPromise;
            }
        }
    }

    const login = async(username, password, tempPassword) => {
        try{
            console.log(`Username: ${username} Password: ${state.useSavedPassword ? state.savedPassword : password}`);
            const { isSignedIn, nextStep } = await signIn({ username: username, password: state.useSavedPassword ? state.savedPassword : password });
            var { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
            console.log(nextStep)
            switch (nextStep.signInStep) {
                case 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED':
                    console.log('request new password');
                    await signInWithNewPassword(password);
                    break;

                case 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP':
                    console.log('mfaSetup');
                    await signInWithTotpSetup(nextStep);
                    var { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
                    break;

                case 'CONFIRM_SIGN_IN_WITH_TOTP_CODE':
                    setLoginStage('mfa');
                    await signInWithTotpCode();
                    var { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
                    break;
            }
            if (accessToken) {
                sessionStorage.setItem('jwt', accessToken.toString());
                navigate('/main');
            }
        } catch(error) {
            if (error.name === 'UserAlreadyAuthenticatedException') {
                console.log('ReLogIn')
                try {
                    await signOut();
                    login(username, password, tempPassword);
                } catch(error) {
                    if (error.name === 'NotAuthorizedException') {
                        console.log('caught not authorized');
                        setLoginStage('incorrect username or password');
                    } else {
                        console.log(error)
                    }
                }
            } else if (error.name === 'NotAuthorizedException') {
                setLoginStage('incorrect username or password');
            } else {
                console.log(error.name);
            }
        }
        
    };
    
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
        <Card raised sx={{border: 1 }}>
            <CardMedia
                component='img'
                sx={{height: 55, objectFit: 'contain', paddingRight: 5, paddingTop: 2}}
                image={imageUrl}
                title='redfox'
            />
            <CardContent>
                {loginStage === 'login' ? 
                // normal login
                <div style={pageFormat}>
                    <input placeholder={"Username"} value={state.username} onChange={handleChangeUsername} style={inputUsernameStyle}></input>
                    <input placeholder={"Password"} value={state.password} onChange={handleChangePassword} /*type='password'*/ style={inputPasswordStyle}></input>
                    <button style={loginButtonStyle} onClick={(e) => login(state.username, state.password, state.newPassword)}> Login </button>
                </div>
                : null}

                {loginStage === 'requestNewPassword' ? 
                // request new password
                <div style={pageFormat}>
                    <div style={passwordWarningStyle}> {passwordWarning.passwordWarningMessage} </div>
                    <input placeholder={'New Password'} value={state.password} onChange={handleChangePassword} type='password' style={inputPasswordStyle}></input>
                    <input placeholder={'Confirm New Password'} value={state.newPassword} onChange={handleChangeNewPassword} type='password' style={inputNewPasswordStyle}></input>
                    <button style={loginButtonStyle} onClick={(e) => login(state.username, state.password, state.newPassword)}> Set New Password </button>
                </div>
                : null}

                {loginStage === 'mfaSetup' ? 
                // request totp
                <div style={pageFormat}>
                    <QRCode value={mfa.mfaUri} style={mfaQrCodeStyle}/>
                    <input id='mfaInput' autoComplete='off' placeholder={'Multi-Factor Authentication Code'} value={mfa.mfaCode} onChange={handleChangeMfaCode} style={mfaCodeInputStyle}></input>
                    <button id='button' style={loginButtonStyle} onClick={null}> Confirm MFA </button>
                </div>
                : null}

                {loginStage === 'mfa' ? 
                // request totp
                <div style={pageFormat}>
                    <input id='mfaInput' autoComplete='off' placeholder={'Multi-Factor Authentication Code'} value={mfa.mfaCode} onChange={handleChangeMfaCode} style={mfaCodeInputStyle}></input>
                    <button id='button' style={loginButtonStyle} onClick={null}> Confirm MFA </button>
                </div>
                : null}

                {loginStage === 'incorrect username or password' ? 
                <div style={pageFormat}>
                    <span style={wrongPasswordMessageStyle}> Incorrect Username or Password </span>
                    <input placeholder={"Username"} value={state.username} onChange={handleChangeUsername} style={inputUsernameStyle}></input>
                    <input placeholder={"Password"} value={state.password} onChange={handleChangePassword} type='password' style={inputPasswordStyle}></input>
                    <button style={loginButtonStyle} onClick={(e) => login(state.username, state.password, state.newPassword)}> Login </button>
                    <button style={loginButtonStyle} onClick={(e) => navigate('/resetPassword')}> Password Recovery </button>
                </div>
                : null}
            </CardContent>
        </Card>
        </Box>
    );
}

// Styling

const pageFormat = {
    display: 'grid',
    padding: '15px',
};

const passwordWarningStyle = {
    textAlign: 'center',
    fontSize: '20px',
    width: '400px',
}

const inputUsernameStyle = {
    textAlign: 'center',
    fontSize: '20px',
    padding: '5px 5px 5px 5px',
};

const inputPasswordStyle = {
    textAlign: 'center',
    fontSize: '20px',
    padding: '5px 5px 5px 5px',
};

const inputNewPasswordStyle = {
    textAlign: 'center',
    fontSize: '20px',
    padding: '5px 5px 5px 5px',
};

const loginButtonStyle = {
    fontSize: '20px',
};

const mfaQrCodeStyle = {
    width: 'auto',
    height: 'auto',
};

const mfaCodeInputStyle = {
    textAlign: 'center',
    fontSize: '20px',
    padding: '5px 5px 5px 5px',
};

const wrongPasswordMessageStyle = {
    color: 'red',
    textAlign: 'center',
    fontFamily: 'Arial',
}
