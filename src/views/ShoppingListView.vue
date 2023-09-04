<template>
  <v-container style="position: relative">
    <h2>Shopping List</h2>

    <v-list>
      <v-list-group
        v-for="item in items"
        v-model="item.active"
        :prepend-icon="item.action"
        :key="item.title"
        no-action
        color="secondary"
      >
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon></v-list-item-icon
          >
          <v-list-item-content>
            <v-list-item-title color="primary"
              ><strong>{{ item.title }}</strong></v-list-item-title
            >
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-action-text>{{
              item.nb_items
            }}</v-list-item-action-text>
          </v-list-item-action>
        </template>

        <v-list-item-group multiple>
          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            @click="toggleItem(child)"
          >
            <template>
              <v-list-item-action>
                <v-checkbox :input-value="child.active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ child.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ child.quantity }}
                  {{ child.unit }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>
    </v-list>

    <div style="position: absolute; right: 1em">
      <v-btn
        v-if="!editing"
        @click="editing = true"
        color="secondary"
        fab
        small
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn
        v-if="editing"
        @click="editing = false"
        color="red"
        fab
        small
        style="margin-right: 1em"
      >
        <v-icon>mdi-close-thick</v-icon>
      </v-btn>

      <v-btn
        v-if="editing"
        @click="addIngredientQuantity()"
        color="primary"
        fab
        small
      >
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </div>

    <div v-if="editing">
      <h2>Add ingredient</h2>
      <EditIngredientForm v-model="editedIngredient" />
    </div>
  </v-container>
</template>

<script>
import EditIngredientForm from "@/forms/EditIngredientForm";

import { mapGetters } from "vuex";

function newIngredient() {
  return {
    name: null,
    quantity: null,
    unit: null,
    shelve: null,
  };
}

export default {
  components: { EditIngredientForm },
  data: () => ({
    editing: false,
    editedIngredient: newIngredient(),
  }),
  computed: {
    ...mapGetters("shoppingList", ["items"]),
  },
  methods: {
    toggleItem(child) {
      this.$store.commit("shoppingList/toggleItem", child.uid);
    },
    addIngredientQuantity() {
      const ingredient = Object.assign({}, this.editedIngredient);
      this.$store.commit("shoppingList/addIngredient", ingredient);
      this.resetIngredient();
    },
    resetIngredient() {
      this.editedIngredient = newIngredient();
    },
  },
};
</script>