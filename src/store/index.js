import Vue from 'vue'
import Vuex from 'vuex'

import rehearsal from './modules/rehearsal'
import time from './modules/time'
import redis from './modules/redis'
import faculty from './modules/faculty'
import major from './modules/major'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    rehearsal,
    time,
    redis,
    faculty,
    major
  }
})