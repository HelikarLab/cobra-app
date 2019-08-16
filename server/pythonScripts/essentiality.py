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
initialModel = cobra.io.load_json_model(path)
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

#### next block of code contains backbone for essentiality
essentialReactions = []

#### Checking every reaction
for reaction in range(len(initialModel.reactions)):
    #### storing individual lower and upper bound in temp variable, will be used later
    tempLowerBound = initialModel.reactions[reaction].lower_bound
    tempUpperBound = initialModel.reactions[reaction].upper_bound
    #### next 2 lines of code means the reaction is knocked out, i.e. their lower and upper bound goes to zero
    initialModel.reactions[reaction].lower_bound = 0
    initialModel.reactions[reaction].upper_bound = 0
    #### optimizing the model
    solution = initialModel.optimize()
    #### setting the original lower and upper bound back
    initialModel.reactions[reaction].lower_bound = tempLowerBound
    initialModel.reactions[reaction].upper_bound = tempUpperBound
    #### if objective_value is zero, it means it is an essential reaction, so adding it to the array
    if(solution.objective_value == float(0)):
        essentialReactions.append({'id': initialModel.reactions[reaction].id})

essentialGenes = []

#### Checking every gene
for gene in range(len(initialModel.genes)):
    #### storing individual functional state in temp variable, will be used later
    tempFunctional = initialModel.genes[gene].functional
    #### knocking the gene out
    initialModel.genes[gene].knock_out()
    #### optimizing the model
    solution = initialModel.optimize()
    #### setting the original functional state back
    initialModel.genes[gene].functional = tempFunctional
    #### if objective_value is zero, it means it is an essential gene, so adding it to the array
    if(solution.objective_value == float(0)):
        essentialGenes.append({'id': initialModel.genes[gene].id})


##### optimizing the model and storing the objective value
solution = initialModel.optimize()

#### changing the lethal flag based upon objective value
#lethal = False
# if(solution==0):
# lethal = True

solution==0?lethal=True:lethal=False


##### creating the final JSON format to send back via express routes
data = {
        "name": initialModel.name,
        "i" : i,
        "objective_value" : solution.objective_value,
        "lethal": lethal,
        "essentialReactions": essentialReactions,
        "essentialGenes" : essentialGenes,
#        "metabolites": metabolitesData,
#        "reactions": reactionData,
#        "genes": genesData
}
print(json.dumps(data))
