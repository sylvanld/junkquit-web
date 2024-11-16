<template>
  <v-container style="position: relative">
    <h1>Liste de courses</h1>

    <router-link :to="{ name: 'shopping-recipes' }">
      Modifier les recettes
    </router-link>

    <div
      style="
        position: fixed;
        left: 1em;
        right: 1em;
        bottom: 56px;
        background: white;
        z-index: 999;
        padding: 1em;
      "
    >
      <v-progress-linear
        v-if="countProgress < 100"
        color="primary"
        :value="countProgress"
        height="22"
      >
        <strong>{{ Math.ceil(countProgress) }} %</strong>
      </v-progress-linear>

      <v-btn
        v-if="items.length > 0"
        @click="emptyShoppingCart()"
        color="accent"
        style="display: block; margin-left: auto"
      >
        terminer les courses
      </v-btn>
    </div>

    <p style="padding: 2em 1em" v-if="items.length === 0">
      Aucun ingrédient dans la liste... Ajoutez des recettes à la liste de
      course pour continuer !
    </p>

    <v-list v-for="shelve in itemsByShelve" :key="shelve.name">
      <v-list-group :value="!shelve.checked" :prepend-icon="shelve.icon">
        <v-divider></v-divider>
        <template v-slot:activator>
          <v-list-item-title :style="computeItemStyle(shelve)">
            <strong>
              {{ shelve.name }}
            </strong>
          </v-list-item-title>
        </template>

        <v-list-item
          v-for="(item, i) in shelve.items"
          :key="i"
          :value="item"
          color="primary"
          variant="plain"
          two-line
          @click.capture.stop="toggleItemCheck(item)"
        >
          <v-list-item-content style="padding-left: 2em">
            <v-list-item-title :style="computeItemStyle(item)">
              {{ item.ingredient.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.remainingQuantity }} {{ item.unit }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-checkbox :input-value="item.checked"></v-checkbox>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import SHELVES from "@/constants/shelves";

export default {
  data: () => ({
    items: [],
    shelves: SHELVES,
  }),
  computed: {
    ...mapState("groups", ["selectedGroup"]),
    itemsByShelve() {
      const itemsByShelve = {};
      for (let item of this.items) {
        let shelveItems = itemsByShelve[item.ingredient.shelve];
        if (!shelveItems) {
          shelveItems = itemsByShelve[item.ingredient.shelve] = [];
        }
        shelveItems.push(item);
      }
      const shelves = [];
      let counter = 0;
      for (let shelve of Object.keys(itemsByShelve)) {
        counter = 0;
        for (let item of itemsByShelve[shelve]) {
          if (!item.checked) {
            counter++;
          }
        }
        shelves.push({
          id: shelve,
          name: SHELVES[shelve].title,
          icon: SHELVES[shelve].icon,
          items: itemsByShelve[shelve],
          checked: counter === 0,
        });
      }
      return shelves;
    },
    countProgress() {
      let checkedCount = 0;
      let totalCount = 0;
      for (let item of this.items) {
        if (item.checked) {
          checkedCount++;
        }
        totalCount++;
      }
      return (100 * checkedCount) / totalCount;
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
        }

        this.items = items;
      },
    },
  },
  methods: {
    async toggleItemCheck(item) {
      if (item.checked) {
        await this.$store.dispatch("shopping/removeItemFromCart", {
          groupUID: this.selectedGroup.uid,
          cartItemUID: item.cartItemUID,
        });
      } else {
        const cartItem = await this.$store.dispatch("shopping/addItemToCart", {
          groupUID: this.selectedGroup.uid,
          itemUID: item.itemUID,
          quantity: item.remainingQuantity,
          unit: item.unit,
        });
        console.log("Updating cartItemUID", cartItem.cartItemUID);
        item.cartItemUID = cartItem.cartItemUID;
      }
      item.checked = !item.checked;
    },
    computeItemStyle(item) {
      const style = {};
      if (item.checked) {
        style.textDecoration = "line-through";
      }
      return style;
    },
    async emptyShoppingCart() {
      await this.$store.dispatch("shopping/emptyCart", {
        groupUID: this.selectedGroup.uid,
      });
      this.items = [];
    },
  },
};
</script>