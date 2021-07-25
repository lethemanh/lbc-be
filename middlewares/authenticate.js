const jwt = require('jsonwebtoken');
const config = require('../config');
const roleService = require('../modules/roles/role.service');

async function authenticate (req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({message: "Not authenticated!"});
    }
    const data = await jwt.verify(token, config.SECRET_KEY);

    if (!data) {
      return res.status(401).send({message: "Not authenticated!"});
    }

    if (data.exp <= Date.now() / 1000) {
      return res.status(401).send({message: "Token expired!"});
    }

    const permissions = await roleService.getPermissionsByRoleName(data.role);
    req.user = {
      _id: data._id,
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber,
      fullName: data.fullName,
      avatar: data.avatar,
      balance: data.balance,
      age: data.age,
      role: data.role,
      permissions: permissions,
    };

    next();
  } catch (err) {
    return res.status(401).send({message: "Not authenticated!"});
  }
}

module.exports = {
  authenticate
};
