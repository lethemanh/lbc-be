const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
  name: String,
  permissions: [{
    type: String
  }]
}, {
  timestamps: true
});

const Role = mongoose.model('Role', RoleSchema);

const find = async function (query) {
  const data = await Role.find(query).exec();

  const total = await Role.count(query);

  return {
    data,
    total
  }
}

const findById = function(id) {
  return Role.findById(id).exec();
}

const findByName = function (name) {
  return Role.findOne({ name: name });
}

const create = function (inputs) {
  const newRole = new Role(inputs);

  return newRole.save();
}

const update = function(id, newObject) {
  return Role.updateOne({ _id: id }, { $set: newObject });
}

const remove = function(id) {
  return Role.deleteOne({ _id: id })
}
module.exports = {
  find: find,
  findById: findById,
  findByName: findByName,
  create: create,
  update: update,
  remove: remove
};