const express = require('express')
const auth = require('../lib/middelwares/auth')
const controller = require('../controllers/comment')


const app = express.Router()

app.post('/', auth, controller.createComment)

module.exports = app