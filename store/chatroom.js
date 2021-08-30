
export const state = () => ({

    receiver: '',
    receivers: [],

    messages: {},
    chatConnection: '',

});

export const getters = {
    messages: (state, getters, rootState, rootGetters) => {
      let sep_msgs = state.messages;
      let con_msgs = [];
      console.log(rootState)
      if (state.receiver in sep_msgs)  con_msgs = con_msgs.concat(sep_msgs[state.receiver]);
      if (rootState.user.userName in sep_msgs)   con_msgs = con_msgs.concat(sep_msgs[rootState.user.userName].filter(function(r) { return r.receiver == state.receiver }));

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

  set_websocket (state, payload) {
    state.chatConnection = payload
  },

  add_message (state, payload) {
    if (!(payload.sender in state.messages)){
      state.messages[payload.sender] = new Array();
      state.messages = {...state.messages}
    }
    state.messages[payload.sender].push({receiver: payload.receiver, sender: payload.sender, message: payload.message, id: payload.id});
},

  set_receiver(state, payload) {
    state.receiver = payload;
  },
  set_receivers(state, payload) {
    state.receivers = payload;
  }
};

export const actions = {
//
};
