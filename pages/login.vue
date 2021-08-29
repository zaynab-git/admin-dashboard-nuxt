<template>
    <div 
      style="width: 40%; margin: auto; margin-top: 100px; ">
        <v-form >
            <h1>{{ $t('authentication.log-in.title') }}</h1>
            <v-text-field
                v-model="username"
                :error-messages="usernameErrors"
                :label="this.$t('authentication.log-in.username')"
                required
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
                v-on:keyup.enter="$refs.password.focus()"
                ></v-text-field>
            <v-text-field
                v-model="password"
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
                v-on:keyup.enter="submit"
                ref="submit"
            >
                {{$t('authentication.log-in.submit')}}
            </v-btn>
        </v-form>
    </div>           
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, minLength  } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      username: { required, maxLength: maxLength(10) },
      password: { required, minLength: minLength(6) },
    },

    data: () => ({
      username: '',
      password: '',
    }),

    computed: {
      usernameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.maxLength && errors.push(this.$t('authentication.log-in.errors.max-10-char'))
        !this.$v.username.required && errors.push(this.$t('authentication.log-in.errors.required-username'))
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push(this.$t('authentication.log-in.errors.min-6-char'))
        !this.$v.password.required && errors.push(this.$t('authentication.log-in.errors.required-password'))
        return errors
      },
    },

    methods: {
      submit(){
        let user = {username: this.username, password: this.password}
        let that = this
      return new Promise((resolve, reject) => {
        that.$store.commit('auth_request')
        this.$axios({url: 'http://127.0.0.1:4010/users', data: user, method: 'POST' })
        .then(resp => {
          const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw'
          localStorage.setItem('token', token)
          localStorage.setItem('userName', user.username)
          that.$store.commit('auth_success', token)
          that.$store.commit('set_username',user.username)
          that.$router.push({path: that.localePath('/')});
          resolve(resp)
        })
        .catch(err => {
          that.$store.commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    },
    mounted() {
        this.$vuetify.rtl = (this.$i18n.localeProperties.dir == 'rtl' ? true : false)
    }
  }
</script>