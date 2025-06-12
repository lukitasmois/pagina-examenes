const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Subject = new Schema({
    name: {type: String, require: true},
    code_subject: {type: String, require: true, unique: true}
})


module.exports = mongoose.model('Subject', Subject)

