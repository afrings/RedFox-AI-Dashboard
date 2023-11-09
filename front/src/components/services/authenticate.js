import { AuthenticationDetails, CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";

const Userpool = new CognitoUserPool({
    UserPoolId: "us-east-1_VGCxxorff",
    ClientId: "3csq21turk649b3poj695sbnoi",
})

export const authenticate = (Email, Password) => {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({
            Username: Email,
            Pool: Userpool,
        })

        const authDetails = new AuthenticationDetails({
            Username: Email,
            Password: Password,
        })

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
                user.completeNewPasswordChallenge('password', attributesData, this)
            }
        });
    });
};

export const logout = () => {
    const user = Userpool.getCurrentUser();
    user.signOut();
    window.location.href = '/';
}