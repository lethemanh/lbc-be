const mongoose = require('mongoose');

const BetSchema = mongoose.Schema({
  amount: Number,
  choice: Number,
  users: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rolls: { type: mongoose.Schema.Types.ObjectId, ref: 'Roll' }
});

const Bet = mongoose.model('Bet', BetSchema);

const find = async function(query) {
  const bets = await Bet.find(query).exec();
  const total = await Bet.countDocuments(query);
  return { bets, total };
}


const findById = function(id) {
  return Bet.findById(id).populate('rolls').populate('users').exec();
}

const create = function(inputs, cb) {
  const newBet = new Bet(inputs);
  return newBet.save();
}

const update = function(id, newObject) {
  return Bet.updateOne({ _id: id }, { $set: newObject });
}

const remove = function(id) {
  return Bet.deleteOne({ _id: id })
}

module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  remove: remove,
};