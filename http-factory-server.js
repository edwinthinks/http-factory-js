import buildUrl from 'build-url';

class HttpFactoryServer {

  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.options = options;

    this._handleRequestEvent = this._handleRequestEvent.bind(this);
    this.buildRequest = this.buildRequest.bind(this);
  }

  static get REQUEST_EVENT_TYPE() {
    return 'http-factory-request';
  }

  bindTo(element = document) {
    element.addEventListener(
      this.constructor.REQUEST_EVENT_TYPE,
      this._handleRequestEvent
    )
  }

  buildRequest(requestDetails) {
    let requestData = Object.assign(requestDetails, this.options);

    let url = buildUrl(this.baseURL, {
      path: requestDetails.path,
      queryParams: requestDetails.queryParams
    })

    return fetch(url, requestData).then(res => res.json())
  }

  _handleRequestEvent(event) {
    let requestDetails = event.detail.requestDetails;
    event.detail.request = this.buildRequest(requestDetails);
  }

}

export default HttpFactoryServer;
