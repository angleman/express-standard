# express-standard [![NPM version](https://badge.fury.io/js/express-standard.png?branch=master)](https://npmjs.org/package/express-standard) [![Build Status](https://travis-ci.org/angleman/express-standard.png?branch=master)](https://travis-ci.org/angleman/express-standard) [![Dependency Status](https://gemnasium.com/angleman/express-standard.png?branch=master)](https://gemnasium.com/angleman/express-standard) [![License](http://badgr.co/use/MIT.png?bg=%2343d100)](#licensemit)

Easy method to define standard express headers


## Install

```
npm install express-standard
```

## Usage

```
var express_standard = require('express-standard');
express_standard({
	option: null
}, function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
	}
});
```


## License: MIT

Dependencies:

