const express = require('express')
const router = express.Router()
const {createSubject, getSubjets} = require('../controllers/subjectsController')

router.post('/create', createSubject)

router.get('/get-subjets', getSubjets)

module.exports = router