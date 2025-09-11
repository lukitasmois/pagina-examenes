const express = require('express')
const router = express.Router()

const {
    createAssignment,
    getAssignmentsBySubject,
    getAssignmentById
} = require('../controllers/assignmentController')

router.post('/create', createAssignment)

router.get('/getAssignments/:id_subject', getAssignmentsBySubject)

router.get('/getAssignmentById/:id', getAssignmentById)

module.exports = router