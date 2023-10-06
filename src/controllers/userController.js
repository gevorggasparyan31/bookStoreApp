const userService = require('../services/userService');
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({error: 'Failed to create user'});
    }
}

exports.getAllUsers = async (req, res) => {
    try{
        const users = await userService.getAllUsers();

        return res.status(201).json(users);
    } catch (error) {
        return res.status(500).json({error: 'Failed to find user'});
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'No user found' });
        } else if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, 'your_secret_key_here', {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.activation = async (req, res) => {
    try {
        const { activationToken } = req.params;

        const user = await User.findOne({ activationLink: activationToken });

        if (!user) {
            return res.status(404).json({ error: 'Invalid activation token' });
        }

        user.isActivated = true;
        await user.save();

        res.json({ message: 'Account activated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during activation' });
    }
}