// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Get product by id
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add more routes (e.g., add product, update product, delete product) as needed
// Add a product
router.post('/products', async (req, res) => {
    try {
        const { name, description, price, image_url } = req.body;

        // Validate request body
        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required fields' });
        }

        // Create the product
        const product = await Product.create({ name, description, price, image_url });

        // Respond with the created product
        res.status(201).json(product);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Failed to add product' });
    }
});

// Update a product
router.put('/products/:id', async (req, res) => {
    try {
        const { name, description, price, image_url } = req.body;
        // Validate request body
        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required fields' });

        }
        // Update the product
        const product = await Product.update({ id: req.params.id, name, description, price, image_url });
        // Respond with the updated product
        res.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Failed to update product' });
    }



});



// Delete a product
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Failed to delete product' });
    }
});




module.exports = router;
