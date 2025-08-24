const express = require('express')
const router = express.Router()

const {createExam, getAssignmentsBySubject, getSubmissionByStudent} = require('../controllers/examsControllers')

router.post('/create', createExam)

router.get('/getSubmissionByStudent/:id_student', getSubmissionByStudent)

module.exports= router