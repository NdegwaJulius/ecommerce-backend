// models/Product.js
const db = require('../db');

class Product {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM products');
        return rows;
    }
    // get product by id
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];

    }
    
    //add product
    static async create({ name, description, price, image_url }) {
        const [result] = await db.query('INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)', [name, description, price, image_url]);
        return { id: result.insertId, name, description, price, image_url };
    }

    // update product
    static async update({ id, name, description, price, image_url }) {
        const [result] = await db.query('UPDATE products SET name = ?, description = ?, price = ?, image_url = ? WHERE id = ?', [name, description, price, image_url, id]);
        return result.affectedRows > 0;
    }

    // delete product
    static async destroy(id) {
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

}

module.exports = Product;
