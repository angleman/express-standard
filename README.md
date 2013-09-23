# express-standard [![NPM version](https://badge.fury.io/js/express-standard.png?branch=master)](https://npmjs.org/package/express-standard) [![Build Status](https://travis-ci.org/angleman/express-standard.png?branch=master)](https://travis-ci.org/angleman/express-standard) [![Dependency Status](https://gemnasium.com/angleman/express-standard.png?branch=master)](https://gemnasium.com/angleman/express-standard) [![License](http://badgr.co/use/MIT.png?bg=%2343d100)](#licensemit)

Easy method to define standard express headers


## Install :hammer:

```
npm install express-standard
```

## Usage :wrench:

```
headers = require('express-standard');

app.use(

headers.set({
    "x-powered-by": "Awesomeness"
}));

headers.add({
    "Basic-Content-Security": "default-src 'self'"
});

app.use(headers.handle);
```

## Powered By Sample :bulb:

```
app.use(headers.powered_by('Awesomeness'));
console.log(headers.get()) // { x-powered-by:"Awesomeness"}
```


## SSL Only Basic Content Security Policy :bulb:

```
ssl_only = "default-src https:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'";

app.use(headers.set("Basic-Content-Security": ssl_only));
```


## License: MIT :unlock:

