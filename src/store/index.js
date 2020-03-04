import Vue from 'vue'
import Vuex from 'vuex'

import rehearsal from './modules/rehearsal'
import time from './modules/time'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    rehearsal,
    time
  }
})