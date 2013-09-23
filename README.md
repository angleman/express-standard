# express-standard [![NPM version](https://badge.fury.io/js/express-standard.png?branch=master)](https://npmjs.org/package/express-standard) [![Build Status](https://travis-ci.org/angleman/express-standard.png?branch=master)](https://travis-ci.org/angleman/express-standard/builds) [![Dependency Status](https://gemnasium.com/angleman/express-standard.png?branch=master)](https://gemnasium.com/angleman/express-standard) [![License](http://badgr.co/use/MIT.png?bg=%2343d100)](#licensemit)

Easy method to define standard express headers and assist with Content-Security-Policy including social media widgets


## Install :hammer:

```js
npm install express-standard
```

## Usage :wrench:

```js
headers = require('express-standard');

headers.set({
    "x-powered-by": "Awesomeness"
}));

headers.add({
    "Content-Security-Policy": "default-src 'self'"
});

headers.add_csp(area, value);// optional area, set to value
headers.add_csp_self(area);  // add 'self' to an area, default area is default-src
headers.add_csp('https:');   // now "Basic-Content-Security": "default-src 'self' https:"
headers.add_csp('style', 'http://yui.yahooapis.com'); // allow PureCSS stylesheet
headers.add_csp_report('script', 'https:');    // report script-src events
headers.add_csp('report-uri', '/csp_report');  // set report callback
headers.add_csp_allow_unsafe('script', notEval); // if notEval is set to true then unsafe_eval is not included, default area is script 
headers.add_csp_social_widgets(); // default is ['facebook', 'twitter', 'google+']
headers.add_domain('mydomain.com', protocols); // default protocols: http://, https:// & ws:// 
headers.add_domain('mydomain.com', 'https://', true); // https only and all subdomain included
headers.add_domain('style', 'yui.yahooapis.com'); // allow PureCss stylesheet over all protocols

app.use(headers.handle);


```
add_csp areas are as per http://www.w3.org/TR/CSP/
-src can be omitted, ex: instead of ```headers.add_csp('frame-src', 'http:')``` you could specify ```headers.add_csp('frame', 'http:')``` 

For sample report-uri data and social media attribution see: [content-security-policy](http://www.html5rocks.com/en/tutorials/security/content-security-policy/#reporting)

```add_social_widgets()``` can accept a comma delimited string, ex: ```facebook,twitter```

## Powered By :wrench:

```js
app.use(headers.powered_by('Awesomeness'));
console.log(headers.get()) // { x-powered-by:"Awesomeness"}
```

## Powered By Details from Application Package :wrench:

```js
// package.json: {name:'Awesomeness', version: '2.0.0', ...}
app.use(headers.app_powered_by(true)); // option to include version
console.log(headers.get())             // { x-powered-by:"Awesomeness/2.0.0"}
```

## SSL Only Basic Content Security Policy :bulb:

```js
ssl_only = "default-src https:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'";

app.use(headers.set("Basic-Content-Security": ssl_only));
```

## License: MIT :unlock:

