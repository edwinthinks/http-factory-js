import { REQUEST_EVENT_TYPE } from './http-factory-constants.js'

export class HttpFactoryServer {

  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.options = options;

    this._handleRequestEvent = this._handleRequestEvent.bind(this);
    this.buildRequest = this.buildRequest.bind(this);
  }



  bindTo(element = document) {
    element.addEventListener(
      REQUEST_EVENT_TYPE,
      this._handleRequestEvent
    )
  }

  buildRequest(requestDetails = {}) {
    let requestData = {
      ...requestDetails,
      ...this.options
    };

    if (requestData.body && !this._isJSONString(requestData.body)) {
      requestData.body = JSON.stringify(requestData.body);
    }

    let pathURL = this._buildPathURL(requestData.path, requestData.queryParams);

    return fetch(pathURL.href, requestData).then(res => res.json())
  }

  _buildPathURL(path, queryParams = {}) {
    let pathURL = new URL(path, this.baseURL);

    for (var key in queryParams) {
      pathURL.searchParams.set(key, queryParams[key]);
    }

    return pathURL;
  }

  _isJSONString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
  }

  _handleRequestEvent(event) {
    let requestDetails = event.detail.requestDetails;
    event.detail.request = this.buildRequest(requestDetails);
  }
}

