// ~/plugins/localStorage.js

import createPersistedState from 'vuex-persistedstate'
import * as Cookie from 'js-cookie'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
      paths: ['token', 'id'],
      getState: (key) => Cookie.getJSON(key),
      setState: (key, state) => Cookie.set(key, state, { expires: 1, secure: false })
    })(store)
  })
}
