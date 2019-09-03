## USING COBRAPY for parsing information
## LINK TO COBRAPY DOCUMENTATION==>> https://cobrapy.readthedocs.io/en/stable/

##### importing necessary libraries
import sys
import cobra
import json
from cobra.flux_analysis import flux_variability_analysis

##### assigning the original file path
path = sys.argv[1]


##### loading original model from the original path
initialModel = cobra.io.read_sbml_model(path)
# loading the changed components passed from UI
analysisModel = json.loads(sys.argv[2])


##### checking for reaction and updating if there are any changes
for initialReaction in range(len(initialModel.reactions)):
    for updatedReaction in range(len(analysisModel['reactions'])):
        if(initialModel.reactions[initialReaction].id==analysisModel['reactions'][updatedReaction]['id']):
            if('upper_bound' in analysisModel['reactions'][updatedReaction]):
                initialModel.reactions[initialReaction].lower_bound = analysisModel['reactions'][updatedReaction]['lower_bound']
                initialModel.reactions[initialReaction].upper_bound = analysisModel['reactions'][updatedReaction]['upper_bound']
            if('functional' in analysisModel['reactions'][updatedReaction]):
                if(analysisModel['reactions'][updatedReaction]['functional']==False):
                    initialModel.reactions[initialReaction].knock_out()

##### checking every gene and updating if there are any changes
for initialGene in range(len(initialModel.genes)):
    for updatedGene in range(len(analysisModel['genes'])):
        if(initialModel.genes[initialGene].id==analysisModel['genes'][updatedGene]['id']):
            initialModel.genes[initialGene].functional = analysisModel['genes'][updatedGene]['functional']

##### optimizing the model and storing the objective value
solution = initialModel.optimize()

#### changing the lethal flag based upon objective value
lethal = False
if(solution==0):
    lethal = True


##### creating the final JSON format to send back via express routes
data = {
        "name": initialModel.name,
        "objective_value" : solution.objective_value,
        "lethal": lethal,
        "analysisReactions": analysisModel['reactions']
#        "metabolites": metabolitesData,
#        "reactions": reactionData,
#        "genes": genesData
}
print(json.dumps(data))
