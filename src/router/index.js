import Vue from 'vue'
import VueRouter from 'vue-router'
import RecipesView from '@/views/RecipesView'
import ShoppingView from '@/views/ShoppingView'
import ShoppingListView from '@/views/ShoppingListView'
import RecipeEditView from '@/views/RecipeEditView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/recipes',
    name: 'recipes',
    component: RecipesView
  },
  {
    path: '/recipes/:recipeUID',
    name: 'recipe-edit',
    component: RecipeEditView
  },
  {
    path: '/shopping',
    name: 'shopping',
    component: ShoppingView
  },
  {
    path: '/shopping/:shoppingListId',
    name: 'shopping-list',
    component: ShoppingListView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
