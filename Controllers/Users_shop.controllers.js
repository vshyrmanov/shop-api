const Users_shop = require('../Models/Users_shop.models');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ShoppingItems = require("../Models/ShoppingItems.models");
const Subscribes_shop = require("../Models/Subscribes_shop.models");
const OverallList = require("../Models/OverallList.models");
const ShoppingList = require("../Models/ShoppingList.models");

const generateJwt = (id, login) => {
    return jwt.sign(
        {id, login},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    )
}

const controller = {
    register_shop: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Password must be at least 6 characters, login must be at least 2 characters",
                })
            }

            const {login, password, firstName, lastName} = req.body

            const candidate = await Users_shop.findOne({ login })

            if (candidate) {
                return res.status(400).json({message: "Such login is already created"})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = await new Users_shop({ login, password: hashedPassword, firstName, lastName })

            await user.save()

            const token = generateJwt(user.id, user.login)
            res.json({token, userId: user.id})

            // res.status(200).json({message: "User was created successfully"})
        } catch (e) {
            res.status(500).json({message: "something goes wrong"})
        }
    },
    login_shop: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Password must be at least 6 characters, username must be at least 2 characters",
                })
            }

            const {login, password} = req.body

            const user = await Users_shop.findOne({login})

            if (!user) {
                return res.status(400).json({message: "User not found"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: "Incorrect password, try again"})
            }

            const token = generateJwt(user.id, user.login)
            res.json({token, userId: user.id, firstName: user.firstName, lastName: user.lastName})

        } catch (e) {
            res.status(500).json({message: "something goes wrong"})
        }
    },
    getUser_shop: async (req, res) => {
        try {
            const {id} = req.params;
            const {firstName, lastName} = await Users_shop.findById(id)
            res.json({firstName, lastName})
        } catch (e) {
            console.log(e)
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const data = await Users_shop.find()

            res.json(data.map(e => ({
                login: e.login,
                id: e._id,
                firstName: e.firstName,
                lastName: e.lastName,
            })));
        } catch (e) {
            console.log(e)
        }
    },
    subscribeOnUser: async (req, res) => {
        try {
            const data = await Subscribes_shop.create(req.body)
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    },
    removeSubscribe: async (req, res) => {
        try {
            const {id} = req.params
            const data = await Subscribes_shop.findOneAndDelete({userId: id})
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    },
    getUserSubscribes: async (req, res) => {
        try {
            const {id} = req.params
            const subscribes = await Subscribes_shop.find({owner: id});
            res.json(subscribes)
        } catch (e) {
            console.log(e)
        }
    },
    createOverallList: async (req, res) => {
        try {
            const overallData = await OverallList.create(req.body);
            res.json(overallData)
        } catch (e) {
            console.log(e)
        }
    },
    removeOverallList: async (req, res) => {
        try {
            const {id} = req.params
            const data = await OverallList.findByIdAndDelete(id)
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    },
    getOverall: async (req, res) => {
        try {
            const {id} = req.params
            const subscribes = await OverallList.find({owner: id});
            res.json(subscribes)
        } catch (e) {
            console.log(e)
        }
    },

}

module.exports = controller;