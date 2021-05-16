const express = require('express');
const router = express.Router();
const sponsorController = require('../controller/sponsorController');

router.get('/', sponsorController.sponsors);
router.get('/remove/:_id', sponsorController.remove_sponsor);
router.post('/add', sponsorController.add_sponsor);

module.exports = router;