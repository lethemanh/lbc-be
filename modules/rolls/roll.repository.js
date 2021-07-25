const mongoose = require('mongoose');

const RollSchema = mongoose.Schema({
  rollResult: Array,
  status: String
});

const Roll = mongoose.model('Roll', RollSchema);

const find = async function(query) {
  const rolls = await Roll
    .find(query)
    .exec();

  const total = await Roll.countDocuments(query);

  return { rolls, total };
}

const findById = function(id) {
  return Roll.findById(id).exec();
}

const findIdRoll = function() {
  return Roll.findOne({ status: "proccessing"}).exec();
}

const create = function(inputs, cb) {
  const newRoll = new Roll(inputs);
  return newRoll.save();
}

const update = function(id, newObject) {
  return Roll.updateOne({ _id: id }, { $set: newObject });
}

const remove = function(id) {
  return Roll.deleteOne({ _id: id })
}

module.exports = {
  find: find,
  findIdRoll: findIdRoll,
  findById: findById,
  create: create,
  update: update,
  remove: remove
};