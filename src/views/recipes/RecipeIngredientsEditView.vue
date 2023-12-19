<template>
  <div>
    <v-list>
      <EditIngredientQuantityForm
        v-for="(recipeIngredient, index) in recipeIngredients"
        v-model="recipeIngredients[index]"
        @submit="createOrUpdateRecipeIngredient"
        @delete="deleteRecipeIngredientAtIndex(index)"
        :key="index"
      />
    </v-list>
    <v-btn text color="primary" @click="addEmptyRecipeIngredient()">
      + ajouter
    </v-btn>
  </div>
</template>

<script>
import EditIngredientQuantityForm from "@/components/forms/EditIngredientQuantityForm";

function makeDefaultRecipeIngredient() {
  return {
    editing: true,
    quantity: null,
    unit: null,
    ingredient: { name: "" },
  };
}

export default {
  components: {
    EditIngredientQuantityForm,
  },
  data: () => ({
    recipeUID: null,
    recipeIngredients: [],
  }),
  props: {
    value: Array,
    recipeUid: String,
  },
  watch: {
    value: {
      immediate: true,
      handler(recipeIngredients) {
        this.recipeIngredients = recipeIngredients;
      },
    },
    recipeUid: {
      immediate: true,
      handler(recipeUID) {
        this.recipeUID = recipeUID;
      },
    },
  },
  methods: {
    createOrUpdateRecipeIngredient(recipeIngredient) {
      console.log("createOrUpdateRecipeIngredient", recipeIngredient);
      if (recipeIngredient.uid) {
        console.log("Update recipe ignredient");
        this.$store.dispatch("recipes/updateIngredient", {
          recipeUID: this.recipeUID,
          recipeIngredient,
        });
      } else {
        console.log("Create recipe ingredient");
        this.$store.dispatch("recipes/addIngredient", {
          recipeUID: this.recipeUID,
          recipeIngredient,
        });
      }
    },
    deleteRecipeIngredientAtIndex(index) {
      const recipeIngredientUID = this.recipeIngredients[index].uid;
      if (recipeIngredientUID) {
        this.$store
          .dispatch("recipes/deleteIngredient", {
            recipeUID: this.recipeUID,
            recipeIngredientUID,
          })
          .then(() => {
            this.recipeIngredients.splice(index, 1);
          });
      } else {
        this.recipeIngredients.pop(index);
      }
    },
    addEmptyRecipeIngredient() {
      this.recipeIngredients.push(makeDefaultRecipeIngredient());
    },
  },
};
</script>
