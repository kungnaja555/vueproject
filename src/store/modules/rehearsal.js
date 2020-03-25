const axios = require('axios')
import api from '../../config/api'

const rehearsal = {
    namespaced: true,
    state: {
        rehearsals: null
    },
    mutations: {
        setrehearsal(state, data) {
            state.rehearsals = data
        }
    },
    getters: {
        rehearsals: state => {
            return state.rehearsals
        }
    },
    actions: {
        getallrehearsal({ commit }) {
            axios.get(api.port + "rehearsal/getallrehearsal")
                .then((data) => commit('setrehearsal', data.data))
        },
        addrehearsal({ commit }, payout) {
            axios.post(api.port + "rehearsal/addrehearsal", {
                name: payout.name,
                years: payout.years
            }).then((data) => commit('setrehearsal', data.data))
        },
        editrehearsal({ commit }, payout) {
            axios.post(api.port + "rehearsal/editrehearsal/" + payout._id, {
                name: payout.name,
                years: payout.years
            }).then((data) => commit('setrehearsal', data.data))
        },
        deleterehearsal({ commit }, payout) {
            axios.get(api.port + "rehearsal/deleterehearsal/" + payout)
                .then((data) => commit('setrehearsal', data.data))
        },

    }

}

export default rehearsal