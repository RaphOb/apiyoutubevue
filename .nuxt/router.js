import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _d6da8060 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _0cd357ed = () => interopDefault(import('..\\pages\\myvideos.vue' /* webpackChunkName: "pages_myvideos" */))
const _93e23b60 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _5fb0870c = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages_register" */))
const _1054f6ef = () => interopDefault(import('..\\pages\\users.vue' /* webpackChunkName: "pages_users" */))
const _2485a0c8 = () => interopDefault(import('..\\pages\\video\\_id.vue' /* webpackChunkName: "pages_video__id" */))
const _6a29c68e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/login",
      component: _d6da8060,
      name: "login"
    }, {
      path: "/myvideos",
      component: _0cd357ed,
      name: "myvideos"
    }, {
      path: "/profile",
      component: _93e23b60,
      name: "profile"
    }, {
      path: "/register",
      component: _5fb0870c,
      name: "register"
    }, {
      path: "/users",
      component: _1054f6ef,
      name: "users"
    }, {
      path: "/video/:id?",
      component: _2485a0c8,
      name: "video-id"
    }, {
      path: "/",
      component: _6a29c68e,
      name: "index"
    }],

    fallback: false
  })
}
