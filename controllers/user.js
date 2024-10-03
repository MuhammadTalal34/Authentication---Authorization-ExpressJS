const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthUser = require('../models/User'); // Adjust the path as necessary
const config = require('../config'); // Adjust the path as necessary

exports.register = async (req, res) => {
    try {
        // id type = 1 admin 
        // type = 0 = user 
        const { email, name, password, user_type_id } = req.body;
        const user = new AuthUser({ email, name, password, user_type_id });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await AuthUser.findOne({ email: req.body.email });
        if (!user) return res.status(401).send("Invalid email");
//brpt
        if (req.body.password !== user.password) return res.status(401).send("Email or Password is wrong");
   
        let payload = { id: user._id, user_type_id: user.user_type_id };
        const token = jwt.sign(payload, config.TOKEN_SECRET);

        res.status(200).send({
            message: "User successfully logged in",
            token,
            user: {
                email: user.email,
                name: user.name,
                user_type_id: user.user_type_id
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error logging in");
    }
};

exports.userEvent = (req, res) => {
    res.status(200).send({
        message: "Access granted to user events",
        user: req.user
    });
};

exports.adminEvent = (req, res) => {
    res.status(200).send({
        message: "Access granted to admin special events",
        user: req.user
    });
};
