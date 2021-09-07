import { Middleware } from '@nuxt/types'

const authentication: Middleware = (context) => {
  if (!context.store.getters.isLoggedIn) {
    let locale = (context.app.i18n.locale == 'en' ? '' : context.app.i18n.locale)
    return context.redirect("/" + locale + '/login')
  }
}

export default authentication