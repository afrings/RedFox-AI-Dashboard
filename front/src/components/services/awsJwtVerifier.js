import { CognitoJwtVerifier } from 'aws-jwt-verify';

const Verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.REACT_APP_DASHBOARD_USER_POOL_ID,
    clientId: process.env.REACT_APP_DASHBOARD_CLIENT_ID,
    tokenUse:'access',
})

export default Verifier;