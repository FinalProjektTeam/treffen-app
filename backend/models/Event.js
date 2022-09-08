const {Schema, model} = require('mongoose')

const userSchema = Schema({
    title: {type: String, required: true, unique: true},
    datum: {type: String, required: true},
    category: {
        type: String, 
        enum: [ 'Kinder', 'Erwachsene', 'Allgemein' ],
        required: true
    },
    description: {type: String, required: true},
    addresse: {type: String, required: true},
    bild: {type: String},
    
})

module.exports = model('Event', userSchema)