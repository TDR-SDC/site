const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');

router.get('/', homeController.home);
router.get('/team', homeController.team);
router.get('/sponsors', homeController.sponsors);
router.get('/gallery', homeController.gallery);
router.get('/contact', homeController.contact);

router.use('/user', require('./user'));
router.use('/login', require('./login'));

// router.get('*', homeController.not_found);

module.exports = router;