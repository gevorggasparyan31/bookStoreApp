const { validateData } = require('../validations/userValidation');
const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.get('/users');