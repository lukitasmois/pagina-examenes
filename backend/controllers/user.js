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

const login = (req, res) => {
    res.json({
        logged: true,
        user: req.user
    });
};

const userLogged = async (req,res) =>{
    console.log(req.user);
    
    if (req.user){
        res.json({
            user: req.user,
            logged: true
        })
    }
    else{
        res.json({message: "No hay usuario logueado", logged: false})
    }
}
module.exports = {register, login, userLogged}
