const client = require('../db')

exports.usersCredential = async () => {
    const result = await client.query(
        "SELECT * FROM users ORDER BY Created_at DESC"
    )
    return result.rows
}

exports.userCredId = async (id) => {
    const result = await client.query(
        "SELECT * FROM users WHERE id = $1", [id]
    )
    return result.rows[0]
}

exports.createCred = async (email, password) => {
    const result = await client.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [email, password]
    )
    return result.rows[0]
}

exports.deleteCred = async (id) => {
    const result = await client.query(
        "DELETE FROM users WHERE id = $1 RETURNING *", [id]
    )
    return result.rows[0]
}

exports.findUserByEmail = async (email) => {
    const result = await client.query(
        "SELECT * FROM users WHERE email = $1", [email]
    )
    return result.rows[0]
}