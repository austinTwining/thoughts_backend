const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const auth = require('../authentication/authenticate')
const Thought = require('../models/Thought')

//gets all posts
router.get('/', (req, res) => {
    try {
        //get user id from token
        const usr_id = auth.authenticate(req.session.token)
        if(!usr_id) res.status(401).json({message: "action not authorized"})

        //find all posts belonging to the user
        Thought.find({}).sort('-created') //sort based on creation time
        .exec((err, thoughts) => {
            if(err) res.status(400).json({message: err})
            res.status(200).json(thoughts)
        })
    } catch (err) {
        res.status(400).json({message: err})
    }
})

//shows all posts for specific user
router.post('/user', (req, res) => {
    //TODO: proper input validation
    //validate inputs
    if(!req.body) res.status(400).json({message: "invalide inputs"})
    //find all posts belonging to the user
    Thought.find({
        user_id: req.body.id
    }).exec((err, thoughts) => {
        if(err) res.status(400).json({message: err})
        res.status(200).json(thoughts)
    })
})

//shows specific post
router.get('/:id', (req, res) => {
    //find all posts belonging to the user
    Thought.find({
        _id: req.params.id
    }).exec((err, thought) => {
        if(err) res.status(400).json({message: err})
        res.status(200).json(thought)
    })
})

module.exports = router;