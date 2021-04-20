const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');

router.get('/', homeController.home);
router.get('/team', homeController.team);
router.get('/sponsors', homeController.sponsors);
router.get('*', homeController.not_found);
module.exports = router;