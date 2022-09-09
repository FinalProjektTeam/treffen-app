const {Schema, model, SchemaTypes} = require('mongoose')

const eventSchema = Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String, 
        enum: [ 'Kinder', 'Erwachsene', 'Allgemein' ],
        required: true
    },
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    adresse: {type: String, required: true},
    datum: {type: String, required: true},
    bild: {type: String},
    comment: [{
        type: SchemaTypes.ObjectId,
        ref: 'Comment',
    }]

    
})

module.exports = model('Event', eventSchema)