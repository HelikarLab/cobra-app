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

/*    getModel: thunk((actions, payload) => {
    return axios({ method: 'get', url: `${API_URL}/api/model/get/${payload}` })
        .then(res => {
            const data = res.data.jsonModel
            actions.setCurrentModel(data)
/!*            actions.setModelMetadata({
                name: data.name,
                id: data.id,
                sbmlVersion: data.sbmlVersion,
                sbmlLevel: data.sbmlLevel,
            })*!/
        })
        .then(() => {
            return { error: false, message: 'Successfully retrieved model.' }
        })
        .catch(err => {
            console.log(err)
            return { error: true, message: 'Something went wrong.' }
        })
    }),*/

    /*
      * Model tab state
      */

    modelTab: {
        currentModel: {
            metabolites: null,
            reactions: null,
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
        setCurrentModel: action((state, payload) => {
            state.currentModel = payload
        }),
        setCurrentAnalysisModel : action((state,payload)=>{
            state.currentAnalysisModel = payload
        }),
    },
/*
    modelTab: {
        //thunks
        saveModel: thunk((actions, payload, { getStoreState }) => {
            const state = getStoreState()
            const formData = new FormData();
            formData.append('model', JSON.stringify(state.currentModel));
            return axios({
                method: 'post',
                url: `${API_URL}/api/model/add`,
                data: formData,
            })
                .then(res => ({ message: 'Successfully saved.', error: false }))
                .catch(err => ({ message: 'Something went wrong.', error: true }))
        }),
    },
*/

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
        currentSyntheticLethalityModel : {
        },
/*        graphData: computed(state => {
            return state.resultData.filter(item => {
                if (item.checked) return true
                else return false
            })
        }),*/
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
                    console.log(res.data[0])
                    const json = JSON.parse(res.data);
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
/*        simulate: thunk((actions, payload, { getStoreState }) => {
            const state = getStoreState()
            let newReactions = []
            state.simulationTab.reactions.forEach(reaction => {
                if (reaction.checked === true) {
                    if (reaction.ratelaw === '') {
                        newReactions.push({ ...reaction, ratelaw: payload.globalRatelaw })
                    } else newReactions.push(reaction)
                }
            })
            const simulationPayload = {
                time: payload.time,
                reactions: newReactions,
                metabolites: state.simulationTab.metabolites,
            }
            return axios({
                method: 'post',
                url: `${API_URL}/api/simulation`,
                data: simulationPayload,
            })
                .then(res => {
                    const data = JSON.parse(res.data)
                    const modifiedData = data.concentrationData.map(item => ({
                        ...item,
                        checked: true,
                    }))
                    return actions.updateResult(modifiedData)
                })
                .catch(err => ({ message: 'Something went wrong.', error: true }))
        }),*/
        //Switches (on/off) the reaction in the simulation
/*        switchReaction: thunk((actions, payload, { getStoreState }) => {
            let state = getStoreState()
            state.simulationTab.reactions = state.simulationTab.reactions.map(
                reaction => {
                    if (reaction.id === payload.id)
                        return { ...reaction, checked: !reaction.checked }
                    else return reaction
                }
            )
            actions.updateMetabolites()
        }),*/



        //actions
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
/*        setRatelaw: action((state, payload) => {
            state.reactions = state.reactions.map(reaction => {
                if (payload.id === reaction.id) {
                    return { ...reaction, ratelaw: payload.ratelaw }
                } else return reaction
            })
        }),
        toggleMetabolite: action((state, payload) => {
            state.resultData = state.resultData.map(item => {
                if (item.name === payload) {
                    return { ...item, checked: !item.checked }
                } else return item
            })
        }),
        updateResult: action((state, payload) => {
            state.resultData = payload
        }),
        setGlobalRatelaw: action((state, payload) => {
            state.globalRatelaw = payload
        }),
        setIcmin: action((state, payload) => {
            state.icmin = payload
        }),
        setIcmax: action((state, payload) => {
            state.icmax = payload
        }),
        updateIc: action((state, payload) => {
            state.metabolites.forEach(metabolite => {
                if (metabolite.id === payload.id) {
                    metabolite.initialConcentration = payload.initialConcentration
                }
            })
        }),*/
        // Updates the metabolites list
/*        updateMetabolites: action((state, payload) => {
            state.metabolites = []
            state.reactions.map(reaction => {
                if (reaction.checked) {
                    reaction.reactants.map(reactant => {
                        return state.metabolitesFromModel.map(metabolite => {
                            if (reactant.id === metabolite.id) {
                                if (!_.includes(state.metabolites, metabolite)) {
                                    return state.metabolites.push(metabolite)
                                } else {
                                    return false
                                }
                            } else {
                                return false
                            }
                        })
                    })
                    return reaction.products.map(product => {
                        return state.metabolitesFromModel.map(metabolite => {
                            if (product.id === metabolite.id) {
                                if (!_.includes(state.metabolites, metabolite)) {
                                    return state.metabolites.push(metabolite)
                                } else {
                                    return false
                                }
                            } else {
                                return false
                            }
                        })
                    })
                } else {
                    return false
                }
            })
        }),*/

    },

    //actions
/*    setCurrentModel: action((state, payload) => {
        state.currentModel = payload
    }),*/
    setCurrentModelFile: action((state, payload) => {
        state.currentModelFile = payload
    }),

};

export const store = createStore(model);
