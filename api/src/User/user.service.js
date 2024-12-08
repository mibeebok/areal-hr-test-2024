require('dotenv').config(); // Подключаем dotenv для загрузки переменных окружения
const { Injectable } = require('@nestjs/common');
const { Pool } = require('pg');
const argon2 = require('argon2');

@Injectable()
class UserService {
    constructor() {
        // Настройка подключения к базе данных с использованием переменных окружения
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });
    }

    async createAdminUser (email, password) {
        const hashedPassword = await argon2.hash(password);

        // Создаем запись в таблице avtorizations
        const avtorizationsRes = await this.pool.query(
            'INSERT INTO avtorizations (login, password) VALUES (\$1, \$2) RETURNING id',
            [email, hashedPassword]
        );
        const avtorizationsId = avtorizationsRes.rows[0].id;

        // Получаем роль "administration"
        const roleRes = await this.pool.query(
            'SELECT id FROM roles WHERE caption = \$1',
            ['administration']
        );
        const roleId = roleRes.rows[0].id;

        // Создаем запись в таблице specialist
        const specialistRes = await this.pool.query(
            'INSERT INTO specialist (surname, name, id_avtorization, id_roles) VALUES ($1, $2, $3, $4) RETURNING *',
            ['Admin', 'Admin', avtorizationsId, roleId]
        );

        return specialistRes.rows[0];
    }

    async findByEmail(email) {
        const res = await this.pool.query(
            'SELECT * FROM avtorizations WHERE login = \$1',
            [email]
        );
        return res.rows[0];
    }

    async initializeAdminUser () {
        const adminEmail = process.env.ADMIN_LOGIN; // Логин администратора из .env
        const adminPassword = process.env.ADMIN_PASSWORD; // Пароль администратора из .env

        const existingUser  = await this.findByEmail(adminEmail);
        if (!existingUser ) {
            await this.createAdminUser (adminEmail, adminPassword);
            console.log(`Admin user created with email: ${adminEmail}`);
        } else {
            console.log(`Admin user already exists with email: ${adminEmail}`);
        }
    }
}

module.exports = { UserService };
