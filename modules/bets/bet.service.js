const repository = require('./bet.repository');
const authHelper = require('../auth/auth.helper');
const PERMISSIONS = require('../../constants/permissions');
const rollRepository = require('../rolls/roll.repository');
const userRepository = require('../users/user.repository');

const find = function(query, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.BET.READ)) {
    throw new Error('Permission Required');
  }
  return repository.find(query);
}

const create = async function(inputs, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.BET.CREATE)) {
    throw new Error('Permission Required');
  }
  // Find unprocessed spins
  let RollProcessing = await rollRepository.findRollProcessing();
  inputs.rolls = RollProcessing;
  // Get user's data from DB by token
  let User = await userRepository.findById(user._id);

  // minus the player's money after bet
  User.balance = User.balance - inputs.amount;

  // Update data
  inputs.users = User;
  await userRepository.update(User._id, User); 
  return repository.create(inputs);
}

const update = async function(id, newObject, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.BET.UPDATE)) {
    throw new Error('Permission Required');
  }
  let Bet = await repository.findById(id);
  let Roll = await rollRepository.findRollProcessing();

  // Get user's data from DB by token
  let User = await userRepository.findById(user._id);

  // Caculate duplicate coefficient
  let coefficient = 0;
  Bet.rolls.rollResult.forEach( item => {
    if (Bet.choice === item) {
      coefficient++;
    }
  });

  // Caculate money after roll: when the player guesses right
  if (coefficient > 0) {
    let newBalance 
      = Bet.users.balance // Original player's money 
        + Bet.amount // Player's money of Bet
        + (Bet.amount * coefficient ); // Player's rewards 
    // Change player's money
    User.balance = newBalance;
    await userRepository.update(User._id, User); // Update player's money
  } 

  // Change roll's status
  Bet.rolls.status = "done";
  Roll.status = "done";

  // Update Data
  await rollRepository.update(Roll._id, Roll); // Update roll's status
  return repository.update(Bet._id, Bet); // Update Bet
}

const remove = function(id, user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.BET.DELETE)) {
    throw new Error('Permission Required');
  }
  return repository.remove(id);
}

module.exports = {
  find: find,
  create: create,
  update: update,
  remove: remove,
};