<template>
  <v-container>
    <h1>Shopping Lists</h1>
    <v-list>
      <v-list-item
        :to="{
          name: 'shopping-list',
          params: { shoppingListId: 'ijfeiz' },
        }"
      >
        <v-list-item-title>Notifications</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-btn color="primary">salut</v-btn>
  </v-container>
</template>
