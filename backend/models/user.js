const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

VALID_ROLES = ['STUDENT', 'ADMIN', 'TEACHER']
DEFAULT_ROLE = 'STUDENT'

const User = new Schema({
    dni: { type: String, min: 7, max: 8, required: true, unique: true},
    name: {type: String, min: 3, required: true},
    lastName: {type: String, min: 3, required: true},
    email: {
      unique: true, 
      type: String, 
      validate: {
        validator: function(v) {
          return /^[\w._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
      required: true
    },
    role: {type: String, enum: VALID_ROLES, default: DEFAULT_ROLE},
    subjects: []
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)