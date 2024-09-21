const express = require('express');
const { inActive } = require('../Controller/userController');

const router = express.Router();

router.post('/delete', inActive);

module.exports = router;
