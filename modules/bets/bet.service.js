const repository = require('./bet.repository');
const authHelper = require('../auth/auth.helper');
const PERMISSIONS = require('../../constants/permissions');

const find = function(query, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.BET.READ)) {
    throw new Error('Permission Required');
  }
  return repository.find(query);
}

const create = function(inputs, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.BET.CREATE)) {
    throw new Error('Permission Required');
  }
  return repository.create(inputs);
}

const update = function(id, newObject, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.BET.UPDATE)) {
    throw new Error('Permission Required');
  }
  return repository.update(bet._id, bet);
}

const remove = function(id, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.BET.DELETE)) {
    throw new Error('Permission Required');
  }
  return repository.remove(id);
}

module.exports = {
  find: find,
  create: create,
  update: update,
  remove: remove,
};