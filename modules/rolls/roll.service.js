const repository = require('./user.repository');

const find = function(query, limit, offset) {
    // Business logic

    // Querying
    return repository.find(query, limit, offset);
}

const create = function(inputs) {
    // Business logic

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