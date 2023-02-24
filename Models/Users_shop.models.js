const {Schema, Types, model} = require("mongoose");

const schema = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: false},
    shoppingList: {type: Types.ObjectId, ref: 'ShoppingList'},
    subscribes: {type: Types.ObjectId, ref: 'Subscribes'},

})

module.exports = model('Users_shop', schema)