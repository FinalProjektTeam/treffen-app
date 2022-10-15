const {Schema, model, SchemaTypes} = require('mongoose')

const chatSchema = Schema({

    // users: {
    //     user1: {type: SchemaTypes.ObjectId, ref: 'User'},
    //     user2:  {type: SchemaTypes.ObjectId, ref: 'User'}
    // },
    // messages:[{
    //         user: {type: SchemaTypes.ObjectId, ref: 'User'},
    //         message: {type: String}
    //     }]

    me: {type: SchemaTypes.ObjectId, ref: 'User'},
    friend: {type: SchemaTypes.ObjectId, ref: 'User'},
    messages:[{
        user: {type: SchemaTypes.ObjectId, ref: 'User'},
        message: { type: String}
    }]
})

module.exports = model('Chat', chatSchema)

