const express = require('express')
const router = express.Router()

const {createExam, getAssignmentsBySubject} = require('../controllers/examsControllers')

router.post('/create', createExam)

router.get('/getAssignmentsBySubject/:id_subject', getAssignmentsBySubject)

module.exports= router