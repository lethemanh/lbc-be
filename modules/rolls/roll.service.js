const repository = require('./roll.repository');
const authHelper = require('../auth/auth.helper');
const PERMISSIONS = require('../../constants/permissions');

const find = function(query, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLL.READ)) {
    throw new Error('Permission Required');
  }
  return repository.find(query);
}

const create = function(inputs, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLL.CREATE)) {
    throw new Error('Permission Required');
  }
  return repository.create(inputs);
}

const update = function(id, newObject, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLL.UPDATE)) {
    throw new Error('Permission Required');
  }
  return repository.update(id, newObject);
}

const remove = function(id, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLL.DELETE)) {
    throw new Error('Permission Required');
  }
  return repository.remove(id);
}

module.exports = {
  find: find,
  create: create,
  update: update,
  remove: remove
};