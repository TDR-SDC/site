const express = require('express');
const router = express.Router();
const corpoController = require('../controller/corpoController');

router.post('/add_photo', corpoController.add_photo);
router.post('/add_newsletter', corpoController.add_newsletter);

module.exports = router;