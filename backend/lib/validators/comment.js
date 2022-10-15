const {body} = require('express-validator')
const validator = require('../middelwares/validator')

exports.comment = [
    body('comment').isLength({min: 2}).withMessage('Write something!'),

    validator
]