const express = require('express')
const router = express.Router()
const {createSubject, getSubjets, addSubject} = require('../controllers/subjectsController')

router.post('/create', createSubject)

router.get('/get-subjets', getSubjets)

router.patch('/add-subject', addSubject)

module.exports = router