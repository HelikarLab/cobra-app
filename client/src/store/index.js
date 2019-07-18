import { createStore, action, thunk, debug } from 'easy-peasy'
import axios from 'axios'

const API_URL = 'http://localhost:5000' || process.env.REACT_APP_API_URL;

const model = {
  currentModelFile: '',
  currentModel: {},
  currentAnalysisModel : {},
  currentFBAModel: {},
  currentFVAModel : {},
  currentEssentialityModel : {},
  currentSyntheticLethalityModel : {},
  updatedReactions : [],
  updatedGenes : [],

  //thunks
  importSbml: thunk((actions, file) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    axios({
      method: 'post',
      url: `${API_URL}/api/uploadSbml`,
      data: formData,
    })
      .then(res => {
        const json = JSON.parse(res.data);
        actions.setCurrentModelFile(file);
        actions.setCurrentModel(json)
        actions.setCurrentAnalysisModel(json)
      })
      .catch(err => {
        console.log(debug(err))
      })
  }),
  saveModel: thunk((actions, payload, { getStoreState }) => {
    const state = getStoreState();
    const formData = new FormData();
    formData.append('file', state.currentModelFile, state.currentModelFile.name);
    formData.append('model', JSON.stringify(state.currentModel));

    axios({
      method: 'post',
      url: `${API_URL}/api/model/add`,
      data: formData,
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }),
  runFluxBalanceAnalysis : thunk((actions, payload)=>{
      const formData = new FormData();
      formData.append('model', JSON.stringify(payload));
      axios({
        method: 'post',
        url: `${API_URL}/api/model/id/fba/optimize`,
        data : formData
      })
        .then(res=> {
          const json = JSON.parse(res.data);
          actions.setCurrentFBAModel(json);
        })
        .catch(err=>console.log(err))
  }),
  runFluxVariabilityAnalysis : thunk((actions, payload)=>{
    const formData = new FormData();
    formData.append('model', JSON.stringify(payload));
    axios({
      method: 'post',
      url: `${API_URL}/api/model/id/fva/optimize`,
      data : formData
    })
        .then(res=> {
          const json = JSON.parse(res.data);
          console.log(res.data)
          actions.setCurrentFVAModel(json);
        })
        .catch(err=>console.log(err))
  }),
  runEssentiality : thunk((actions,payload)=>{
    const formData = new FormData();
    formData.append('model',JSON.stringify(payload));
    axios({
      method: 'post',
      url: `${API_URL}/api/model/id/essentiality/optimize`,
      data : formData
    })
        .then(res=>{
          const json = JSON.parse(res.data);
          actions.setCurrentEssentialityModel(json);
          console.log(res.data)
        })
        .catch(err=>console.log(err))
  }),
  runSyntheticLethality: thunk((actions,payload)=>{
    const formData = new FormData();
    formData.append('model',JSON.stringify(payload));
    axios({
      method: 'post',
      url: `${API_URL}/api/model/id/syntheticlethality/optimize`,
      data : formData
    })
        .then(res=>{
          const json = JSON.parse(res.data);
          actions.setCurrentSyntheticLethalityModel(json);
          console.log(res.data)
        })
        .catch(err=>console.log(err))
  }),

  //actions
  setCurrentModel: action((state, payload) => {
    state.currentModel = payload
  }),
  setCurrentModelFile: action((state, payload) => {
    state.currentModelFile = payload
  }),
  setCurrentFBAModel : action((state,payload)=>{
    state.currentFBAModel = payload
  }),
  setCurrentFVAModel : action((state,payload)=>{
    state.currentFVAModel = payload
  }),
  setCurrentEssentialityModel : action((state,payload)=>{
    state.currentEssentialityModel = payload
  }),
  setCurrentSyntheticLethalityModel : action((state,payload)=>{
    state.currentSyntheticLethalityModel = payload
  }),
  setCurrentAnalysisModel : action((state,payload)=>{
    state.currentAnalysisModel = payload
  })
};

export const store = createStore(model);
