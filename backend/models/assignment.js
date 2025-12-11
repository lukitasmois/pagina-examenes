const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VALID_STATUS = ['cargado', 'vencido']

const Assignment = new Schema({
    title: {type: String, required: true},
    code_subject: {type: String, required: true},
    dueDate: {type: String, required: true},
    status: {type: String, enum: VALID_STATUS, default: 'cargado'},
    teacher: {
        _id: { type: String},
        name: { type: String},
        lastName: { type: String},
    },
    instructions: { type: String },
    createdDate: { type: Date, default: Date.now },
    students: [String],
    submissionsPending: {type: Number, default: 0},
    submissionsCorrected: {type: Number, default: 0},
    totalStudents: {type: Number, default: 0},
})

module.exports = mongoose.model('Assignment', Assignment)