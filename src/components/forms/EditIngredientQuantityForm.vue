<template>
  <v-list-item v-if="ingredientQuantity">
    <v-list-item-avatar v-if="!editing">
      <v-img :src="ingredientQuantity.ingredient.thumbnail_url"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-if="!editing">
        {{ ingredientQuantity.ingredient.name }}
      </v-list-item-title>
      <v-list-item-subtitle v-if="!editing">
        {{ ingredientQuantity.quantity }} {{ ingredientQuantity.unit }}
      </v-list-item-subtitle>
      <form action="" v-if="editing">
        <SelectIngredient v-model="ingredientQuantity.ingredient" />
        <div style="display: flex; align-items: center">
          <v-text-field
            style="flex: 1"
            label="Quantité"
            v-model="ingredientQuantity.quantity"
          />
          <SelectUnit style="flex: 1" v-model="ingredientQuantity.unit" />
          <v-btn color="secondary" text v-if="editing" @click="cancelEditing()">
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
          <v-btn color="green" text v-if="editing" @click="submitChanges()">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </div>
      </form>
    </v-list-item-content>
    <v-list-item-action v-if="!editing">
      <div style="display: flex">
        <v-btn color="red" text v-if="!editing" @click="submitDelete()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn color="primary" text v-if="!editing" @click="startEditing()">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import SelectIngredient from "@/components/inputs/SelectIngredient";
import SelectUnit from "@/components/inputs/SelectUnit";

function copyIngredientQuantity(ingredientQuantity) {
  return {
    quantity: ingredientQuantity.quantity,
    unit: ingredientQuantity.unit,
    ingredient: {
      uid: ingredientQuantity.ingredient.uid,
      name: ingredientQuantity.ingredient.name,
      thumbnail_url: ingredientQuantity.ingredient.thumbnail_url,
    },
  };
}

export default {
  components: { SelectIngredient, SelectUnit },
  data: () => ({
    editing: false,
    ingredientQuantity: null,
    initialIngredientQuantity: null,
  }),
  props: {
    value: Object,
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.ingredientQuantity = value;
        if (!value.ingredient.uid) {
          this.editing = true;
        }
      },
    },
  },
  methods: {
    startEditing() {
      this.editing = true;
      this.initialIngredientQuantity = copyIngredientQuantity(
        this.ingredientQuantity
      );
    },
    cancelEditing() {
      if (!this.ingredientQuantity.ingredient.uid) {
        this.submitDelete();
        return;
      }
      this.editing = false;
      this.ingredientQuantity = this.initialIngredientQuantity;
    },
    submitChanges() {
      if (!this.ingredientQuantity.ingredient.uid) {
        return;
      }
      this.editing = false;
      this.$emit("submit", this.ingredientQuantity);
    },
    submitDelete() {
      this.$emit("delete");
    },
  },
};
</script>
