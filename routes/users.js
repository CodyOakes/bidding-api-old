const express = require('express')
const router = express.Router()

const {
  getUsers,
} = require('../controller/users')

router.get('/', getUsers)

module.exports = router