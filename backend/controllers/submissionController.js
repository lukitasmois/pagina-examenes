const Submission = require('../models/submission')
const User = require('../models/user')
const { generateSubmission } = require('../helpers/submissions')

const createSubmission = async (req, res) => {
  try {
    const { id_subject, id_student, id_assignment } = req.body;

    const submission = await generateSubmission({ id_subject, id_student, id_assignment });

    return res.status(201).send({
      success: true,
      message: 'Entrega creada correctamente.',
      submission
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message
    });
  }
};

const getSubmissions = async (req, res) =>{     
    try {
    const { id_student } = req.params;

    const student = await User.findById(id_student)
    
    if (!student) {
      return res.status(400).send({ success: false, message: 'Error al buscar el alumno.' });
    }

    const submissions = await Submission.find({
      "student._id": id_student
    }).sort({ dueDate: 1 });
    return res.status(200).send({
      success: true,
      count: submissions.length,
      submissions
    });

  } catch (error) {
    console.error('Error getSubmissionByStudent:', error.message);
    return res.status(500).send({
      success: false,
      message: 'Error al obtener los examenes.'
    });
  }

}

module.exports ={
    createSubmission,
    getSubmissions
}