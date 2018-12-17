## Http Factory JS
[![Build Status](https://travis-ci.com/edwinthinks/http-factory-js.svg?branch=master)](https://travis-ci.com/edwinthinks/http-factory-js)

A javascript library that enables child components to retrieve built HTTP requests without adding implementation
detail within them. This achieves this by modeling a 'Server + Client' relationship between parent and child
components. The parent acts as a 'Server' that responds to requests in the form of dispatched Events from child 'Client'.
The 'Client' receives a fully contained function that can readily be executed.

## Installation

TODO - Add this!

## Usage

In a very basic example you can initialize and bind a `HttpFactoryServer` to the document (default) or element;
```html
<html>
  <script type='module'>
    import { HttpFactoryClient } from './http-factory-client.js'
    import { HttpFactoryServer } from './http-factory-server.js'

    let requestOptions = {
      headers: {
        "Accept": "application/json"
      }
    }

    // Initialize the HttpFactoryServer /w common requestOptions like headers.
    let httpFactoryServer = new HttpFactoryServer('https://base-url-of-api.com/', requestOptions);
    // Bind to the document to listen for request building events.
    httpFactoryServer.bindTo(document);

    // Initialize the HttpFactoryClient to begin making HTTP requests with authorization
    // settings in the HttpFactoryServer.
    let httpClient = new HttpFactoryClient(document);
    httpClient.get('/path/1').then((res) => {
      console.log(JSON.stringify(res));
    })

  </script>
</html>
```

