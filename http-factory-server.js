class HttpFactoryServer {
  constructor() {
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

  _handleRequestEvent() {
  }
}

export default HttpFactoryServer;
