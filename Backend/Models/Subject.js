const mongoose = require("mongoose")

const { Schema } = mongoose;

const SubjectSchema = new Schema({
    sem: {
        type: Number,
        required: true
    },
    branchCode: {
        type: String,
        required: true
    },
    subjectCode: {
        type: String,
    },
    name: {
        type: String,
    },
    teacherCode: {
        type: String,
    },
    teacherName: {
        type: String
    },
    count: {
        type: Number,
        default: 0
    },
    assignedcount: {
        type: Number,
        default: 0
    }

});

const Subject = mongoose.model('subject', SubjectSchema);
module.exports = Subject;