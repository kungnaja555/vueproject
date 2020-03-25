const axios = require('axios')
import api from '../../config/api'

const faculty = {
    namespaced: true,
    state: {
        facultys: null
    },
    mutations: {
        setfaculty(state, data) {
            state.facultys = data
        }
    },
    getters: {
    },
    actions: {
        getallfaculty({ commit }) {
            axios.get(api.port + 'faculty/getallfaculty')
                .then((data) => commit('setfaculty', data.data))
        },
        addfaculty({ commit }, payout) {
            axios.post(api.port + 'faculty/addfaculty', {
                id: payout.id,
                name: payout.name
            }).then((data) => commit('setfaculty', data.data))
        },
        deletefaculty({ commit }, payout) {
            axios.get(api.port + 'faculty/deletefaculty/' + payout)
                .then((data) => commit('setfaculty', data.data))
        },
        editfaculty({ commit }, payout) {            
            axios.post(api.port + 'faculty/editfaculty/' + payout._id, {
                id: payout.id,
                name: payout.name
            }).then((data) => commit('setfaculty', data.data))
        },
        getforselect({ commit }) {
            axios.get(api.port + 'faculty/getforselect')
                .then((data) => commit('setfaculty', data.data))
        },
    }
}

export default faculty