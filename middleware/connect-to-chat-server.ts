import { Middleware } from '@nuxt/types'

var msgpack = require('@msgpack/msgpack');

const connectToChatServer: Middleware = ({ store }) => {

    if (store.getters.user.userName != '') {

            store.commit('chatroom/set_websocket',new WebSocket("ws://localhost:8080/" + store.getters["user"].userName))
            store.getters['chatroom/chatConnection'].onmessage = async function(event: MessageEvent) {

              let msg = await msgpack.decodeAsync(event.data.stream())
                
              if (msg.header == 'message') {
                store.commit('chatroom/add_message',msg.message);
              }
              else if (msgpack.decode(event.data).header == 'users') {
                store.commit('chatroom/set_receivers', msg.message);
              }
            }
        
            store.getters['chatroom/chatConnection'].onopen = function() {
              if (store.getters.user.userName != 'support') {
                store.commit('chatroom/set_receiver','support')
              }
             }
          }
}

export default connectToChatServer