const { Injectable } = require('@nestjs/common');
const { PassportStrategy } = require('@nestjs/passport');
const { Strategy } = require('passport-local');
const { UserService } = require('./user.service');
const argon2 = require('argon2');

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(userService) {
        super({ usernameField: 'login' }); // Используем login как имя пользователя
        this.userService = userService;
    }

    async validate(login, password) {
        const user = await this.userService.findByEmail(login); // Метод для поиска пользователя по login
        if (!user || !(await argon2.verify(user.password, password))) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

module.exports = { LocalStrategy };
