const express = require('express');
const controllers = require('./controllers');
const router = express.Router();
const {registerValidators, loginValidators, tokenValidators} = require('./utils/validators');

// Регистрация/Авторизация
router.post('/api/register', registerValidators, controllers.registration.handler);
router.post('/api/login', loginValidators, controllers.login.handler);
router.post('/api/check-token', controllers.token.handler);

// Пользователь
router.post('/api/user/info', controllers.user.info);

// Задания
router.post('/api/lesson/math/task', controllers.lesson.math.getTask);
router.post('/api/lesson/rus/task', controllers.lesson.rus.getTask);
router.post('/api/lesson/math', controllers.lesson.math.addTaskDb);
router.post('/api/lesson/rus', controllers.lesson.rus.addTaskDb);

// Статистика
router.post('/api/stat', controllers.stat.handler); // статистика по конкретному предмету
router.post('/api/stat/all', controllers.stat.total); // статистика общая

module.exports = router;