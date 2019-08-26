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
            ##### checking if upper bound was changed from UI, if yes: updating original model
            if('upper_bound' in analysisModel['reactions'][updatedReaction]):
                initialModel.reactions[initialReaction].lower_bound = analysisModel['reactions'][updatedReaction]['lower_bound']
                initialModel.reactions[initialReaction].upper_bound = analysisModel['reactions'][updatedReaction]['upper_bound']
            ##### checking if the reaction was knocked out, if yes: updating it
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


##### next block of code parses reaction data from SBML file to json format
reactionData = []
r = 0
for r in range(len(initialModel.reactions)):
    reactantsList = []
    productsList = []
    metabolitesList = []
    gene_reaction_rule = []
    ##### adding each reactant id, product id and associated metabolite id
    for rL in range(len(initialModel.reactions[r].reactants)):
        reactantsList.append(initialModel.reactions[r].reactants[rL].id)
    for pL in range(len(initialModel.reactions[r].products)):
        productsList.append(initialModel.reactions[r].products[pL].id)
    for mL in range(len(initialModel.reactions[r].metabolites.keys())):
        metabolitesList.append(list(initialModel.reactions[r].metabolites.keys())[mL].id)
    ##### adding reaction metadata
    reactionData.append({'id':initialModel.reactions[r].id,
                        'name': initialModel.reactions[r].name,
                        'minimum' : str(flux_variability_analysis(initialModel, initialModel.reactions[r]).minimum.values[0]),
                        'maximum' : str(flux_variability_analysis(initialModel, initialModel.reactions[r]).maximum.values[0]),
                        'flux' : "%.5f" % initialModel.reactions[r].flux,
#                        'equation':initialModel.reactions[r].reaction,
#                        'min' : initialModel.reactions[r].lower_bound,
#                        'max' : initialModel.reactions[r].upper_bound,
#                        'lower_bound' : initialModel.reactions[r].lower_bound,
#                        'upper_bound' : initialModel.reactions[r].upper_bound,
#                        'reversible': initialModel.reactions[r].reversibility,
#                        'compartments': repr(initialModel.reactions[r].compartments)[1:-1],
#                        'reactants': reactantsList,
#                        'products': productsList,
#                        'metabolites' : metabolitesList,
#                        'gene_reaction_rule' : initialModel.reactions[r].gene_reaction_rule
                        })

#### the above list of comments are not removed thinking maybe they might be used in future. If not, they can be removed

##### adding metabolite metadata
metabolitesData = []
m = 0
for m in range(len(initialModel.metabolites)):
    metabolitesData.append({'id':initialModel.metabolites[m].id, 'name' : initialModel.metabolites[m].name,'formula':initialModel.metabolites[m].formula, 'compartment': "'" + initialModel.metabolites[m].compartment +"'"})

##### adding gene metadata
genesData = []
g = 0
for g in range(len(initialModel.genes)):
    genesData.append({'id':initialModel.genes[g].id, 'name' : initialModel.genes[g].name,'functional':initialModel.genes[g].functional})

##### creating the final JSON format to send back via express routes
data = {
        "name": initialModel.name,
        "objective_value" : solution.objective_value,
        "reactions": reactionData,
#        "metabolites": metabolitesData,
#        "genes": genesData
}

print(json.dumps(data))


sys.stdout.flush()
