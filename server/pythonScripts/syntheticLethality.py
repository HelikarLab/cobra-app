import sys
import cobra
import json

path = sys.argv[1]

initialModel = cobra.io.load_json_model(path)

analysisModel = json.loads(sys.argv[2])

i=0

for initialReaction in range(len(initialModel.reactions)):
    for updatedReaction in range(len(analysisModel['reactions'])):
        if(initialModel.reactions[initialReaction].id==analysisModel['reactions'][updatedReaction]['id']):
            if('upper_bound' in analysisModel['reactions'][updatedReaction]):
                initialModel.reactions[initialReaction].lower_bound = analysisModel['reactions'][updatedReaction]['lower_bound']
                initialModel.reactions[initialReaction].upper_bound = analysisModel['reactions'][updatedReaction]['upper_bound']
            if('functional' in analysisModel['reactions'][updatedReaction]):
                if(analysisModel['reactions'][updatedReaction]['functional']==False):
                    initialModel.reactions[initialReaction].knock_out()

for initialGene in range(len(initialModel.genes)):
    for updatedGene in range(len(analysisModel['genes'])):
        if(initialModel.genes[initialGene].id==analysisModel['genes'][updatedGene]['id']):
            initialModel.genes[initialGene].functional = analysisModel['genes'][updatedGene]['functional']

solution = initialModel.optimize()

lethal = False

if(solution==0):
    lethal = True

data = {
        "name": initialModel.name,
        "i" : i,
        "objective_value" : solution.objective_value,
        "lethal": lethal,
        "analysisReactions": analysisModel['reactions']
#        "metabolites": metabolitesData,
#        "reactions": reactionData,
#        "genes": genesData
}
print(json.dumps(data))
