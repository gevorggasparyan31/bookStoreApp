const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const jwtmiddleware = require('../middlewares/jwtmiddleware');
const checkUserActivation = require('../middlewares/userIsActivated');

router.get('/',jwtmiddleware, bookController.getAllBooks);
router.get('/:id',jwtmiddleware, bookController.getBookById);
router.post('/newBook', jwtmiddleware, checkUserActivation, bookController.createBook);
router.put('/:name', bookController.updateBook);
router.delete('/:name',jwtmiddleware, bookController.deleteBook);

module.exports = router;