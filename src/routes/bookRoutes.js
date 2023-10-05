const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { validateData } = require('../validations/bookValidation');
const jwtmiddleware = require('../middlewares/jwtmiddleware')

router.get('/',jwtmiddleware, bookController.getAllBooks);
router.get('/:id',jwtmiddleware, bookController.getBookById);
router.post('/newBook', validateData.data, bookController.createBook);
router.put('/:name', bookController.updateBook);
router.delete('/:name',jwtmiddleware, bookController.deleteBook);

module.exports = router;