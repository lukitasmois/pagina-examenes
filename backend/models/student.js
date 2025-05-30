const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const StudentSchema = new Schema({
    dni: { type: String, min: 7, max: 8, required: true, unique: true},
    name: {type: String, min: 3, required: true},
    lastName: {type: String, min: 3, required: true},
    email: {
      unique: true, 
      type: String, 
      validate: {
        validator: function(v) {
          return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
      required: true
    },

})

StudentSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Student', StudentSchema)