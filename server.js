require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())

app.use(express.json())

mongoose.connect(process.env.CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

const userRouter = require('./routes/user.js')
const placeRouter = require('./routes/place.js')

app.use('/user', userRouter)
app.use('/place', placeRouter)

app.listen(5000, (err) => {
    if (!err) {
        console.log("Server is running on http://localhost:3000")
    }
}) 