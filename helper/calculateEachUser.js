const userRepository = require('../modules/users/user.repository');
const betRepository = require('../modules/bets/bet.repository');
const { calculateMoneyAfterRoll } = require('./formulaForCalculatingMoney');
const { STATUS } = require('../constants/status');

const calculateEachUser = async (userId, roll) => {
  const user = await userRepository.findById(userId);
  const bet = await betRepository.findBetProcessing(userId);
  let returnResult;

  if (!roll) {
    returnResult = {
      newBalance: user.balance
    };
    return returnResult;
  }
  if (!bet) {
    returnResult = {
      newBalance: user.balance,
      rollResult: roll.rollResult
    };
    return returnResult;
  }
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

  returnResult = {
    newBalance: user.balance,
    userChoice: bet.choice,
    rollResult: roll.rollResult
  };

  // Change status
  bet.status = STATUS.DONE;
  // Update Data
  await betRepository.update(bet._id, bet); 

  return returnResult;
};

module.exports = calculateEachUser;