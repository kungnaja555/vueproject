const axios = require('axios')
import api from '../../config/api'

const redis = {
    namespaced: true,
    state: {
        img: null
    },
    mutations: {
        setimg(state,data){
            console.log(data);          
            state.img = data
        }
    },
    getters: {
    },
    actions: {
        getstartimg({commit}){
            axios.get(api.port+"/redis/getstartimg")
                .then(
                    (data) => {
                        commit('setimg',data.data)
                    }
                )
        }
    }
}

export default redis