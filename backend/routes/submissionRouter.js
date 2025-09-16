const express = require('express')
const router = express.Router()

const {
    createSubmission,
    getSubmissions,
    getSubmissionsByAssignment
} = require('../controllers/submissionsController')

router.post('/create', createSubmission)

router.get('/getSubmissions/:id_student', getSubmissions)

router.get('/getSubmissionsByAssignment/:id_assignment', getSubmissionsByAssignment)

module.exports = router