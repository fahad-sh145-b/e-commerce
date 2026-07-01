const express = require('express');

const router = express.Router();

const User = require('../models/user');
const admin = require('../admin');

const { jwtAuthmiddleware, generatetoken } = require('./../jwt');

router.post('/register', async (req, res) => {

    try {
        const data = req.body;

        if (!data || !data.email || !data.password || !data.name) {
            return res.status(400).json({ error: 'Name, email and password are required' });
        }

        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const newuser = new User(data);
        const response = await newuser.save();

        const payload = {
            id: response.id,
            role: response.role

        }

        console.log(JSON.stringify(payload));

        const token = generatetoken(payload);
        console.log('Token is :', token)

        console.log('data saved');
        return res.status(201).json({ response: response, token: token });
        // return res.status(201).json({response});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.post('/login', async (req, res) => {

    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ error: 'name and password are required' });
        }

        const founduser = await User.findOne({ name });
        if (!founduser) {
            return res.status(404).json({ error: 'User not found' });
        }


        const isValidPassword = await founduser.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid name or password' });
        }


        const payload = {
            id: founduser.id,
            role: founduser.role

        }


        const token = generatetoken(payload);
        return res.status(200).json({ message: 'Login successful', token: token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/', jwtAuthmiddleware,admin, async (req, res) => {

    try {

        const response = await User.find();

        console.log(response);
        res.status(200).json({ response })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }


})



router.get('/profile', jwtAuthmiddleware, async (req, res) => {

    try {


        const userId = req.user.id;

        const response = await User.findById(userId);

        if (!response) {
            return res.status(404).json({ error: 'user not found' })
        }

        res.status(200).json({ response })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }
})


router.get('/:app', async (req, res) => {

    try {


        const app = req.params.app;

        if (app == "user" || app == "admin") {

            const response = await User.find({ role: app })
            res.status(200).json({ response });

        }

        else {
            res.status(404).json({ error: 'internal role error' })

        }

    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }
})


module.exports = router;
