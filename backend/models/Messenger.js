const {Schema, model, SchemaTypes} = require('mongoose')

const chatSchema = Schema({

    me: {type: SchemaTypes.ObjectId, ref: 'User'},
    friend: {type: SchemaTypes.ObjectId, ref: 'User'},
    message:[{type: String}]
})

module.exports = model('Chat', chatSchema)

