const userController = require('../controllers/userController');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/userModel');

userRouter.post('/newUser',userController.createUser);
userRouter.post('/login', userController.login);
userRouter.get('/all', userController.getAllUsers);
userRouter.get('/activate/:activationToken', userController.activation);

module.exports = userRouter;