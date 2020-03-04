const axios = require('axios')
import api from '../../config/api'

const rehearsal = {
    namespaced: true,
    state: {
        rehearsals: null
    },
    mutations: {
        setrehearsal(state,data){            
            state.rehearsals = data            
        }
    },
    getters: {
        rehearsals:state=>{
            return state.rehearsals
        }
    },
    actions: {
        getallrehearsal({commit}) {
            axios.get(api.port + "rehearsal/getallrehearsal")
                .then(
                    (data) => {
                        commit('setrehearsal', data.data)                   
                    }
                )
        },

    }

}

export default rehearsal