const { users, validate , createUser} = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');


async function register(req, res) {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);

    }
    // Check if the user already exists in the array
    const existingUser = users.find(user => user.email === req.body.email);
    if (existingUser) {
        return res.status(400).send('User already exists. Please sign in');
    }
    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        // Create a new user object
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: password
        };

        // Add the new user to the array
        createUser(newUser);

        return res.status(201).json(newUser);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }

};
 module.exports = register;