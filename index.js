// express-standard
// Easy method to define standard express headers

var fs               = require('fs')
  , _headers         = {}
  , _header_list     = []
  , _csp             = {
  }
  , _csp_report_only = {
  }
  , csp_field        = 'Content-Security-Policy'
  , csp_report_field = 'Content-Security-Policy-Report-Only'
  , src_areas        = ['default','object','script','style','img','media','frame','font']

  , handle       = function handle(req, res, next) {
    for(var i=0; i<_header_list.length; i++) {
    	var item = _header_list[i];
    	res.setHeader(item.name, item.value);
    }
    next();
}


function add(headers) {
	headers         = headers || {};
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
	_headers         = headers;
	_csp             = {};
	_csp_report_only = {};  
	return add(headers);
}



function powered_by(value) {
	_headers["x-powered-by"] = value;
	return add(_headers);
}



function app_powered_by(includeVersion) {
	if (fs.existsSync(__dirname + '/package.json')) {
		var appPackage = require(__dirname + '/package.json');
		var name = (includeVersion) ? appPackage.name + '/' + appPackage.version : appPackage.name;
		return powered_by(name);
	} else {
		console.log(__dirname + '/package.json missing');
	}
}


function add_csp_headers(reportOnly) {
	var csp                = (reportOnly) ? _csp_report_only : _csp
	  , header_field       = (reportOnly) ? csp_report_field : csp_field;

	var header             = [];
	var headerNames        = Object.getOwnPropertyNames(csp);
	headerNames.forEach(function(name) {
		var value          = csp[name];
		header.push(name + ' ' + value);
	});
	_headers[header_field] = header.join('; ');
	return add({});
}



function add_csp(area, value, reportOnly) {
	if (typeof value === 'undefined') {
		value                  = area;
		area                   = 'default-src';
	}
	reportOnly = reportOnly || false;
	if (area == '*') { 
		area = src_areas; 
	}
	if (area.indexOf(',')>0) {
		var areas = area.split(',');
		for (var i=0; i<areas.length; i++) {
			area = areas[i];
			add_csp(area, value, reportOnly);
		}
		return handle;
	}
	var areas                  = ',' + src_areas.join(',');
	if (areas.indexOf(area)>0) {
		area                   = area + '-src';
	}
	if (reportOnly) {
		_csp_report_only[area] = (_csp_report_only[area]) ? _csp_report_only[area] + ' ' + value : value ;
	} else {
		_csp[area]             = (_csp[area])             ? _csp[area] + ' ' + value             : value ;
	}
	return add_csp_headers(reportOnly);
}



function add_csp_report(area, value) {
	return add_csp(area, value, true);
}



function add_csp_self(area) {
	if (area) {
		return add_csp(area, "'self'");
	} else {
		return add_csp("'self'");
	}
}



function add_csp_domain(area, domain, protocols, subdomains) {
	if (typeof domain == 'undefined') {
		domain = area;
		area  = 'default-src';
	}
	subdomains = subdomains || false;
	if (typeof protocols == 'undefined') {
		protocols = ['http://', 'https://', 'ws://'];
	} else if (typeof protocols == 'string') {
		protocols = protocols.split(',');
	}
	if (typeof domain == 'string' && domain.indexOf(',')>-1) {
		domain = domain.split(',');
	}
	if (typeof domain == 'array' || (typeof domain == 'object' && domain.length>0)) {
		for(var i=0; i<domain.length; i++) {
			var dom = domain[i];
			add_csp_domain(area, dom, protocols, subdomains);
		}
		return handle;
	}

	if (subdomains) {
		domain = '*.' + domain;
	}


	if (domain.indexOf('//')>-1) { // specific domain and protocol
		return add_csp(area, domain);
	}

	for(var i=0; i<protocols.length; i++) {
		var protocol = protocols[i];
		if (protocol.indexOf('://')<0) {
			protocol = protocol + '://';
		}
		add_csp(area, protocols[i] + domain);
	}
	return handle;
}



function add_csp_allow_unsafe(area, notEval) {
	area = area || 'script-src,style-src';
	if (!notEval) {
		add_csp('script-src', "'unsafe-eval'");
	}
	return add_csp(area, "'unsafe-inline'");
}



// attribution: http://www.html5rocks.com/en/tutorials/security/content-security-policy/#use-case-1-social-media-widgets
function add_csp_social_widgets(widgets) {
	widgets = widgets || 'facebook,twitter,google+';
	if (typeof widgets == 'array' || (typeof widgets == 'object' && widgets.length>0)) {
		widgets = widgets.join(',');
	}
	if (widgets.indexOf('facebook')) {
		add_csp('frame-src', 'https://facebook.com');
	}
	if (widgets.indexOf('twitter')) {
		add_csp('script-src', 'https://platform.twitter.com');
		add_csp('frame-src', 'https://platform.twitter.com');
	}
	if (widgets.indexOf('google+')) {
		add_csp('script-src', 'https://apis.google.com');
		add_csp('frame-src', 'https://plusone.google.com');
	}
	return handle;
}



module.exports.add                    = add;
module.exports.add_csp                = add_csp;
module.exports.add_csp_self           = add_csp_self;
module.exports.add_csp_report         = add_csp_report;
module.exports.add_csp_domain         = add_csp_domain;
module.exports.add_csp_allow_unsafe   = add_csp_allow_unsafe;
module.exports.add_csp_social_widgets = add_csp_social_widgets;
module.exports.set                   = set;
module.exports.get                   = get;
module.exports.handle                = handle;
module.exports.powered_by            = powered_by;
module.exports.app_powered_by        = app_powered_by;
