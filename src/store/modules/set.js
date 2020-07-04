const axios = require('axios')
import api from '../../config/api'

const faculty = {
    namespaced: true,
    state: {
        sets: [],
        set: '',
        mysets: []
    },
    mutations: {
        setSets(state, data) {
            state.sets = data
        },
        setSet(state, data) {
            state.set = data
        },
        setMySets(state, data) {
            state.mysets = data
        },
    },
    getters: {
    },
    actions: {
        getAllSet({ commit }, payout) {
            axios.get(api.port + 'set/getallset/' + payout)
                .then((data) => commit('setSets', data.data))
        },
        addSet({ commit }, payout) {
            axios.post(api.port + 'set/addset/' + payout.fac_id, {
                set: payout.set
            }).then((data) => commit('setSets', data.data))
        },
        deleteSet({ commit }, payout) {
            axios.get(api.port + 'set/deleteset/' + payout.fac_id + '/' + payout.set._id)
                .then((data) => commit('setSets', data.data))
        },
        getSet({ commit }, payout) {
            axios.get(api.port + 'set/getset/' + payout.set_id)
                .then((data) => commit('setSet', data.data))
        },
        editSet({ commit }, payout) {
            axios.post(api.port + 'set/editset/' + payout.fac_id + '/' + payout.set._id, {
                set: payout.set
            }).then((data) => commit('setSets', data.data))
        },
        getSetsByFaculty({ commit }, payout) {
            axios.get(api.port + 'set/getsetsbyfaculty/' + payout.re_id + '/' + payout.fac_id)
                .then((data) => {
                    commit('setSets', data.data.sets)
                    commit('setMySets', data.data.mysets)
                })
        },
        addSomeContentInSet({ commit }, payout) {
            axios.post(api.port + `set/addsomecontentinset/${payout.re_id}/${payout.fac_id}`, {
                form: payout.form
            })
                .then((data) => {
                    commit('setSets', data.data.sets)
                    commit('setMySets', data.data.mysets)
                })
        },
        removeContentInSet({ commit }, payout) {
            axios.get(api.port + `set/removecontentinset/${payout.re_id}/${payout.fac_id}/${payout.form._id}`)
                .then((data) => {
                    commit('setSets', data.data.sets)
                    commit('setMySets', data.data.mysets)
                })
        },
        addNewContentInSet({ commit }, payout) {
            axios.post(api.port + `set/addnewcontentinset/${payout.re_id}/${payout.fac_id}`, {
                form: payout.form
            })
                .then((data) => {
                    commit('setSets', data.data.sets)
                    commit('setMySets', data.data.mysets)
                })
        },
        deleteNewContentInSet({ commit }, payout) {
            axios.get(api.port + `set/deletenewcontentinset/${payout.re_id}/${payout.fac_id}/${payout.form._id}`)
                .then((data) => {
                    commit('setSets', data.data.sets)
                    commit('setMySets', data.data.mysets)
                })
        },
        editNewContentInSet({ commit }, payout) {
            axios.post(api.port + `set/editnewcontentinset/${payout.re_id}/${payout.fac_id}/${payout.form._id}`, {
                form: payout.form,
                editname: payout.editname
            })
                .then((data) => {
                    commit('setSets', data.data.sets)
                    commit('setMySets', data.data.mysets)
                })
        },
    }
}

export default faculty