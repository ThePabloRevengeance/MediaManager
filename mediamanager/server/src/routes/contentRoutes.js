const express = require('express');
const contentController = require('../controllers/contentController');
const router = express.Router();
const multer = require('multer');

const upload = multer();

router.get('/contents', contentController.getAllContents);

router.get('/contents/:id', contentController.getContentById);

router.post('/contents', upload.single('file'), contentController.addContent);

router.put('/content/:id', contentController.updateContent);

router.delete('/content/:id', contentController.deleteContent);

module.exports = router;