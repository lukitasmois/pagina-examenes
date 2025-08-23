const Submission = require('../models/submission')
const User = require('../models/user')
const Subject = require('../models/subject')
const Assignment = require('../models/assignment')

const createSubmission = async (req, res) =>{
    const {
        id_subject,
        id_student,
        id_assignment,
        file
    } = req.body

    try {
        
        const student = await User.findById(id_student)
        
        if(!student || student.role != 'STUDENT'){
            return res.status(400).send({succes: false, message: 'El estudiante es invalido.'})
        }

        const subject = await Subject.findById(id_subject)

        if(!subject){
            return res.status(400).send({succes: false, message: 'La materia es invalida.'})
        }

        const dbSubmission = await Submission.findOne({
            id_student: id_student,
            id_assignment: id_assignment
        })

        if(dbSubmission){
            return res.status(400).send({succes: false, message: 'Ya hay una entrega de este examen cargada en la plataforma.'})
        }

        const newSubmission = new Submission({
            title: `Examen de ${subject.name}`,
            id_subject,
            student,
            id_assignment,
            file
        })

        const submission = await newSubmission.save()
        res.send({succes: true, submission: submission})
    } catch (err) {
        console.log('Error createSubmission: ', err);
        
        if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: "Ya existe una entrega para este estudiante en este assignment"
        });
        }

        return res.status(500).json({
            success: false,
            message: 'Error al realizar la entrega.'
        })
}
};

module.exports ={
    createSubmission
}