const axios = require('axios')
import api from '../../config/api'

const redis = {
    namespaced: true,
    state: {
        state: null,
        img: null,
        avg: 0
    },
    mutations: {
        setState(state, data) {
            state.state = data
        },
        setImage(state, data) {
            state.img = api.port + "image/img" + data + ".jpg"
        },
        setAvg(state, data) {
            state.avg = data
        }
    },
    getters: {
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
        getAvg({ commit }) {
            setInterval(() => {
                axios.get(api.port + 'redis/getavg')
                    .then((data) => commit('setAvg', data.data))
            }, 1000);
        }
    }
}

export default redis