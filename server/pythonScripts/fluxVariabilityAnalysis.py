import sys
import cobra
import json
from cobra.flux_analysis import flux_variability_analysis

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

reactionData = []
r = 0
for r in range(len(initialModel.reactions)):
    reactantsList = []
    productsList = []
    metabolitesList = []
    gene_reaction_rule = []
    for rL in range(len(initialModel.reactions[r].reactants)):
        reactantsList.append(initialModel.reactions[r].reactants[rL].id)
    for pL in range(len(initialModel.reactions[r].products)):
        productsList.append(initialModel.reactions[r].products[pL].id)
    for mL in range(len(initialModel.reactions[r].metabolites.keys())):
        metabolitesList.append(list(initialModel.reactions[r].metabolites.keys())[mL].id)
    reactionData.append({'id':initialModel.reactions[r].id,
                        'name': initialModel.reactions[r].name,
                        'minimum' : str(flux_variability_analysis(initialModel, initialModel.reactions[r]).minimum.values[0]),
                        'maximum' : str(flux_variability_analysis(initialModel, initialModel.reactions[r]).maximum.values[0]),
#                        'equation':initialModel.reactions[r].reaction,
#                        'min' : initialModel.reactions[r].lower_bound,
#                        'max' : initialModel.reactions[r].upper_bound,
#                       'lower_bound' : initialModel.reactions[r].lower_bound,
#                        'upper_bound' : initialModel.reactions[r].upper_bound,
#                        'reversible': initialModel.reactions[r].reversibility,
                        'flux' : "%.5f" % initialModel.reactions[r].flux,
#                        'compartments': repr(initialModel.reactions[r].compartments)[1:-1],
#                        'reactants': reactantsList,
#                        'products': productsList,
#                        'metabolites' : metabolitesList,
#                        'gene_reaction_rule' : initialModel.reactions[r].gene_reaction_rule
                        })

metabolitesData = []
m = 0
for m in range(len(initialModel.metabolites)):
    metabolitesData.append({'id':initialModel.metabolites[m].id, 'name' : initialModel.metabolites[m].name,'formula':initialModel.metabolites[m].formula, 'compartment': "'" + initialModel.metabolites[m].compartment +"'"})

genesData = []
g = 0
for g in range(len(initialModel.genes)):
    genesData.append({'id':initialModel.genes[g].id, 'name' : initialModel.genes[g].name,'functional':initialModel.genes[g].functional})

data = {
        "name": initialModel.name,
        "i" : i,
        "objective_value" : solution.objective_value,
#        "metabolites": metabolitesData,
        "reactions": reactionData,
#        "genes": genesData
}

print(json.dumps(data))


sys.stdout.flush()
