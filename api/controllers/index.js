const login = require('./auth/login.js');
const registration = require('./auth/registration.js');
const token = require('./auth/token.js');
const user = require('./user');
const lesson = require('./lesson');
const stat = require('./stat');

module.exports = {
    login, registration, token, user, lesson, stat
}