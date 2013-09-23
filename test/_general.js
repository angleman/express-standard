var should = require('should')
//  , fs     = require('fs')
//  , express_standard_data = '/tmp/express_standard.json'
;

// clean up from prior run
//if (fs.existsSync(express_standard_data)) {
//    fs.unlinkSync(express_standard_data);
//}



describe('express-standard', function() {
    describe('should', function() {
    	var headers;
    	it('load without errors', function() {
	        headers = require('../index.js');
        });

    	it('be powered by awesomeness', function() {
            headers.powered_by('Awesomeness');
            var results = headers.get();
            should.exist(results['x-powered-by']);
            results['x-powered-by'].should.equal('Awesomeness');
        });

    });
});