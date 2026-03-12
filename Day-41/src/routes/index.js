const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');
const authController = require('../controllers/auth.controller');
const loggerMiddleware = require('../middlewares/logger.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(loggerMiddleware);
router.get('/login', authMiddleware.requireGuest, authController.showLogin);
router.post('/login', authMiddleware.requireGuest, authController.login);
router.post('/logout', authController.logout);
router.get('/', authMiddleware.requireLogin, homeController.index);

module.exports = router;