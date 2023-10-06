const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const mailService = require('nodemailer');
const uuid = require('uuid');

const transporter = mailService.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'process.env.SENDER',
        pass: process.env.PASS,
    },
});

exports.getAllUsers = async () => {
    return User.find();
}

exports.createUser = async (userData) => {
    try {
        const { username, password, email } = userData;

        const candidate = await User.findOne({ username });
        if (candidate) {
            throw new Error(`Username "${candidate.username}" already exists!`);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const activationLink = uuid.v4();

        const user = new User({
            username,
            password: hashedPassword,
            email: userData.email,
            isActivated: false,
            activationLink
        });

        await user.save();

        const mailOptions = {
            from: "localhostbookstore@gmail.com",
            to: user.email,
            subject: 'Activate your account',
            text: activationLink,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending activation email:', error);
                throw new Error('Failed to send activation email');
            } else {
                console.log('Activation email sent:', info.response);
            }
        });

        return user;
    } catch (error) {
        throw error;
    }
}