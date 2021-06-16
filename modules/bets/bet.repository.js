const mongoose = require('mongoose');

const RollSchema = mongoose.Schema({
    amount: String,
    animalValue: String,
    counter: String
});

const Roll = mongoose.model('Roll', RollSchema);

const find = async function(query, limit, offset) {
    const rolls = await Roll
        .find(query)
        .limit(limit)
        .skip(offset)
        .exec();

    const total = await Roll.countDocuments(query);

    return { rolls, total };
}


const findById = function(id) {
    return Roll.findById(id).exec();
}

const create = function(inputs, cb) {
    const newRoll = new Roll(inputs);

    return newRoll.save();
}

const update = function(id, newObject) {
    return Roll.updateOne({ _id: id }, { $set: newObject });
}

const remove = function(id) {
    return Roll.deleteOne({ _id: id })
}

module.exports = {
    find: find,
    findById: findById,
    create: create,
    update: update,
    remove: remove
};