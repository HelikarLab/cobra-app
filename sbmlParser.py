import sys
from libsbml import *
import json


path = "uploads/" + sys.argv[1]
reader = SBMLReader()
document = reader.readSBML(path)

model = document.getModel()

'''
print("Number of Errors: ", document.getNumErrors())
print("Level: ", document.getLevel())
print("Model: ", model)
print("Version: ", document.getVersion())

print("Number of Species: ", model.getNumSpecies())
print("List of  Species: ", model.getListOfSpecies())
print("List of Reactions: ", model.getListOfReactions())

print(listOfReactions[:5])
'''
listOfSpecies = model.getListOfSpecies()
listOfReactions = model.getListOfReactions()

'''


'''

lSpecies = []
for species in listOfSpecies[:5]:
    lSpecies.append(str(species))

lReactions = []
for reactions in listOfReactions[:5]:
    lReactions.append(str(reactions))

data = {
    "noOfErrors": document.getNumErrors(),
    "level": document.getLevel(),
    "version": document.getVersion(),
    "noOfSpecies": model.getNumSpecies(),
    "listOfSpecies": lSpecies,
    "listOfReactions": lReactions
}

print(json.dumps(data))

sys.stdout.flush()
