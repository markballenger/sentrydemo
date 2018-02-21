import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SentryDemo from '@/components/SentryDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/sentry-demo',
      name: 'SentryDemo',
      component: SentryDemo
    }
  ]
})
