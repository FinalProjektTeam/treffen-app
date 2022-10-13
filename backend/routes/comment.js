const express = require('express')
const auth = require('../lib/middelwares/auth')
const controller = require('../controllers/comment')
require('express-async-errors')
const validator = require('../lib/validators/comment')

const app = express.Router()

app.post('/', validator.comment  ,auth, controller.createComment)

app.delete('/', auth,  controller.deleteComment)

module.exports = app