const ShoppingList = require('../Models/ShoppingList.models');
const ShoppingItems = require("../Models/ShoppingItems.models");

const shoppingControllers = {
    createList: async (req, res) => {
        try {
            const data = await ShoppingList.create(req.body)
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    },
    createItem: async (req, res) => {
        try {
            const temp = req.body
            const data = await ShoppingItems.create({...temp, owner: req.body.owner})
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    },
    getOwnerLists: async (req, res) => {
        try {
            const {id} = req.params;
            const data = await ShoppingList.find({owner: id})
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    },
    getListById: async (req, res) => {
        try {
            const {id} = req.params;
            const data = await ShoppingList.find(id)
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    },
    getAllLists: async (req, res) => {
        try {
            const data = await ShoppingList.find()
            res.json(data)
        } catch (e) {

        }
    },
    getAllItems: async (req, res) => {
        try {
            const data = await ShoppingItems.find()
            res.json(data)
        } catch (e) {

        }
    },
    getItems: async (req, res) => {
        try {
            const {id} = req.params
            const shoppingItems = await ShoppingItems.find({owner: id});
            res.json(shoppingItems)
        } catch (e) {
            console.log(e.message)
        }
    },
    updateList : async (req, res) => {
        try {
            const {id} = req.params
            const data = req.body
            const updatedData = await ShoppingList.findByIdAndUpdate(
                id,
                data,
                {new: true})
            res.json(updatedData);
        } catch (e) {

        }
    },
    updateItem: async (req, res) => {
        try {
            const {id} = req.params
            const data = req.body
            const updatedData = await ShoppingItems.findByIdAndUpdate(
                id,
                data,
                {new: true})
            res.json(updatedData);
        } catch (e) {

        }
    },
    removeList: async (req, res) => {
        try {
            const {id} = req.params
            const data = await ShoppingList.findByIdAndDelete(id)
            await ShoppingItems.findOneAndDelete({ owner: id })
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    },
    removeItem: async (req, res) => {
        try {
            const {id} = req.params
            const data = await ShoppingItems.findByIdAndDelete(id)
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = shoppingControllers;