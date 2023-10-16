const Book = require('../models/bookModel');
const openai = require('openai');
const apiKey = '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';

exports.getAllBooks = async (userId) => {
    return Book.find({ userId });
};

exports.getBookById = async (id) => {
    return Book.findById(id);
};

exports.createBook = async ({ title, author, description, image, userId}) => {
    const newBook = new Book({
        title,
        author,
        description,
        image,
        userId
    });
    return newBook.save();
};

const client = new openai({
    apiKey: apiKey,
});

exports.generateBookRecommendations = async (userQuery) => {
    try {
        const response = await client.completions.create({
            prompt: `Recommend books like "${userQuery}"`,
            max_tokens: 100,
            temperature: 0.8,
            model: 'text-davinci-003',
        });

        // console.log('OpenAI Response:', response);
        console.log("User Query: ",userQuery);

        return response.choices[0].text;
    } catch (error) {
        console.error('OpenAI API Error:', error.message);
        throw error;
    }
}

exports.updateBook = async ( title, newData ) => {
    try {
        const filter = { title };
        const updatedBook = await Book.findOneAndUpdate(filter, newData, { new: true });

        if (!updatedBook) {
            return null;
        }

        return updatedBook;
    } catch (error) {
        throw error;
    }
};

exports.deleteBook = async (name) => {
    return Book.deleteOne({ title: name });
};