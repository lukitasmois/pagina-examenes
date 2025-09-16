const Subject = require('../models/subject')

SUBJECTS_LIST = [
    {
        "name": "MATEMATICAS",
        "code_subject" : "MA-001"
    },
    {
        "name": "ESTADISTICA",
        "code_subject" : "ES-001"
    },
    {
        "name": "INGLES",
        "code_subject" : "IN-001"
    }
]

const seedSubjects = async () => {
    try {

        SUBJECTS_LIST.forEach(async (subjectItem) => {
            const subject = new Subject(
                subjectItem
            )

            const exist = await Subject.findOne({code_subject: subject.code_subject})

            if(exist){
                console.log({succes: false, message: "Error al intentar registrar la materia"})
            }else{
                const newSubject = subject.save()
                console.log({succes: true, subject: subject})
            }
        });

    } catch (error) {
        console.log(error.message);
        console.log({succes: false, message: 'Error al intentar crear una materia.'})        
    }
}

module.exports = {seedSubjects}