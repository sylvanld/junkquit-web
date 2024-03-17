import Vue from 'vue'
import Vuex from 'vuex'

import groups from './groups'
import ingredients from './ingredients'
import recipes from './recipes'
import shopping from './shopping'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ingredients,
    groups,
    recipes,
    shopping,
  }
})
