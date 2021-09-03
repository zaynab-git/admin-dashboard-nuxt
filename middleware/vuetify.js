
export default function ({ app, $vuetify }) {
    $vuetify.lang.current = app.i18n.locale
    $vuetify.rtl = (app.i18n.localeProperties.dir == 'rtl' ? true : false)
  }