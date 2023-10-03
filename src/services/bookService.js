const Book = require('../models/bookModel');

exports.getAllBooks = async () => {
    return Book.find();
};

exports.getBookById = async (id) => {
    return Book.findById(id);
};

exports.createBook = async ({ title, author, description, image }) => {
    const newBook = new Book({
        title,
        author,
        description,
        image,
    });
    return newBook.save();
};

exports.updateBook = async ( title, newData ) => {
    try {
        const filter = { title };
        const updatedBook = await Book.findOneAndUpdate(filter, newData, { new: true });

        if (!updatedBook) {
            return null
        }

        return updatedBook;
    } catch (error) {
        throw error;
    }
};

exports.deleteBook = async (name) => {
    return Book.findOneAndDelete({ title: name });
};
