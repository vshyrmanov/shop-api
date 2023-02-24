const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    userId: {type: String},
    owner: {type: Types.ObjectId, ref: "Users_shop"}
})

module.exports = model('Subscribes', schema)