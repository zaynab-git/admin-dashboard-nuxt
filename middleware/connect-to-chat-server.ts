import { Middleware } from '@nuxt/types'

const connectToChatServer: Middleware = ({ store }) => {
    if (store.getters.user.userName != '') {

            store.commit('chatroom/set_websocket',new WebSocket("ws://localhost:8080/" + store.getters["user"].userName))
            store.getters['chatroom/chatConnection'].onmessage = function(event: MessageEvent) {
                
              if (JSON.parse(event.data).header == 'message') {
                store.commit('chatroom/add_message',JSON.parse(event.data)['message']);
              }
              else if (JSON.parse(event.data).header == 'users') {
                store.commit('chatroom/set_receivers', JSON.parse(event.data).message);
              }
            }
        
            store.getters['chatroom/chatConnection'].onopen = function() {
              console.log(store.getters['chatroom/chatConnection']);
              if (store.getters.user.userName != 'support') {
                store.commit('chatroom/set_receiver','support')
              }
            }
          }
}

export default connectToChatServer