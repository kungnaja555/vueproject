const axios = require('axios')
import api from '../../config/api'

const faculty = {
    namespaced: true,
    state: {
        facultys: [],
        faculty: '',
        myfacultys: [],
        fac_times: [],
        set_times: [],
        names: []
    },
    mutations: {
        setFacultys(state, data) {
            state.facultys = data
        },
        setFaculty(state, data) {
            state.faculty = data
        },
        setMyFacultys(state, data) {
            state.myfacultys = data
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
        getAllFaculty({ commit }) {
            axios.get(api.port + 'faculty/getallfaculty')
                .then((data) => commit('setFacultys', data.data))
        },
        addFaculty({ commit }, payout) {
            axios.post(api.port + 'faculty/addfaculty', {
                id: payout.id,
                name: payout.name
            }).then((data) => commit('setFacultys', data.data))
        },
        deleteFaculty({ commit }, payout) {
            axios.get(api.port + 'faculty/deletefaculty/' + payout)
                .then((data) => commit('setFacultys', data.data))
        },
        editFaculty({ commit }, payout) {
            axios.post(api.port + 'faculty/editfaculty/' + payout._id, {
                id: payout.id,
                name: payout.name
            }).then((data) => commit('setFacultys', data.data))
        },
        getFaculty({ commit }, payout) {
            axios.get(api.port + 'faculty/getfaculty/' + payout)
                .then((data) => commit('setFaculty', data.data))
        },
        getFacultysByRehearsal({ commit }, payout) {
            axios.get(api.port + 'faculty/getfacultysbyrehearsal/' + payout.re_id)
                .then((data) => {
                    commit('setFacultys', data.data.facultys)
                    commit('setMyFacultys', data.data.myfacultys)
                })
        },
        updateSomeAttrRehearsal({ commit }, payout) {
            axios.post(api.port + 'faculty/updatesomeattrrehearsal/' + payout.re_id, {
                form: payout.form
            })
                .then((data) => {
                    commit('setFacultys', data.data.facultys)
                    commit('setMyFacultys', data.data.myfacultys)
                })
        },
        updateAllAttrRehearsal({ commit }, payout) {
            axios.post(api.port + 'faculty/updateallattrrehearsal/' + payout.re_id, {
                form: payout.form
            })
                .then((data) => {
                    commit('setFacultys', data.data.facultys)
                    commit('setMyFacultys', data.data.myfacultys)
                })
        },
        removeRehearsalInFaculty({ commit }, payout) {
            axios.get(api.port + `faculty/removerehearsalinfaculty/${payout.re_id}/${payout.form._id}`)
                .then((data) => {
                    commit('setFacultys', data.data.facultys)
                    commit('setMyFacultys', data.data.myfacultys)
                })
        },
        addFacultyInRehearsal({ commit }, payout) {
            axios.post(api.port + `faculty/addfacultyinrehearsal/${payout.re_id}`, {
                name: payout.form.name
            }).then((data) => {
                commit('setFacultys', data.data.facultys)
                commit('setMyFacultys', data.data.myfacultys)
            })
        },
        deleteGroup({ commit }, payout) {
            axios.get(api.port + `faculty/deletegroup/${payout.re_id}/${payout.form._id}`)
                .then((data) => {
                    commit('setFacultys', data.data.facultys)
                    commit('setMyFacultys', data.data.myfacultys)
                })
        },
        editGroup({ commit }, payout) {
            axios.post(api.port + `faculty/editgroup/${payout.re_id}/${payout.form._id}`, {
                form: payout.form
            }).then((data) => {
                commit('setFacultys', data.data.facultys)
                commit('setMyFacultys', data.data.myfacultys)
            })
        },
        report({ commit }, payout) {
            axios.get(api.port + `faculty/report/${payout.re_id}`)
                .then((data) => {
                    commit('setReport', data.data)
                })
        },
        reportName({ commit }, payout) {
            axios.get(api.port + `faculty/reportname/${payout.re_id}`)
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

export default faculty