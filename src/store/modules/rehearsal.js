const axios = require('axios')
import api from '../../config/api'

const rehearsal = {
    namespaced: true,
    state: {
        rehearsals: [],
        years: null,
        rehearsal: ''
    },
    mutations: {
        setRehearsals(state, data) {
            state.rehearsals = data
        },
        setYears(state, data) {
            state.years = data
        },
        setRehearsal(state, data) {
            state.rehearsal = data
        },
    },
    getters: {
    },
    actions: {
        getAllRehearsal({ commit }) {
            axios.get(api.port + "rehearsal/getallrehearsal")
                .then((data) => commit('setRehearsals', data.data))
        },
        addRehearsal({ commit }, payout) {
            axios.post(api.port + "rehearsal/addrehearsal", {
                name: payout.name,
                years: payout.years,
                date: payout.date
            }).then((data) => commit('setRehearsals', data.data))
        },
        editRehearsal({ commit }, payout) {
            axios.post(api.port + "rehearsal/editrehearsal/" + payout._id, {
                name: payout.name,
                years: payout.years,
                date: payout.date
            }).then((data) => commit('setRehearsals', data.data))
        },
        deleteRehearsal({ commit }, payout) {
            axios.get(api.port + "rehearsal/deleterehearsal/" + payout)
                .then((data) => commit('setRehearsals', data.data))
        },
        getRehearsal({ commit }, payout) {
            axios.get(api.port + 'rehearsal/getrehearsal/' + payout)
                .then((data) => commit('setRehearsal', data.data))
        },

    }

}

export default rehearsal