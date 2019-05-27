// Dependencies
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
//const db = require('./config/database')
require('dotenv').config()

const app = express()

// API Route Imports
const uploadSbmlApi = require('./api/routes/uploadSbml')

// Sanitize Data
app.use(helmet())

// Custom Request Logging
app.use(morgan('tiny'))

// JSON Payload Parser
app.use(express.json())

// Establishing and testing database connection
//db.authenticate().then(() => console.log('Database connected...')).catch((err) => console.log(err))

// APIs
app.use('/api/uploadSbml', uploadSbmlApi)

// Error Handling
app.use((err, req, res, next) => {
  console.log(err.stack)
  res
    .status(500)
    .json({ message: 'Uncaught Internal Server Error, Something Broke.' })
})

// Starting the server
const port = process.env.SERVER_PORT || 5000
app.listen(port, () => console.log('Server Running On Port: ', port))

module.exports = app
