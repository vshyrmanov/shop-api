const Users = require('../Models/Users.models');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Applications = require("../Models/Applications.models");
const Positions = require("../Models/Positions.models");


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    )
}

const controller = {
    register: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Password must be at least 6 characters, username must be at least 2 characters",
                })
            }

            const {username, password, role} = req.body

            const candidate = await Users.findOne({username})

            if (candidate) {
                return res.status(400).json({message: "Such user is already created"})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = await new Users({username, password: hashedPassword, role})
            const basket = await new Applications({owner: user.id})

            await user.save()

            const token = generateJwt(user.id, user.email, user.role)
            res.json({token, userId: user.id, role: user.role})

            // res.status(200).json({message: "User was created successfully"})
        } catch (e) {
            res.status(500).json({message: "something goes wrong"})
        }
    },
    login: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Password must be at least 6 characters, username must be at least 2 characters",
                })
            }

            const {username, password} = req.body

            const user = await Users.findOne({username})

            if (!user) {
                return res.status(400).json({message: "User not found"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: "Incorrect password, try again"})
            }

            const token = generateJwt(user.id, user.email, user.role)
            res.json({token, userId: user.id, role: user.role})

        } catch (e) {
            res.status(500).json({message: "something goes wrong"})
        }
    },
    getUser: async (req, res) => {
        try {
            const {id} = req.params;
            const data = await Users.findById(id)
            res.json(data.username)
        } catch (e) {
            console.log(e)
        }
    },
    // check: async (req, res) => {
    //     try {
    //         const token = generateJwt(req.user.id, req.user.email, req.user.role)
    //         return res.json({token})
    //     } catch (e) {
    //
    //     }
    // }
}

module.exports = controller;