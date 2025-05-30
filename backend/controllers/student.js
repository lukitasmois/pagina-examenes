const Student = require('../models/student')

const register = async (req, res) =>{
        const {dni, name, lastName, email, password} = req.body
    try {
        const newStudent = new Student({
        dni, 
        name, 
        lastName, 
        email,
        username: dni,
        password
    })

    const student = await Student.register(newStudent, password)
    res.status(200).send({succes: true, newStudent})
    } catch (error) {
        console.log(error.message);
        res.status(400).send({succes: false, message: "Error al intentar registrar el usuario"})
    }
}

const login = async (req, res) =>{
    const {username} = req.body
    const student = await Student.findOne({username: username})
    res.json({ logeado: true, estudiante: student });
}

module.exports = {register, login}
