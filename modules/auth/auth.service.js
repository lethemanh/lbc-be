const yup = require('yup');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const APIError = require('../../helper/APIError');
const COMMON = require('../../constants/common');
const { ROLE } = require('../../constants/role');
const userService = require('../users/user.service');

const login = async (body) => {
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  await schema.validate(body);

  const existedUser = await userService.findByUsername(body.username);

  if (!existedUser) {
    throw new APIError({
      message: 'Username is not existed!',
      status: 404
    });
  }

  const comparePasswordResult = await bcrypt.compareSync(body.password, existedUser.password);
  if (!comparePasswordResult) {
    throw new APIError({
      message: 'Password is not correct!',
      status: 400
    });
  }

  const tokenData = {
    _id: existedUser._id,
    username: existedUser.username,
    role: existedUser.role
  };

  const token = await jwt.sign(tokenData, config.SECRET_KEY, {
    expiresIn: config.TOKEN_EXPIRY_TIME
  });
  return {
    token: token
  };
}

const register = async (body) => {
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().min(8).required(),
    age: yup.number().required()
  });

  await schema.validate(body);

  const existedUsername = await userService.findByUsername(body.username);

  if (existedUsername) {
    throw new APIError({
      message: 'User has been used!',
      status: 409
    });
  }

  const existedEmail = await userService.findByEmail(body.email);

  if (existedEmail) {
    throw new APIError({
      message: 'Email has been used!',
      status: 409
    });
  }

  const existedPhonenumber = await userService.findByPhonenumber(body.phoneNumber);

  if (existedPhonenumber) {
    throw new APIError({
      message: 'Phone number has been used!',
      status: 409
    });
  }

  if (body.age < COMMON.ALLOWED_AGE) {
    throw new APIError({
      message: 'You must be 18+ to play this game!',
      status: 403
    });
  } 

  if (body.role && body.role !== ROLE.USER) {
    throw new APIError({
      message: 'Permission Required!',
      status: 401
    });
  }

  const salt = await bcrypt.genSaltSync(config.SALT_ROUNDS);
  const hashedPassword = await bcrypt.hashSync(body.password, salt);

  return await userService.create({
    username: body.username,
    password: hashedPassword,
    email: body.email,
    phoneNumber: body.phoneNumber,
    fullName: body.fullName,
    avatar: body.avatar,
    balance: body.balance,
    age: body.age
  });
}

module.exports = {
  login,
  register
};
