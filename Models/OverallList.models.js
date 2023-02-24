const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    listOwner: {type: String},
    listID: {type: String},
    owner: {type: Types.ObjectId, ref: "Users_shop"}
})

module.exports = model('OverallList', schema)