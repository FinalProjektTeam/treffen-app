const express = require('express')
const controller = require('../controllers/user')
const auth = require('../lib/middelwares/auth')

const app = express.Router()

app.route('/')
    .get( controller.getUsers )
 
app.post('/register', controller.register )
app.post('/login', controller.login )
app.post('/logout', auth,  controller.logout)


module.exports = app