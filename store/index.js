import axios from '@nuxtjs/axios'

export const state = () => ({
  status: '',
    // token: localStorage.getItem('token') || '',
    token: '',

    receiver: '',
    receivers: [],

    messages: {},
    chatConnection: '',

    user: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      userName: localStorage.getItem('userName') || '',
      userName: 'salam'
    },

    drawer: null,
});

export const getters = {
  isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    messages: state => {
      let sep_msgs = state.messages;
      let con_msgs = [];
      // Object.keys(sep_msgs).forEach(function(key) {
      //   con_msgs = con_msgs.concat(sep_msgs[key])
      // });
      if (state.receiver in sep_msgs)  con_msgs = con_msgs.concat(sep_msgs[state.receiver]);
      if (state.user.userName in sep_msgs)   con_msgs = con_msgs.concat(sep_msgs[state.user.userName].filter(function(r) { return r.receiver == state.receiver }));

      if (con_msgs.length != 0) {
        con_msgs.sort(function(a, b) {
          return a.id - b.id;
        });
      }
      return con_msgs;
    },
    receivers: state => {
      return state.receivers.filter(function(r) { return r != 'support' })
    }
};

export const mutations = {
  set_username (state, payload) {
    state.user.userName = payload
  },

  add_message (state, payload) {
    if (!(payload.sender in state.messages)){
      state.messages[payload.sender] = new Array();
      state.messages = {...state.messages}
    }
    state.messages[payload.sender].push({receiver: payload.receiver, sender: payload.sender, message: payload.message, id: payload.id});
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
    this.state.messages = {};
  },
  set_receiver(state, payload) {
    state.receiver = payload;
  }
};

export const actions = {
  GET_USER () {
    axios.get('http://127.0.0.1:4010/users/zeynab',
    {
      headers: {
        'Authorization': this.state.token
      }
    })
      .then(response => {
        this.commit('SET_USER', response.data)
      })
  },

  connect_to_websocket() {
    if (this.state.user.userName != '') {
      this.state.chatConnection = new WebSocket("ws://localhost:8080/" + this.state.user.userName)
      let that = this;
      this.state.chatConnection.onmessage = function(event) {

        if (JSON.parse(event.data).header == 'message') {
          that.commit('add_message',JSON.parse(event.data)['message']);
        }
        else if (JSON.parse(event.data).header == 'users') {
          that.state.receivers = JSON.parse(event.data).message;
        }
      }

      this.state.chatConnection.onopen = function() {
        console.log("Successfully connected to the echo websocket server...");
        if (that.state.user.userName != 'support') {
          that.commit('set_receiver','support')
        }
      }
    }
  },

  login({commit}, user){
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({url: 'http://127.0.0.1:4010/users', data: user, method: 'POST' })
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
      commit('SET_LANGUAGE',this.state.languages[0])
      localStorage.removeItem('token')
      localStorage.removeItem('language')
      resolve()
    })
  }

};
