// server.js
const express = require('express');
const connection = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// API Routes
app.get('/products', (req, res) => {
    connection.query('SELECT * FROM products', (error, results, fields) => {
        if (error) {
            console.error('Error querying database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});
// Get product by id
app.get('/products/:id', (req, res) => {
    connection.query('SELECT * FROM products WHERE id = ?', [req.params.id], (error, results, fields) => {
        if (error) {
            console.error('Error querying database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json(results[0]);
    });
})



// Add product
app.post('/products', async (req, res) => {
    connection.query('INSERT INTO products SET ?', req.body, (error, results, fields) => {
        if (error) {
            console.error('Error inserting data into database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        res.json({ id: results.insertId, ...req.body });
        
    })

});
// Update product
app.put('/products/:id', (req, res) => {
    connection.query('UPDATE products SET ? WHERE id = ?', [req.body, req.params.id], (error, results, fields) => {
        if (error) {
            console.error('Error updating data in database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        // Send a success response even on successful update
        res.status(200).json({ message: 'Product updated successfully' });
    });
});

// Delete product
app.delete('/products/:id', (req, res) => {
    connection.query('DELETE FROM products WHERE id = ?', [req.params.id], (error, results, fields) => {
        if (error) {
            console.error('Error deleting data from database:', error);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json({ message: 'Product deleted successfully' });
    });
})

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
