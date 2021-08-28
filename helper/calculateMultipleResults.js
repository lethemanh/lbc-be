const rollRepository = require('../modules/rolls/roll.repository');
const betRepository = require('../modules/bets/bet.repository');
const calculateEachUser = require('./calculateEachUser');
const { handleRollAfterEachTurn } = require('./handleRoll');

const calculateMultipleResults = async (userIds) => {
  const roll = await rollRepository.findRollProcessing();
  const countBetsProcessing = await betRepository.countBetsProcessing();

  const promises = userIds.map(userId => calculateEachUser(userId, roll));
  let result = await Promise.all(promises);    
  handleRollAfterEachTurn(countBetsProcessing, roll);

  return result;
};

module.exports = calculateMultipleResults;