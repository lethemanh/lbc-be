const repository = require('./roll.repository');

const find = function(query, limit, offset) {
    // Business logic

    // Querying
    return repository.find(query, limit, offset);
}

const create = function(inputs) {
    // Business logic
    let random1 = Math.floor(Math.random() * 6) + 1; 
    let random2 = Math.floor(Math.random() * 6) + 1; 
    let random3 = Math.floor(Math.random() * 6) + 1; 

    let result = [random1, random2, random3];

    inputs = {
        rollResult: result,
        status: "proccessing"
    }

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