const express = require('express');
const contentController = require('../controllers/contentController');
const router = express.Router();

router.get('/contents', contentController.getAllContents);

router.get('/contents/:id', contentController.getContentById);

router.post('/contents', contentController.addContent);

router.put('/content/:id', contentController.updateContent);

router.delete('/content/:id', contentController.deleteContent);

module.exports = router;