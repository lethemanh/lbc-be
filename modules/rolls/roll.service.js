const rollRepository = require('./roll.repository');
const authHelper = require('../auth/auth.helper');
const APIError = require('../../helper/APIError');
const PERMISSIONS = require('../../constants/permissions');

const find = function(query, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLL.READ)) {
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return rollRepository.find(query);
}

const create = function(rollResult, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLL.CREATE)) {
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return rollRepository.create(rollResult);
}

const update = function(id, newObject, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLL.UPDATE)) {
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return rollRepository.update(id, newObject);
}

const remove = function(id, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLL.DELETE)) {
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return rollRepository.remove(id);
}

module.exports = {
  find: find,
  create: create,
  update: update,
  remove: remove
};