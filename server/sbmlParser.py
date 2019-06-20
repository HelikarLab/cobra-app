import sys
import cobra
import json

path = 'uploads/' + sys.argv[1]

model = cobra.io.read_sbml_model(path)

reactionData = []
r = 0
for r in range(len(model.reactions)):
    reactantsList = []
    productsList = []
    for rL in range(len(model.reactions[r].reactants)):
        reactantsList.append(model.reactions[r].reactants[rL].id)
    for pL in range(len(model.reactions[r].products)):
        productsList.append(model.reactions[r].products[pL].id)
    reactionData.append({'id':model.reactions[r].id,
                        'name': model.reactions[r].name,
                        'equation':model.reactions[r].reaction,
                        'reversible':model.reactions[r].reversibility,
                        'reactants': reactantsList,
                        'products': productsList})

metabolitesData = []
m = 0
for m in range(len(model.metabolites)):
    metabolitesData.append({'id':model.metabolites[m].id, 'name' : model.metabolites[m].name,'formula':model.metabolites[m].formula})

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
