const pool = require ("../db/db.client");
const argon2 = require('argon2');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

class authController{

    async registration (req, res) {
        try{
            const client = await pool.connect();
            const {surname, name, patronymic, avtorizations, id_roles} = req.body;
            const candidateResult = await client.query("SELECT * FROM avtorizations WHERE login = $1", [avtorizations.login]);
            const candidate = candidateResult.rows[0];
            if (candidate) {
                return res.status(400).json({message:"Пользователь с таким именем уже существует"});
            }

            const hashPassword = await argon2.hash(avtorizations.password);

            const auth = await client.query ("INSERT INTO avtorizations (login, password) VALUES ($1, $2) RETURNING id", [
                avtorizations.login,
                hashPassword
            ]);
            const id_avtorization = auth.rows[0].id;

            await client.query ("INSERT INTO specialist (surname, name, patronymic, id_avtorization, id_roles) VALUES ($1, $2, $3, $4, $5)",[
                surname,
                name,
                patronymic,
                id_avtorization,
                id_roles
            ]);
            client.release();
            return res.json({message:"Пользователь успешно зарегистрирован"});
        } catch (error) {
            res.status(400).json({message:"Ошибка регистрации: ", error});
        }
    }

    async login(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: 'Ошибка авторизации', error: err });
            }
            if (!user) {
                return res.status(400).json({ message: info });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Ошибка входа при сессии', error: err });
                }
                return res.json({ message: 'Успешный вход', user });
            });
        })(req, res, next);
    }

    async userRole(req, res) {
        if (!req.user || req.user.role !== 'administrator') {
            return res.status(403).json({ message: "У вас нет прав для выполнения этого действия" });
        }
        const { specialistId, roleId} = req.body;
        try {
            const client = await pool.connect();
            await client.query("UPDATE specialist SET id_roles = $1 WHERE id = $2", [roleId, specialistId]);

            client.release();
            return res.json({ message: "Роль успешно выдана пользователю" });
        } catch (error) {
            res.status(400).json({ message: "Ошибка выдачи ролей: ", error });
        }
    }
}

passport.use(new LocalStrategy(
    async (username, password, done) => {
        const client = await pool.connect();
        try {
            const result = await client.query("SELECT * FROM avtorizations WHERE login = $1", [username]);
            const user = result.rows[0];
            if (!user) {
                return done(null, false, 'Пользователь не найден');
            }

            const isMatch = await argon2.verify(user.password, password);
            if (!isMatch) {
                return done(null, false, 'Неверный пароль');
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        } finally {
            client.release();
        }
    }
));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const client = await pool.connect();
    try {
        const result = await client.query("SELECT * FROM avtorizations WHERE id = $1", [id]);
        const user = result.rows[0];
        done(null, user);
    } catch (error) {
        done(error);
    } finally {
        client.release();
    }
});

module.exports = new authController();