import { createStore } from 'vuex';
import auth from './auth';
import info from './info';
import task from './task';
import stat from './stat';

export default createStore({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth,
    info,
    task,
    stat
  }
})
