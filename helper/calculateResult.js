const userRepository = require('../modules/users/user.repository');
const rollRepository = require('../modules/rolls/roll.repository');
const betRepository = require('../modules/bets/bet.repository');
const { calculateMoneyAfterRoll } = require('./formulaForCalculatingMoney');
const { STATUS } = require('../constants/status');

const calculateResult = async (user) => {
  const roll = await rollRepository.findRollProcessing();
  const bet = await betRepository.findBetProcessing();
  // Caculate duplicate coefficient
  let coefficient = 0;
  roll.rollResult.forEach( item => {
    if (bet.choice === item) {
      coefficient++;
    }
  });

  // Caculate money after roll: when the player guesses right
  if (coefficient > 0) {
    user.balance = calculateMoneyAfterRoll(user, bet, coefficient);
    // Change player's money
    await userRepository.update(user._id, user); // Update player's money
  } 

  // Change status
  bet.status = STATUS.DONE;
  roll.status = STATUS.DONE;

  // Update Data
  await rollRepository.update(Roll._id, Roll); 
  await betRepository.update(Bet._id, Bet); 
  return user.balance;
}

module.exports = calculateResult;