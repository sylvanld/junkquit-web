<template>
  <v-app-bar color="primary" dark fixed>
    <v-app-bar-nav-icon>
      <v-avatar tile small size="36">
        <img src="@/assets/junkquit.png" alt="John" />
      </v-avatar>
    </v-app-bar-nav-icon>

    <v-app-bar-title>
      <strong>JunkQuit</strong>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn v-if="selectedGroup" @click="isDialogVisible = true" small text>
      <v-icon>mdi-account-multiple</v-icon>
      {{ selectedGroup.name }}
    </v-btn>

    <v-dialog v-model="isDialogVisible" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Changer de groupe
        </v-card-title>

        <v-card-text>
          <p style="margin-top: 1em">
            Choisissez un groupe qui sera utilisé pour partager les listes de
            courses et le contenu de la cuisine.
          </p>
          <v-select
            label="Sélectionnez un groupe"
            :items="groups"
            item-text="name"
            v-model="groupSelection"
            return-object
          />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="secondary" text @click="navigateToGroupCreation()">
            nouveau groupe
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="updateSelectedGroup()">
            confirmer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    groupSelection: null,
    isDialogVisible: false,
  }),
  computed: {
    ...mapState("groups", ["selectedGroup", "groups"]),
  },
  watch: {
    selectedGroup: {
      immediate: true,
      handler(value) {
        this.groupSelection = value;
      },
    },
  },
  methods: {
    navigateToGroupCreation() {
      this.isDialogVisible = false;
      this.$router.push({ name: "group-create" });
    },
    updateSelectedGroup() {
      this.isDialogVisible = false;
      this.$store.commit("groups/setDefault", this.groupSelection);
    },
  },
};
</script>
