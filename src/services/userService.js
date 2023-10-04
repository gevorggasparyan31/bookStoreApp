const User = require('../models/userModel');

exports.getAllUsers = async () => {
    return User.find();
}

