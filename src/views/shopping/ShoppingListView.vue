<template>
  <v-container>
    <h1>Liste de courses</h1>
    <router-link :to="{ name: 'shopping-recipes' }">Recettes</router-link>

    <v-list v-for="(items, shelve) in itemsByShelve" :key="shelve">
      <v-subheader>{{ shelve }}</v-subheader>

      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
        variant="plain"
        two-line
        @click.capture.stop="taGueule(item)"
      >
        <v-list-item-action>
          <v-checkbox :input-value="item.checked"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{ item.ingredient.name }}</v-list-item-title>
          <v-list-item-subtitle
            >{{ item.quantity }} {{ item.unit }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    items: [],
  }),
  computed: {
    ...mapState("groups", ["selectedGroup"]),
    itemsByShelve() {
      console.log(this.items);

      const itemsByShelve = {};
      for (let item of this.items) {
        let shelveItems = itemsByShelve[item.ingredient.shelve];
        if (!shelveItems) {
          shelveItems = itemsByShelve[item.ingredient.shelve] = [];
        }
        shelveItems.push(item);
      }
      return itemsByShelve;
    },
  },
  watch: {
    selectedGroup: {
      immediate: true,
      async handler(group) {
        if (!group) return;

        const cart = await this.$store.dispatch("shopping/getCart", {
          groupUID: group.uid,
        });
        const items = cart.items;
        const ingredients = await this.$store.dispatch(
          "ingredients/getIngredients",
          { ingredientUIDs: items.map((item) => item.itemUID) }
        );

        const ingredientByUID = {};
        for (let ingredient of ingredients) {
          ingredientByUID[ingredient.uid] = ingredient;
        }

        for (let item of cart.items) {
          item.ingredient = ingredientByUID[item.itemUID];
          item.checked = false;
        }

        this.items = items;
      },
    },
  },
  methods: {
    taGueule(item) {
      item.checked = !item.checked;
    },
  },
};
</script>