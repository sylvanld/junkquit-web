<template>
  <v-container>
    <h1>Livre de recettes</h1>

    <v-text-field
      prepend-icon="mdi-book-open-page-variant-outline"
      label="Chercher une recette"
    />

    <v-list three-line>
      <v-subheader>Recettes trouvées:</v-subheader>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Porc au caramel</v-list-item-title>
          <v-list-item-subtitle>
            Set the content filtering level to restrict appts that can be
            downloaded
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to="{ name: 'recipe-edit', params: { recipeUID: 'toto' } }">
        <v-list-item-content>
          <v-list-item-title>Content filtering</v-list-item-title>
          <v-list-item-subtitle>
            Set the content filtering level to restrict appts that can be
            downloaded
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Content filtering</v-list-item-title>
          <v-list-item-subtitle>
            Set the content filtering level to restrict appts that can be
            downloaded
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>
