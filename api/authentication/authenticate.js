const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

//TODO: abstract authentication code and export to be used internally
//without the need to use routes to remove a lot of code duplication
authenticate = (token) => {
    //verify token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    return verified
}

router.get('/', (req, res) => {
    //check for token
    const token = req.session.token
    if(!token) res.status(401).json({message: "access denied"})
    else{
        try {
            //verify token
            const verified = authenticate(token)
            res.status(200).json({_id: verified})
        } catch (err) {
            res.status(400).json({message: err})
        }
    }
})

module.exports = {
    router,
    authenticate
};