import HttpFactoryServer from './http-factory-server.js'

describe('HttpFactoryServer', () => {
  let httpFactoryServer = new HttpFactoryServer

  describe('zero()', () => {
    let subject = () => {
      return httpFactoryServer.zero()
    }

    test('that it equals 0', () => {
      expect(subject()).toBe(0)
    })
  })
})

