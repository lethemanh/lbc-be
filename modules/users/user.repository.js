const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    fullName: String,
    avatar: String,
    balance: Number,
    age: Number
});

const User = mongoose.model('User', UserSchema);

const find = async function(query, limit, offset) {
    const users = await User
        .find(query)
        .limit(limit)
        .skip(offset)
        .exec();

    const total = await User.countDocuments(query);

    return { users, total };
}


const findById = function(id) {
    return User.findById(id).exec();
}

const create = function(inputs, cb) {
    const newUser = new User(inputs);

    return newUser.save();
}

const update = function(id, newObject) {
    return User.updateOne({ _id: id }, { $set: newObject });
}

const remove = function(id) {
    return User.deleteOne({ _id: id })
}

//demo fake user - ko su dung
const findUser = function () {
    return User.findOne({ username: "nddmanh" }).exec();
}

module.exports = {
    find: find,
    findById: findById,
    create: create,
    update: update,
    remove: remove,
    findUser: findUser,
};