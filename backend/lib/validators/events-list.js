const {body} = require('express-validator')
const validator = require('../middelwares/validator')


exports.newEvent = [
    body('title').isLength({min: 2}).withMessage('Bitte gib ein Title ein!'),
    body('datum').isLength({min: 5}).withMessage('Bitte gib ein Datum ein!'),
    body('category').notEmpty().isIn(['Kinder', 'Erwachsene', 'Allgemein']).withMessage('Ungültige Kategorie!'),
    body('description').isLength({min: 2}).withMessage('Erzähl uns mehr über deine Frage!'),
    body('adresse').notEmpty().withMessage('Wo findet das Event statt!'),
    
    validator
]