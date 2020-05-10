const axios = require('axios')
import api from '../../config/api'

const time = {
    namespaced: true,
    state: {
        timestamps: [],
        statusInterval: '',
        amount: ''
    },
    mutations: {
        setTimestamps(state, data) {
            state.timestamps = data
        },
        setAvg(state, data) {
            state.amount = data
        }
    },
    getters: {
    },
    actions: {
        searchTime({ commit, state }, payout) {
            clearInterval(state.statusInterval)
            state.statusInterval = setInterval(() => {
                axios.get(api.port + `time/searchtime/${payout.start}/${payout.end}`)
                    .then((data) => commit('setTimestamps', data.data))
            }, 1000);
        },
        getAllTimes({ commit, state }) {
            clearInterval(state.statusInterval)
            state.statusInterval = setInterval(() => {
                axios.get(api.port + "time/getalltimes")
                    .then((data) => commit('setTimestamps', data.data))
            }, 1000);
        },
        setTimeGroup({ commit, state }, payout) {
            var start = state.timestamps[payout.position.start - 1].time
            var end = state.timestamps[payout.position.end - 1].time
            axios.post(api.port + "time/settimegroup", {
                start: start,
                end: end,
                set_id: payout.set_id,
                re_id: payout.re_id
            }).then((data) => commit('setTimestamps', data.data))
        },
        setOneTimeGroup({ commit }, payout) {
            axios.post(api.port + "time/setonetimegroup/" + payout.time_id, {
                set_id: payout.set_id,
                re_id: payout.re_id
            }).then((data) => commit('setTimestamps', data.data))
        },
        deleteTime({ commit }, payout) {
            axios.get(api.port + "time/deletetime/" + payout)
                .then((data) => commit('setTimestamps', data.data))
        },
        moveTimeOut({ commit }, payout) {
            axios.get(api.port + `time/movetimeout/${payout.re_id}/${payout.set_id}/${payout.time_id}`)
                .then((data) => commit('setTimestamps', data.data))
        },
        getTimeForReport({ commit }, payout) {
            axios.get(api.port + "time/gettimeforreport/" + payout.re_id + '/' + payout.set_id)

                .then((data) => commit('setTimestamps', data.data))
        },
        getTimeForAvg({ commit, state }) {
            clearInterval(state.statusInterval)
            state.statusInterval = setInterval(() => {
                axios.get(api.port + "time/gettimeforavg")
                    .then((data) => commit('setAvg', data.data.amount))
            }, 1000);
        },
        clearTimeAll({commit}){
            axios.get(api.port + `time/cleartimeall`)
            .then((data) => commit('setTimestamps', data.data))
        },
        clearTimestamps({ commit, state }) {
            clearInterval(state.statusInterval)
            commit('setTimestamps', [])
        }
    }
}

export default time