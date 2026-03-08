const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');
const authController = require('../controllers/auth.controller');
const loggerMiddleware = require('../middlewares/logger.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(loggerMiddleware);
router.get('/dang-nhap', authMiddleware.requireGuest, authController.showLogin);
router.post('/dang-nhap', authMiddleware.requireGuest, authController.login);
router.post('/dang-xuat', authController.logout);
router.get('/', authMiddleware.requireLogin, homeController.index);

module.exports = router;