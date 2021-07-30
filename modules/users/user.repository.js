const mongoose = require('mongoose');
const { ROLE } = require('../../constants/role');

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  phoneNumber: String,
  fullName: String,
  avatar: String,
  balance: Number,
  age: Number,
  role: {
    type: String,
    default: ROLE.USER
  }
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

const find = async function (query, limit, offset) {
  const data = await User
    .find(query)
    .limit(limit)
    .skip(offset)
    .exec();

  const total = await User.count(query);

  return {
    data,
    total
  }
}

const findById = function(id) {
  return User.findById(id).exec();
}

const create = function(inputs, cb) {
  const newUser = new User(inputs);
  return newUser.save();
}

const update = function(id, newObject) {
  return User.updateOne({ _id: id }, { $set: newObject });
}

const remove = function(id) {
  return User.deleteOne({ _id: id })
}

const findByUsername = function(username) {
  return User.findOne({username: username})
}

const findByEmail = function(email) {
  return User.findOne({email: email})
}

const findByPhonenumber = function(phoneNumber) {
  return User.findOne({phoneNumber: phoneNumber})
}

module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  remove: remove,
  findByUsername: findByUsername,
  findByEmail: findByEmail,
  findByPhonenumber: findByPhonenumber
};