const mongoose = require('mongoose');
const { STATUS } = require('../../constants/status');

const RollSchema = mongoose.Schema({
  rollResult: Array,
  status: { type: String, default: STATUS.PROCESSING }
}, {
  timestamps: true
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

const create = function(rollResult, cb) {
  const newRoll = new Roll({ 'rollResult': rollResult });
  return newRoll.save();
}

const update = function(id, newObject) {
  return Roll.updateOne({ _id: id }, { $set: newObject });
}

const remove = function(id) {
  return Roll.deleteOne({ _id: id })
}

const findRollProcessing = function() {
  return Roll.findOne({ status: STATUS.PROCESSING }).sort({'createdAt': 1}).exec();
}

const deleteRollProcessing = function() {
  return Roll.findOneAndDelete({ status: STATUS.PROCESSING }).exec();
}

module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  remove: remove,
  findRollProcessing: findRollProcessing,
  deleteRollProcessing: deleteRollProcessing
};