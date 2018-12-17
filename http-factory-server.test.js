import HttpFactoryServer from './http-factory-server.js'
import context from 'jest-plugin-context';
const { JSDOM } = require('jsdom');

describe('HttpFactoryServer', () => {

  describe('REQUEST_EVENT_TYPE', () => {
    let subject = () => {
      return HttpFactoryServer.REQUEST_EVENT_TYPE;
    };

    test("that it returns http-factory-request", () => {
      expect(subject()).toBe('http-factory-request');
    })
  })

  describe('baseURL', () => {
    let subject = () => {
      return server.baseURL;
    };

    let baseURL = 'http://localhost:3000/';
    let server = new HttpFactoryServer(baseURL);

    test('it should return the baseURL', () => {
      expect(subject()).toBe(baseURL);
    })
  })

  describe('buildRequest', () => {
    let subject = () => {
      server.buildRequest(requestDetails).then(() => {});
    };

    let server;
    let baseURL = 'http://fake-api-server.com/';
    let serverOpts = {
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    }

    let requestDetails;
    beforeEach(() => {
      server = new HttpFactoryServer(baseURL, serverOpts);
      requestDetails = {
        path: 'fake-endpoint',
        method: undefined
      };
      fetch.mockResponseOnce(JSON.stringify({}));
    })

    context('when the request details a GET', () => {
      beforeEach(() => {
        requestDetails.method = 'GET';
        requestDetails.queryParams = { foo: 'bar' };
        subject();
      })

      test('it should return a build the GET fetch request', () => {
        expect(fetch).toHaveBeenCalledWith(
          baseURL + requestDetails.path + '?foo=bar',
          Object.assign(requestDetails, serverOpts)
        )
      })
    })

    context('when the request details a POST', () => {
      beforeEach(() => {
        requestDetails.method = 'POST';
        requestDetails.body = JSON.stringify({fakeData: 5});
        subject();
      })

      test('it should return a build the POST fetch request', () => {
        expect(fetch).toHaveBeenCalledWith(
          baseURL + requestDetails.path,
          Object.assign(requestDetails, serverOpts)
        )
      })
    })

    context('when the request details a PUT', () => {
      beforeEach(() => {
        requestDetails.method = 'PUT';
        requestDetails.body = JSON.stringify({fakeData: 5});
        subject();
      })

      test('it should return a build the PUT fetch request', () => {
        expect(fetch).toHaveBeenCalledWith(
          baseURL + requestDetails.path,
          Object.assign(requestDetails, serverOpts)
        )
      })
    })

    context('when the request details a DELETE', () => {
      beforeEach(() => {
        requestDetails.method = 'DELETE';
        subject();
      })

      test('it should return a build the DELETE fetch request', () => {
        expect(fetch).toHaveBeenCalledWith(
          baseURL + requestDetails.path,
          Object.assign(requestDetails, serverOpts)
        );
      })
    })

    context('when the request details a PATCH', () => {
      beforeEach(() => {
        requestDetails.method = 'PATCH';
        requestDetails.body = JSON.stringify({fakeData: 5});
        subject();
      })

      test('it should return a build the PATCH fetch request', () => {
        expect(fetch).toHaveBeenCalledWith(
          baseURL + requestDetails.path,
          Object.assign(requestDetails, serverOpts)
        );
      })
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

  describe('_handleRequestEvent', () => {
    let subject = () => {
      document.dispatchEvent(requestEvent);
    };

    let requestDetails = 'fakeRequestDetails';
    let fakeRequest = 'fakeRequest';
    let requestEvent = new CustomEvent(
      HttpFactoryServer.REQUEST_EVENT_TYPE, {
        bubble: true,
        detail: {
          requestDetails: requestDetails
        }
      }
    )

    beforeEach(() => {
      let server = new HttpFactoryServer;
      server.bindTo();
      server.buildRequest = jest.fn(() => fakeRequest)
    })

    test('that it should insert the output of buildRequest in request detail', () => {
      subject()
      expect(requestEvent.detail.request).toBe(fakeRequest);
    })
  })

})

