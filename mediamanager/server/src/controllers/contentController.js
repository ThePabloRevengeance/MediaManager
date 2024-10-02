const {
    getAllContents: getDynamoContents,
    getContentById: getDynamoContentsById,
    addContent: addDynamoContent,
    updateContent: updateDynamoContent,
    deleteContent: deleteDynamoContent
} = require('../services/dynamoService');
const s3Service = require('../services/s3Service');
const multipart = require('aws-lambda-multipart-parser');
const response = require('../utils/response');

// Obtener todos los contenidos
const getAllContents = async (event) => {
    try {
        const contents = await getDynamoContents();
        return response(200, contents);
    } catch (error) {
        return response(500, { error: 'Error al obtener los contenidos', details: error.message });
    }
};

// Obtener contenido por ID
const getContentById = async (event) => {
    const { id } = event.pathParameters;
    try {
        const content = await getDynamoContentsById(id);
        if (!content) {
            return response(404, { error: 'Contenido no encontrado' });
        }
        return response(200, content);
    } catch (error) {
        return response(500, { error: 'Error al obtener el contenido', details: error.message });
    }
};

// Añadir nuevo contenido
const addContent = async (event) => {
    
    try {
        const parsedEvent = multipart.parse(event,true)
        const { title, description, category/*, file */} = parsedEvent //JSON.parse(event.body);
        const file = parsedEvent.file;
        let newContent;
        if (file) {
            //const fileBuffer = Buffer.from(file.content/*file, 'base64'*/);
            const s3Result = await s3Service.uploadFile(file);
            newContent = {
                id: s3Result.Key,
                title,
                description,
                category,
                fileUrl: s3Result.Location,
            };
        } else {
            newContent = {
                id: 1234,
                title,
                description,
                category,
            };
        }
        await addDynamoContent(newContent);

        return response(201, { message: 'Contenido añadido exitosamente', content: newContent });
    } catch (error) {
        return response(500, { error: 'Error al añadir el contenido', details: error.message });
    }
};

// Actualizar contenido
const updateContent = async (event) => {
    const { id } = event.pathParameters;
    const { title, description, category, file } = JSON.parse(event.body);

    try {
        let updatedContent = { title, description, category };

        if (file) {
            const s3Result = await s3Service.uploadFile(file);
            updatedContent.fileUrl = s3Result.Location;
        }

        await updateDynamoContent(id, updatedContent);

        return response(200, { message: 'Contenido actualizado exitosamente', updatedContent });
    } catch (error) {
        return response(500, { error: 'Error al actualizar el contenido', details: error.message });
    }
};

// Eliminar contenido
const deleteContent = async (event) => {
    const { id } = event.pathParameters;

    try {
        const content = await getDynamoContentsById(id);
        if (!content) {
            return response(404, { error: 'Contenido no encontrado' });
        }

        if (content.fileUrl) {
            await s3Service.deleteFile(content.fileUrl);
        }

        await deleteDynamoContent(id);

        return response(200, { message: 'Contenido eliminado exitosamente' });
    } catch (error) {
        return response(500, { error: 'Error al eliminar el contenido', details: error.message });
    }
};

module.exports = { getAllContents, getContentById, addContent, updateContent, deleteContent };
/*statusCode: 200,
            body: JSON.stringify({ message: 'Contenido eliminado exitosamente' }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  // Habilitar CORS
}
*/
/*const { 
    getAllContents: getDynamoContents,
    getContentById: getDynamoContentsById, 
    addContent: addDynamoContent, 
    updateContent: updateDynamoContent, 
    deleteContent: deleteDynamoContent
} = require('../services/dynamoService'); //dynamoService
const s3Service = require('../services/s3Service');
//const {Request,Response} = require('express');

const getAllContents = async (req, res) => {
    try{
        const contents = await getDynamoContents(); //dynamoService.
        res.json(contents);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los contenidos' });
    }
};

const getContentById = async (req, res) => {
    const { id } = req.params;
    try {
        const content = await getDynamoContentsById(id); //dynamoService.
        if(!content){
            return res.status(404).json({ error: 'Contenido no encontrado'});
        }
        res.json(content);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el contenido '});
    }
};

const addContent = async (req, res) => {
    const { title, description, category, file} = req.body;
    //console.log(req.body);
    console.log(file);
    try{
        let newContent;
        if(file){
            const s3Result = await s3Service.uploadFile(file);
            newContent = {
                id: s3Result.Key,
                title,
                description,
                category,
                fileUrl: s3Result.Location,
            };
        }else{
            newContent = {
                id: 1234,
                title,
                description,
                category,
            };
        }
        console.log(newContent);
        const response = await addDynamoContent(newContent); //dynamoService.
        console.log(response);
        //res.status(201).json({ message: 'Contenido añadido exitosamente', content: newContent });
    } catch (error) {
        res.status(500).json({ error: 'Error al añadir el contenido '});
    }
};

const updateContent = async (req, res) => {
    const { id } = req.params;
    const { title, description, category, file} = req.body;

    try {
        let updatedContent = {
            title, 
            description,
            category,
        };

        if(file) {
            const s3Result = await s3Service.uploadFile(file);
            updatedContent.fileUrl = s3Result.Location;
        }

        await updateDynamoContent(id, updatedContent); //dynamoService.

        res.json({ message: 'Contenido actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el contenido' });
    }
};

const deleteContent = async (req, res) => {
    const { id } = req.params;

    try{
        const content = await getContentById(id); //dynamoService.
        if(!content) {
            return res.status(404).json({ error: 'Contenido no encontrado' });
        }

        if(content.fileUrl) {
            await s3Service.deleteFile(content.fileUrl);
        }

        await deleteDynamoContent(id); //dynamoService.

        res.json({ message: 'Contenido eliminado exitosamente '});
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el contenido' });
    }
};

module.exports = {getAllContents, getContentById, addContent, updateContent, deleteContent}
/*
const getContents = async (req, res) => {
    try {
        const contents = await getAllContents();
        res.status(200).json(contents);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el contenido'});
    }
};

const createContent = async (req, res) => {
    try{
        const contentData = req.body;
        const newContent = await createContent(contentData);
        req.status(201).json(newContent);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el contenido' });
    }
};
*/
