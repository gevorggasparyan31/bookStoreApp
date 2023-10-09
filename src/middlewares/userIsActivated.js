const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const checkUserActivation = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split('Bearer ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, 'your_secret_key_here');

        const userId = decoded.userId;

        const user = await User.findById(userId);

        if (!user.isActivated) {
            return res.status(401).json({ message: 'User is not activated' });
        }

        req.user = { id: userId };

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = checkUserActivation;