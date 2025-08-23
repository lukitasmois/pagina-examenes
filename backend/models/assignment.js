const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VALID_STATUS = ['Cargado', 'Vencido']

const Assignment = new Schema({
    title: {type: String, required: true},
    id_subject: {type: String, required: true},
    dueDate: {type: String, required: true},
    status: {type: String, enum: VALID_STATUS, default: 'Cargado'},
    teacher: {
        _id: { type: String},
        name: { type: String},
        lastName: { type: String},
    },
    instructions: { type: String },
    createdDate: { type: Date, default: Date.now },
    submissionsPending: {type: Number, default: 0},
    submissionsCorrected: {type: Number, default: 0},
    totalStudents: {type: Number, default: 0},
})

module.exports = mongoose.model('Assignment', Assignment)