const axios = require('axios')
import api from '../../config/api'

const time = {
    namespaced: true,
    state: {
        queues: null,
        facultys: null
    },
    mutations: {
        setqueue(state, data) {
            state.queues = data
        },
        setfaculty(state, data) {
            state.facultys = data
        }
    },
    getters: {
        queues: (state) => {
            return state.queues
        },
        facultys: (state) => {
            return state.facultys
        }
    },
    actions: {
        getallqueue({ commit }, id) {
            axios.get(api.port + "queue/getallqueue/" + id)
                .then(
                    (data) => {
                        commit('setqueue', data.data)
                    }
                )
        },
        getforselect({ commit }) {
            axios.get(api.port + "faculty/getforselect")
                .then(
                    (data) => {
                        commit('setfaculty', data.data)
                    }
                )
        },
        addqueue({ commit }, payout) {
            axios.post(api.port + "queue/addqueue/" + payout.id, {
                faculty: payout.faculty
            }).then(
                (data) => {
                    commit('setqueue', data.data)
                }
            )
        }
    }
}

export default time