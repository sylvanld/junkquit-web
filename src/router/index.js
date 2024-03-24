import Vue from 'vue'
import VueRouter from 'vue-router'

import CreateGroupView from '@/views/groups/CreateGroupView'

import KitchenView from '@/views/kitchen/KitchenView'

import ShoppingListView from '@/views/shopping/ShoppingListView'
import ShoppingAddRecipeView from '@/views/shopping/ShoppingAddRecipeView'
import ShoppingListRecipesView from '@/views/shopping/ShoppingListRecipesView'

import RecipeEditView from '@/views/recipes/RecipeEditView'
import RecipesBrowseView from '@/views/recipes/RecipesBrowseView'
import RecipeCreateView from '@/views/recipes/RecipeCreateView'
import RecipeReadView from '@/views/recipes/RecipeReadView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recipes'
  },
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
    path: '/shopping/recipes',
    name: 'shopping-recipes',
    component: ShoppingListRecipesView,
    meta: {
      pageTitle: 'Recettes de la liste'
    }
  },
  {
    path: '/shopping/add/recipe/:recipeUID',
    name: 'shopping-add-recipe',
    component: ShoppingAddRecipeView,
    meta: {
      pageTitle: 'Ajouter une recette'
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
