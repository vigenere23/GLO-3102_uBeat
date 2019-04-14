import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null
  },

  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },
    clearUserId(state) {
      state.userId = null;
    }
  }
});
