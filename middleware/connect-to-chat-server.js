export default function ({ store }) {
  if (store.state.user.userName != '') {
    store.commit('set_websocket',new WebSocket("ws://localhost:8080/" + store.state.user.userName))
    store.state.chatConnection.onmessage = function(event) {

      if (JSON.parse(event.data).header == 'message') {
        store.commit('add_message',JSON.parse(event.data)['message']);
      }
      else if (JSON.parse(event.data).header == 'users') {
        store.commit('set_receivers', JSON.parse(event.data).message);
      }
    }

    store.state.chatConnection.onopen = function() {
      console.log("Successfully connected to the echo websocket server...");
      if (store.state.user.userName != 'support') {
        store.commit('set_receiver','support')
      }
    }
  }
}