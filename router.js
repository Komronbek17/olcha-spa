import Router from 'vue-router'
import Vue from 'vue'
import { routes } from '~/router/routes'

Vue.use(Router)

export function createRouter () {
  return new Router({
    history: true,
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  })
}
