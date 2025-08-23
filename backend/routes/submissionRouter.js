const express = require('express')
const router = express.Router()

const {
    createSubmission
} = require('../controllers/submissionController')

router.post('/create', createSubmission)

module.exports = router