<template>
  <div>
    <v-combobox
      v-model="value"
      item-text="name"
      :search-input.sync="searchQuery"
      :loading="loading"
      :items="items"
      class="mx-4"
      density="comfortable"
      hide-no-data
      label="Select an ingredient"
      style="max-width: 300px"
    >
    </v-combobox>
    {{ value }}
  </div>
</template>

<script>
export default {
  data: () => ({
    value: null,
    loading: false,
    items: [],
    searchQuery: "",
  }),
  watch: {
    searchQuery(query) {
      if (!query) return;
      this.searchIngredients(query);
    },
  },
  methods: {
    async searchIngredients(query) {
      const response = await fetch(
        "http://192.168.1.34:8032/ingredients?name=" + encodeURIComponent(query)
      );
      this.items = await response.json();
    },
  },
};
</script>