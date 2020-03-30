const axios = require('axios')
import api from '../../config/api'

const major = {
    namespaced: true,
    state: {
        majors: null
    },
    mutations: {
        setmajors(state, data) {
            state.majors = data
        }
    },
    getters: {
    },
    actions: {
        getallmajor({ commit }, payout) {
            axios.get(api.port + 'major/getallmajor/' + payout)
                .then((data) => commit('setmajors', data.data))
        },
        addmajor({ commit }, payout) {
            axios.post(api.port + 'major/addmajor/' + payout.id, {
                id: payout.form.id,
                name: payout.form.name
            }).then((data) => commit('setmajors', data.data))
        },
        deletemajor({ commit }, payout) {
            axios.get(api.port + 'major/deletemajor/' + payout.id + '/' + payout.form._id)
                .then((data) => commit('setmajors', data.data))
        },
        editmajor({ commit }, payout) {
            axios.post(api.port + 'major/editmajor/' + payout.id + '/' + payout.form._id, {
                id: payout.form.id,
                name: payout.form.name
            }).then((data) => commit('setmajors', data.data))
        },
        getForSelect({ commit }) {
            axios.get(api.port + 'major/getforselect')
                .then((data) => commit('setmajors', data.data))
        }
    },

}


export default major