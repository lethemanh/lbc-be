const {check} = require('express-validator');

let register = () => {
    return [
        check("username", "username does not Empty")
            .not()
            .isEmpty(),
        check("password", "password more than 6 degits and must contain numbers, uppercase, lowercase and special characters")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/)
    ];
} 

module.exports = {
    register: register,
};