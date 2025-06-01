const User = require('../models/user')

const register = async (req, res) =>{
        const {dni, name, lastName, email, password} = req.body
    try {
        const newUser = new User({
        dni, 
        name, 
        lastName, 
        email,
        username: email,
        password
    })

    const user = await User.register(newUser, password)
    res.status(200).send({succes: true, newUser: newUser})
    } catch (error) {
        console.log(error.message);
        res.status(400).send({succes: false, message: "Error al intentar registrar el usuario"})
    }
}

const login = async (req, res) =>{
    const {username} = req.body
    const user = await User.findOne({username: username})
    res.json({ logeado: true, usuario: user });
}

module.exports = {register, login}
