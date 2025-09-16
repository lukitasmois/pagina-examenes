const {
    registerSeed
} = require('../controllers/usersController'); 
const user = require('../models/user');

const USERS_LIST = [
  {
    "dni": "12345678",
    "name": "Lucas",
    "lastName": "Martinez",
    "email": "lucas.martinez@example.com",
    "role": "STUDENT",
    "subjects": ["MA-001"],
    "password": "aaa"
  },
  {
    "dni": "23456789",
    "name": "Valentina",
    "lastName": "Gomez",
    "email": "valentina.gomez@example.com",
    "role": "STUDENT",
    "subjects": ["MA-001"],
    "password": "aaa"
  },
  {
    "dni": "34567890",
    "name": "Matias",
    "lastName": "Lopez",
    "email": "matias.lopez@example.com",
    "role": "STUDENT",
    "subjects": ["MA-001"],
    "password": "aaa"
  },
  {
    "dni": "45678901",
    "name": "Camila",
    "lastName": "Fernandez",
    "email": "camila.fernandez@example.com",
    "role": "STUDENT",
    "subjects": ["MA-001"],
    "password": "aaa"
  },
  {
    "dni": "56789012",
    "name": "Santiago",
    "lastName": "Perez",
    "email": "santiago.perez@example.com",
    "role": "STUDENT",
    "subjects": ["MA-001"],
    "password": "aaa"
  },
  {
    "dni": "67890123",
    "name": "Julieta",
    "lastName": "Rodriguez",
    "email": "julieta.rodriguez@example.com",
    "role": "STUDENT",
    "subjects": ["IN-001"],
    "password": "aaa"
  },
  {
    "dni": "78901234",
    "name": "Facundo",
    "lastName": "Garcia",
    "email": "facundo.garcia@example.com",
    "role": "STUDENT",
    "subjects": ["IN-001"],
    "password": "aaa"
  },
  {
    "dni": "89012345",
    "name": "Agustina",
    "lastName": "Romero",
    "email": "agustina.romero@example.com",
    "role": "STUDENT",
    "subjects": ["IN-001"],
    "password": "aaa"
  },
  {
    "dni": "90123456",
    "name": "Tomas",
    "lastName": "Silva",
    "email": "tomas.silva@example.com",
    "role": "STUDENT",
    "subjects": ["IN-001"],
    "password": "aaa"
  },
  {
    "dni": "11223344",
    "name": "Sofia",
    "lastName": "Alvarez",
    "email": "sofia.alvarez@example.com",
    "role": "STUDENT",
    "subjects": ["IN-001"],
    "password": "aaa"
  },
  {
    "dni": "22334455",
    "name": "Ignacio",
    "lastName": "Moreno",
    "email": "ignacio.moreno@example.com",
    "role": "STUDENT",
    "subjects": ["ES-001"],
    "password": "aaa"
  },
  {
    "dni": "33445566",
    "name": "Martina",
    "lastName": "Herrera",
    "email": "martina.herrera@example.com",
    "role": "STUDENT",
    "subjects": ["ES-001"],
    "password": "aaa"
  },
  {
    "dni": "44556677",
    "name": "Nicolas",
    "lastName": "Ramos",
    "email": "nicolas.ramos@example.com",
    "role": "STUDENT",
    "subjects": ["ES-001"],
    "password": "aaa"
  },
  {
    "dni": "55667788",
    "name": "Milagros",
    "lastName": "Mendez",
    "email": "milagros.mendez@example.com",
    "role": "STUDENT",
    "subjects": ["ES-001"],
    "password": "aaa"
  },
  {
    "dni": "66778899",
    "name": "Benjamin",
    "lastName": "Castro",
    "email": "benjamin.castro@example.com",
    "role": "STUDENT",
    "subjects": ["ES-001"],
    "password": "aaa"
  },
  {
    "dni": "77889900",
    "name": "Claudia",
    "lastName": "Sosa",
    "email": "claudia.sosa@example.com",
    "role": "TEACHER",
    "subjects": ["MA-001"],
    "password": 'aaa'
  },
  {
    "dni": "88990011",
    "name": "Ricardo",
    "lastName": "Molina",
    "email": "ricardo.molina@example.com",
    "role": "TEACHER",
    "subjects": ["IN-001"],
    "password": 'aaa'
  },
  {
    "dni": "99001122",
    "name": "Gabriela",
    "lastName": "Torres",
    "email": "gabriela.torres@example.com",
    "role": "TEACHER",
    "subjects": ["ES-001"],
    "password": 'aaa'
  }
]

const seedUsers = async () => {
    USERS_LIST.forEach(user => {
      const req = {
        body: {
          ...user
        }
      }
      registerSeed(req)
    });    
}

module.exports = {seedUsers}