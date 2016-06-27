'use strics';

const express = require('express');
const router  = express.Router();
const Item    = require('../models/item');

router.route('/')
.get((req, res)=> {
  res.send('all the items');
});


module.exports = router;
