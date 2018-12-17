import { HttpFactoryServer } from './http-factory-server.js'

export class HttpFactoryClient {

  constructor(target = document) {
    this.target = target;
  }

  get(path, options = {}) {
    let getEvent = this._constructEvent('GET', path, options);
    this.target.dispatchEvent(getEvent);

    return getEvent.detail.request;
  }

  post(path, options = {}) {
    let postEvent = this._constructEvent('POST', path, options);
    this.target.dispatchEvent(postEvent);

    return postEvent.detail.request;
  }

  put(path, options = {}) {
    let putEvent = this._constructEvent('PUT', path, options);
    this.target.dispatchEvent(putEvent);

    return putEvent.detail.request;
  }

  patch(path, options = {}) {
    let patchEvent = this._constructEvent('PATCH', path, options);
    this.target.dispatchEvent(patchEvent);

    return patchEvent.detail.request;
  }

  delete(path, options = {}) {
    let deleteEvent = this._constructEvent('DELETE', path, options);
    this.target.dispatchEvent(deleteEvent);

    return deleteEvent.detail.request;
  }

  _constructEvent(method, path, options) {
    let requestDetails = Object.assign(
      {
        method: method,
        path: path
      },
      options
    );

    return new CustomEvent(
      HttpFactoryServer.REQUEST_EVENT_TYPE,
      {
        bubbles: true,
        composed: true,
        detail: {
          requestDetails: requestDetails
        }
      }
    )
  }
}

