import Vue from 'vue';
import Vuelidate from 'vuelidate'

Vue.prototype.$Vuelidate = Vuelidate;
declare module 'vue/types/vue' {
  interface Vue {
    $Vuelidate: typeof Vuelidate;
  }
}