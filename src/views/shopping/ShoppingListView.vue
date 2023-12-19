<template>
  <v-container>
    <strong>Repas: {{ countDiners }}</strong>

    <v-list>
      <v-subheader>Recettes</v-subheader>
      <v-list-item v-for="listRecipe in listRecipes" :key="listRecipe">
        <v-list-item-avatar>
          <v-img :src="listRecipe.recipe.thumbnail_url" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ listRecipe.recipe.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-icon>mdi-account-multiple</v-icon> {{ listRecipe.diners }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action> </v-list-item-action>
      </v-list-item>

      <!-- <v-subheader>Ingrédients</v-subheader> -->
    </v-list>

    <v-btn color="primary" fab style="position: fixed; bottom: 5em; right: 1em">
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    listRecipes: [],
  }),
  computed: {
    ...mapState("groups", ["selectedGroup"]),
    countDiners() {
      let count = 0;
      for (let listRecipe of this.listRecipes) {
        count += listRecipe.diners;
      }
      return count;
    },
  },
  watch: {
    selectedGroup: {
      immediate: true,
      handler(value) {
        console.log("loading list for group", value);
        this.$store
          .dispatch("groups/getListRecipes")
          .then((listRecipes) => (this.listRecipes = listRecipes));
      },
    },
  },
};
</script>