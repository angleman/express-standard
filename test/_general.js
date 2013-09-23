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
    	var express_standard;
    	it('load without errors', function() {
	        express_standard = require('../index.js');
        });

    //    express_standard = require('../index.js');

  //      var flag = false;
//        beforeEach(function(done){
  //          this.timeout(15 * 1000); // allow test to run for 15 seconds
//            express_standard({
//            }, function(err, data) {
//                flag = true;
  //              done(); // complete the async beforeEach
//            });
    //    });   

//    	it('callback ok', function() {
//			 flag.should.equal(true);
  //      });

    });
});