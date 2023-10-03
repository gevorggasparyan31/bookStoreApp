const bookService = require('../services/bookService');
const { body, validationResult } = require('express-validator');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch books' });
    }
};

exports.getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await bookService.getBookById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch the book' });
    }
};

exports.createBook = [
    body('title').notEmpty(),
    body('author').notEmpty(),
    body('description').notEmpty(),
    body('image').notEmpty(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },

    async (req, res) => {
        try {
            const { title, author, description, image } = req.body; // Corrected
            const newBook = await bookService.createBook({ title, author, description, image });
            res.status(201).json(newBook);
        } catch (err) {
            res.status(500).json({ error: 'Unable to create the book' });
        }
    }
];

exports.updateBook = async (req, res) => {
    const { title } = req.params;
    const { author, description, image } = req.body;

    try {
        const updatedBook = await bookService.updateBook(title, { author, description, image });

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update the book' });
    }
};

exports.deleteBook = async (req, res) => {
    const { name } = req.params;

    try {
        const deletedBook = await bookService.deleteBook(name);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Unable to delete the book' });
    }
};