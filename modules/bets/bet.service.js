const repository = require('./bet.repository');
const rollRepo= require('./../rolls/roll.repository');
const userRepo= require('./../users/user.repository');


const find = function(query, limit, offset) {
    // Business logic

    // Querying
    return repository.find(query, limit, offset);
}

const create = async function(inputs) {
    // Business logic
    // user = req.user 
    let rollId = await rollRepo.findIdRoll();
    let user = await userRepo.findUser();
    inputs.rolls = await rollId;

    user.balance = user.balance - inputs.amount;
    inputs.users = user;
    
    console.log("user:", user);
    
    // Data validation

    // Persist data
    await userRepo.update(user._id, user);
    return repository.create(inputs);
}

const update = async function(id) {
    // Business logic
    let bet = await repository.findById(id);
    let User = await userRepo.findUser();
    let Roll = await rollRepo.findIdRoll();
    
    let i = 0;
    bet.rolls.rollResult.forEach( item => {
        if( bet.choice === item) {
            i++;
        }
    });

    let newBalance = bet.users.balance + (bet.amount * i * 2);
    
    User.balance = newBalance;

    // Change status
    bet.rolls.status = "done";
    Roll.status = "done";

    // Persist data 
    await userRepo.update(User._id, User);
    await rollRepo.update(Roll._id, Roll);

    return repository.update(bet._id, bet);
}

const remove = function(id) {
    return repository.remove(id);
}

module.exports = {
    find: find,
    create: create,
    update: update,
    remove: remove,
};