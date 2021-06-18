import axios from 'axios';
import router from '../router';

export default {
  state: {
    stat: {},
  },
  mutations: {
    setStat(state, stat) {
      state.stat = stat;
    },
    clearStat(state) {
      state.stat = {}
    },
  },
  actions: {
    async getStatDb({commit}, data) {
        try {
            const res = await axios({
                method: 'post',
                url: process.env.VUE_APP_BACKEND + '/api/stat',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(data)
            });
            await commit('setStat', res.data.msg);
        } catch (e) {
            localStorage.removeItem('token');
            router.push('/login');
            commit('setError', e.response.data.msg);
            throw e
        }
    },
    async getStatTotalDb({commit}) {
      try {
        const token = localStorage.getItem('token');
        const res = await axios({
            method: 'post',
            url: process.env.VUE_APP_BACKEND + '/api/stat/all',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({ token })
        });
        return res.data.msg;
      } catch (e) {
        localStorage.removeItem('token');
        router.push('/login');
        commit('setError', e.response.data.msg);
        throw e
      }
  },
  },
  getters: {
    getStat: s => s.stat,
  }
}