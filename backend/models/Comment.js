const {Schema, model, SchemaTypes} = require('mongoose')

const commentSchema = Schema({
    user: {type: SchemaTypes.ObjectId, ref: 'User'},
    event: {type: SchemaTypes.ObjectId, ref: 'Event'},
    comment: {type: String, required: true}

})

module.exports = model('Comment', commentSchema)