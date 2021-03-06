import {useVuelidate, ValidationArgs} from '@vuelidate/core'
import { computed, useStore, useRouter, useContext  } from '@nuxtjs/composition-api'


export default function vuelidate(rules: ValidationArgs, state: object) {
    
    const $v = useVuelidate(rules, state)
    const { app } = useContext();
    const computeds : { [key: string]: object; } = {}
    // const computeds = {}

    computeds['username'] = (
        computed( () => {
          const errors = []
          if ($v.value.username.$error) {
            if ($v.value.username.$errors[0].$validator == "maxLength") {
              errors.push(app.i18n.t('authentication.log-in.errors.max-10-char'))
            }
            if ($v.value.username.$errors[0].$validator == "required") {
              errors.push(app.i18n.t('authentication.log-in.errors.required-username'))
            }
          }
            return errors
        })
    )

    computeds['password'] = (
        computed( () => {
            const errors = []
            if ($v.value.password.$error) {
              if ($v.value.password.$errors[0].$validator == "minLength") {
                errors.push(app.i18n.t('authentication.log-in.errors.min-6-char'))
              }
              if ($v.value.password.$errors[0].$validator == "required") {
                errors.push(app.i18n.t('authentication.log-in.errors.required-password'))
              }
            }
            return errors
        })
    )

    const store = useStore();
    const { $axios } = useContext();
    const router = useRouter();

    const submit = () => {
      $v.value.$touch()
      if ($v.value.$invalid) {
        return
      } else {
      let user = {username: $v.value.username.$model as string, password: $v.value.username.$model as string}
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

    return {
        $v,
        computeds,
        submit
    }
  }