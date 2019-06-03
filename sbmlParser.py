import sys
import cobra
import json

path = 'uploads/' + sys.argv[1]

model = cobra.io.read_sbml_model(path)

reactionData = []
r = 0
for r in range(len(model.reactions)):
    reactionData.append({'id':model.reactions[r].id,'equation':model.reactions[r].reaction,'reversibility':model.reactions[r].reversibility})


metabolitesData = []
m = 0
for m in range(len(model.metabolites)):
    metabolitesData.append({'id':model.metabolites[m].id, 'name' : model.metabolites[m].name,'formula':model.metabolites[m].formula})

genesData = []
g = 0
for g in range(len(model.genes)):
    genesData.append({'id':model.genes[g].id, 'name' : model.genes[g].name,'functional':model.genes[g].functional})


data = {
    "model":{
        "name": model.name,
        "noOfMetabolites": len(model.metabolites),
        "listOfMetabolites": metabolitesData,
        "noOfReactions": len(model.reactions),
        "listOfReactions": reactionData,
        "noOfGenes": len(model.genes),
        "listOfGenes": genesData
    }
}

print(json.dumps(data))

sys.stdout.flush()
