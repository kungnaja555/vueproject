const axios = require('axios')
import api from '../../config/api'

const faculty = {
    namespaced: true,
    state: {
        sets: null
    },
    mutations: {
        setsets(state, data) {
            state.sets = data
        }
    },
    getters: {
    },
    actions: {
        getallset({ commit }) {
            axios.get(api.port + 'set/getallset')
                .then((data) => commit('setsets', data.data))
        },
        addset({ commit }, payout) {
            axios.post(api.port + 'set/addset', {
                id: payout.id,
                name: payout.name
            }).then((data) => commit('setsets', data.data))
        },
        deleteset({ commit }, payout) {
            axios.get(api.port + 'set/deleteset/' + payout)
                .then((data) => commit('setsets', data.data))
        },
        editset({ commit }, payout) {            
            axios.post(api.port + 'set/editset/' + payout._id, {
                id: payout.id,
                name: payout.name
            }).then((data) => commit('setsets', data.data))
        }
    }
}

export default faculty