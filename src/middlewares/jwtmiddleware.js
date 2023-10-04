const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const token = req.header('Authorization')?.split('Bearer ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        req.user = jwt.verify(token, 'your_secret_key_here');

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authorize;
