<template>
  <v-app id="app">
    <AppBarView />
    <v-main style="padding-top: 3em; padding-bottom: 15em">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <BottomNavigationView />
  </v-app>
</template>

<script>
import AppBarView from "@/views/layout/AppBarView";
import BottomNavigationView from "@/views/layout/BottomNavigationView";

export default {
  components: { AppBarView, BottomNavigationView },
};
</script>
