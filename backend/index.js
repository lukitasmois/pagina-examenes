require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const app = express();
const port = 3000;
const Student = require("./models/student")

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

passport.use(Student.createStrategy())
passport.serializeUser(Student.serializeUser())
passport.deserializeUser(Student.deserializeUser())


//Rutas
const studentRouter = require('./routes/studenRouter')

app.use('/api/students/', studentRouter)