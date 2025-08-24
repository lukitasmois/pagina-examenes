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
        feedback,
        grade,
        note,
    } = req.body

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
            status,
            teacher,
            feedback,
            grade,
            note,
            kind
        })

        const exam = await newExam.save()
        res.send({succes: true, exam: newExam})
    } catch (error) {
        res.status(400).send({succes: false, message: 'Error al crear un examen'})
        console.log('Error createExam: ', error.message);
    }
}

const getAssignmentsBySubject = async (req, res) =>{     
    try {
    const { id_subject } = req.params;
    
    if (!id_subject) {
      return res.status(400).send({ success: false, message: 'Falta el id de la materia.' });
    }

    const exams = await Exam.find({
      id_subject: id_subject,
      kind: 'assignment'
    }).sort({ dueDate: 1 });
    return res.status(200).send({
      success: true,
      count: exams.length,
      exams
    });

  } catch (error) {
    console.error('Error getAssignmentsBySubject:', error.message);
    return res.status(500).send({
      success: false,
      message: 'Error al obtener las consignas de la materia.'
    });
  }

}

const getSubmissionByStudent = async (req, res) =>{     
    try {
    const { id_student } = req.params;
    
    if (!id_student) {
      return res.status(400).send({ success: false, message: 'Error al buscar el alumno.' });
    }

    const exams = await Exam.find({
      id_student: id_student,
      kind: 'submission'
    }).sort({ dueDate: 1 });
    return res.status(200).send({
      success: true,
      count: exams.length,
      exams
    });

  } catch (error) {
    console.error('Error getSubmissionByStudent:', error.message);
    return res.status(500).send({
      success: false,
      message: 'Error al obtener los examenes.'
    });
  }

}

module.exports = {createExam, getAssignmentsBySubject, getSubmissionByStudent}