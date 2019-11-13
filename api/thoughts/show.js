const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const Thought = require('../models/Thought')

//gets all posts by logged in user
router.get('/', (req, res) => {
    const token = req.session.token
    if(!token) res.status(401).json({message: "action not authorized"})
    else{
        try {
            //get user id from token
            const usr_id = jwt.verify(token, process.env.TOKEN_SECRET)

            //find all posts belonging to the user
            Thought.find({
                user_id: usr_id
            }).sort('-created') //sort based on creation time
            .exec((err, thoughts) => {
                if(err) res.status(400).json({message: err})
                res.status(200).json({thoughts: thoughts})
            })
        } catch (err) {
            res.status(400).json({message: err})
        }
    }
})

//shows all posts for specific user
router.get('/user', (req, res) => {
    //TODO: proper input validation
    //validate inputs
    if(!req.body) res.status(400).json({message: "invalide inputs"})
    //find all posts belonging to the user
    Thought.find({
        user_id: req.body.id
    }).exec((err, thoughts) => {
        if(err) res.status(400).json({message: err})
        res.status(200).json({thoughts: thoughts})
    })
})

//shows specific post
router.get('/:id', (req, res) => {
    //find all posts belonging to the user
    Thought.find({
        _id: req.params.id
    }).exec((err, thought) => {
        if(err) res.status(400).json({message: err})
        res.status(200).json({thought: thought})
    })
})

module.exports = router;