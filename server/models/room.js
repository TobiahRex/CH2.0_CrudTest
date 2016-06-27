'use strict';

const mongoose = require('mongoose');
const Item = require('./item');
const ObjectId = mongoose.Schema.Types.ObjectId;


let roomSchema = new mongoose.Schema({
  name    :   {
    type    :   String
  },
  items   :   [{
    type    :   ObjectId,
    ref     :   'Item'
  }]
});



let Room = mongoose.model('Room', roomSchema);
module.exports = Room;
