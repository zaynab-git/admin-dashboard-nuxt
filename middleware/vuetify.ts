import { Middleware } from '@nuxt/types'

const vuetify: Middleware = ({ app, $vuetify }) => {
  $vuetify.lang.current = app.i18n.locale
  $vuetify.rtl = (app.i18n.localeProperties.dir == 'rtl' ? true : false)
}

export default vuetify