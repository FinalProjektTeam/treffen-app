const express = require('express')
const controller = require('../controllers/user')
const auth = require('../lib/middelwares/auth')
require('express-async-errors')
const validator = require('../lib/validators/user')

const multer = require('multer')

const app = express.Router()

const upload = multer({dest: "uploads/"})

app.route('/')
    .get( auth ,controller.getCurrentUser )
    .patch( auth , controller.updateUser)

app.post('/register', upload.single("avatar") , validator.register , controller.register )
app.post('/login', controller.login )
app.post('/logout', auth,  controller.logout)

app.get('/:id',  controller.getSingleUser)


module.exports = app