const express = require('express')
const controller = require('../controllers/messenger')
const auth = require('../lib/middelwares/auth')
require('express-async-errors')
const validator = require('../lib/validators/messenger')

const app = express.Router()

app.route('/')
    .get( auth , controller.readChat )
    .post( auth , controller.startChat )

app.post('/set', auth , controller.setChat )



module.exports = app

// comments validator