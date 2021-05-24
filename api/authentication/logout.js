const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    //end persistent session for user
    await req.session.destroy((err) => {
        if(err) res.status(400).json({error: err})
        else res.status(200).json({message: "logout successful"})
    })
})

module.exports = router;