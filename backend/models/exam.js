const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VALID_STATUS = ['pendiente', 'entregado', 'vencido', 'corregido', 'publicado']
const KINDS = ['assignment', 'submission']

const Exam = new Schema({
    kind: { type: String, enum: KINDS, required: true},
    title: {type: String, required: true, },
    id_subject: {type: String, required: true},
    dueDate: {type: String, required: true},
    status: {type: String, enum: VALID_STATUS},
    id_teacher: {type: String, required: true},

    submmitedAt: {type: Date},
    feedback: {type:String },
    grade: {type: Number },
    note: {type: String },
    id_student: {type: String, required: true},
    files: [String]
})

module.exports = mongoose.model('Exam', Exam)