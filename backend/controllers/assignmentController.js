const Assignment = require('../models/assignment')
const User = require('../models/user')
const Subject = require('../models/subject')

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

        const newAssignment = new Assignment({
            title,
            id_subject,
            dueDate,
            teacher,
            instructions,
        })

        const assignment = await newAssignment.save()
        res.send({succes: true, assignment: assignment})
    } catch (error) {
        res.status(400).send({succes: false, message: 'Error al crear un examen'})
        console.log('Error createAssignment: ', error.message);
    }
}

module.exports = {
    createAssignment
}
    
