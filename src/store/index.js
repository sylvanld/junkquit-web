import Vue from 'vue'
import Vuex from 'vuex'

import shoppingList from './shopping-list'
import groups from './groups'
import ingredient from './ingredient'
import recipes from './recipes'
import shopping from './shopping'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ingredient,
    groups,
    recipes,
    shopping,
    shoppingList
  }
})
