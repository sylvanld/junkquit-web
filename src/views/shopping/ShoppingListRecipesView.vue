<template>
  <v-container>
    <h1>Recettes de la liste de courses</h1>

    <strong>Nombre de repas: {{ numberOfMeals }}</strong>
    <br />
    <router-link :to="{ name: 'shopping' }">Retour à la liste</router-link>

    <v-list>
      <v-subheader>Recettes</v-subheader>
      <v-list-item v-for="recipe in recipes" :key="recipe.uid">
        <v-list-item-content>
          <v-list-item-title>
            {{ recipe.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-icon>mdi-account-multiple</v-icon> {{ recipe.scale }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action> </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    recipes: [],
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
  methods: {
    updateShoppingListRecipes(groupUID) {
      if (!groupUID) return;
      this.$store
        .dispatch("shopping/getBatches", { groupUID })
        .then((batches) => {
          this.recipes = batches.filter((batch) => batch.type === "recipe");
        });
    },
  },
  watch: {
    selectedGroup: {
      immediate: true,
      handler(group) {
        this.updateShoppingListRecipes(group && group.uid);
      },
    },
  },
};
</script>