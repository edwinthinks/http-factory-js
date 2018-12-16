import HttpFactoryServer from './http-factory-server.js'
import context from 'jest-plugin-context';
const { JSDOM } = require('jsdom');

describe('HttpFactoryServer', () => {

  describe('REQUEST_EVENT_TYPE', () => {
    let subject = () => {
      return HttpFactoryServer.REQUEST_EVENT_TYPE;
    }

    test("that it returns http-factory-request", () => {
      expect(subject()).toBe('http-factory-request');
    })
  })

  describe('bindTo', () => {
    let subject = () => {
      return server.bindTo(element);
    }

    let server;
    let element;
    beforeEach(() => {
      server = new HttpFactoryServer;
      element = undefined;
    })

    context('when given an element', () => {
      let spy;

      beforeEach(() => {
        element = new JSDOM(``).window
        spy = jest.spyOn(element, 'addEventListener');
      })

      test('it will add event listener on the element', () => {
        subject()
        expect(spy).toHaveBeenCalledWith(
          HttpFactoryServer.REQUEST_EVENT_TYPE,
          server._handleRequestEvent
        );
      })
    })

    context('when not given an element', () => {
      let spy;

      beforeEach(() => {
        element = undefined;
        spy = jest.spyOn(document, 'addEventListener');
      })

      test('it will add event listener on the document', () => {
        subject()
        expect(spy).toHaveBeenCalledWith(
          HttpFactoryServer.REQUEST_EVENT_TYPE,
          server._handleRequestEvent
        );
      })
    })

  })
})

