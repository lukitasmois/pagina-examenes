const Subject = require('../models/subject')
const User = require('../models/user')

const createSubject = async (req, res) =>{
    const {name, code_subject: code_subject} = req.body

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

const getSubjets = async (req,res) =>{
    const {id} = req.body
    try {
        const user = await User.findById(id)
        const subjects = user.subjects

        res.status(200).send({succes: true, subjects: subjects})
    } catch (error) {
        console.log(error.message);
        
        res.status(400).send({succes: false, message: 'Error al conseguir las materias.'})
    }
}

module.exports = {createSubject, getSubjets}

