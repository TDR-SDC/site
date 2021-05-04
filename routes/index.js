const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');

router.get('/', homeController.home);
router.get('/team', homeController.team);
router.get('/gallery', homeController.gallery);
router.get('/contact', homeController.contact);
router.post('/contact', homeController.contact_form);

router.use('/user', require('./user'));
router.use('/login', require('./login'));
router.use('/sponsors', require('./sponsor'));
router.use('/mechanical', require('./mechanical'));

router.get('*', homeController.not_found);

module.exports = router;
