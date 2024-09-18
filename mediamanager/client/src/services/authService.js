import { Auth } from 'aws-amplify';

export const registerUser = async (username, email, password) => {
    try{
        await Auth.signUp({
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