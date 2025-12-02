import AuthService from '../services/auth.service';
import { AuthModel } from "@/models/auth.model";
import { AxiosError } from "axios";

const user = JSON.parse(localStorage.getItem('auth')) as AuthModel;

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit, dispatch }, data) {
      return AuthService.login(data).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          dispatch("displayError", {text: (error as AxiosError)?.response?.data['msg']}, {root:true});
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    refreshToken({ commit }, user : AuthModel) {
      commit('refreshToken', user);
    },
    updateDisplayName({ commit }, displayName: string) {
      commit('UPDATE_USER_INFO', { displayName });
    }
  },
  mutations: {
    loginSuccess(state, user : AuthModel) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    refreshToken(state, user: AuthModel) {
      state.status.loggedIn = true;
      state.user = user;
    },
    UPDATE_USER_INFO(state, { displayName }) {
      if (state.user) {
        state.user.userName = displayName;
        try {
          const authData = JSON.parse(localStorage.getItem('auth') || '{}') as AuthModel;
          authData.userName = displayName;
          localStorage.setItem('auth', JSON.stringify(authData));
        } catch (error) {
          console.error('Failed to update display name in localStorage:', error);
        }
      }
    }
  }
};
