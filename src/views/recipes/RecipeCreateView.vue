<template>
  <v-container>
    <EditRecipeForm v-model="recipe" @submit="createRecipe()">
      <template v-slot:actions>
        <v-btn color="primary" type="submit" fab>
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </template>
    </EditRecipeForm>
  </v-container>
</template>

<script>
import EditRecipeForm from "@/components/forms/EditRecipeForm";

function createDefaultRecipe() {
  return {
    name: "",
    thumbnail_url: null,
    diners: null,
    is_public: true,
    duration_minutes: null,
  };
}

export default {
  data: () => ({
    recipe: createDefaultRecipe(),
  }),
  components: { EditRecipeForm },
  methods: {
    createRecipe() {
      this.$store
        .dispatch("recipes/create", this.recipe)
        .then((createdRecipe) => {
          this.$router.push({
            name: "recipe-edit",
            params: { recipeUID: createdRecipe.uid },
          });
        });
    },
  },
};
</script>
