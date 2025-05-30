require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const app = express();
const port = 3000;
const User = require("./models/user")

app.use(express.json())

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
  console.log(`http://localhost:${port}`);
});

app.get('/',(req, res) =>{
  res.status(200).send("ok")
})

//Conexion mongoose
mongoose.connect(process.env.MONGO_URL_CONNECTION)
.then( () => {
  console.log("Conectado a la base de datos");
})

// Passport
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


//Rutas
const userRouter = require('./routes/userRouter')

app.use('/api/students/', userRouter)