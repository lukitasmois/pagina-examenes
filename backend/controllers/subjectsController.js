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

const addSubject = async (req, res) =>{
    const {id_subjetct, id} = req.body
    try {

        const subjetct = await Subject.findById(id_subjetct)
        if(!subjetct){
            return res.status(400).send({succes: false, message: 'Materia invalida.'})
        }

        const user = await User.findById(id)
        if(!user){
            return res.status(400).send({succes: false, message: 'Usuario invalido.'})
        }

        if(user.subjects.find((id) => id == id_subjetct)){
            return res.status(400).send({succes: false, message: 'La materia ya esta en el usuario.'})
        }

        user.subjects.push(id_subjetct)
        
        await User.updateOne({id: user.id}, {subjects: user.subjects})
        await user.save()
        
        res.status(200).send({succes: true, user: user})
    } catch (error) {
        console.log(error.message);
        res.status(400).send({succes: false, message: 'Error al cargar la materia al usuario.'})
    }
}

module.exports = {createSubject, getSubjets, addSubject}

