const authorizeAdmin = (req, res, next) => {
    const userRole = req.user.role;

    if (userRole === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = authorizeAdmin;