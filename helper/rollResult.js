const rollService = require('../modules/rolls/roll.service');

const rollResult = async () => {
  const mascot1 = Math.floor(Math.random() * 6) + 1;
  const mascot2 = Math.floor(Math.random() * 6) + 1; 
  const mascot3 = Math.floor(Math.random() * 6) + 1; 
  const result = [mascot1, mascot2, mascot3];  

  return await rollService.create(result);
}

module.exports = rollResult;
