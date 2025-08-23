const express = require('express')
const router = express.Router()

const {
    createAssignment
} = require('../controllers/assignmentController')

router.post('/create', createAssignment)

module.exports = router