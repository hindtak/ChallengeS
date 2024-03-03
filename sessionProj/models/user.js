// library to validate data
const Joi = require('joi');

// array to store user data

const users = [
    {
      username: 'alice',
      password: 'hashed_password',
    },
]
function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(100).required(),
       
    });
    return schema.validate(user);
}

function createUser(user) {
    const newUser = {
        ...user
    };
    users.push(newUser);
   return newUser;
}
module.exports.validate = validateUser
module.exports.User = users