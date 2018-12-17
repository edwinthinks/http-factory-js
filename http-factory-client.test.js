import { HttpFactoryClient } from './http-factory-client.js'
import { HttpFactoryServer } from './http-factory-server.js'

describe('HttpFactoryClient', () => {

  // Add mock function that mimics HttpFactoryServer
  // response. Rather than depending on the Server logic this
  // should be able to run without Server.
  const mockServerResponse = jest.fn((event) => {
    event.detail.request = fetch('fake-url', {}).then(res => res.json())
  })
  const mockResponseBody = { fakeData: 'i-am-a-fake' };

  beforeEach(() => {
    fetch.mockResponse(JSON.stringify(mockResponseBody));
    document.dispatchEvent = mockServerResponse;
  })

  afterEach(() => {
    mockServerResponse.mockClear();
  })

  describe('get', () => {
    let subject = () => {
      return client.get(fakePath, { queryParams: queryParams});
    };

    let fakePath = 'fake-path';
    let queryParams = { foo: "bar" };
    let client;

    beforeEach(() => {
      client = new HttpFactoryClient();
    })

    test('that it fetches the expected data', () => {
      return subject().then((data) => {
        expect(data).toEqual(mockResponseBody);
      })
    });

    test('that it dispatchs the GET event', () => {
      subject();

      expect(mockServerResponse).toHaveBeenCalled()

      let capturedEvent = mockServerResponse.mock.calls[0][0];

      expect(capturedEvent.type).toBe(HttpFactoryServer.REQUEST_EVENT_TYPE);
      expect(capturedEvent.detail.requestDetails).toMatchObject({
        method: 'GET',
        path: fakePath,
        queryParams: queryParams
      })
    })
  })

  describe('post', () => {
    let subject = () => {
      return client.post(fakePath, { body: body });
    };

    let fakePath = 'fake-path';
    let body = { foo: "bar" };

    let client;
    beforeEach(() => {
      client = new HttpFactoryClient();
    })

    test('that it fetches the expected data', () => {
      return subject().then((data) => {
        expect(data).toEqual(mockResponseBody);
      })
    });

    test('that it dispatchs the POST event', () => {
      subject();

      expect(mockServerResponse).toHaveBeenCalled()

      let capturedEvent = mockServerResponse.mock.calls[0][0];

      expect(capturedEvent.type).toBe(HttpFactoryServer.REQUEST_EVENT_TYPE);
      expect(capturedEvent.detail.requestDetails).toMatchObject({
        method: 'POST',
        path: fakePath,
        body: body
      })
    })
  })

  describe('put', () => {
    let subject = () => {
      return client.put(fakePath, { body: body });
    };

    let fakePath = 'fake-path';
    let body = { foo: "bar" };

    let client;
    beforeEach(() => {
      client = new HttpFactoryClient();
    })

    test('that it fetches the expected data', () => {
      return subject().then((data) => {
        expect(data).toEqual(mockResponseBody);
      })
    });

    test('that it dispatchs the PUT event', () => {
      subject();

      expect(mockServerResponse).toHaveBeenCalled()

      let capturedEvent = mockServerResponse.mock.calls[0][0];

      expect(capturedEvent.type).toBe(HttpFactoryServer.REQUEST_EVENT_TYPE);
      expect(capturedEvent.detail.requestDetails).toMatchObject({
        method: 'PUT',
        path: fakePath,
        body: body
      })
    })
  })

  describe('patch', () => {
    let subject = () => {
      return client.patch(fakePath, { body: body });
    };

    let fakePath = 'fake-path';
    let body = { foo: "bar" };

    let client;
    beforeEach(() => {
      client = new HttpFactoryClient();
    })

    test('that it fetches the expected data', () => {
      return subject().then((data) => {
        expect(data).toEqual(mockResponseBody);
      })
    });

    test('that it dispatchs the PATCH event', () => {
      subject();

      expect(mockServerResponse).toHaveBeenCalled()

      let capturedEvent = mockServerResponse.mock.calls[0][0];

      expect(capturedEvent.type).toBe(HttpFactoryServer.REQUEST_EVENT_TYPE);
      expect(capturedEvent.detail.requestDetails).toMatchObject({
        method: 'PATCH',
        path: fakePath,
        body: body
      })
    })
  })


  describe('delete', () => {
    let subject = () => {
      return client.delete(fakePath);
    };

    let fakePath = 'fake-path';

    let client;
    beforeEach(() => {
      client = new HttpFactoryClient();
    })

    test('that it fetches the expected data', () => {
      return subject().then((data) => {
        expect(data).toEqual(mockResponseBody);
      })
    });

    test('that it dispatchs the DELETE event', () => {
      subject();

      expect(mockServerResponse).toHaveBeenCalled()

      let capturedEvent = mockServerResponse.mock.calls[0][0];

      expect(capturedEvent.type).toBe(HttpFactoryServer.REQUEST_EVENT_TYPE);
      expect(capturedEvent.detail.requestDetails).toMatchObject({
        method: 'DELETE',
        path: fakePath
      })
    })
  })

})
