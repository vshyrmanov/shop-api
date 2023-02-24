const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String},
    done: {type: Boolean, default: false},
    desc: {type: String},
    quantity: {type: Number},
    owner: {type: Types.ObjectId, ref: 'ShoppingList'}
})

module.exports = model('ShoppingItems', schema)