const {body} = require('express-validator')
const validator = require('../middelwares/validator')

exports.register = [
    body('email').isEmail().withMessage('Wir benötigen eine gültige E-Mail adresse!'),
    body('password').isLength({min: 6}).withMessage('Das ist nicht dein Passwort!'),
    body('firstname').isAlpha().withMessage('Wir benötigen dein Vorname!'),
    body('lastname').isAlpha().withMessage('Wir benötigen dein Nachname!!'),
    body('gender').notEmpty().isIn(["Male", "Female"]).withMessage('Wir benötigen deine Geschlecht!'),
    body('age').isNumeric().withMessage('Wir benötigen deine Alter!'),

    validator
]

exports.login = [
    body('email').isEmail().withMessage('Wir benötigen eine gültige E-Mail adresse!'),
    body('password').isLength({min: 6}).withMessage('Das ist nicht dein Passwort!'),

    validator
]