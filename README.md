## Http Factory JS
[![Build Status](https://travis-ci.com/edwinthinks/http-factory-js.svg?branch=master)](https://travis-ci.com/edwinthinks/http-factory-js)

A javascript library that enables child components to retrieve built HTTP requests without adding implementation
detail within them. This achieves this by modeling a 'Server + Client' relationship between parent and child
components. The parent acts as a 'Server' that responds to requests in the form of dispatched Events from child 'Client'.
The 'Client' receives a fully contained function that can readily be executed.




