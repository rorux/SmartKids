import axios from 'axios';
import router from '../router';

export default {
    mutations: {

    },
    actions: {
        async login({commit}, data) {
          try {
            const res = await axios({
                method: 'post',
                url: process.env.VUE_APP_BACKEND + '/api/login',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(data)
              });
            const token = await res.data.token;
            localStorage.setItem('token', token);
          } catch (e) {
            localStorage.removeItem('token');
            commit('setError', e.response.data.msg);
            throw e;
          }
        },

        async register({commit}, data) {
          try {
              await axios({
                method: 'post',
                url: process.env.VUE_APP_BACKEND + '/api/register',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(data)
              });
          } catch (e) {
            commit('setError', e.response.data.msg);
            throw e;
          }
        },

        async checkToken({commit}, data) {
          try {
              await axios({
                method: 'post',
                url: process.env.VUE_APP_BACKEND + '/api/check-token',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(data)
              });
          } catch (e) {
            localStorage.removeItem('token');
            router.push('/login');
            commit('setError', e.response.data.msg);
          }
        },

        async logout({commit}) {
          commit('clearInfo')
          localStorage.removeItem('token');
        }
    }
}