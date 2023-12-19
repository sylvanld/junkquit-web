import Vue from 'vue'
import VueRouter from 'vue-router'

import CreateGroupView from '@/views/groups/CreateGroupView'

import KitchenView from '@/views/kitchen/KitchenView'

import ShoppingListView from '@/views/shopping/ShoppingListView'

import RecipeEditView from '@/views/recipes/RecipeEditView'
import RecipesBrowseView from '@/views/recipes/RecipesBrowseView'
import RecipeCreateView from '@/views/recipes/RecipeCreateView'
import RecipeReadView from '@/views/recipes/RecipeReadView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/recipes',
    name: 'recipes',
    component: RecipesBrowseView,
    meta: {
      pageTitle: 'Recettes'
    }
  },
  {
    path: '/kitchen',
    name: 'kitchen',
    component: KitchenView,
    meta: {
      pageTitle: 'Cuisine'
    }
  },
  {
    path: '/recipe/create',
    name: 'recipe-create',
    component: RecipeCreateView,
    meta: {
      pageTitle: 'Nouvelle recette'
    }
  },
  {
    path: '/recipe/edit/:recipeUID',
    name: 'recipe-edit',
    component: RecipeEditView,
    meta: {
      pageTitle: 'Modifier la recette'
    }
  },
  {
    path: '/recipe/:recipeUID',
    name: 'recipe-read',
    component: RecipeReadView,
    meta: {
      pageTitle: 'Recette'
    }
  },
  {
    path: '/shopping',
    name: 'shopping',
    component: ShoppingListView,
    meta: {
      pageTitle: 'Courses'
    }
  },
  {
    path: '/group/create',
    name: 'group-create',
    component: CreateGroupView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
