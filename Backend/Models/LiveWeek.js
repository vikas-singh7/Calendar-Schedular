const mongoose = require("mongoose")

const { Schema } = mongoose;

const rowSchema = {
    "8": { subjectCode: { type: String, default: "" }, bit: { type: Number, default: 0 } ,rSubjectCode:{type:String,default:""}},
    "9": { subjectCode: { type: String, default: "" }, bit: { type: Number, default: 0 } ,rSubjectCode:{type:String,default:""}},
    "10": { subjectCode: { type: String, default: "" }, bit: { type: Number, default: 0 },rSubjectCode:{type:String,default:""}},
    "11": { subjectCode: { type: String, default: "" }, bit: { type: Number, default: 0 },rSubjectCode:{type:String,default:""}},
    "12": { subjectCode: { type: String, default: "" }, bit: { type: Number, default: 0 },rSubjectCode:{type:String,default:""}},
    "1": { subjectCode: { type: String, default: "" }, bit: { type: Number, default: 0 } ,rSubjectCode:{type:String,default:""}},
    "2": { subjectCode: { type: String, default: "" }, bit: { type: Number, default: 0 } ,rSubjectCode:{type:String,default:""}},
    "3": { subjectCode: { type: String, default: "" }, bit: { type: Number, default: 0 } ,rSubjectCode:{type:String,default:""}},
    "4": { subjectCode: { type: String, default: "" }, bit: { type: Number, default: 0 } ,rSubjectCode:{type:String,default:""}},
}
const LiveWeekSchema = new Schema({
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


const LiveWeek = mongoose.model('liveweek', LiveWeekSchema);
module.exports = LiveWeek;