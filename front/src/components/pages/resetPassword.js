import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {resetPassword, confirmResetPassword, } from 'aws-amplify/auth';
import { Box, Card, CardContent, CardMedia} from '@mui/material';
import QRCode from 'react-qr-code';
// import ReCAPTCHA from 'react-google-recaptcha';
import isPasswordValid from '../services/isPasswordValid';
import imageUrl from '../assets/Secondary-CMYK.png'

export default function ResetPassword() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: '', 
        newPassword: '', 
        reNewPassword: '', 
        totpCode: '',
        resetStage: 'enterEmail',
        errorMessage: '',
        passwordWarningMessage: '',
    });

    const handleChangeUsername = (event) => {
        setState((prevState) => ({
            ...prevState, 
            username: event.target.value,
        }));
    };

    const handleChangeNewPassword = (event) => {
        setState((prevState) => ({
            ...prevState, 
            newPassword: event.target.value
        }));
        checkPasswords(event.target.value, state.reNewPassword);
    };

    const handleChangeReNewPassword = (event) => {
        setState((prevState) => ({
            ...prevState, 
            reNewPassword: event.target.value
        }));
        checkPasswords(state.newPassword, event.target.value);
    }

    const handleChangeTotpCode = (event) => {
        setState((prevState) => ({
            ...prevState, 
            totpCode: event.target.value
        }));
    }

    const checkPasswords = (newPassword, reNewPassword) => {
        if (newPassword !== reNewPassword && newPassword.length > 0 && reNewPassword.length > 0) {
            setState((prevState) => ({
                ...prevState, 
                passwordWarningMessage: 'Passwords Do Not Match'
            }));
        } else if (!isPasswordValid(newPassword) && newPassword.length > 0 || !isPasswordValid(reNewPassword) && reNewPassword.length > 0){
            setState((prevState) => ({
                ...prevState, 
                passwordWarningMessage: 'Passwords Must Have A Minimum of 8 Characters, Contain at least 1 Number, 1 Special Character, 1 Uppercase Letter, and 1 Lowercase Letter'
            }));
        } else {
            setState((prevState) => ({
                ...prevState, 
                passwordWarningMessage: ''
            }));
        }
    }

    const handleResetPassword = async(username) => {
        try {
          const output = await resetPassword({ username });
          handleResetPasswordNextSteps(output);
        } catch (error) {
          if(error.name === 'EmptyResetPasswordUsername') {
            setState((prevState) => ({
                ...prevState,
                errorMessage: 'Please Enter A Valid Email',
            }))
          }
        }
      }
      
    function handleResetPasswordNextSteps(output) {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
        case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        console.log(
            `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
        );
        setState((prevState) => ({
            ...prevState, 
            resetStage: 'enterCode'
        }));
        break;
        case 'DONE':
        console.log('Successfully reset password.');
        break;
    }
    }

    const handleConfirmResetPassword = async(username, confirmationCode, newPassword) => {
        if(isPasswordValid(newPassword) & state.newPassword === state.reNewPassword) {
            try {
                const res = await confirmResetPassword({ username, confirmationCode, newPassword });
                console.log(res);
                navigate('/');
            } catch (error) {
                console.log(error.name);
                if (error.name === 'CodeMismatchException') {
                    setState((prevState) => ({
                        ...prevState,
                        errorMessage: 'We\'re sorry, but the code you have entered is not valid.'
                    }))
                }
            }
        }
    }
    
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
                {state.resetStage === 'enterEmail' ? 
                    <div style={pageFormat}>
                        <span style={instructionsStyle}>Please Enter Your Email</span>
                        <span style={errorStyle}>{state.errorMessage}</span>
                        <input placeholder={"Email"} value={state.username} onChange={handleChangeUsername} style={inputUsernameStyle}></input>
                        <button style={loginButtonStyle} onClick={(e) => handleResetPassword(state.username)}> Reset Password </button>
                    </div>
                : null}
                {state.resetStage === 'enterCode' ? 
                    <div style={pageFormat}>
                        <span style={errorStyle}>{state.errorMessage}</span>
                        <span style={instructionsStyle}> If we have your email in our system, an email with your code should have been sent. Please check your inbox. </span>
                        <input placeholder={"Code"} value={state.totpCode} onChange={handleChangeTotpCode} style={inputUsernameStyle}></input>
                        <span style={instructionsStyle}> Don't see your code? Please allow at least 1 minute before requesting another code.</span>
                        <button style={loginButtonStyle} onClick={(e) => handleResetPassword(state.username)}> Resend Code </button>
                        <span style={instructionsStyle}> Please enter your new password below. </span>
                        <span style={errorStyle}>{state.passwordWarningMessage}</span>
                        <input placeholder={"New Password"} value={state.newPassword} onChange={handleChangeNewPassword} type='password' style={inputUsernameStyle}></input>
                        <input placeholder={"Re-enter Password"} value={state.reNewPassword} onChange={handleChangeReNewPassword} type='password' style={inputUsernameStyle}></input>
                        <button style={loginButtonStyle} onClick={(e) => handleConfirmResetPassword(state.username, state.totpCode, state.newPassword)}> Reset Password </button>
                        
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
};

const instructionsStyle = {
    textAlign: 'center',
    fontSize: '20px',
    width: '400px',
    paddingTop: '15px',
    paddingBottom: '0px',
}

const errorStyle = {
    color: 'red',
    textAlign: 'center',
    fontFamily: 'Arial',
    width: '400px'
}

const inputUsernameStyle = {
    textAlign: 'center',
    fontSize: '20px',
    padding: '5px 5px 5px 5px',
};

const loginButtonStyle = {
    fontSize: '20px',
};