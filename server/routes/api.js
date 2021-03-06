'use strict';

const express = require('express');
const router   = express.Router();


router.use('/items', require('./items'));
router.use('/rooms', require('./rooms'));

module.exports = router;
