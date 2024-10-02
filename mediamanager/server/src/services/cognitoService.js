// server/src/services/cognitoService.js
const AWS = require('aws-sdk');

const cognito = new AWS.CognitoIdentityServiceProvider({
    region: 'us-east-2', // Cambia a la región de tu User Pool
});

const listUsers = async () => {
    const params = {
        UserPoolId: process.env.COGNITO_USER_POOL_ID, // ID del User Pool
        Limit: 10, // Número de usuarios a listar, puedes ajustar el límite
    };

    try {
        const users = await cognito.listUsers(params).promise();
        return users.Users; // Devolver la lista de usuarios
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        throw new Error('No se pudo listar los usuarios');
    }
};

module.exports = {
    listUsers,
};
