const axios = require('axios')
import api from '../../config/api'

const time = {
    namespaced: true,
    state: {
        timestamps: null,

    },
    mutations: {
        settimestamps(state, data) {
            state.timestamps = data
        }
    },
    getters: {
    },
    actions: {
        gettimestamps({ commit }, payout) {
            axios.get(api.port + "timestamp/gettimestamps/" + payout.start + "/" + payout.end)
                .then(
                    (data) => {
                        commit('settimestamps', data.data)
                    }
                )
        },
        updatetimestamp({ commit }, payout) {
            axios.post(api.port + "timestamp/updatetimestamp", {
                start: payout.start,
                end: payout.end,
                id: payout.form.id,
                faculty: payout.form.faculty,
                major: payout.form.major
            }).then(
                (data) => {
                    commit('settimestamps', data.data)
                }
            )
        },

        deletetimestamp({ commit }, payout) {
            axios.post(api.port + "timestamp/deletetimestamp", {
                start: payout.start,
                end: payout.end,
                id: payout.form.id,
            }).then(
                (data) => {
                    commit('settimestamps', data.data)
                }
            )
        },

        updatetimemany({ commit }, payout) {
            axios.post(api.port + 'timestamp/updatemanytimestamp', {
                start: payout.start,
                end: payout.end,
                datestart: payout.form.datestart,
                dateend: payout.form.dateend,
                faculty: payout.form.faculty,
                major: payout.form.major
            }).then(
                (data) => {
                    commit('settimestamps', data.data)
                }
            )
        }

    }
}

export default time