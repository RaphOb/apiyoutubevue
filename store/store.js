import Vuex from 'vuex'

export default new Vuex.Store({
  state: () => {
    return {   video: []}
  },
  mutations: {
    add (state, payload) {
      state.video = payload;
    }
  }
})
