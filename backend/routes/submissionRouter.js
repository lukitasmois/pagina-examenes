const express = require('express')
const router = express.Router()

const {
    createSubmission,
    getSubmissions
} = require('../controllers/submissionController')

router.post('/create', createSubmission)

router.get('/getSubmissions/:id_student', getSubmissions)

module.exports = router