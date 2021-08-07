const RollService = require('../modules/rolls/roll.service');

const serverRoll = async () => {
  let inputs = {};
  let random1 = Math.floor(Math.random() * 6) + 1; 
  let random2 = Math.floor(Math.random() * 6) + 1; 
  let random3 = Math.floor(Math.random() * 6) + 1; 
  let result = [random1, random2, random3];  

  inputs.rollResult = result;
  return await RollService.create(inputs);
}

module.exports = serverRoll;
