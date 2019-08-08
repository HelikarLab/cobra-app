import { createStore, action, thunk, debug } from 'easy-peasy'
import axios from 'axios'
import _ from 'lodash'

const API_URL = 'http://localhost:5000' || process.env.REACT_APP_API_URL;

const model = {
    currentModelFile: '',
    currentModel: {},
    currentAnalysisModel : {},

    modelMetadata:{},
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
                actions.modelTab.setCurrentModel(json)
                actions.modelTab.setCurrentAnalysisModel(json)
            })
            .then(() => {
                actions.initSimulation()
                return { error: false }
            })
            .catch(err => {
                console.log(debug(err))
            })
    }),
    getModel: thunk((actions, payload) => {
        return axios({ method: 'get', url: `${API_URL}/api/model/get/${payload}` })
            .then(res => {
                const data = res.data.jsonModel
                actions.modelTab.setCurrentModel(data)
                actions.setModelMetadata({
                    name: data.name,
                    id: data.id,
                })
            })
            .then(() => {
                actions.initSimulation()
                return { error: false, message: 'Successfully retrieved model.' }
            })
            .catch(err => {
                console.log(err)
                return { error: true, message: 'Something went wrong.' }
            })
    }),
    //actions
    initSimulation: action(state => {
        state.simulationTab.currentFBAModel = {}
        state.simulationTab.reactions = state.modelTab.currentModel.reactions.map(
            reaction => ({
                ...reaction,
                checked: false,
            })
        )
        state.simulationTab.genes = state.modelTab.currentModel.genes.map(
            gene=>({
                ...gene,
                checked: false,
            })
        )
        state.simulationTab.metabolitesFromModel =
            state.modelTab.currentModel.metabolites
    }),
    setModelMetadata: action((state, payload) => {
        state.modelMetadata = {
            name: payload.name,
            id: payload.id
        }
    }),

    modelTab: {
        currentModel: {
            metabolites: null,
            reactions: null,
        },
        currentAnalysisModel:{
            metabolites: null,
            reactions: [],
        },
        //thunks
        saveModel: thunk((actions, payload, { getStoreState }) => {
            const state = getStoreState()
            const formData = new FormData();
            formData.append('model', JSON.stringify(state.modelTab.currentModel));
            return axios({
                method: 'post',
                url: `${API_URL}/api/model/add`,
                data: formData,
            })
                .then(res => ({ message: 'Successfully saved.', error: false }))
                .catch(err => ({ message: 'Something went wrong.', error: true }))
        }),
        //actions
        updateModelReactions: action((state,payload)=>{
            state.currentModel.reactions = payload
        }),
        setCurrentModel: action((state, payload) => {
            state.currentModel = payload
        }),
        setCurrentAnalysisModel : action((state,payload)=>{
            state.currentAnalysisModel = payload
        })
    },

    simulationTab: {
        updatedReactions : [],
        updatedGenes : [],
        knockedOutReactions: [],
        knockedOutGenes: [],
        metabolitesFromModel: [],
        metabolites: null,
        reactions: null,
        genes: null,
        resultData: [],
        currentFBAModel: {},
        currentFVAModel : {},
        currentEssentialityModel : {},
        currentSyntheticLethalityModel : null,

        //thunks
        runFluxBalanceAnalysis : thunk((actions, payload)=>{
            const formData = new FormData();
            formData.append('model', JSON.stringify(payload));
            formData.append('file',payload.filename)
            axios({
                method: 'post',
                url: `${API_URL}/api/model/id/fba/optimize`,
                data : formData
            })
                .then(res=> {
                    const json = JSON.parse(res.data);
                    actions.setCurrentFBAModel(json);
                })
                .catch(err => {
                  console.log(err)
                  return { error: true, message: 'Something went wrong.' }
                })
        }),
        runFluxVariabilityAnalysis : thunk((actions, payload)=>{
            console.log(payload)
            const formData = new FormData();
            formData.append('model', JSON.stringify(payload));
            formData.append('file',payload.filename)
            axios({
                method: 'post',
                url: `${API_URL}/api/model/id/fva/optimize`,
                data : formData
            })
                .then(res=> {
                    console.log(res.data[0])
                    const json = JSON.parse(res.data);
                    actions.setCurrentFVAModel(json);
                })
                .catch(err=>console.log(err))
        }),
        runEssentiality : thunk((actions,payload)=>{
            const formData = new FormData();
            formData.append('model',JSON.stringify(payload));
            formData.append('file',payload.filename)
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
            formData.append('file',payload.filename)
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

        resetUpdatedReactions: action((state,payload)=>{
            state.updatedReactions = []
        }),
        resetUpdatedGenes: action((state,payload)=>{
          state.updatedGenes= []
        }),
        resetKnockedOutReactions: action((state,payload)=>{
           state.knockedOutReactions=[]
        }),
        updateSimulationReactions : action((state,payload)=>{
            state.updatedReactions = payload
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

    },

    //actions
    setCurrentModelFile: action((state, payload) => {
        state.currentModelFile = payload
    }),

};

export const store = createStore(model);
