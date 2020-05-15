const axios = require('axios')
import api from '../../config/api'

const faculty = {
    namespaced: true,
    state: {
        pundits: [],
        havePundit: ''
    },
    mutations: {
        setPundits(state, data) {
            state.pundits = data
        }
    },
    getters: {
        isMatchPundit(state) {
            return state.havePundit
        }
    },
    actions: {
        getAllPundit({ commit }, payout) {
            axios.get(api.port + `pundit/getallpundit/${payout.set_id}`)
                .then((data) => commit('setPundits', data.data))
        },
        addPundit({ commit }, payout) {
            axios.post(api.port + `pundit/addpundit/${payout.set_id}`, {
                pundit: payout.pundit
            }).then((data) => commit('setPundits', data.data))
        },
        getPunditBySet({ commit }, payout) {
            axios.get(api.port + 'pundit/getpunditbyset/' + payout)
                .then((data) => commit('setPundits', data.data))
        },
        deletePundit({ commit }, payout) {
            axios.get(api.port + `pundit/deletepundit/${payout.set_id}/${payout.pundit._id}`)
                .then((data) => commit('setPundits', data.data))
        },
        editPundit({ commit }, payout) {
            axios.post(api.port + `pundit/editpundit/${payout.set_id}/${payout.pundit._id}`, {
                pundit: payout.pundit
            }).then((data) => commit('setPundits', data.data))
        },
        uploadFile({ commit }, payout) {
            axios.post(api.port + `pundit/uploadfile/${payout.set_id}`, {
                data: payout.data
            }).then((data) => commit('setPundits', data.data))
        },
        clearPundits({ commit }) {
            commit('setPundits', [])
        },
        clearPunditBySet({ commit }, payout) {
            axios.get(api.port + `pundit/clearpunditbyset/${payout.set_id}`)
                .then((data) => commit('setPundits', data.data))
        }
    }
}

export default faculty