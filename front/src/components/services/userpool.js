import { CognitoUserPool } from 'amazon-cognito-identity-js'

const Userpool = new CognitoUserPool({
    UserPoolId: process.env.DASHBOARD_USER_POOL_ID,
    ClientId: process.env.DASHBOARD_CLIENT_ID,
});

export default Userpool;