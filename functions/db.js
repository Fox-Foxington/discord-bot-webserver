import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});


async function getAllRoles() {
    try {
        const { rows: roles } = await pool.query('SELECT * FROM roles');
        return roles;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
}

async function deleteRole(roleId) {
    try {
        const client = await pool.connect();
        const queryText = 'DELETE FROM roles WHERE id = $1';
        const result = await client.query(queryText, [roleId]);
        client.release();
        return result;
    } catch (error) {
        console.error('Error deleting role:', error);
        throw error;
    }
}

async function addRole(roleName, roleDescription, roleCommand, roleEmoji) {
    if (!roleName || typeof roleName !== 'string') {
        throw new Error('Invalid roleName');
    }
    // Add additional validation for roleDescription, roleCommand, and roleEmoji here

    try {
        await pool.query('INSERT INTO roles (role_name, role_description, role_command, role_emoji) VALUES ($1, $2, $3, $4)', [roleName, roleDescription, roleCommand, roleEmoji]);
    } catch (error) {
        console.error('Error adding role:', error);
        throw error;
    }
}

export { getAllRoles, addRole, deleteRole };
