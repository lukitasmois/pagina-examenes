require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const app = express();
const port = 3000;
const User = require("./models/user.js")
const cors = require('cors')

const allowedOrigins = [
  'https://pagina-examenes-vercel2.vercel.app',
  'https://pagina-examenes-vercel2-hw1oh4zmq-lukitasmois-projects.vercel.app' // La URL que te dio el error
];

app.use(express.json())
app.use(cors({
  origin: function (origin, callback) {
    // permitir peticiones sin origen como postman
    // o si el origen esta en la lista
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true, // necesario para enviar cookies o sesiones
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

crearAdmin();

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
  console.log(`127.0.0.1:${port}`);
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
  proxy: true,
  secret: process.env.CLAVE_SECRETA,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,      // Obligatorio para HTTPS (que ya tienes)
    sameSite: 'none',  // Obligatorio para cross-domain (Vercel -> Oracle)
    httpOnly: true,    // Recomendado por seguridad
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
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
