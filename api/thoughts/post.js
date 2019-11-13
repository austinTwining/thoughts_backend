const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const Thought = require('../models/Thought')

router.post('/', async (req, res) => {
    //TODO: proper input validation
    //validate inputs
    if(!req.body) res.status(400).json({message: "invalid inputs"})

    //check for token to see if user is authorized
    const token = req.session.token
    if(!token) res.status(401).json({message: "action not authorized"})
    else{
        try {
            //get user id from token
            const usr_id = jwt.verify(token, process.env.TOKEN_SECRET)

            //create post
            const post = new Thought({
                content: req.body.content,
                user_id: usr_id
            })

            //save the post
            const savedPost = await post.save();

            res.status(200).json({message: "thought successfully shared"})
        } catch (err) {
            res.status(400).json({message: err})
        }
    }
})

module.exports = router;