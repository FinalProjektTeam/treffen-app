const {Schema, model, SchemaTypes} = require('mongoose')

const userSchema = Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    gender: {type: String},
    age: {type: String, required: true},
    avatar: {type: String},
    events: [{
        type: SchemaTypes.ObjectId,
        ref: 'Event'
    }],
    token: {type: String},
})

module.exports = model('user', userSchema)