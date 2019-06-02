import sys
import cobra
import json

path = 'uploads/' + sys.argv[1]

model = cobra.io.read_sbml_model(path)

reactionData = []
r = 0
for r in range(0,10):
    reactionData.append({'equation':model.reactions[r].reaction,'reversibility':model.reactions[r].reversibility})


metabolitesData = []
m = 0
for m in range(0,10):
    metabolitesData.append({'id':model.metabolites[m].id, 'name' : model.metabolites[m].name})

data = {
    "model": model.name,
    "noOfMetabolites": len(model.metabolites),
    "listOfSpecies": metabolitesData,
    "noOfReactions": len(model.reactions),
    "listOfReactions": reactionData,
    "noOfGenes": len(model.genes)
}

print(json.dumps(data))

sys.stdout.flush()
