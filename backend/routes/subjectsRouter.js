const express = require('express')
const router = express.Router()
const {createSubject} = require('../controllers/subjectsController')

router.post('/create', createSubject)

module.exports = router