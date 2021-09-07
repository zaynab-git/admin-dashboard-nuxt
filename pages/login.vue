<template>
    <div 
      style="width: 40%; margin: auto; margin-top: 100px; "
      :dir="this.$i18n.localeProperties.dir">
        <form >
            <h1 >{{ $t('authentication.log-in.title') }}</h1>
            <v-text-field
                v-model="$v.username.$model"
                :error-messages="usernameErrors"
                :label="this.$t('authentication.log-in.username')"
                required
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
                v-on:keyup.enter="$refs.password.focus()"
                ></v-text-field>
            <v-text-field
                v-model="$v.password.$model"
                :error-messages="passwordErrors"
                :label="this.$t('authentication.log-in.password')"
                type="password"
                required
                ref="password"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                v-on:keyup.enter="$refs.submit.$el.focus()"
            ></v-text-field>
            <v-btn
                class="mr-4"
                @click="submit"
                ref="submit"
            >
                {{$t('authentication.log-in.submit')}}
            </v-btn>
        </form>
    </div>           
</template>

<script lang="ts">
  import { required, maxLength, minLength } from 'vuelidate/lib/validators'
  import { reactive  } from '@nuxtjs/composition-api'
  import vuelidate from '../components/composables/vuelidate'
  import { ValidationArgs, ValidationRule} from '@vuelidate/core'


  export default {

    setup () {

    const state = reactive({
      username: '',
      password: ''
    })

    let require = required() as ValidationRule

    const rules: ValidationArgs = {
      username: { require, maxLength: maxLength(10)},
      password: { require, minLength: minLength(6)},
    }
    
    const {$v, computeds, submit} = vuelidate(rules, state)

    const usernameErrors = computeds['username'] as object
    const passwordErrors = computeds['password'] as object

    return { usernameErrors, passwordErrors, $v, submit }
  },

  middleware({ redirect, app, store }) {
      if (store.getters.isLoggedIn) {
        let locale = (app.i18n.locale == 'en' ? '' : app.i18n.locale)
        return redirect('/' + locale)
      }
    }
  }
</script>