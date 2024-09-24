const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const BUCKET_NAME = process.env.S3_BUCKET_NAME;

exports.uploadFile = async (file) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: `content/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
    };

    try{
        const result = await s3.upload(params).promise();
        return result.Key;
    } catch (error) {
        throw new Error(`Error al subir archivo a S3: ${error.message}`);
    }
};

exports.deleteFile = async (fileUrl) => {
    const fileName = fileUrl.split('/').pop();

    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
    };

    try{
        await s3.deleteObject(params).promise();
    } catch (error) {
        throw new Error(`Error al eliminar archivo de S3: ${error.message}`);
    }
};

module.exports = { uploadFile, deleteFile }