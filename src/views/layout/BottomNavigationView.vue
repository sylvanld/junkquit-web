<template>
  <v-bottom-navigation color="primary" fixed grow app>
    <v-btn style="height: 100%" :to="{ name: 'recipes' }">
      <span>Recettes</span>
      <v-icon>mdi-book-open-page-variant</v-icon>
    </v-btn>

    <v-btn style="height: 100%" :to="{ name: 'shopping' }">
      <span>Courses</span>
      <v-icon>mdi-cart</v-icon>
    </v-btn>

    <v-btn style="height: 100%" :to="{ name: 'kitchen' }">
      <span>Cuisine</span>
      <v-icon>mdi-chef-hat</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
