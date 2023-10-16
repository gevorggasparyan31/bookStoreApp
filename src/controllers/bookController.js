const bookService = require('../services/bookService');
const jwt = require('jsonwebtoken');

exports.getAllBooks = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log('User ID:', userId);
        const books = await bookService.getAllBooks(userId);
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch books' });
    }
};

exports.getBookRecommendations = async (req, res) => {
    const { prompt } = req.body;

    console.log("prompt:",req.body)
    try {
        const recommendationsText = await bookService.generateBookRecommendations(prompt);
        const recommendationsArray = recommendationsText
            .split('\n')
            .filter(line => line.trim() !== '');

        res.json({ recommendations: recommendationsArray });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while generating recommendations.' });
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

exports.createBook = async (req, res) => {
    try {
        const { title, author, description, image } = req.body;
        const token = req.header('Authorization')?.split('Bearer ')[1];
        const userId = jwt.verify(token, process.env.JWT_SECRET_KEY).userId;
        console.log("userId: ",userId);
        const newBook = await bookService.createBook({ title, author, description, image, userId });
        res.status(201).json({ message: 'Book is created', newBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to create the book' });
    }
};

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
            console.log("name:",name)
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Unable to delete the book' });
    }
};