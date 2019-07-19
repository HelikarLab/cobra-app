/*
! WARNING: On running this file with the -f flag, all existing tables
! with names defined in the models will be dropped from the db
*/

const db = require('../config/database')
const Metabolite = require('../models/metabolite')
const Model = require('../models/model')
const Reaction = require('../models/reaction')
const Gene = require('../models/gene')

if (process.argv[2] === '-f') {
    console.warn('Force option has been used.')
    db.sync({ force: true })
} else db.sync()
