const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async () => {
    return User.find();
}

exports.createUser = async (userData) => {
    try {
        const { username, password, email, role } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword,
            email,
            role
        });

        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}