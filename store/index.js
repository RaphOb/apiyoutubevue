export const state = () => ({
  counter: 0,
  token: '',
  id: 0
});

export const mutations = {
  increment(state) {
    state.counter++
  },

  setToken(state, token) {
    state.token = token;
  },

  setIdUser(state, id) {
    state.id = id;
  }
};

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  getToken(state) {
    return state.token
  },

  getIdUser(state) {
    return state.id
  }
};
