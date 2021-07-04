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

const find = async function(body) {
    const checkUserName = await User
    .find({username: body.username})
    .exec();
    if (checkUserName.length === 0) {
        throw new Error('Invalid user');
    }
    const user = await User
    .find({username: body.username, password: body.password})
    .exec();
    if (user.length === 0) {
        throw new Error('Invalid password');
    } 
    return user;
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

const findByUsername = function (username) {
    return User.findOne({ username: username}).exec();
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
    findByUsername : findByUsername ,
};