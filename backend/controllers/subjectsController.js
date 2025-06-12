const Subject = require('../models/subject')

const createSubject = async (req, res) =>{
    const {name, code_subjet: code_subject} = req.body

    try {
        const newSubject = new Subject({
            name, 
            code_subject
        })

        const subject = await newSubject.save()
        res.status(200).send({succes: true, subject: newSubject})
    } catch (error) {
        console.log(error.message);
        res.status(400).send({succes: false, message: 'Error al intentar crear una materia.'})        
    }
}

module.exports = {createSubject}

