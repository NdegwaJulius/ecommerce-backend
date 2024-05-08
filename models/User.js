
const db = require('../db');

class User {
    static async findByUsername(username) {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }
    // Add more methods as needed
}

module.exports = User;
