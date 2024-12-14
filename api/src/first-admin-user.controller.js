const pool = require("./db/db.client");
const argon2 = require('argon2');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

class FirstAdminUser{
    async firstAdminUser() {
        const client = await pool.connect();
        try {
            const adminLogin = 'admin'; 
            const adminPassword = 'admin'; 

            const adminResult = await client.query("SELECT * FROM avtorizations WHERE login = $1", [adminLogin]);
            const admin = adminResult.rows[0];

            if (!admin) {
                const hashedPassword = await argon2.hash(adminPassword);

                const authResult = await client.query("INSERT INTO avtorizations (login, password) VALUES ($1, $2) RETURNING id", [
                    adminLogin,
                    hashedPassword
                ]);
                const idAvtorization = authResult.rows[0].id;

                const adminRole = 1;
                await client.query("INSERT INTO specialist (surname, name, patronymic, id_avtorization, id_roles) VALUES ($1, $2, $3, $4, $5)", [
                    'Admin',
                    'Admin',
                    'Admin',
                    idAvtorization,
                    adminRole
                ]);

                console.log("Пользователь-администратор успешно создан.");
            } else {
                console.log("Пользователь-администратор уже существует.");
            }
        } catch (error) {
            console.error("Ошибка при создании пользователя-администратора:", error);
        } finally {
            client.release();
        }
    }

}
module.exports = new FirstAdminUser();