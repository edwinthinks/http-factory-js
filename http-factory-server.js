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
    return fetch(this.baseURL, {
      method: requestDetails.method,
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    })
  }

  _handleRequestEvent(event) {
    let requestDetails = event.detail.requestDetails;
    event.detail.request = this.buildRequest(requestDetails);
  }

}

export default HttpFactoryServer;
