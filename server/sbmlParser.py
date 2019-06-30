import sys
import cobra
import json

path = 'uploads/' + sys.argv[1]

tempModel = cobra.io.read_sbml_model(path)
cobra.io.save_json_model(tempModel, "path")
model = cobra.io.load_json_model( "path")

reactionData = []
r = 0
for r in range(len(model.reactions)):
    reactantsList = []
    productsList = []
    metabolitesList = []
    gene_reaction_rule = []
    for rL in range(len(model.reactions[r].reactants)):
        reactantsList.append(model.reactions[r].reactants[rL].id)
    for pL in range(len(model.reactions[r].products)):
        productsList.append(model.reactions[r].products[pL].id)
    for mL in range(len(model.reactions[r].metabolites.keys())):
        metabolitesList.append(list(model.reactions[r].metabolites.keys())[mL].id)
    reactionData.append({'id':model.reactions[r].id,
                        'name': model.reactions[r].name,
                        'equation':model.reactions[r].reaction,
                        'min' : model.reactions[r].lower_bound,
                        'max' : model.reactions[r].upper_bound,
                        'lower_bound' : model.reactions[r].lower_bound,
                        'upper_bound' : model.reactions[r].upper_bound,
                        'reversible': model.reactions[r].reversibility,
                        'compartments': repr(model.reactions[r].compartments)[1:-1],
                        'reactants': reactantsList,
                        'products': productsList,
                        'metabolites' : metabolitesList,
                        'gene_reaction_rule' : model.reactions[r].gene_reaction_rule})

metabolitesData = []
m = 0
for m in range(len(model.metabolites)):
    metabolitesData.append({'id':model.metabolites[m].id, 'name' : model.metabolites[m].name,'formula':model.metabolites[m].formula, 'compartment': "'" + model.metabolites[m].compartment +"'"})

genesData = []
g = 0
for g in range(len(model.genes)):
    genesData.append({'id':model.genes[g].id, 'name' : model.genes[g].name,'functional':model.genes[g].functional})


data = {
        "name": model.name,
        "noOfMetabolites": len(model.metabolites),
        "metabolites": metabolitesData,
        "noOfReactions": len(model.reactions),
        "reactions": reactionData,
        "noOfGenes": len(model.genes),
        "genes": genesData

}

print(json.dumps(data))

sys.stdout.flush()
