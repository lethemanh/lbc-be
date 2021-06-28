const repository = require('./user.repository');
const bcrypt = require('bcrypt');

let saltRounds = 7

const find = function(query) {
    // Business logic

    // Querying
    return repository.find(query);
}

const create = async function(inputs) {
    // Business logic
    let username = await repository.findByUsername(inputs.username);
    if (username) {
        return false;
    }

    // Hashed password
    let salt = bcrypt.genSaltSync(saltRounds);
    inputs.password = bcrypt.hashSync(inputs.password, salt);

    inputs.balance = 10000;
    console.log(inputs);
    // Data validation

    // Persist data
    return repository.create(inputs);
}

const update = function(id, newObject) {
    // Business logic

    // Persist data
    return repository.update(id, newObject);
}

const remove = function(id) {
    return repository.remove(id);
}

module.exports = {
    find: find,
    create: create,
    update: update,
    remove: remove
};