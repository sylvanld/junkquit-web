<template>
  <v-container v-if="recipe">
    <div>
      <h3>Description de la recette</h3>
      <EditRecipeForm v-model="recipe" @submit="updateRecipe()">
        <template v-slot:actions>
          <v-btn
            color="primary"
            type="submit"
            fab
            :disabled="!isRecipeModified"
          >
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </template>
      </EditRecipeForm>
    </div>

    <div>
      <h3>Ingrédients</h3>
      <RecipeIngredientsEditView
        v-model="recipe.ingredients"
        :recipe-uid="recipe.uid"
      />
    </div>
  </v-container>
</template>

<script>
import EditRecipeForm from "@/components/forms/EditRecipeForm";
import RecipeIngredientsEditView from "@/views/recipes/RecipeIngredientsEditView";
import RecipeInstrumentation from "@/instrumentation/recipes";

export default {
  components: {
    EditRecipeForm,
    RecipeIngredientsEditView,
  },
  data: () => ({
    recipe: null,
    originalRecipe: null,
  }),
  computed: {
    isRecipeModified() {
      return !new RecipeInstrumentation(this.recipe).isEqual(
        this.originalRecipe
      );
    },
  },
  mounted() {
    this.$store
      .dispatch("recipes/getByUID", this.$route.params.recipeUID)
      .then((recipe) => {
        this.recipe = recipe;
        this.originalRecipe = new RecipeInstrumentation(recipe).copy();
      });
  },
  methods: {
    updateRecipe() {
      this.$store
        .dispatch("recipes/update", {
          recipeUID: this.$route.params.recipeUID,
          recipe: this.recipe,
        })
        .then(() => {
          this.originalRecipe = new RecipeInstrumentation(this.recipe).copy();
        });
    },
  },
};
</script>
