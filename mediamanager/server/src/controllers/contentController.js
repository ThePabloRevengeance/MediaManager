const { getAllContents, getContentById, addContent, updateContent, deleteContent } = require('../services/dynamoService'); //dynamoService
const s3Service = require('../services/s3Service');

exports.getAllContents = async (req, res) => {
    try{
        const contents = await getAllContents(); //dynamoService.
        res.json(contents);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los contenidos' });
    }
};

exports.getContentById = async (req, res) => {
    const { id } = req.params;
    try {
        const content = await getContentById(id); //dynamoService.
        if(!content){
            return res.status(404).json({ error: 'Contenido no encontrado'});
        }
        res.json(content);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el contenido '});
    }
};

exports.addContent = async (req, res) => {
    const { title, description, category, file} = req.body;

    try{
        const s3Result = await s3Service.uploadFile(file);
        const newContent = {
            id: s3Result.Key,
            title,
            description,
            category,
            fileUrl: s3Result.Location,
        };

        await addContent(newContent); //dynamoService.

        res.status(201).json({ message: 'Contenido añadido exitosamente', content: newContent });
    } catch (error) {
        res.status(500).json({ error: 'Error al añadir el contenido '});
    }
};

exports.updateContent = async (req, res) => {
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

        await updateContent(id, updatedContent); //dynamoService.

        res.json({ message: 'Contenido actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el contenido' });
    }
};

exports.deleteContent = async (req, res) => {
    const { id } = req.params;

    try{
        const content = await getContentById(id); //dynamoService.
        if(!content) {
            return res.status(404).json({ error: 'Contenido no encontrado' });
        }

        if(content.fileUrl) {
            await s3Service.deleteFile(content.fileUrl);
        }

        await deleteContent(id); //dynamoService.

        res.json({ message: 'Contenido eliminado exitosamente '});
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el contenido' });
    }
};

module.exports = {getAllContents, getContentById, addContent, updateContent, deleteContent}
/*
exports.getContents = async (req, res) => {
    try {
        const contents = await getAllContents();
        res.status(200).json(contents);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el contenido'});
    }
};

exports.createContent = async (req, res) => {
    try{
        const contentData = req.body;
        const newContent = await createContent(contentData);
        req.status(201).json(newContent);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el contenido' });
    }
};
*/
