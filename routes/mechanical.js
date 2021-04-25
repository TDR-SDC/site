const express = require('express');
const router = express.Router();
const mechanicalController = require('../controller/mechanicalController');

router.post('/add_cad' ,mechanicalController.add_cad);

module.exports = router;
