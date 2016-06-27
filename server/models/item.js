'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Room     = require('./room');

let itemSchema = new mongoose.Schema({
  name    :   {
    type    :     String
  },
  value   :   {
    type    :     Number
  },
  room    :   {
    type    :     ObjectId,
    ref     :     'Room'
  }
});





let Item = mongoose.model('Item', itemSchema);
module.exports = Item;
