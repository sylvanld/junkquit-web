<template>
  <form @submit.prevent="onSubmit()">
    <v-text-field
      @change="notifyChange()"
      label="Nom de la recette"
      prepend-icon="mdi-label"
      v-model="recipe.name"
      required
    />

    <v-text-field
      @change="notifyChange()"
      v-model="recipe.thumbnail_url"
      prepend-icon="mdi-image"
      hide-details
      label="URL de l'image"
    />

    <v-text-field
      @change="notifyChange()"
      v-model="recipe.duration_minutes"
      prepend-icon="mdi-clock"
      hide-details
      label="Durée de préparation (minutes)"
      type="number"
      required
    />

    <v-text-field
      @change="notifyChange()"
      v-model="recipe.diners"
      hide-details
      prepend-icon="mdi-account-multiple"
      label="Nombre de convives"
      type="number"
      required
    />

    <v-text-field
      @change="notifyChange()"
      v-model="recipe.price"
      hide-details
      prepend-icon="mdi-bitcoin"
      label="Prix pour ce nombre de convives"
      type="number"
      step="0.01"
      required
    />

    <v-switch
      @change="notifyChange()"
      label="Partager avec les autres utilisateurs"
      v-model="recipe.is_public"
    ></v-switch>

    <div style="display: flex; justify-content: flex-end">
      <slot name="actions"> actions </slot>
    </div>
  </form>
</template>

<script>
export default {
  data: () => ({
    recipe: null,
  }),
  props: {
    value: Object,
  },
  watch: {
    value: {
      immediate: true,
      handler(recipeValue) {
        this.recipe = recipeValue;
      },
    },
  },
  methods: {
    notifyChange() {
      this.$emit("input", this.recipe);
    },
    onSubmit() {
      this.$emit("submit", this.recipe);
    },
  },
};
</script>
