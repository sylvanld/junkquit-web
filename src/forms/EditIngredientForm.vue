<template>
  <v-form>
    <div class="inline-form">
      <SelectIngredient />
      <v-text-field
        label="Ingredient quantity"
        style="width: 5em"
        class="mx-4"
        density="comfortable"
        v-model="ingredient.quantity"
        @change="emitUpdate()"
      ></v-text-field>
      <v-select
        label="Rayon"
        class="mx-4"
        density="comfortable"
        :items="shelves"
        item-text="title"
        item-value="id"
        v-model="ingredient.shelve"
        @change="emitUpdate()"
      ></v-select>
    </div>
  </v-form>
</template>

<script>
import SelectIngredient from "@/components/SelectIngredient";
import SHELVES from "@/constants/shelves";

function newIngredient() {
  return {
    name: null,
    quantity: null,
    shelve: null,
  };
}

function parseQuantity(ingredientQuantity) {
  let quantity = null;
  let unit = null;

  console.log(ingredientQuantity, typeof ingredientQuantity);
  const qty = ingredientQuantity && ingredientQuantity.trim();
  if (qty) {
    const match = /(?<quantity>[\d.]+)\s*(?<unit>[a-zA-Z]+)?/.exec(qty);
    if (match) {
      quantity = parseFloat(match.groups.quantity);
      unit = match.groups.unit || null;
    }
  }

  return { quantity, unit };
}

export default {
  components: { SelectIngredient },
  data: () => ({
    shelves: SHELVES,
    ingredient: {
      name: null,
      quantity: null,
      shelve: null,
    },
  }),
  props: {
    value: {
      type: Object,
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.ingredient = newIngredient();
        this.ingredient.quantity = null;
        if (v.quantity) {
          this.ingredient.quantity = new String(v.quantity);
        }
        if (this.ingredient.quantity && v.unit) {
          this.ingredient.quantity += " " + v.unit;
        }
        this.ingredient.name = v.name;
        this.ingredient.shelve = v.shelve;
      },
    },
  },
  methods: {
    emitUpdate() {
      this.$emit("input", {
        name: this.ingredient.name,
        shelve: this.ingredient.shelve,
        ...parseQuantity(this.ingredient.quantity),
      });
    },
  },
};
</script>

<style scoped>
.inline-form {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 600px) {
  .inline-form {
    flex-direction: column;
  }
  .inline-form > * {
    width: 100% !important;
  }
}
</style>