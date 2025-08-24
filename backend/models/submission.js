const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VALID_STATUS = ['Pendiente', 'Entregado', 'Vencido', 'Corregido', 'No Entregado']

const Submission = new Schema({
    title: {type: String, required: true},
    subject: {
        _id: { type: String},
        name: {type: String, required: true},
        code_subject: {type: String, required: true, unique: true}
    },
    status: {type: String, enum: VALID_STATUS, default: 'Pendiente'},
    student:{
        _id: { type: String},
        name: { type: String},
        lastName: { type: String},
    },
    submmitedAt: { type: Date, default: Date.now },
    id_assignment: { type: String, required: true},
    grade: { type: Number},
    feedback: {type:String },
    note: {type: String },
    files: [String]
})

Submission.index({ "student._id": 1, id_assignment: 1 });


module.exports = mongoose.model('Submission', Submission)