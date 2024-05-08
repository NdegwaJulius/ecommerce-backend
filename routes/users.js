const express = require('express');
const router = express.Router();
const Product = require('../models/User');
const bcrypt = require('bcryptjs');

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await Product.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get user by id
router.get('/users/:id', async (req, res) => {
    try {
        const user = await Product.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Get user by username or email
router.get('/users/:usernameOrEmail', async (req, res) => {
    try {
        const user = await Product.findByUsernameOrEmail(req.params.usernameOrEmail);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add user with hashed password
router.post('/users', async (req, res) => {
    try {
        const { username, email,password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Product.create({ username,email, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//

// Update user
router.put('/users/:id', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Product.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUser = await Product.update({ id: req.params.id, username, email, password: hashedPassword });
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});   

// Delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await Product.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 

// Export the router
module.exports = router;
