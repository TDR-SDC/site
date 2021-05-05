const express = require('express');
const router = express.Router();
const corpoController = require('../controller/corpoController');

router.post('/add_photo', corpoController.add_photo);

module.exports = router;