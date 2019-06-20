/* WARNING: On running this file all existing 
tables defined in the models will be dropped */

const db = require('../config/database')
const Metabolite = require('../models/metabolite')
const Model = require('../models/model')
const Reaction = require('../models/reaction')
const sbmlFile = require('../models/sbmlFile')

db.sync({ force: true })
