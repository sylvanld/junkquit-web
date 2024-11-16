<template>
  <v-container style="position: relative">
    <v-text-field
      prepend-icon="mdi-book-open-page-variant-outline"
      label="Chercher une recette"
      v-model="query"
      @input="updateRecipes()"
    />

    <div style="display: flex; justify-content: flex-end">
      <v-btn dark small color="primary" :to="{ name: 'recipe-create' }">
        <v-icon>mdi-plus</v-icon>
        nouvelle recette
      </v-btn>
    </div>

    <v-list two-line>
      <v-subheader>Recettes trouvées:</v-subheader>

      <v-list-item
        v-for="recipe in recipes"
        :class="{ active: recipe == selectedRecipe }"
        :key="recipe.uid"
        @click="openRecipe(recipe)"
      >
        <v-list-item-avatar>
          <v-img :src="recipe.thumbnail_url"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ recipe.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <strong>
              <v-icon>mdi-account</v-icon>
              {{ recipe.duration_minutes }} mn
            </strong>
            <strong style="margin-left: 1em">
              <v-icon>mdi-account</v-icon>
              {{ recipe.diners }}
            </strong>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click.prevent="addRecipeToCart(recipe)">
            <v-icon color="primary">mdi-cart</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import cookbookClient from "@/clients/cookbook";

export default {
  data: () => ({
    query: "",
    recipes: [],
  }),
  mounted() {
    this.updateRecipes();
  },
  methods: {
    updateRecipes() {
      cookbookClient
        .searchRecipes({ name: this.query })
        .then((recipes) => (this.recipes = recipes));
    },
    addRecipeToCart(recipe) {
      this.$router.push({
        name: "shopping-add-recipe",
        params: { recipeUID: recipe.uid },
      });
    },
    openRecipe(recipe) {
      this.$router.push({
        name: "recipe-read",
        params: { recipeUID: recipe.uid },
      });
    },
  },
};
</script>

<style scoped>
.active {
  background-color: whitesmoke;
}
span {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 10px;
  background-color: lightgray;
  margin: 3px;
}
</style>