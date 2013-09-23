// express-standard
// Easy method to define standard express headers


var _headers     = {}
  , _header_list = []

  , handle       = function handle(req, res, next) {
    for(var i=0; i<_header_list.length; i++) {
    	var item = _header_list[i];
    	res.setHeader(item.name, item.value);
    }
    next();
}


function add(headers) {
	_header_list    = [];
	var headerNames = Object.getOwnPropertyNames(headers);
	headerNames.forEach(function(name) {
		var value = headers[name];
		_headers[name] = value;
	});

	headerNames = Object.getOwnPropertyNames(_headers);
	headerNames.forEach(function(name) {
		var value = _headers[name];
		_header_list.push({
			name:  name,
			value: value
		});
	});

	return handle;
}



function get() {
	return _headers;
}



function set(headers) {
	_headers        = headers;
	return add(headers);
}


function powered_by(value) {
	_headers["x-powered-by"] = value;
	return set(_headers);
}



module.exports.add        = add;
module.exports.set        = set;
module.exports.get        = get;
module.exports.handle     = handle;
module.exports.powered_by = powered_by;
