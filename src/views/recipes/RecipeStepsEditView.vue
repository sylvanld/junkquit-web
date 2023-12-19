<template>
  <div>
    <v-list>
      <draggable v-model="recipeSteps" handle=".handle">
        <v-list-item v-for="recipeStep in recipeSteps" :key="recipeStep">
          <v-list-item-avatar class="handle">
            <v-icon>mdi-swap-vertical</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-textarea
              label="description"
              rows="2"
              v-if="recipeStep.editing"
              v-model="recipeStep.description"
            />
            <p v-else>{{ recipeStep.description }}</p>
          </v-list-item-content>
          <v-list-item-action>
            <div style="display: flex" v-if="recipeStep.editing">
              <v-btn
                color="green"
                fab
                text
                @click="updateRecipeStep(recipeStep)"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </div>
            <div style="display: flex" v-else>
              <v-btn color="red" fab text>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn
                color="primary"
                fab
                text
                @click="startEditingRecipeStep(recipeStep)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
          </v-list-item-action>
        </v-list-item>
      </draggable>
    </v-list>
    <v-btn text color="primary" @click="addEmptyRecipeStep()">+ Ajouter</v-btn>
  </div>
</template>

<script>
import draggable from "vuedraggable";

function makeDefaultRecipeStep() {
  return {
    editing: true,
    description: "Couper les oignons",
  };
}

export default {
  components: { draggable },
  data: () => ({
    recipeSteps: [],
  }),
  methods: {
    addEmptyRecipeStep() {
      this.recipeSteps.push(makeDefaultRecipeStep());
    },
    startEditingRecipeStep(recipeStep) {
      recipeStep.editing = true;
    },
    updateRecipeStep(recipeStep) {
      recipeStep.editing = false;
    },
  },
};
</script>