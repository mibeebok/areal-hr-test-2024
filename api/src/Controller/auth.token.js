const jwt = require('jsonwebtoken');
require ('dotenv'),config();

const secretKey = process.env.SECRET_KEY;

function generateToken(specialist) {
    const payload = {
        id: specialist.id,
        specialistId: specialist.id,
        surname: specialist.surname,
        name: specialist.name,
    };

    const options = {
        expiresIn: '24h',
    };

    return jwt.sign(payload, secretKey, options);
}

module.exports = { generateToken };
