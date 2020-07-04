const axios = require('axios')
import api from '../../config/api'

const redis = {
    namespaced: true,
    state: {
        state: null,
        img: null,
        url: null
    },
    mutations: {
        setState(state, data) {
            state.state = data
        },
        setImage(state, data) {
            state.img = api.port + "image/img" + data + ".jpg"
        },
        setUrl(state, data) {
            state.url = data
        }
    },
    getters: {
        state(state) {
            return state.state
        }
    },
    actions: {
        getState({ commit }) {
            axios.get(api.port + 'redis/getstate')
                .then((data) => commit('setState', data.data))
        },
        setState({ commit }, payout) {
            axios.post(api.port + 'redis/setstate', {
                state: payout.state,
                x: payout.position.x,
                y: payout.position.y,
                w: payout.position.w,
                h: payout.position.h,
            }).then((data) => commit('setState', data.data))
        },
        getCount({ commit }) {
            axios.get(api.port + 'redis/getcount')
                .then((data) => commit('setImage', data.data))

        },
        setUrl({ commit }) {
            axios.post(api.port + 'redis/seturl', {
                url: api.port + "image/background.jpg"
            }).then((data) => commit('setUrl', data.data))
        },
        getUrl({ commit }) {
            axios.get(api.port + 'redis/geturl')
                .then((data) => commit('setUrl', data.data))
        },
    }
}

export default redis