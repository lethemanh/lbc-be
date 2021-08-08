const rollRepository = require('./roll.repository');
const authHelper = require('../auth/auth.helper');
const PERMISSIONS = require('../../constants/permissions');

const find = function(query, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLL.READ)) {
    throw new Error('Permission Required');
  }
  return rollRepository.find(query);
}

const create = function(rollResult, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLL.CREATE)) {
    throw new Error('Permission Required');
  }
  return rollRepository.create(rollResult);
}

const update = function(id, newObject, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLL.UPDATE)) {
    throw new Error('Permission Required');
  }
  return rollRepository.update(id, newObject);
}

const remove = function(id, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLL.DELETE)) {
    throw new Error('Permission Required');
  }
  return rollRepository.remove(id);
}

module.exports = {
  find: find,
  create: create,
  update: update,
  remove: remove
};