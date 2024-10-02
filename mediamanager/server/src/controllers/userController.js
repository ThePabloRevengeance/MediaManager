const dynamoService = require('../services/dynamoService');
const cognitoService = require('../services/cognitoService');
const UserModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
    try{
        const dynamoUsers = await dynamoService.scanTable('Users');
        const cognitoUsers = await cognitoService.listUsers();

        const allUsers = [...dynamoUsers, ...cognitoUsers]
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error});
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await dynamoService.getItem('Users', {id});
        if(!user) {
            return res.status(400).json({ message: 'Usuario no encontrado'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error});
    }
};

const createUser = async (req, res) => {
    const {id, username, email, role} = req.body;
    const newUser = {
        id,
        username,
        email,
        role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    try{
        await dynamoService.putItem('Users', newUser);
        res.status(201).json({message: 'Usuario creado exitosamente', newUser});
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

const updateUser = async(req, res) => {
    const {id} = req.params;
    const {username, email, role} = req.body;
    const updatedUser = {
        id,
        username,
        email,
        role,
        updatedAt: new Date().toISOString(),
    };

    try{
        await dynamoService.updateItem('Users', {id}, updatedUser);
        res.status(200).json({message: 'Usuario actualizado exitosamente', updatedUser});
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error});
    }
};

const deleteUser = async(req, res) => {
    const {id} = req.params;
    try{
        await dynamoService.deleteItem('Users', {id});
        res.status(200).json({message: 'Usuario eliminado exitosamente'});
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error});
    }
};

module.exports = {getAllUsers, getUserById, createUser, updateUser, deleteUser};