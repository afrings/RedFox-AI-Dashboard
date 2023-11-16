import { CognitoUserPool } from 'amazon-cognito-identity-js'

const Userpool = new CognitoUserPool({
    UserPoolId: process.env.REACT_APP_DASHBOARD_USER_POOL_ID,
    ClientId: process.env.REACT_APP_DASHBOARD_CLIENT_ID,
});

export default Userpool;