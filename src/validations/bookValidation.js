const { body } = require('express-validator');

exports.validateData = {
    data: [
        body('title').notEmpty(),
        body('author').notEmpty(),
        body('description').notEmpty(),
        body('image').notEmpty()
    ]
};
