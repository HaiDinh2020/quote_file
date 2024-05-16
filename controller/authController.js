require("dotenv").config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

const login = async (req, res) => {
    try {
        if (!User) return res.status(500).json({ message: "Database error" })

        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "Missing input"
            })
        }

        const response = await User.findOne({ email })
        const isCorrectPassword = response && bcrypt.compareSync(password, response.password)
        // console.log(response, email, password)
        if (isCorrectPassword) {
            const token = jwt.sign({ id: response.id, email: response.email }, process.env.SECRET_KEY, { expiresIn: '2d' })

            res.setHeader("Authorization", token)
            return res.status(200).json({
                isAdmin: response.isAdmin,
                message: token ? "Login successfull" : "Login fail"
            })
        } else {
            return res.status(410).json({ message: response ? "Login fail! Not corect password" : "Login fail! Not corect email" })
        }


    } catch (error) {
        console.log("server error ", error)
        return res.status(500).json({ message: "Server error" })
    }
}

const register = async (req, res) => {
    try {
        if (!User) return res.status(500).json({ message: "Database error" })
        
        const {username, email, password } = req.body

        // validate input
        if (username.length < 3) {
            return res.status(400).json({
                message:  "Username must be at least 3 characters long"
            });
        }
        if ( password.length < 6) {
            return res.status(400).json({
                message:  "Password must be at least 6 characters long"
            });
        }


        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Missing input"
            })
        }
     
        const response = await User.findOne({ email: email})

        if(!response) {
            const result = await User.create({username, email, password: hashPassword(password)})
            if(result) {
                res.status(202).json({err: 0, message: "Register successfull"})
            } else {
                res.status(410).json({err: 1, message: "Register fail"})
            }
        } else {
            return res.status(410).json({ err: 1,  message: "Email has been registed"})
        }
    } catch (error) {
        console.log("server error ", error)
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = {
    login, register
}