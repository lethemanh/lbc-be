const repository = require('./user.repository');
const authHelper = require('../auth/auth.helper');
const APIError = require('../../helper/APIError');
const PERMISSIONS = require('../../constants/permissions');

const find = function (query, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.USER.READ)) {
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  const supportedQueryFields = ['username', 'email','phoneNumber','fullName','avatar','balance','age','role'];
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

const create = async function (inputs, user) {
  if (user && !authHelper.authorization(user.permissions, PERMISSIONS.USER.CREATE)) { 
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  let newUser = await repository.create(inputs);
  newUser.password = undefined;

  return newUser;
}

const update = function (id, newObject, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.USER.UPDATE)) {
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return repository.update(id, newObject);
}

const remove = function (id, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.USER.DELETE)) {
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return repository.remove(id);
}

const findByUsername = function (username, user) {
  if (user && !authHelper.authorization(user.permissions, PERMISSIONS.USER.READ)) { 
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return repository.findByUsername(username);
}

const findByEmail = function (email, user) {
  if (user && !authHelper.authorization(user.permissions, PERMISSIONS.USER.READ)) { 
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return repository.findByEmail(email);
}

const findByPhonenumber = function (phoneNumber, user) {
  if (user && !authHelper.authorization(user.permissions, PERMISSIONS.USER.READ)) { 
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return repository.findByPhonenumber(phoneNumber);
}

const getProfile = function(user) {
  if (user && !authHelper.authorization(user.permissions, PERMISSIONS.USER.READ_SELF)) { 
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return repository.findById(user._id);  
}

module.exports = {
  find: find,
  create: create,
  update: update,
  remove: remove,
  findByUsername: findByUsername,
  findByEmail: findByEmail,
  findByPhonenumber: findByPhonenumber,
  getProfile: getProfile
};