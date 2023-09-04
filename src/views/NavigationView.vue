<template>
  <nav>
    <h1 style="display: inline-block; margin-right: 1em">JunkQuit</h1>

    <router-link :to="{ name: 'recipes' }">Recipes</router-link>
    |
    <router-link
      :to="{ name: 'shopping-list', params: { shoppingListId: 'toto' } }"
    >
      Shopping
    </router-link>
  </nav>
</template>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
