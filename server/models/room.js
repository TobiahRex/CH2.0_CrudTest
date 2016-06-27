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


roomSchema.statics.makeOne = (reqObj, cb) => {
  Room.create(reqObj, (err, newRoom)=> {
    if(err) return cb(err);
    Room.find(newRoom._id, (err, savedRoom)=> {
      err ? cb(err) : cb(null, savedRoom);
    });
  });
};

roomSchema.statics.getOne = (reqId, cb) => {
  Room.findById(reqId, (err, dbRoom)=> {
    err ? cb(err) : cb(null, dbRoom);
  });
};

roomSchema.statics.removeOne = (reqId, cb) => {
  Room.findByIdAndRemove(reqId, (err, oldRoom) => {
    err ? cb(err) : cb(null, {SUCCESS: `Room: ${oldRoom} has been removed.`});
  });
};

roomSchema.statics.updateOne = (editObj, cb) => {
  Room.findByIdAndUpdate(editObj.id, {$set : editObj.body}, (err, oldDbRoom)=> {
    if(err) return cb(err);
    Room.findById(oldDbRoom._id, (err, savedRoom)=> {
      err ? cb(err) : cb(null, savedRoom);
    });
  });
};

let Room = mongoose.model('Room', roomSchema);
module.exports = Room;
