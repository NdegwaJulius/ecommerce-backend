
const db = require('../db');
const bcrypt = require('bcryptjs');

class User {
    // get all users
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    }

    // get user by id
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }
    // get user by username or email
    static async findByUsernameOrEmail(username, email) {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
        return rows[0];
    }

    // Add user with hashed password
    static async create({ username, email,password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query('INSERT INTO users (username,email, password) VALUES (?, ?)', [username, email,hashedPassword]);
        return { id: result.insertId, username };
    }

    // update user
    static async update({ id, username, email,password  }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [username, email, hashedPassword, id]);
        return result.affectedRows > 0;
    }

    // delete user
    static async destroy(id) {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

    // get user by username
   
   
}



module.exports = User;
