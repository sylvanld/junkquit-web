<template>
  <v-select
    label="Unité"
    v-model="unit"
    item-text="name"
    item-value="value"
    :items="items"
    @change="notifyChange()"
  ></v-select>
</template>

<script>
import UNITS from "@/constants/units";

export default {
  data: () => ({
    unit: "",
    items: UNITS,
  }),
  props: {
    value: String,
  },
  watch: {
    value: {
      immediate: true,
      handler(unit) {
        if (!unit) {
          return;
        }
        this.unit = unit;
      },
    },
  },
  methods: {
    notifyChange() {
      this.$emit("input", this.unit);
    },
  },
};
</script>
