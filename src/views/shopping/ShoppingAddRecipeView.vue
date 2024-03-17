<template>
  <v-container style="position: relative" v-if="recipe">
    <h2>Ajouter à la liste de courses</h2>

    <div
      style="
        display: flex;
        justify-content: start;
        align-items: center;
        margin-left: 2em;
      "
    >
      <strong
        ><v-icon style="margin-right: 0.5em">mdi-account-multiple</v-icon
        >Recette pour</strong
      >
      <v-text-field
        v-model="recipe.diners"
        type="number"
        style="flex: 0; margin: 0 1em; min-width: 3em; text-align: center"
      />
      <strong>personnes.</strong>
    </div>

    <v-list lines="one">
      <v-list-item
        v-for="ingredient of scaledIngredients"
        :key="ingredient.uid"
      >
        <v-list-item-content>
          <v-list-item-title>{{ ingredient.name }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          {{ ingredient.quantity }} {{ ingredient.unit }}
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-btn
      fab
      style="position: absolute; right: 1em"
      @click="addIngredientsToShoppingList()"
      color="orange"
    >
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    recipe: null,
    originalQuantity: 1,
  }),
  computed: {
    scaledIngredients() {
      console.log('scaledIngredient');
      if(!this.recipe) return [];
      return this.recipe.ingredients.map((ingredient) => {
        let quantity = ingredient.quantity;
        let scalingRatio = this.recipe.diners / this.originalQuantity;
        if (quantity) {
          quantity *= scalingRatio;
        }
        return {
          name: ingredient.ingredient.name,
          shelve: ingredient.ingredient.shelve,
          itemUID: ingredient.ingredient.uid,
          quantity: quantity,
          unit: ingredient.unit,
        };
      });
    },
  },
  mounted() {
    console.log('onMounted');
    const recipeUID = this.$route.params["recipeUID"];
    this.$store.dispatch("recipes/getByUID", recipeUID).then((recipe) => {
      this.originalQuantity = recipe.diners;
      this.recipe = recipe;
    });
  },
  methods: {
    addIngredientsToShoppingList() {
      const groupUID = this.$store.state.groups.selectedGroup.uid;
      const recipeUID = this.$route.params["recipeUID"];

      if (!groupUID) {
        alert("No selected group");
        return;
      }

      this.$store
        .dispatch("shopping/addBatch", {
          groupUID,
          batchUID: recipeUID,
          name: this.recipe.name,
          scale: this.recipe.diners,
          type: "recipe",
          items: this.scaledIngredients,
        })
        .then(() => this.$router.push({ name: "shopping-recipes" }));
    },
  },
};
</script>
