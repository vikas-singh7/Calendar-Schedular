const mongoose = require("mongoose")
const ROLE = require('./Role')
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        requires: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: ROLE.BASIC
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;