const repository = require('./user.repository');
const jwt = require('jsonwebtoken');
const configs = require('../../config/index')

const find =  async function(body) {
    // Business logic

    //Transform query - Data validation
    if(!body.username) {
        throw new Error('Lack of username');
    } else if (!body.password) {
        throw new Error('Lack of password');
    }
    const supportedQueryFields = ['username', 'password'];

    Object.keys(body).forEach(function (key) {
        if(!supportedQueryFields.includes(key)) {
            throw new Error(`Unrecognized field: ${key}`)
        }
    })
    
    const userData = await repository.find(body);
    const accessTokenLife = configs.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = configs.ACCESS_TOKEN_SECRET;

    let generateToken = (user, secretSignature, tokenLife) => {
        return new Promise ((resolve, reject) => {
            jwt.sign(
                {data: user},
                secretSignature,
                {
                    algorithm: "HS256",
                    expiresIn: tokenLife
                },
                (error, token) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(token);
                });
        }); 
    } 

    const accessToken = await generateToken(userData, accessTokenSecret, accessTokenLife);
        
    return {
        accessToken: accessToken,
    }
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