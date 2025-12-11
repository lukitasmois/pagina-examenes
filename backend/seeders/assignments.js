const Assignment = require('../models/assignment')
const Subject = require('../models/subject')
const User = require('../models/user')

const {
  generateSubmission
} = require('../helpers/submissions')

const ASSIGNMENT_LIST =[
    
]

const seedAssignmens = async () => {
    const {
        title,
        id_subject,
        dueDate,
        id_teacher,
        instructions,
        code_subject
    } = req.body

    try {

        ASSIGNMENT_LIST.forEach(async (assignmentItem) => {
            
            const listUsers = await User.find({
                subject: assignmentItem.code_subject
            })

            const idStudents = listUsers
            .filter(user => user.role === 'STUDENT')
            .map(student => student._id)   


            const newAssignment = new Assignment({
                title: assignmentItem.title,
                code_subject: assignmentItem.code_subject,
                dueDate: assignmentItem.dueDate,
                teacher: assignmentItem.teacher,
                instructions: assignmentItem.instructions,
                students: idStudents,
                submissionsPending: idStudents.length,
                totalStudents: idStudents.length
            })

            const assignment = await newAssignment.save()

            const submissions = [];
            for (const id_student of idStudents) {
            try {
                const submission = await generateSubmission({
                code_subject,
                id_student,
                id_assignment: newAssignment._id,
                dueDate: newAssignment.dueDate
            });
            submissions.push(submission);
            } catch (error) {
                console.warn(`No se pudo crear submission para estudiante ${id_student}: ${error.message}`);
            }
            } 

            //const subject = await Subject.findOne({code_subject: assignmentItem.code_subject})

            if(exist){
                console.log({succes: false, message: "Error al intentar registrar el assignment"})
            }else{
                console.log({succes: true, assignment: newAssignment})
            }
        });

    } catch (error) {
        console.log(error.message);
        console.log({succes: false, message: 'Error al intentar crear una materia.'})        
    }
}

exports.module = { seedAssignmens }