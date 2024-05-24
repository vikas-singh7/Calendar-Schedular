const mongoose = require("mongoose")

const { Schema } = mongoose;

const BranchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    branchCode : {
        type:String,
        required: true,
        unique: true
    }

});

const Branch = mongoose.model('branch',BranchSchema);
module.exports = Branch;