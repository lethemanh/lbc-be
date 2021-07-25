const yup = require('yup');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const COMMON = require('../../constants/common');
const ROLE = require('../../constants/role');
const userService = require('../users/user.service');

const login = async (body) => {
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  await schema.validate(body);

  const existedUser = await userService.findByUsername(body.username);

  if (!existedUser) {
    throw new Error('Username is not existed!');
  }

  const comparePasswordResult = await bcrypt.compareSync(body.password, existedUser.password);
  if (!comparePasswordResult) {
    throw new Error('Password is not correct!');
  }

  const tokenData = {
    _id: existedUser._id,
    username: existedUser.username,
    fullName: existedUser.fullName,
    email: existedUser.email,
    phoneNumber: existedUser.phoneNumber,
    age: existedUser.age,
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
    throw new Error('User has been used!');
  }

  const existedEmail = await userService.findByEmail(body.email);

  if (existedEmail) {
    throw new Error('Email has been used!');
  }

  const existedPhonenumber = await userService.findByPhonenumber(body.phoneNumber);

  if (existedPhonenumber) {
    throw new Error('Phone number has been used!');
  }

  if (body.age < COMMON.ALLOWED_AGE) {
    throw new Error('You must be 18+ to play this game!')
  } 

  if (body.role && body.role !== ROLE.ROLE.USER) {
    throw new Error('Permission Required!')
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
