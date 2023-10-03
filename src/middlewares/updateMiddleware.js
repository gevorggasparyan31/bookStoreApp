const { body, validationResult } = require('express-validator');

exports.validateData = [
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
    }
];
