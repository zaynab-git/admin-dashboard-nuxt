import { setupTest } from '@nuxt/test-utils'
import setting from '../pages/setting'


describe('My test', () => {
  setupTest({
    // test context options
  })

  it('has setup', () => {
    expect(typeof setting.setup).toBe('function')
  })
})