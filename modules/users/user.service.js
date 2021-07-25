const repository = require('./user.repository');
const authHelper = require('../auth/auth.helper');
const PERMISSIONS = require('../../constants/permissions');

const find = function (query, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.USER.READ)) {
    throw new Error('Permission Required');
  }
  const supportedQueryFields = ['username', 'email','phoneNumber','fullName','avatar','balance','age','role'];
  Object.keys(query).forEach(function (key) {
    if (!supportedQueryFields.includes(key)) {
      throw new Error(`Unrecognized field: ${key}`);
    }
  });
  return repository.find(query);
}

const create = async function (inputs, user) {
  if (user && !authHelper.authorization(user.permissions, PERMISSIONS.USER.CREATE)) { 
    throw new Error('Permission Required'); 
  }
  let newUser = await repository.create(inputs);
  newUser.password = undefined;

  return newUser;
}

const update = function (id, newObject, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.USER.UPDATE)) {
    throw new Error('Permission Required');
  }
  return repository.update(id, newObject);
}

const remove = function (id, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.USER.DELETE)) {
    throw new Error('Permission Required');
  }
  return repository.remove(id);
}

const findByUsername = function (username, user) {
  if (user && !authHelper.authorization(user.permissions, PERMISSIONS.USER.READ)) { 
    throw new Error('Permission Required'); 
  }
  return repository.findByUsername(username);
}

const findByEmail = function (email, user) {
  if (user && !authHelper.authorization(user.permissions, PERMISSIONS.USER.READ)) { 
    throw new Error('Permission Required'); 
  }
  return repository.findByEmail(email);
}

const findByPhonenumber = function (phoneNumber, user) {
  if (user && !authHelper.authorization(user.permissions, PERMISSIONS.USER.READ)) { 
    throw new Error('Permission Required'); 
  }
  return repository.findByPhonenumber(phoneNumber);
}

module.exports = {
  find: find,
  create: create,
  update: update,
  remove: remove,
  findByUsername: findByUsername,
  findByEmail: findByEmail,
  findByPhonenumber: findByPhonenumber
};