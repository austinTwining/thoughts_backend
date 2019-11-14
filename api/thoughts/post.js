const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const auth = require('../authentication/authenticate')
const Thought = require('../models/Thought')

router.post('/', async (req, res) => {
    //TODO: proper input validation
    //validate inputs
    if(!req.body) res.status(400).json({message: "invalid inputs"})

    try {
        //get user id from token
        const usr_id = auth.authenticate(req.session.token)
        if(!usr_id) res.status(401).json({message: "action not authorized"})

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
})

router.delete('/remove', (req, res) => {
    const post_id = req.body.post_id
    const usr_id = auth.authenticate(req.session.token)
    
    //delete the post from database
    Thought.deleteOne({_id: post_id, user_id: usr_id}, (err) => {
        if(err) res.status(400).json({message: err})
        //TODO: make response tell you if it was unsuccessful
        res.json({message: "Thought deleted"})
    })
})

module.exports = router;