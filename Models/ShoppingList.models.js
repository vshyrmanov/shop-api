const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String},
    items: {type: Types.ObjectId, ref: "ShoppingItems"},
    owner: {type: Types.ObjectId, ref: "Users_shop"},
    overall: [

    ]
})

module.exports = model('ShoppingList', schema)