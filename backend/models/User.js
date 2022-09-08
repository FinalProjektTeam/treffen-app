const {Schema, model} = require('mongoose')

const userSchema = Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: String, required: true},
    avatar: {type: String}
    
})

module.exports = model('User', userSchema)