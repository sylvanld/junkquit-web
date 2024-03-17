<template>
  <v-combobox
    v-model="ingredient"
    item-text="name"
    :search-input.sync="searchQuery"
    :loading="loading"
    :items="items"
    hide-no-data
    label="Ingrédient"
    style="max-width: 300px"
    @change="notifyChange()"
  >
  </v-combobox>
</template>

<script>
export default {
  data: () => ({
    ingredient: null,
    loading: false,
    items: [],
    searchQuery: "",
  }),
  props: {
    value: Object,
  },
  watch: {
    value: {
      immediate: true,
      handler(ingredient) {
        if (!ingredient) {
          return;
        }

        this.ingredient = ingredient;
      },
    },
    searchQuery(query) {
      if (!query) return;
      this.searchIngredients(query);
    },
  },
  methods: {
    async searchIngredients(query) {
      this.items = await this.$store.dispatch('ingredients/searchIngredients', {name: query});
    },
    notifyChange() {
      this.$emit("input", this.ingredient);
    },
  },
};
</script>
