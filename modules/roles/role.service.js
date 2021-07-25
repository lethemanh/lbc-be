const repository = require('./role.repository');
const authHelper = require('../auth/auth.helper');
const PERMISSIONS = require('../../constants/permissions');

const find = function (query, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLE.READ)) {
    throw new Error('Permission Required');
  }
  const supportedQueryFields = ['name','permissions'];
  Object.keys(query).forEach(function (key) {
    if (!supportedQueryFields.includes(key)) {
      throw new Error(`Unrecognized field: ${key}`);
    }
  });
  return repository.find(query);
}

const create = function (inputs, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLE.CREATE)) {
    throw new Error('Permission Required');
  }
  return repository.create(inputs);
}

const update = function (id, newObject, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLE.UPDATE)) {
    throw new Error('Permission Required');
  }
  return repository.update(id, newObject);
}

const remove = function (id, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.ROLE.DELETE)) {
    throw new Error('Permission Required');
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