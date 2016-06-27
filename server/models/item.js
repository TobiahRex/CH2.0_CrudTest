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
  }
  // room    :   {
  //   type    :     ObjectId,
  //   ref     :     'Room'
  // }
});

itemSchema.statics.makeOne = (reqObj, cb) => {
  console.log("reqObj: ", reqObj);
  Item.create(reqObj, (err, newItem)=> {
    console.log('err: ', err);
    console.log('newItem: ', newItem);
    if(err) return cb(err);
    Item.find(newItem._id, (err, savedItem)=> {
      err ? cb(err) : cb(null, savedItem);
    });
  });
};

itemSchema.statics.getOne = (reqId, cb) => {
  Item.findById(reqId, (err, dbItem)=> {
    err ? cb(err) : cb(null, dbItem);
  });
};

itemSchema.statics.removeOne = (reqId, cb) => {
  Item.findByIdAndRemove(reqId, (err, oldItem) => {
    err ? cb(err) : cb(null, {SUCCESS: `Item: ${oldItem} has been removed.`});
  });
};

itemSchema.statics.updateOne = (editObj, cb) => {
  Item.findByIdAndUpdate(editObj.id, {$set : editObj.body}, (err, oldDbItem)=> {
    if(err) return cb(err);
    Item.findById(oldDbItem._id, (err, savedItem)=> {
      err ? cb(err) : cb(null, savedItem);
    });
  });
};



let Item = mongoose.model('Item', itemSchema);
module.exports = Item;
