require('setimmediate');

var mod = function(test, func, cb) {
	check();

	function check(err) {
		if(!err && test()) {
			setImmediate(function() {
				func(check);
			});
		} else {
			cb(err);
		}
	}
}

module.exports = mod;
