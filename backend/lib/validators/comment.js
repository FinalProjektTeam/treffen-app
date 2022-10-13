const {body} = require('express-validator')
const validator = require('../middelwares/validator')

exports.comment = [
    body('comment').isAlpha().isLength({min: 2}).withMessage('Write something!'),

    validator
]