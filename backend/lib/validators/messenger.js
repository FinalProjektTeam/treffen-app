const {body} = require('express-validator')
const validator = require('../middelwares/validator')

exports.message = [
    body('message').isLength({min:1}).withMessage('Type something!'),

    validator
]