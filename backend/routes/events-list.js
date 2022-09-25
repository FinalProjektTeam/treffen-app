const express = require('express')

const controller = require('../controllers/events-list')
const auth = require('../lib/middelwares/auth')
const validation = require('../lib/validators/events-list')

require('express-async-errors')

const app = express.Router()

app.get( '/', controller.getEvents )
app.post( '/', auth , validation.newEvent, controller.addEvent )
app.delete('/', auth, controller.deleteEvent )

app.post('/join', auth, controller.joinEvent)

app.get('/:id',  controller.getSingleEvent )


module.exports = app