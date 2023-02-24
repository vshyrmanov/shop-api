const {Schema, Types, model} = require("mongoose");

const schema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    // notes: {type: Types.ObjectId, ref: 'Notes'},
    // resume: {type: Types.ObjectId, ref: 'Resume'},
    applications: {type: Types.ObjectId, ref: 'Applications'},
    role: {type: String, default: "user"},

})

module.exports = model('Users', schema)