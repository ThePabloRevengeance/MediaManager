const express = require('express');
const contentController = require('../controllers/contentController');
const router = express.Router();
const multer = require('multer');

const upload = multer();

router.get('/', contentController.getAllContents);

router.get('/:id', contentController.getContentById);

router.post('/', upload.single('file'), contentController.addContent);

router.put('/:id', contentController.updateContent);

router.delete('/:id', contentController.deleteContent);

module.exports = router;