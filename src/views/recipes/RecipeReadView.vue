<template>
  <main v-if="recipe">
    <v-container>
      <div style="text-align: center">
        <h3>{{ recipe.name }}</h3>

        <div class="stats">
          <div>
            <v-icon large>mdi-clock</v-icon><br />
            <strong>{{ recipe.duration_minutes }} min</strong>
          </div>

          <div>
            <v-icon large>mdi-account-multiple</v-icon><br />
            <strong>{{ recipe.diners }}</strong>
          </div>

          <div>
            <v-icon large>mdi-bitcoin</v-icon><br />
            <strong>{{ recipe.price }} €</strong>
          </div>
        </div>

        <v-img v-if="recipe.thumbnail_url" :src="recipe.thumbnail_url"></v-img>

        <p style="padding: 8px">{{ recipe.description }}</p>
      </div>

      <div v-if="recipe.ingredients.length > 0">
        <h3>Ingrédients</h3>
        <v-list three-line>
          <template v-for="ingredient in recipe.ingredients">
            <v-list-item :key="ingredient.ingredient.name">
              <v-list-item-avatar>
                <v-img :src="ingredient.ingredient.thumbnail_url"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  {{ ingredient.ingredient.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ ingredient.quantity }} {{ ingredient.unit }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </div>

      <div>
        <h3>Administration</h3>
        <v-btn
          color="primary"
          style="margin: 8px"
          :to="{ name: 'recipe-edit', params: { recipeUID: recipe.uid } }"
          >Modifier la recette</v-btn
        >
        <v-btn color="red" style="margin: 8px" @click="deleteRecipe()"
          >Supprimer la recette</v-btn
        >
      </div>
    </v-container>
  </main>
</template>

<script>
import cookbookClient from "@/clients/cookbook";

export default {
  data: () => ({
    recipe: null,
  }),
  methods: {
    deleteRecipe() {
      cookbookClient
        .deleteRecipeByUid(this.recipe.uid)
        .then(() => this.$router.push({ name: "recipes" }));
    },
  },
  mounted() {
    const recipeUid = this.$route.params.recipeUID;
    cookbookClient
      .getRecipeByUid(recipeUid)
      .then((recipe) => (this.recipe = recipe));
  },
};
</script>

<style>
.stats {
  display: flex;
  padding: 10px 2em;
  gap: 2em;
}

.stats > * {
  text-align: center;
  flex: 1;
}
</style>
