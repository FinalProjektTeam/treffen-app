const {Schema, model, SchemaTypes} = require('mongoose')

const chatSchema = Schema({

 
    participants: [{type: SchemaTypes.ObjectId, ref: 'User'}],
    /*me: {type: SchemaTypes.ObjectId, ref: 'User'},
    friend: {type: SchemaTypes.ObjectId, ref: 'User'},*/
    messages:[{
        user: {type: SchemaTypes.ObjectId, ref: 'User'},
        message: { type: String}
    }]
})

module.exports = model('Chat', chatSchema)

