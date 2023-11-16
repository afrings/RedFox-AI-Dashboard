import { AuthenticationDetails, CognitoUser, } from "amazon-cognito-identity-js";
import { CognitoIdentityServiceProvider } from "aws-sdk";

import Userpool from "./userpool";

export const authenticate = (Email, Password, TempPassword) => {
    return new Promise((resolve, reject) => {
        console.log('login')
        const user = new CognitoUser({
            Username: Email,
            Pool: Userpool,
        })
        const authDetails = new AuthenticationDetails({
            Username: Email,
            Password:  TempPassword ? TempPassword : Password,
        })
        console.log(authDetails)
        user.authenticateUser(authDetails, {
            onSuccess:(result) => {
                console.log('login successful');
                resolve(result);
            },
            onFailure:(err) => {
                console.log('login failed', err);
                reject(err);
            },
            newPasswordRequired: function(userAttributes, requiredAttributes) {
                // requiredAttributes: authDetails.Username;
                const attributesData = {}
                user.completeNewPasswordChallenge(Password, attributesData, this)
            },
            // mfaSetup: async function() {
            //     const identityProvider = new CognitoIdentityServiceProvider({ region: 'us-east-1' });
            //     const params = {}
            //     const res = await identityProvider.associateSoftwareToken(params, ()=>{});
            //     console.log(res)
            // },
        });
    });
};

export const logout = () => {
    const user = Userpool.getCurrentUser();
    user.signOut();
    window.location.href = '/';
}