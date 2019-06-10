import Vuex from 'vuex'

export default new Vuex.Store({
  state: () => {
    return { counter: 0 }
  },
  mutations: {
    increment(state) {
      state.counter++
    }
  }
})
