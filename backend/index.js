require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const app = express();
const port = 3000;
const User = require("./models/user.js")
const cors = require('cors')
const {seedUsers} = require('./seeders/users.js')
const {seedSubjects} = require('./seeders/subjects.js')

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}))

crearAdmin();

//seeders
seedSubjects()
seedUsers()

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
  secret: process.env.CLAVE_SECRETA,
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
const examsRouter = require('./routes/examsRouter.js')
const subjectsRouter = require('./routes/subjectsRouter.js');
const assignmentRouter = require('./routes/assignmentRouter.js');
const submissionRouter = require('./routes/submissionRouter.js')

app.use('/api/users/', userRouter)
app.use('/api/exams/', examsRouter)
app.use('/api/subjects/', subjectsRouter)
app.use('/api/assignments/', assignmentRouter)
app.use('/api/submissions/', submissionRouter)



//crear admin
async function crearAdmin() {
  const usuarios = await User.find();

  if (usuarios.length === 0) {
    const admin = new User({
      dni: '00000000',
      name: "admin",
      lastName: "admin",
      email: "admin@admin.com",
      username: "admin@admin.com",
      rol: "ADMIN",
    });
    const nuevoUsuario = await User.register(admin, "admin123");
    console.log('Admin creado.');
  }
}
