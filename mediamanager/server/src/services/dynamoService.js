const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const CONTENT_TABLE = "CONTENT"//process.env.DYNAMO_TABLE_CONTENT;

console.log("CONTENT TABLE:", CONTENT_TABLE);
const getAllContents = async () => {
    const params = {
        TableName: CONTENT_TABLE,
    };

    try{
        const result = await dynamoDb.scan(params).promise();
        return result.Items;
    } catch (error) {
        throw new Error(`Error al obtener contenidos: ${error.message}`);
    }
};

const getContentById = async (id) => {
    const params = {
        TableName: CONTENT_TABLE,
        Key: { id },
    };

    try {
        const result = await dynamoDb.get(params).promise();
        return result.Item;
    } catch (error) {
        throw new Error(`Error al obtener contenido: ${error.message}`);
    }
};

const addContent = async ({contentId, title, description, category, fileUrl/*content*/}) => {
    const params = {
        TableName: CONTENT_TABLE,
        Item: {
            id: contentId/*content.id*/ || new Date().toISOString(),
            title,
            description,
            category,
            fileUrl
            //...content,
        },
    };
    console.log("AAAAAAAAAH", params);
    try{
        console.log("MATENMEEEEEEEEE");
        await dynamoDb.put(params).promise();
        console.log("DEBÏ ESTUDIAR ADMINISTRACION DE EMPRESA");
    } catch (error) {
        throw new Error(`Error al añadir contenido: ${error}`);
    }
};

const updateContent = async (id, updateContent) => {
    const params = {
        TableName: CONTENT_TABLE,
        Key: { id },
        UpdateExpression: 'set title = :title, description = :description, category = :category, fileUrl = :fileUrl',
        ExpressionAttributeValues: {
            ':title': updateContent.title,
            ':description': updateContent.description,
            ':category': updateContent.category,
            ':fileUrl': updateContent.fileUrl || null,
        },
        ReturnValues: 'UPDATED_NEW',
    };

    try {
        await dynamoDb.update(params).promise();
    } catch (error) {
        throw new Error(`Error al actualizar contenido: ${error.message}`);
    }
};

const deleteContent = async (id) => {
    const params = {
        TableName: CONTENT_TABLE,
        Key: { id },
    };

    try {
        await dynamoDb.delete(params).promise();
    } catch (error) {
        throw new Error(`Error al eliminar contenido: ${error.message}`);
    }
};

module.exports = { getAllContents, getContentById, addContent, updateContent, deleteContent }