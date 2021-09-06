
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  status: '',
    token: window.localStorage.getItem('token') || '',
    user: {
      firstName: "" ,
      lastName: "",
      email: "",
      phoneNumber: "",
      userName: window.localStorage.getItem('userName') || '',
    },

    drawer: null as boolean|null,
});

export type RootState = ReturnType<typeof state>

export const getters : GetterTree<RootState, RootState> = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  user: state => state.user
};

export const mutations : MutationTree<RootState> = {

  set_username (state, payload) {
    state.user.userName = payload
  },

  SET_DRAWER (state, payload) {
    state.drawer = payload;
  },

  SET_USER (state, payload) {
    state.user.firstName = payload.first_name;
    state.user.lastName = payload.last_name;
    state.user.email = payload.email;
    state.user.phoneNumber = payload.phone_number;
  },
  auth_request(state){
    state.status = 'loading';
  },
  auth_success(state, token){
    state.status = 'success';
    state.token = token;
  },
  auth_error(state){
    state.status = 'error';
  },
  logout(state){
    state.status = '';
    state.token = '';
  },
};

export const actions : ActionTree<RootState, RootState> = {
  async GET_USER () {
    await this.$axios.$get('http://127.0.0.1:4010/users/'+ this.state.user.userName,
    {
      headers: {
        'Authorization': this.state.token
      }
    })
      .then(response => {
        this.commit('SET_USER', response)
      })
  },

  login({commit}, user){
    return new Promise((resolve, reject) => {
      commit('auth_request')
      this.$axios({url: 'http://127.0.0.1:4010/users', data: user, method: 'POST' })
      .then(resp => {
        // const token = resp.data.token
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw'
        localStorage.setItem('token', token)
        localStorage.setItem('userName', user.username)
        commit('auth_success', token)
        commit('set_username',user.username)
        resolve(resp)
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('token')
        reject(err)
      })
    })
  },

  logout({commit}){
    return new Promise((resolve) => {
      commit('logout')
      localStorage.removeItem('token')
      resolve(null)
    })
  }

};
