const express = require('express')
const router = express.Router()

const {
    createAssignment,
    getAssignmentsBySubject
} = require('../controllers/assignmentController')

router.post('/create', createAssignment)

router.get('/getAssignments/:id_subject', getAssignmentsBySubject)

module.exports = router