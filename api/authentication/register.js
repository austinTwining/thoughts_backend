const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post('/', async (req, res) => {

    console.log(req.body)

    //TODO: proper input validation
    //validate inputs
    if(!req.body) res.status(400).json({message: "invalid inputs"})

    //check if email already in use
    const email = await User.findOne({email: req.body.email})
    if(email) res.status(400).json({message: "email already exist"})

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashpass = await bcrypt.hash(req.body.password, salt)

    //create user in object
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpass
    })
    try{
        //save user object to database
        const savedUsr = await user.save();
        //create and assign json web token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        //start persistent session for user
        req.session.token = token;
        req.session.save();

        res.header('auth-token', token).json({message: "registration successful", name: user.name, user_id: user._id})
    }catch(err){
        res.status(400).json({error: err})
    }
})

module.exports = router;