const axios = require('axios')
import api from '../../config/api'

const rehearsal = {
    namespaced: true,
    state: {
        rehearsals: [],
        years: null,
        rehearsal: '',
        fac_times: [],
        set_times: [],
        names: []
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
        setReport(state, data) {
            state.fac_times = data.fac_times
            state.set_times = data.set_times
        },
        setReportName(state, data) {
            state.names = data
        }
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
        report({ commit }, payout) {
            axios.get(api.port + `rehearsal/report/${payout.re_id}`)
                .then((data) => {
                    commit('setReport', data.data)
                })
        },
        reportName({ commit }, payout) {
            axios.get(api.port + `rehearsal/reportname/${payout.re_id}`)
                .then((data) => {
                    commit('setReportName', data.data)
                })
        },
        resetReport({ commit }) {
            var data = {
                fac_times: [],
                set_times: [],
            }
            commit('setReport', data)
            commit('setReportName', [])
        }
    }

}

export default rehearsal