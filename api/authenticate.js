const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./models/User')

router.post('/', async (req, res) => {
    const token = req.session.token
    if(!token) res.status(401).json({message: "access denied"})

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        res.json({_id: verified})
    } catch (err) {
        res.status(400).json({message: err})
    }
})

module.exports = router;