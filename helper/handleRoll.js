const rollRepository = require('../modules/rolls/roll.repository');
const { STATUS } = require('../constants/status');

const handleRollAfterEachTurn = async (countBetsProcessing, roll) => {
  if (countBetsProcessing === 0) {
    await rollRepository.deleteRollProcessing();
  } else {
    roll.status = STATUS.DONE;
    await rollRepository.update(roll._id, roll);
  }
};

module.exports = {
  handleRollAfterEachTurn: handleRollAfterEachTurn
}