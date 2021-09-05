const betRepository = require('./bet.repository');
const userRepository = require('../users/user.repository');
const authHelper = require('../auth/auth.helper');
const { calculateMoneyAfterBet } = require('../../helper/formulaForCalculatingMoney');
const APIError = require('../../helper/APIError');
const PERMISSIONS = require('../../constants/permissions');

const find = function(query, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.BET.READ)) {
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return betRepository.find(query);
}

const create = async function(betDataOfUser, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.BET.CREATE)) {
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  const player = await userRepository.findById(user._id);

  // Validate pick & bet
  if (isNaN(betDataOfUser.amount) || betDataOfUser.amount <= 0) {
    throw new APIError({
      message: 'Bet amount is not valid',
      status: 400
    });
  } else if (betDataOfUser.amount > player.balance) {
    throw new APIError({
      message: 'Your balance is not enough',
      status: 400
    });
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
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return betRepository.update(bet._id, bet);
}

const remove = function(id, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.BET.DELETE)) {
    throw new APIError({
      message: 'Permission Required',
      status: 401
    });
  }
  return betRepository.remove(id);
}

module.exports = {
  find: find,
  create: create,
  update: update,
  remove: remove,
};