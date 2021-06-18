import axios from 'axios';

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({commit}) {
      try {
        const token = localStorage.getItem('token');
        const res = await axios({
          method: 'post',
          url: process.env.VUE_APP_BACKEND + '/api/user/info',
          headers: {'Content-Type': 'application/json'},
          data: JSON.stringify({ token })
        });
        await commit('setInfo', {...res.data.info})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    getInfo: s => s.info,
  }
}
