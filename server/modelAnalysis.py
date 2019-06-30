import sys
import cobra
import json

data = sys.argv[1]

#print(data)

cobra.io.save_json_model(data, "./analysis/analysisModel.json")

sys.stdout.flush()
