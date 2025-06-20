const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VALID_STATUS = ['Pendiente', 'Entregado', 'Vencido', 'Corregido']

const Exam = new Schema({
    title: {type: String, required: true, },
    id_subject: {type: String, required: true},
    submmitedAt: {type: Date, default: null},
    dueDate: {type: String, required: true},
    status: {type: String, enum: VALID_STATUS, default: 'Pendiente'},
    id_teacher: {type: String, required: true},
    feedback: {type:String, default:null},
    grade: {type: Number, default: null},
    note: {type: String, default: null}
})

module.exports = mongoose.model('Exam', Exam)