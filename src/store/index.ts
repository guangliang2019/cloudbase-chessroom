import { createStore } from 'vuex';
import { UserState } from './types';

export default createStore({
  state: {
    user: {
      userName: localStorage.getItem('userName'),
      token: localStorage.getItem('token'),
    },
    message: {
      roomId: undefined,
    },
  },
  mutations: {
    login(state, payload: UserState) {
      state.user.userName = payload.userName;
      state.user.token = payload.token;
      localStorage.setItem('userName', payload.userName);
      localStorage.setItem('token', payload.token);
    },
    logout(state) {
      state.user.userName = null;
      state.user.token = null;
      localStorage.removeItem('userName');
      localStorage.removeItem('token');
    },
    changeChatRoom(state, payload) {
      state.message.roomId = payload.roomId;
    },
  },
  actions: {},
  modules: {},
});
