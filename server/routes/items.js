'use strict';

const express = require('express');
const router  = express.Router();
const Item    = require('../models/item');

router.route('/')
.get((req, res)=> Item.find({}, res.handle))
.delete((req, res)=> Item.remove({}, res.handle))
.post((req, res)=> Item.makeOne(req.body, res.handle));

router.route('/:id')
.get((req, res)=> Item.getOne(req.params.id, res.handle))
.delete((req, res) => Item.removeOne(req.params.id, res.handle))
.put((req, res)=> {
  let editObj = {
    id    :   req.params.id,
    body  :   req.body
  };
  Item.updateOne(editObj, res.handle);
});


module.exports = router;
