<template>
  <v-container>
    <form @submit.prevent="submitGroupCreation()">
      <v-text-field label="Nom du groupe" v-model="group.name" required />
      <v-btn color="primary" type="submit">créer</v-btn>
    </form>
  </v-container>
</template>

<script>
import GroupInstrumentation from "@/instrumentation/groups";

export default {
  data: () => ({
    group: GroupInstrumentation.getDefault(),
  }),
  methods: {
    submitGroupCreation() {
      this.$store
        .dispatch("groups/create", { group: this.group })
        .then((createdGroup) => {
          this.$store.commit("groups/add", createdGroup);
          this.$store.commit("groups/setDefault", createdGroup);
          this.$router.push({ name: "shopping" });
        });
    },
  },
};
</script>