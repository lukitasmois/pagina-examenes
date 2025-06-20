const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Subject = new Schema({
    name: {type: String, required: true},
    code_subject: {type: String, required: true, unique: true}
})


module.exports = mongoose.model('Subject', Subject)

