const jwt = require('jsonwebtoken');
const pool = require ("../db/db.client")

async function autenticateUser (req, res, next) {
    const token = req.headers ['authorization'];

    if (!token) {
        return res.status(401).json ({error: "Токен не предоставлен"});
    }

    const parts = token.split('.');
    if (perts.length !== 3){
        return res.status(401).json({error: "Неверный формат токена"});
    }

    const payload = parts[1];
    const decoded = JSON.parse(Buffer.from(playload, 'base64'). toString ('utf8'));

    const specialist = await getSpecialistById(specialistId);

    req.user = {
        id: specialist.id,
        specialistId: specialist.id,
        surname: specialist.surname,
        name: specialist.name,
    };

    next();
}

async function getSpecialistById (id) {
    const result = await pool.query ("SELECT * FROM specialist WHERE id = $1", [id]);
    return result.rows[0];
}
module.exports = { autenticateUser };