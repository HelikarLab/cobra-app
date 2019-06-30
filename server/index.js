// Dependencies
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
// const db = require('./config/database');
// require('dotenv').config();

const app = express();

// CORS
app.use(cors());

// JSON Payload Parsers
app.use(express.json());
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));

// Sanitize Data
app.use(helmet());

// Custom Request Logging
app.use(morgan('tiny'));


// API Route Imports
const uploadSbmlApi = require('./routes/uploadSbml');
const modelApi = require('./routes/model');
const analysisApi = require("./routes/analysisModel");


/*

// Establishing and testing database connection
const connectDb = async (retries = 5) => {
  while (retries) {
    await db
      .authenticate()
      .then(() => {
        console.log('Database connected...')
        retries = 0
      })
      .catch(async err => {
        console.log(err)
        retries -= 1
        console.log(`Retries left: ${retries}`)
        // wait 5 seconds
        await new Promise(res => setTimeout(res, 5000))
      })
  }
}
connectDb()
*/

// APIs
app.use('/api/uploadSbml', uploadSbmlApi);
app.use('/api/model', modelApi);
app.use('/api/model/id/optimize',analysisApi);

// Error Handling
app.use((err, req, res, next) => {
  console.log(err.stack);
  res
    .status(500)
    .json({ message: 'Uncaught Internal Server Error, Something Broke.' })
});

// Starting the server
const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => console.log('Server Running On Port: ', port));

module.exports = app;
