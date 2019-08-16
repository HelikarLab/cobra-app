## USING COBRAPY for parsing information
## LINK TO COBRAPY DOCUMENTATION==>> https://cobrapy.readthedocs.io/en/stable/

##### importing necessary libraries
import sys
import cobra
import json

##### assigning the original file path
path = 'uploads/' + sys.argv[1]


##### loading original model from the original path
model = cobra.io.read_sbml_model(path)

##### next block of code parses reaction data from SBML file to json format

reactionData = []
r = 0
for r in range(len(model.reactions)):
    reactantsList = []
    productsList = []
    metabolitesList = []
    gene_reaction_rule = []
    ##### adding each reactant id, product id and associated metabolite id
    for rL in range(len(model.reactions[r].reactants)):
        reactantsList.append(model.reactions[r].reactants[rL].id)
    for pL in range(len(model.reactions[r].products)):
        productsList.append(model.reactions[r].products[pL].id)
    for mL in range(len(model.reactions[r].metabolites.keys())):
        metabolitesList.append(list(model.reactions[r].metabolites.keys())[mL].id)
    ##### adding reaction metadata
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

##### adding metabolite metadata
metabolitesData = []
m = 0
for m in range(len(model.metabolites)):
    ##### adding metabolite metadata
    metabolitesData.append({'id':model.metabolites[m].id,
                            'name' : model.metabolites[m].name,
                            'formula':model.metabolites[m].formula,
                            'compartment': "'" + model.metabolites[m].compartment +"'"})

##### adding gene metadata
genesData = []
g = 0
for g in range(len(model.genes)):
    ##### adding gene metadata
    genesData.append({'id':model.genes[g].id,
                      'name' : model.genes[g].name,
                      'functional':model.genes[g].functional})


##### creating the final JSON format to send back via express routes
data = {
        "name": model.name,
        "filename": sys.argv[1],
        "id": model.id,
        "metabolites": metabolitesData,
        "reactions": reactionData,
        "genes": genesData,
}

print(json.dumps(data))

sys.stdout.flush()
