const User = require('../models/user');
const Subject = require('../models/subject');
const Submission = require('../models/submission');

const generateSubmission = async ({ code_subject, id_student, id_assignment, dueDate }) => {
  const student = await User.findById(id_student);
  if (!student || student.role !== 'STUDENT') {
    throw new Error('Estudiante inválido.');
  }

  const subject = await Subject.find({code_subject: code_subject});
  if (!subject) {
    throw new Error('Materia inválida.');
  }

  const existingSubmission = await Submission.findOne({
    student: id_student,
    id_assignment
  });

  if (existingSubmission) {
    throw new Error('Ya existe una entrega para este estudiante.');
  }

  const newSubmission = new Submission({
    title: `Examen de ${subject.name}`,
    subject,
    student,
    id_assignment,
    file: null,
    dueDate
  });

  return await newSubmission.save();
};

module.exports = { generateSubmission };
