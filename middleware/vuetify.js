
export default function ({ app }) {
    app.vuetify.lang.current = app.i18n.locale
    app.vuetify.rtl = (app.i18n.localeProperties.dir == 'rtl' ? true : false)
  }