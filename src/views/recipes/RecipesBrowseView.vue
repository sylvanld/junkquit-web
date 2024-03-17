<template>
  <v-container>
    <v-btn
      color="orange"
      fab
      v-if="selectedRecipe"
      style="position: fixed; bottom: 7em; right: 1em"
      @click="addRecipeToCart()"
    >
      <v-icon>mdi-cart</v-icon>
    </v-btn>

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
        @click="selectRecipe(recipe)"
        :class="{ active: recipe == selectedRecipe }"
        :key="recipe.uid"
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
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import cookbookClient from "@/clients/cookbook";

export default {
  data: () => ({
    query: "",
    selectedRecipe: null,
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
    addRecipeToCart() {
      this.$router.push({
        name: "shopping-add-recipe",
        params: { recipeUID: this.selectedRecipe.uid },
      });
    },
    selectRecipe(recipe) {
      if (this.selectedRecipe && this.selectedRecipe.uid == recipe.uid) {
        this.$router.push({
          name: "recipe-read",
          params: { recipeUID: recipe.uid },
        });
      }
      this.selectedRecipe = recipe;
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