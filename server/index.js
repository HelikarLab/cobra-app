// Dependencies
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const formidableMiddleware = require('express-formidable');
const db = require('./config/database');
require('dotenv').config();

const app = express();

// CORS
app.use(cors());
app.use(formidableMiddleware());
// JSON Payload Parsers
app.use(express.json());
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/json' }));

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
const fluxBalanceAnalysisApi = require("./routes/fluxBalanceAnalysis");
const fluxVariabilityAnalysisApi = require("./routes/fluxVariabilityAnalysis");
const essentiality = require("./routes/essentiality");
const syntheticLethality = require("./routes/syntheticLethality");


// Establishing and testing database connection
//Remove comment on db.sync({ force: true }) to create every table again
const connectDb = async (retries = 5) => {
  while (retries) {
    await db
      .authenticate()
      .then(() => {
        console.log('Database connected...')
        db.sync({ force: true })
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

// APIs
app.use('/api/uploadSbml', uploadSbmlApi);
app.use('/api/model', modelApi);
app.use('/api/model/id/fba/optimize',fluxBalanceAnalysisApi);
app.use('/api/model/id/fva/optimize',fluxVariabilityAnalysisApi);
app.use('/api/model/id/essentiality/optimize',essentiality);
app.use('/api/model/id/syntheticlethality/optimize',syntheticLethality);

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
