export default function ({ store }) {
  if (store.state.user.userName != '') {
    store.commit('chatroom/set_websocket',new WebSocket("ws://localhost:8080/" + store.state.user.userName))
    store.state.chatroom.chatConnection.onmessage = function(event) {

      console.log(event)

      if (JSON.parse(event.data).header == 'message') {
        store.commit('chatroom/add_message',JSON.parse(event.data)['message']);
      }
      else if (JSON.parse(event.data).header == 'users') {
        store.commit('chatroom/set_receivers', JSON.parse(event.data).message);
      }
    }

    store.state.chatroom.chatConnection.onopen = function() {
      console.log("Successfully connected to the echo websocket server...");
      if (store.state.user.userName != 'support') {
        store.commit('chatroom/set_receiver','support')
      }
    }
  }
}

// import { Middleware } from '@nuxt/types'

// const connectToChatServer: Middleware = ({ store }) => {
//   if (store.state.user.userName != '') {
//     store.commit('chatroom/set_websocket',new WebSocket("ws://localhost:8080/" + store.state.user.userName))
//     store.state.chatroom.chatConnection.onmessage = function(event) {

//       if (JSON.parse(event.data).header == 'message') {
//         store.commit('chatroom/add_message',JSON.parse(event.data)['message']);
//       }
//       else if (JSON.parse(event.data).header == 'users') {
//         store.commit('chatroom/set_receivers', JSON.parse(event.data).message);
//       }
//     }

//     store.state.chatroom.chatConnection.onopen = function() {
//       console.log("Successfully connected to the echo websocket server...");
//       if (store.state.user.userName != 'support') {
//         store.commit('chatroom/set_receiver','support')
//       }
//     }
//   }
// }

// export default connectToChatServer