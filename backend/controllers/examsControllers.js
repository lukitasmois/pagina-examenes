const Exam = require('../models/exam')
const User = require('../models/user')
const Subject = require('../models/subject')

const createExam = async (req, res) =>{
    const {
        kind,
        title,
        id_subject,
        dueDate,
        id_teacher,
        instructions,
        status,
        } = req.body;


    try {
        
        const teacher = await User.findById(id_teacher)
        
        if(!teacher || teacher.role != 'TEACHER'){
            return res.status(400).send({succes: false, message: 'El profesor es invalido.'})
        }

        const subject = await Subject.findById(id_subject)

        if(!subject){
            return res.status(400).send({succes: false, message: 'La materia es invalida.'})
        }

        const newExam = new Exam({
            kind,
            title,
            id_subject,
            dueDate,
            id_teacher,
            instructions,
            status,
        })

        const exam = await newExam.save()
        res.send({succes: true, exam: newExam})
    } catch (error) {
        res.status(400).send({succes: false, message: 'Error al crear un examen'})
        console.log('Error: ', error.message);
    }
}

module.exports = {createExam}