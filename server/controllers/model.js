const fs = require('fs')
const Model = require('../models/model')
const Metabolite = require('../models/metabolite')
const Reaction = require('../models/reaction')
const SbmlFile = require('../models/sbmlFile')

module.exports = function(req, res) {
  const file = req.files.file
  const model = JSON.parse(req.fields.model)
  Model.create({
    name: model.name,
    sbmlId: model.id,
    sbmlLevel: model.sbmlLevel,
    sbmlVersion: model.sbmlVersion,
    jsonModel: model,
  })
    .then(data => {
      model.metabolites.map(metabolite => {
        Metabolite.create({
          name: metabolite.name,
          sbmlId: metabolite.id,
          charge: metabolite.charge,
          initialConcentration: metabolite.initialConcentration,
          modelId: data.id,
        }).catch(error => {
          fs.unlinkSync(file.path)
          res.status(500).send('Something went wrong.')
        })
      })
      model.reactions.map(reaction => {
        Reaction.create({
          name: reaction.name,
          sbmlId: reaction.id,
          reversible: reaction.reversible,
          reactants: reaction.reactants,
          products: reaction.products,
          modelId: data.id,
        }).catch(error => {
          fs.unlinkSync(file.path)
          res.status(500).send('Something went wrong.')
        })
      })
      SbmlFile.create({
        fileBytes: file,
        modelId: data.id,
      })
        .then(() => {
          fs.unlinkSync(file.path)
        })
        .catch(error => {
          fs.unlinkSync(file.path)
          res.status(500).send('Something went wrong.')
        })
    })
    .catch(error => {
      fs.unlinkSync(file.path)
      res.status(500).send('Something went wrong.')
    })

  res.status(200).send('Successfully saved model.')
}
