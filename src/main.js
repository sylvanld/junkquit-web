import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false

store.dispatch("groups/load")
  .then((groups) => {
    if (groups.length === 0) {
      router.push({ name: 'group-create' })
    }
  })

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
