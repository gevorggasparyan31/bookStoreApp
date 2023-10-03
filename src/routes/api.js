const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', bookController.createBook);
router.put('/books/:name', bookController.updateBook);
router.delete('/books/:name', bookController.deleteBook);

module.exports = router;
