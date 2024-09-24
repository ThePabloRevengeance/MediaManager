import {Amplify}  from 'aws-amplify'; //{ Auth }
import { fetchAuthSession } from 'aws-amplify/auth'
//import { Auth } from 'aws-amplify/auth';
import { signUp } from 'aws-amplify/auth';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);
export const registerUser = async (username, email, password) => {
    try{
        await signUp({
            username,
            password,
            attributes: {
                email,
            },
        });
    } catch (error) {
        throw new Error(error.message);
    }
};