const Model = require('../models/model');
const Metabolite = require('../models/metabolite');
const Reaction = require('../models/reaction');

exports.addModel = function(req, res) {
    console.log(req.fields.model)
   const model = JSON.parse(req.fields.model);
        Model.create({
            name: model.name,
            fileId: model.id,
            jsonModel: model,
        })
            .then(data=>{
                model.metabolites.map(metabolite=>{
                    Metabolite.create({
                        name: metabolite.name,
                        compartment: metabolite.compartment,
                        modelId: data.id
                    }).catch(error=>{
                        res.status(500).send('Something went wrong while creating Metabolites Table')
                    })
                });
                model.reactions.map(reaction=>{
                    Reaction.create({
                        name: reaction.name,
                        reversible: reaction.reversible,
                        reactants: reaction.reactants,
                        products: reaction.products,
                        modelId: data.id
                    }).catch(error=>{
                        res.status(500).send('Something went wrong while creating Reactions Table')
                    })
                });
                model.genes.map(gene=>{
                    Gene.create({
                        name: gene.name,
                        functional: gene.functional,
                        modelId: data.id
                    }).catch(error=>{
                        res.status(500).send('Something went wrong while creating Genes Table')
                    })
                })
            })
        .then(data=>{
            console.log(data)
        })
        .catch(error => {
            res.status(500).send('Something went wrong.')
        });
  res.status(200).send('Successfully saved model.')
};

exports.getModel = function(req, res) {
  Model.findByPk(req.params.id)
      .then(model => {
        res.status(200).send(model)
      })
      .catch(err => res.status(500).send('Something went wrong.'))
};

exports.getAllModels = function(req, res) {
  Model.findAll({ attributes: ['id', 'name', 'createdAt'] })
      .then(models => res.status(200).send(models))
      .catch(err => {
        console.log(err)
        res.status(500).send('Something went wrong.')
      })
};
