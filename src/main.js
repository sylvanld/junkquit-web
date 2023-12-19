import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// function removeHash() {
//   history.pushState("", document.title, window.location.pathname + window.location.search);
// }

// function getHashFromURL() {
//   if (window.location.hash.length === 0) {
//     return null
//   }
//   return window.location.hash.slice(1);
// }

// function makeQueryString(data) {
//   const queryString = Object.keys(data).map(key => key + "=" + encodeURIComponent(data[key])).join("&");
//   return queryString.length > 0 ? "?" + queryString : "";
// }

// (function authenticate() {
//   if (!getHashFromURL()) {
//     const queryString = makeQueryString({
//       client_id: "junkquit",
//       response_type: "token",
//       scope: "recipes:read",
//       show_consent_dialog: "true",
//       redirect_uri: window.location.href
//     })
//     window.location.href = process.env.VUE_APP_OCTOAUTH_URL + "/authorize" + queryString;
//   } else {
//     removeHash()
//   }
// })()

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
