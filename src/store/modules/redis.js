const axios = require('axios')
import api from '../../config/api'

const redis = {
    namespaced: true,
    state: {
        state: null,
        img: null
    },
    mutations: {
        setstate(state, data) {
            state.state = data
        },
        setimage(state, data) {
            state.img = data
        }
    },
    getters: {
    },
    actions: {
        getstate({ commit }) {
            axios.get(api.port + 'redis/getstate')
                .then((data) => commit('setstate', data.data))
        },
        setstate({ commit }, payout) {
            axios.post(api.port + 'redis/setstate', {
                state: payout.state,
                x: payout.position.x,
                y: payout.position.y,
                w: payout.position.w,
                h: payout.position.h,
            }).then((data) => commit('setstate', data.data))
        },
        getimage({ commit }) {
            axios.get(api.port + 'redis/getimage')
                .then((data) => commit('setimage', data.data))
        }
    }
}

export default redis