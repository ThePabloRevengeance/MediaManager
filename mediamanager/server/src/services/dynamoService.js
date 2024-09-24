const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const CONTENT_TABLE = process.env.DYNAMO_TABLE_CONTENT;

exports.getAllContents = async () => {
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

exports.getContentById = async (id) => {
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

exports.addContent = async (content) => {
    const params = {
        TableName: CONTENT_TABLE,
        Item: {
            id: content.id || new Date().toISOString(),
            ...content,
        },
    };

    try{
        await dynamoDb.put(params).promise();
    } catch (error) {
        throw new Error(`Error al añadir contenido: ${error.message}`);
    }
};

exports.updateContent = async (id, updateContent) => {
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

exports.deleteContent = async (id) => {
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