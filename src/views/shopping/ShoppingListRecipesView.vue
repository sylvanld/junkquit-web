<template>
  <v-container>
    <h1>Recettes de la liste</h1>
    <p>
      <strong>Nombre de repas: {{ numberOfMeals }}</strong>
    </p>
    <router-link :to="{ name: 'shopping' }">Retour à la liste</router-link>

    <v-list>
      <v-list-item v-for="recipe in recipes" :key="recipe.uid">
        <v-list-item-content>
          <v-list-item-title>
            <strong>
              {{ recipe.name }}
            </strong>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <span style="display: flex">
            <v-btn text color="red" @click="deleteShoppingListRecipe(recipe)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>

            <v-text-field
              type="number"
              style="max-width: 4em; text-align: right"
              append-icon="mdi-account-multiple"
              v-model.number="recipe.scale"
              @change="updateShoppingListRecipe(recipe)"
            />
          </span>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    recipes: [],
    selectedRecipeUID: null,
    editing: false,
  }),
  computed: {
    ...mapState("groups", ["selectedGroup"]),
    numberOfMeals() {
      let meals = 0;
      for (let recipe of this.recipes) {
        if (recipe.scale) {
          meals += recipe.scale;
        }
      }
      return meals;
    },
  },
  watch: {
    selectedGroup: {
      immediate: true,
      handler(group) {
        this.refreshShoppingListRecipes(group && group.uid);
      },
    },
  },
  methods: {
    refreshShoppingListRecipes(groupUID) {
      if (!groupUID) return;
      this.$store
        .dispatch("shopping/getBatches", { groupUID })
        .then((batches) => {
          this.recipes = batches.filter((batch) => batch.type === "recipe");
        });
    },
    async updateShoppingListRecipe(recipe) {
      const groupUID = this.selectedGroup && this.selectedGroup.uid;
      try {
        await this.$store.dispatch("shopping/updateRecipe", {
          groupUID,
          recipe,
        });
      } catch (error) {
        alert("Failed to update ingredient quantity!");
      }
    },
    async deleteShoppingListRecipe(recipe) {
      const groupUID = this.selectedGroup && this.selectedGroup.uid;
      try {
        await this.$store.dispatch("shopping/deleteRecipe", {
          groupUID,
          recipeUID: recipe.uid,
        });
      } catch (error) {
        alert("Failed to delete recipe from shopping list!");
      }
      this.refreshShoppingListRecipes(groupUID);
    },
  },
};
</script>
