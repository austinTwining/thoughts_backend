const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    //end persistent session for user
    await req.session.destroy((err) => {
        if(err) res.status(400).json({error: err})
        else res.json({message: "logout successful"})
    })
})

module.exports = router;