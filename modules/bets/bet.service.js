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

  // Validate pick & bet
  if (isNaN(betDataOfUser.amount) || betDataOfUser.amount <= 0) {
    throw new Error('Bet amount is not valid');
  } else if (betDataOfUser.amount > player.balance) {
    throw new Error('Your balance is not enough');
  }

  // Minus the player's money after bet
  player.balance = calculateMoneyAfterBet(player, betDataOfUser);
  // Update data
  await userRepository.update(player._id, player);

  const newBet = {
    ...betDataOfUser,
    users: player
  }
  return await betRepository.create(newBet);
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