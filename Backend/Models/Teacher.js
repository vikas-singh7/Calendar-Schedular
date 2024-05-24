const mongoose = require("mongoose")

const { Schema } = mongoose;

const rowSchema = {
    "8": { type: Number, default: 0 },
    "9": { type: Number, default: 0 },
    "10": { type: Number, default: 0 },
    "11": { type: Number, default: 0 },
    "12": { type: Number, default: 0 },
    "1": { type: Number, default: 0 },
    "2": { type: Number, default: 0 },
    "3": { type: Number, default: 0 },
    "4": { type: Number, default: 0 },
}

const TeacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    teacherCode: {
        type: String,
        required: true,
        unique: true
    },
    timetable: {
        "1": rowSchema,
        "2": rowSchema,
        "3": rowSchema,
        "4": rowSchema,
        "5": rowSchema,
        "6": rowSchema,
    }
});

const Teacher = mongoose.model('teacher', TeacherSchema);
module.exports = Teacher;