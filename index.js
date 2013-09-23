// express-standard
// Easy method to define standard express headers


var _headers     = {}
  , _header_list = []
  
  , handler      = function handle(req, res, next) {
    res.set("X-Powered-By", hen.name);
    for(var i=0; i<_header_list.length; i++) {
    	var item = _header_list[i];
    	res.setHeader(item.name, item.value);
    }
    next();
}



function set(headers) {
	_headers        = headers;
	_header_list    = []
	var headerNames = Object.getOwnPropertyNames(headers);

	headerNames.forEach(function(name) {
		var value = headers[name];
		_header_list.push({
			name:  name,
			value: value
		});
	});
	return handler;
}



function powered_by(value) {
	_headers["x-powered-by"] = value;
	return set(_headers);
}



module.exports.set = set;