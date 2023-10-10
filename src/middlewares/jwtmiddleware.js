const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authorize = (req, res, next) => {
    const token = req.header('Authorization')?.split('Bearer ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('Token verified successfully. Decoded user:', req.user);
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Unauthorized: Token invalid' });
    }
};

module.exports = authorize;
