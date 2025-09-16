const Assignment = require('../models/assignment')
const User = require('../models/user')
const Subject = require('../models/subject')

const {
  generateSubmission
} = require('../helpers/submissions')

const createAssignment = async (req, res) =>{
    const {
        title,
        id_subject,
        dueDate,
        id_teacher,
        instructions,
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

        const listUsers = await User.find({
          subjects: id_subject,
        })
        

        const idStudents = listUsers
        .filter(user => user.role === 'STUDENT')
        .map(student => student._id)        
        
        const newAssignment = new Assignment({
            title,
            id_subject,
            dueDate,
            teacher,
            instructions,
            students: idStudents,
            submissionsPending: idStudents.length,
            totalStudents: idStudents.length
        })

        const assignment = await newAssignment.save()

        const submissions = [];
        for (const id_student of idStudents) {
          try {
            const submission = await generateSubmission({
            id_subject,
            id_student,
            id_assignment: newAssignment._id,
            dueDate: newAssignment.dueDate
          });
          submissions.push(submission);
          } catch (error) {
            console.warn(`No se pudo crear submission para estudiante ${id_student}: ${error.message}`);
          }
        }        
        
        res.send({succes: true, assignment: assignment})

    } catch (error) {
        res.status(400).send({succes: false, message: 'Error al crear un examen'})
        console.log('Error createAssignment: ', error.message);
    }
}

const getAssignmentsBySubject = async (req, res) =>{     
    try {
    const { id_subject } = req.params;
    
    if (!id_subject) {
      return res.status(400).send({ success: false, message: 'Falta el id de la materia.' });
    }

    const assignments = await Assignment.find({
      id_subject: id_subject,
    }).sort({ dueDate: 1 });
    return res.status(200).send({
      success: true,
      count: assignments.length,
      assignments
    });

  } catch (error) {
    console.error('Error getAssignmentsBySubject:', error.message);
    return res.status(500).send({
      success: false,
      message: 'Error al obtener las consignas de la materia.'
    });
  }

}

const getAssignmentById = async (req, res) =>{
  try {
    const {id} = req.params

    const assignment = await Assignment.findById(id);

    if(!assignment){
      return res.status(400).send({succes: false, message: 'No se enontro ningun examen.'})
    }

    return res.status(200).send({succes: true, assignment: assignment})

  } catch (error) {
    console.error('Error getAssignmentsBySubject:', error.message);
    return res.status(500).send({
      success: false,
      message: 'Error al obtener el examen.'
    });
  }
}

module.exports = {
    createAssignment,
    getAssignmentsBySubject,
    getAssignmentById
}
    
