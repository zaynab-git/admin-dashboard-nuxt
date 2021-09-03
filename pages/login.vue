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

<script>
  import { required, maxLength, minLength } from 'vuelidate/lib/validators'
  import { computed, reactive, useStore, useRouter, useContext  } from '@nuxtjs/composition-api'
  import useVuelidate from '@vuelidate/core'


  export default {

    setup () {

    const state = reactive({
      username: '',
      password: ''
    })

    const rules = {
      username: { required, maxLength: maxLength(10), $autoDirty: true},
      password: { required, minLength: minLength(6), $autoDirty: true},
    }

    const $v = useVuelidate(rules, state)

    const usernameErrors = computed( () => {
        const errors = []
        if ($v.value.username.maxLength.$invalid) {
          errors.push("this.$t('authentication.log-in.errors.max-10-char')")
        }
        if ($v.value.username.required.$invalid && $v.value.username.$dirty) {
          errors.push("this.$t('authentication.log-in.errors.required-username')")
        }
        return errors
    })

    const passwordErrors = computed( () => {
        const errors = []
        if ($v.value.password.minLength.$invalid) {
          errors.push("this.$t('authentication.log-in.errors.max-10-char')")
        }
        if ($v.value.password.required.$invalid && $v.value.password.$dirty) {
          errors.push("this.$t('authentication.log-in.errors.required-username')")
        }
        return errors
    })

    const store = useStore();
    const { $axios, app } = useContext();
    const router = useRouter();

    const submit = () => {
      $v.value.$touch()
      if ($v.value.$invalid) {
        return
      } else {
      let user = {username: $v.value.username.$model, password: $v.value.username.$model}
      return new Promise((resolve, reject) => {
        store.commit('auth_request')
        $axios({url: 'http://127.0.0.1:4010/users', data: user, method: 'POST' })
        .then(resp => {
          const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw'
          localStorage.setItem('token', token)
          localStorage.setItem('userName', user.username)
          store.commit('auth_success', token)
          store.commit('set_username',user.username)
          router.push({path: app.localePath('/')});
          resolve(resp)
        })
        .catch(err => {
          store.commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
      }
    }
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