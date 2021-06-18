import axios from 'axios';
import router from '../router';

export default {
  state: {
    task: {},
    newLevel: null,
  },
  mutations: {
    setTask(state, task) {
      state.task = task;
    },
    clearTask(state) {
      state.task = {}
    },
    setNewLevel(state, level) {
      state.newLevel = level;
    },
    clearNewLevel(state) {
      state.newLevel = null
    }
  },
  actions: {
    async createTask({commit}, data) {
      try {
        const res = await axios({
          method: 'post',
          url: process.env.VUE_APP_BACKEND + `/api/lesson/${data.sub}/task`,
          headers: {'Content-Type': 'application/json'},
          data: JSON.stringify(data)
        });
        await commit('setTask', {...res.data.task})
      } catch (e) {
        localStorage.removeItem('token');
        router.push('/login');
        commit('setError', e.response.data.msg)
        throw e
      }
    },

    async addTaskDb({commit, dispatch}, data) {
        try {
          const res = await axios({
            method: 'post',
            url: process.env.VUE_APP_BACKEND + `/api/lesson/${data.sub}`,
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(data)
          });
          await commit('clearTask');
          await dispatch('fetchInfo');
          if(res.data.msg === 'new level') {
            commit('setNewLevel', res.data.level);
          }
        } catch (e) {
          localStorage.removeItem('token');
          router.push('/login');
            commit('setError', e.response.data.msg);
            throw e
        }
      }
  },
  getters: {
    getTask: s => s.task,
    getNewLevel: s => s.newLevel
  }
}