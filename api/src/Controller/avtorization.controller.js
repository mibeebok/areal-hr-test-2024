const pool = require("../db/db.client");
const argon2 = require('argon2');

const login = async (req, res) => {
    const { login, password } = req.body;

    // Запрос к базе данных для получения пользователя
    const query = 'SELECT * FROM avtorization WHERE login = ?';
    
    try {
        const [results] = await pool.execute(query, [login]);

        if (results.length > 0) {
            const user = results[0];

            // Проверяем пароль
            if (await argon2.verify(user.password, password)) {
                return res.status(200).json({ message: 'Успешная аутентификация' });
            } else {
                return res.status(401).json({ message: 'Неверный логин или пароль' });
            }
        } else {
            return res.status(401).json({ message: 'Неверный логин или пароль' });
        }
    } catch (err) {
        console.error(err); // Логируем ошибку для отладки
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
};

module.exports = {
    login
};
