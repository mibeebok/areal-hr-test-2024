const { Client } = require('pg');
const argon2 = require('argon2');
require('dotenv').config();

const createAdminUser  = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    await client.connect();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    try {
        const hashedPassword = await argon2.hash(adminPassword);

        await client.query('INSERT INTO users (name, email, password, role) VALUES (\$1, \$2, \$3, \$4)', [
            'Admin',
            adminEmail,
            hashedPassword,
            'admin',
        ]);
        console.log('Admin user created successfully');
    } catch (err) {
        console.error('Error creating admin user:', err);
    } finally {
        await client.end();
    }
};

createAdminUser ();
