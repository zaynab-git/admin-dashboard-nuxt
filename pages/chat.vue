<template >
  <div >
    <v-row class="mx-3 mt-3">
      <v-col>
                <v-card style=" width: 100%;">
                    <v-card-title>{{ $t("chatroom.title") }} {{ this.$store.state.receiver }}</v-card-title>
                    <v-divider></v-divider>
                    <v-list class="mx-3" height="400px"  style="overflow-y: scroll;" v-chat-scroll>
                      <v-list-item
                      v-for="msg in this.$store.getters['chatroom/messages']"
                      :key="msg.id"
                      >
                      <v-list-item-content>
                        {{ msg.sender }} - {{ msg.message }}
                      </v-list-item-content>
                    </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                  <v-card-actions>
                      <input
                        type="text"
                        v-model="message"
                        class="pa-3"
                        style=" width: 100%;"
                        :placeholder="this.$t('chatroom.placeholder')"
                        @keyup.enter="sendMessage"
                      >
                      <v-btn @click="sendMessage" class="ml-3">
                        {{ $t('chatroom.send') }}
                      </v-btn>
                  </v-card-actions>
                </v-card>
      </v-col>
      <v-col v-if="this.$store.state.user.userName == 'support'" cols="3">
          <v-card style=" width: 100%;">
              <v-card-title>{{ $t("chatroom.users") }}</v-card-title>
              <v-divider></v-divider>
                    <v-list class="mx-3" height="465px"  style="overflow-y: scroll;" v-chat-scroll>
                      <v-list-item
                      v-for="receiver in this.$store.getters['chatroom/receivers']"
                      :key="receiver"
                      >
                      <v-list-item-content >
                        <v-btn text @click="setReceiver(receiver)" class="pa-1">
                        {{ receiver }}
                      </v-btn>
                      </v-list-item-content>
                    </v-list-item>
                    </v-list>
          </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { ref, useStore, useContext } from '@nuxtjs/composition-api'
import {Message} from "../types/chatroom"

export default { 
  middleware: ['connect-to-chat-server'],
  layout: 'Base',
  name: 'Chat',
  
  setup () {
    var msgpack = require('@msgpack/msgpack');
    const message = ref('');
    const store = useStore();

    const sendMessage = (e: Event) => {
      e.preventDefault();
      if (message.value == '') return;
      let msg: Message = {receiver: store.getters["chatroom/receiver"] ,sender: store.getters.user.userName, message: message.value, id: Date.now()}
      store.getters["chatroom/chatConnection"].send(msgpack.encode(msg));
      message.value = '';
    }

    const setReceiver = (r: string) => {
      store.commit('chatroom/set_receiver',r)
    }


    return {
      message,
      sendMessage,
      setReceiver
    }
  },

}
</script>


