const Exam = require('../models/exam')
const User = require('../models/user')
const Subject = require('../models/subject')

const createExam = async (req, res) =>{
    const {
        title,
        id_subject,
        submmitedAt,
        dueDate,
        status,
        id_teacher,
        feedback,
        grade,
        note
    } = req.body

    try {
        
        const teacher = await User.findById(id_teacher)
        
        if(!teacher){
            throw new Error('El profesor es invalido.')
        }

        const subject = await Subject.findById(id_subject)

        if(!subject){
            throw new Error('La materia es invalida.')
        }

        const newExam = new Exam({
            title,
            id_subject,
            submmitedAt,
            dueDate,
            status,
            id_teacher,
            feedback,
            grade,
            note
        })

        const exam = await newExam.save()
        res.send({succes: true, exam: newExam})
    } catch (error) {
        res.status(400).send({succes: false, message: 'Error al crear un examen'})
        console.log('Error: ', error.message);
    }
}

module.exports = {createExam}