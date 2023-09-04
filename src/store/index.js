import Vue from 'vue'
import Vuex from 'vuex'

import shoppingList from './shopping-list'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shoppingList
  }
})
