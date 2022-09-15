const express = require('express')
const auth = require('../lib/middelwares/auth')
const controller = require('../controllers/comment')
require('express-async-errors')

const app = express.Router()

app.post('/', auth, controller.createComment)

module.exports = app