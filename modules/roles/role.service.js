const repository = require('./role.repository');
const authHelper = require('../auth/auth.helper');
const APIError = require('../../helper/APIError');
const PERMISSIONS = require('../../constants/permissions');

const find = function (query, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLE.READ)) {
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  const supportedQueryFields = ['name','permissions'];
  Object.keys(query).forEach(function (key) {
    if (!supportedQueryFields.includes(key)) {
      throw new APIError({
        message: `Unrecognized field: ${key}`,
        status: 400
      });
    }
  });
  return repository.find(query);
}

const create = function (inputs, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLE.CREATE)) {
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return repository.create(inputs);
}

const update = function (id, newObject, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLE.UPDATE)) {
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return repository.update(id, newObject);
}

const remove = function (id, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLE.DELETE)) {
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return repository.remove(id);
}

const getPermissionsByRoleName = async function (name) {
  const role = await repository.findByName(name);
  return role && role.permissions || [];
}

module.exports = {
  find: find,
  create: create,
  update: update,
  remove: remove,
  getPermissionsByRoleName: getPermissionsByRoleName
};