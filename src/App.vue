<template>
  <v-app id="app">
    <v-main>
      <NavigationView />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavigationView from "@/views/NavigationView";

export default {
  components: { NavigationView },
};
</script>
