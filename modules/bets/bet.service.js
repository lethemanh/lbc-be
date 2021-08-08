const betRepository = require('./bet.repository');
const userRepository = require('../users/user.repository');
const authHelper = require('../auth/auth.helper');
const { calculateMoneyAfterBet } = require('../../helper/formulaForCalculatingMoney');
const PERMISSIONS = require('../../constants/permissions');

const find = function(query, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.BET.READ)) {
    throw new Error('Permission Required');
  }
  return betRepository.find(query);
}

const create = async function(betDataOfUser, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.BET.CREATE)) {
    throw new Error('Permission Required');
  }
  const player = await userRepository.findById(user._id);
  // Minus the player's money after bet
  player.balance = calculateMoneyAfterBet(player, betDataOfUser);
  // Update data
  betDataOfUser.users = { ...player };
  await userRepository.update(player._id, player); 
  return betRepository.create(betDataOfUser);
}

const update = function(id, newObject, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.BET.UPDATE)) {
    throw new Error('Permission Required');
  }
  return betRepository.update(bet._id, bet);
}

const remove = function(id, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.BET.DELETE)) {
    throw new Error('Permission Required');
  }
  return betRepository.remove(id);
}

module.exports = {
  find: find,
  create: create,
  update: update,
  remove: remove,
};