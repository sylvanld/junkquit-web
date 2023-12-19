<template>
  <v-select
    v-model="group"
    label="Groupe"
    prepend-icon="mdi-account-multiple"
    item-text="name"
    return-object
    :items="groups"
    @change="notifyGroupSelected()"
  ></v-select>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    group: null,
    groups: [
      {
        name: "Sylvan & Alix",
        members: [{ name: "Alix" }, { name: "Sylvan" }],
      },
      {
        name: "Vacances au Portugal",
        members: [
          { name: "Baptiste" },
          { name: "Kévin" },
          { name: "Lucas" },
          { name: "Sylvan" },
        ],
      },
      {
        name: "Vacances en Italie",
        members: [
          { name: "Baptiste H." },
          { name: "Baptiste P." },
          { name: "Kévin" },
          { name: "Lucas" },
          { name: "Sylvan" },
        ],
      },
    ],
  }),
  computed: {
    ...mapState("groups", ["selectedGroup"]),
  },
  watch: {
    selectedGroup: {
      handler(group) {
        this.group = group;
      },
    },
  },
  methods: {
    itemProps(item) {
      return {
        title: item.name,
      };
    },
    notifyGroupSelected() {
      this.$store.commit("groups/setSelectedGroup", this.group);
    },
  },
};
</script>