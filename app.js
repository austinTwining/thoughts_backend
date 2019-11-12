const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session);

const app = express()
const port = process.env.PORT || 3000

dotenv.config() //initialize environment variables

//connect to db
mongoose.connect(
    process.env.DB_CONNECT, 
    {useNewUrlParser: true,
    useUnifiedTopology: true}, 
    (error) => {
        if(error) console.log(error)
        console.log('connected to db')
})
var db = mongoose.connection;


//set up session middleware
app.use(session({secret: process.env.TOKEN_SECRET, saveUninitialized: true, resave: false, store: new MongoStore({mongooseConnection: db})}))

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//user routes
app.use('/register', require('./api/register'))
app.use('/login', require('./api/login'))
app.use('/logout', require('./api/logout'))

app.listen(port, () =>{
    console.log(`Server started on port ${port}...`)
})