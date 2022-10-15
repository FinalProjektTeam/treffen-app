const {Schema, model, SchemaTypes} = require('mongoose')

const messageSchema = Schema({

    sender: {type: SchemaTypes.ObjectId, ref: 'User'},
    friend: {type: SchemaTypes.ObjectId, ref: 'User'},
    messages:[{
        user: {type: SchemaTypes.ObjectId, ref: 'User'},
        message: { type: String}
    }]
})

module.exports = model('Message', messageSchema)

