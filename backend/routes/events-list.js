const express = require('express')
const controller = require('../controllers/events-list')
const auth = require('../lib/middelwares/auth')
const validation = require('../lib/validators/events-list')
const multer = require("multer")
require('express-async-errors')

const upload = multer({dest: "uploads/"})

const app = express.Router()

app.get( '/', controller.getEvents )
app.post( '/', upload.single("eventBild") ,auth , validation.newEvent, controller.addEvent )
app.delete('/', auth, controller.deleteEvent )

app.post('/join', auth, controller.joinEvent)

app.get('/:id',  controller.getSingleEvent )


module.exports = app