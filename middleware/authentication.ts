import { Middleware } from '@nuxt/types'

const authentication: Middleware = (context) => {
  if (!context.store.getters.isLoggedIn) {
    return context.redirect('login')
  }
}

export default authentication