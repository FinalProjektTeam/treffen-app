const express = require('express')
const controller = require('../controllers/user')
const auth = require('../lib/middelwares/auth')

const app = express.Router()

app.route('/')
    .get( controller.getCurrentUser )
 
app.post('/register', controller.register )
app.post('/login', controller.login )
app.post('/logout', auth,  controller.logout)

app.get('/:id', controller.getSingleUser)


module.exports = app