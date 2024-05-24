const mongoose = require("mongoose")

const { Schema } = mongoose;


const rowSchema = {
    "8": { subjectCode:{ type: String ,default : ""}, bit: {type :Number,default : 0} },
    "9": { subjectCode:{ type: String ,default : ""}, bit: {type :Number,default : 0} },
    "10": { subjectCode:{ type: String ,default : ""}, bit: {type :Number,default : 0} },
    "11": { subjectCode:{ type: String ,default : ""}, bit: {type :Number,default : 0} },
    "12": { subjectCode:{ type: String ,default : ""}, bit: {type :Number,default : 0} },
    "1": { subjectCode:{ type: String ,default : ""}, bit: {type :Number,default : 0} },
    "2": { subjectCode:{ type: String ,default : ""}, bit: {type :Number,default : 0} },
    "3": { subjectCode:{ type: String ,default : ""}, bit: {type :Number,default : 0} },
    "4": { subjectCode:{ type: String ,default : ""}, bit: {type :Number,default : 0} },
}
const CalenderSchema = new Schema({
    sem: {
        type: Number,
        required: true
    },
    branchCode: {
        type: String,
        required: true
    },
    timetable: {
        "1" :rowSchema,
        "2": rowSchema,
        "3": rowSchema,
        "4": rowSchema,
        "5": rowSchema,
        "6": rowSchema,
    }
});

const Calendar = mongoose.model('calendar', CalenderSchema);
module.exports = Calendar;