import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import _ from 'lodash'

Raven
    .config('https://d053eaee170e4233a057ef1e9221f890@sentry.io/291945', {
			release: (process.env.teamcitybuildnumber || '').toString()
    })
    .setTagsContext({ git_branch: process.env.git_branch })
    .setTagsContext(
			_.merge(window, {
				teamcitybuildnumber: process.env.teamcitybuildnumber
			}))
    .addPlugin(RavenVue, Vue)
    .install()

Raven.captureBreadcrumb({
      message: 'app startup',
      category: 'sentry-demo-category'
  })

Vue.use(Vuetify)

Raven.captureBreadcrumb({
  message: 'vuetify bootstrapped',
  category: 'sentry-demo-category'
})


Vue.config.productionTip = true

let bc = (msg) => {
  Raven.captureBreadcrumb({
    message: msg,
    category: 'vue-lifecycle'
})

}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  beforeCreate: () => bc('beforeCreate'),
  created: () => bc('created'),
  render: h => h(App)
})
