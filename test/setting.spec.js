import setting from '../pages/setting'
// import helpers from '../utils/GeneralHelpers'

export const addVuetify = (context) => {
  context.vuetify = require('vuetify')
  context.vue.use(context.vuetify)
  context.vuetifyInstance = new context.vuetify()
}

export const addVuex = (context) => {
  context.vuex = require('vuex')
  context.vue.use(context.vuex)
}


export const addI18n = (options) => {
  return (context) => {
    context.i18n = require('nuxt-i18n')
    context.vue.use(context.i18n)
    context.i18nInstance = new context.i18n(options)
  }
}

export const addFilter = (name, lambda) => {
  return context => context.vue.filter(name, lambda)
}

export const compositeConfiguration = (...configs) => {
  return context => configs.forEach(config => config(context))
}

export const bootstrapVueContext = (configureContext) => {
  const context = {}
  const teardownVueContext = () => {
    jest.unmock('vue')
    Object.keys(context).forEach(key => delete context[key])
    jest.resetModules()
  }

  jest.isolateModules(() => {
    context.vueTestUtils = require('@vue/test-utils')
    context.vue = context.vueTestUtils.createLocalVue()

    jest.doMock('vue', () => context.vue)

    configureContext && configureContext(context)
  })

  return {
    teardownVueContext,
    ...context
  }
}

describe('Logo', () => {
  let vueContext = null

  beforeEach(() => {
    vueContext = bootstrapVueContext(
      compositeConfiguration(addI18n, addVuex, addVuetify)
    )
  })

  afterEach(() => {
    vueContext.teardownVueContext()
  })

  test('Test Logo Component', () => {
    const wrapper = vueContext.vueTestUtils.shallowMount(setting, {
      localVue: vueContext.vue,
      vuetify: vueContext.vuetifyInstance,
      mocks: {
        $t: (msg) => msg
      }
    })
    expect(wrapper.get('[data-test="language"]').exists()).toBe(true)
  })
})