'use strict';

const express = require('express');
const router  = express.Router();
const Room    = require('../models/room');

router.route('/')
.get((req, res)=> Room.find({}, res.handle))
.delete((req, res)=> Room.remove({}, res.handle))
.post((req, res)=> Room.makeOne(req.body, res.handle));

router.route('/:id')
.get((req, res)=> Room.getOne(req.params.id, res.handle))
.delete((req, res) => Room.removeOne(req.params.id, res.handle))
.put((req, res)=> {
  let editObj = {
    id    :   req.params.id,
    body  :   req.body
  };
  Room.updateOne(editObj, res.handle);
});


module.exports = router;
