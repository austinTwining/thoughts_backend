const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post('/', async (req, res) => {

    console.log(req.hostname)

    //TODO: proper input validation
    //validate inputs
    if(!req.body) res.status(400).json({message: "invalide inputs"})

    //check if user is in database
    const user = await User.findOne({email: req.body.email})
    if(!user) res.status(400).json({message: "User doesn't exist"})

    //check if password is correct
    const validpass = await bcrypt.compare(req.body.password, user.password)
    if(!validpass) res.status(400).json({message: "Wrong password"})

    //create and assign JWToken
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)

    //start persistent session for the user
    req.session.token = token
    req.session.save()

    res.status(200).json({message: "login successful", name: user.name, user_id: user._id})
})

module.exports = router;